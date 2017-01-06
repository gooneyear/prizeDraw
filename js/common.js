/**
 * Created by zhouxin on 2016/12/28.
 */
$(function(){
  var windowH = $(document).height();
  var windowW = $(document).width();
  var prizeNum = 1;   // 奖项数目
  var prizeArr = [];  // 中奖列表
  var arrayPic = "";
  var timer = "";
  var bigTimer = "";
  var borderTimer = "";
  var num = 0;
  var top = 0;
  var left = 0;
  var first = 1;
  var exist = true;
  var maxWidth = 30;
  var maxHeight = 20;
  var shadow = 1;

  showGo();
  beginShowPic();

  // 点击开始抽奖
  $("#go").click(function(){
    prizeNum = $("input:checked")[0].value;
    showEnd();
    pauseMusic();
    $("audio")[0].play();
    clearInterval(timer);
    for(var j=0; j<arrayPic.length; j++){
      if (arrayPic[j].prize != "1") {
        $("#img"+j).show();
      } else {
        $("#img"+j).hide();
      }
    }
    timer = setInterval(function(){
      actionPic(arrayPic);
    },100);
  });

  // 点击结束，展示奖项
  $("#end").click(function(){
    clearInterval(timer);
    clearInterval(bigTimer);
    pauseMusic();
    $("audio")[1].play();
    $(".showWord").html("");
    exist = true;
    var len = 0;
    var prizeName = "";
    // 判断当前随机抽取的人员是否中奖，若已中奖则自动重新抽取
    while(exist){
      var xx = Math.floor(Math.random()*arrayPic.length);
      if (arrayPic[xx].prize == "0"){
        exist = false;
      } else {
        len ++;
        if (len == arrayPic.length){
          exist = false;
          alert("全都中奖啦！刷新页面重新开始吧！");
        }
      }
    }

    // 显示中奖人员头像
    for(var j=0; j<arrayPic.length; j++){
      if (j != xx) {
        $("#img"+j).hide();
      } else {
        clearInterval(borderTimer);
        arrayPic[j].prize = "1";
        $("#img"+j).hide();
        num = j;
        prizeName = arrayPic[j].name;
        // 延迟1.6秒显示中奖人员头像和名字，以配合音效。
        setTimeout(function(){
          $("#main").css("background-image", "url('image/back2.jpg')");
          $(".showWord").html("恭喜<span style='color:red;font-size:96px;'>"+prizeName+"</span>中奖！");
          var wordWidth = $(".showWord").width();
          $(".showWord").css({
            'top': windowH/2-100,
            'left': windowW/2-wordWidth/2,
            'display': 'block'
          });
        },1600);

        // 中奖人员头像的显示动画
        maxWidth  = 30;
        maxHeight = 20;
        bigTimer = setInterval(function(){
          $("#img"+num).css({
            'top': windowH/2-320+maxHeight*0.03,
            'left': windowW/2-140+maxWidth*0.03,
            'transform': 'scale(1.6)',
            'border-radius': '15px',
            'display': 'block',
            'Opacity': '0.9',
            'width': maxWidth,
            'height': maxHeight
          });
          if(maxHeight < 150){
            maxWidth = maxWidth*1.05;
            maxHeight = maxHeight*1.05;
          } else {
            clearInterval(bigTimer);
          }
        },25);

        // 中奖人员头像的金色闪动效果
        borderTimer = setInterval(function(){
          $("#img"+num).css({
            'box-shadow': '0 0 '+shadow+'px Gold'
          });
          shadow += 1;
          if (shadow > 100){
            shadow = 1;
          }
        },10);

      }
    }
    showGo();
  });

  // 显示开始
  function showGo(){
    $("#main").css({
      "height": windowH-240,
      "width": windowW-40,
      "background-image": "url('image/back2.jpg')"
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
      json.sort(randomsort);
      actionPic(json,first);
    console.log(json);
    //});
    $("#main").css("background-image", "url('image/back1.jpg')");
    $(".go").css({
      'margin-left': windowW/2-80,
      'margin-top': '50px'
    })
  }

  // 图片随机洗牌效果
  function actionPic(json,first){
    for(var i=0; i<json.length; i++){
      if (json[i].prize != 1) {
        top = Math.random()*(windowH-450);
        left = Math.random()*(windowW-300);
        if (first){
          $(".picture").append("<img id='img"+i+"' src='./picture/"+json[i].imageName+"'>");
        }
        $("#img"+i).css({
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
