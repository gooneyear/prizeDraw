/**
 * Created by zhouxin on 2016/12/28.
 */
$(function(){
  var windowH = $(document).height();
  var windowW = $(document).width();
  var prizeNum = 1;   // 奖项数目
  var prizeArr = [];  // 中奖列表
  var arrayPic = "";  // 人员图片数组
  var timer = "";
  var top = 0;
  var left = 0;

  showGo();
  beginShowPic();

  // 点击开始抽奖
  $("#go").click(function(){
    prizeNum = $("input:checked")[0].value;
    arrayPic.sort(randomsort);
    showEnd();
    pauseMusic();
    $("audio")[0].play();
    clearInterval(timer);
    for(var j=0; j<arrayPic.length; j++){
      if (arrayPic[j].prize != "1") {
        $("#img"+arrayPic[j].id).show();
      } else {
        $("#img"+arrayPic[j].id).hide();
      }
    }
    timer = setInterval(function(){
      actionPic(arrayPic);
    },100);
  });

  // 点击结束，展示奖项
  $("#end").click(function(){
    clearInterval(timer);
    pauseMusic();
    $("audio")[1].play();
    $(".showWord").html("");
    var len = 0;

    // 判断当前随机抽取的人员是否中奖，若已中奖则自动向下获取
    prizeArr = [];
    for (var i=0; i<arrayPic.length; i++){
      if (arrayPic[i].prize == "0"){
        if (prizeArr.length == prizeNum){
          break;
        } else {
          prizeArr.push(arrayPic[i]); 
          arrayPic[i].prize = "1";
        }
      } else {
        len ++;
        if (len == arrayPic.length){
          alert("全都中奖啦！刷新页面重新开始吧！");
        }
      }
    }
    $("img").hide();
    var prizeName = "";
    switch (prizeNum){
      case "5":
        prizeName = "三等";
        break;
      case "2":
        prizeName = "二等";
        break;
      case "1":
        prizeName = "一等";
        break;
      default:
        prizeName = "惊喜";
        break;
    }
    prizeName = "";
    // 中奖人员头像的显示动画延迟1.6秒
    setTimeout(function(){
      for (var i=0; i<prizeNum; i++) {
        $("#img"+prizeArr[i].id).css({
          'top': windowH/2-100,
          'left':windowW/2 + (i-prizeNum/2)*140-10,
          'border-radius': '15px',
          'display': 'block',
          'width': '120px',
          'height': '80px'
        }); 

      }
      $(".showWord").html("恭喜中<span style='color:red;font-size:96px;'>"+prizeName+"</span>奖！");
      var wordWidth = $(".showWord").width();
      $(".showWord").css({
        'top': windowH/2-100,
        'left': windowW/2-wordWidth/2,
        'display': 'block'
      });
    },1600);
    
    var getImgID = 0; 
    if (prizeArr.length >= prizeNum){
      for(var i=0; i<prizeNum; i++){
        getImgID = prizeArr[i].id;        
        $("#img"+getImgID).css({
          'box-shadow': '0 0 100px Gold'
        });          
      }
    } else {
      alert("奖品真多，奖品数已超过未中奖人数啦！");
    }        
    showGo();
  });

  // 显示开始
  function showGo(){
    $("#main").css({
      "height": windowH-240,
      "width": windowW-40,
      "background-image": "url('image/back3.jpg')"
    });
    $("#foot img:last").css({
      'margin-left': windowW/2
    });
    $("#start").css("height","200px");
    $("#start").css("width",windowW);
    $("#start").show();
    $(".showWord").show();
    $("#stop").hide();
  }

  // 显示停止
  function showEnd(){
    $("#stop").css("height","200px");
    $("#stop").css("width",windowW);
    $("#main").css("background-image", "url('image/back1.jpg')");
    $("#start").hide();
    $(".showWord").hide();
    $("#stop").show();
  }

  // 首次进入界面
  function beginShowPic(){
    // chrome浏览器不支持AJAX获取本地文件，故改成定义数组方式，见上。
    //$.getJSON("image/info.json",function(json){
      arrayPic = json;
      arrayPic.sort(randomsort);
      actionPic(arrayPic);
    //});
    $("#main").css("background-image", "url('image/back1.jpg')");
    $(".go").css({
      'margin-left': windowW/2-80,
      'margin-top': '50px'
    })
  }

  // 图片随机洗牌效果
  function actionPic(json){
    $(".picture").empty();
    var imgID = 0;
    for(var i=0; i<json.length; i++){
      imgID = json[i].id;
      if (json[i].prize != 1) {
        top = Math.random()*(windowH-450);
        left = Math.random()*(windowW-300);
        $(".picture").append("<img id='img"+imgID+"' src='./picture/"+json[i].imageName+"'>");
        $("#img"+imgID).css({
          'position': 'absolute',
          'top': top,
          'left': left
        });
      }
    }
  }
  
  // 停止并重置此前播放的音乐
  function pauseMusic(){
    $("audio").each(function(){
      $(this)[0].pause();
      $(this)[0].currentTime = 0;
    });
  }

  function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  }
});
