/**
 * Created by zhouxin on 2016/12/28.
 */
$(function(){
  var windowH = $(document).height();
  var windowW = $(document).width();
  var arrayPic = "";
  var timer = "";
  var top = 0;
  var left = 0;
  var first = 1;
  var exist = true;
  var json = [
    {"name":"书包","imageName":"0.jpg","prize":"0"},
    {"name":"椅子","imageName":"1.jpg","prize":"0"},
    {"name":"扑克","imageName":"2.jpg","prize":"0"},
    {"name":"手臂","imageName":"3.jpg","prize":"0"},
    {"name":"灯泡","imageName":"4.jpg","prize":"0"},
    {"name":"兔子","imageName":"5.jpg","prize":"0"},
    {"name":"日历","imageName":"6.jpg","prize":"0"},
    {"name":"沙发","imageName":"7.jpg","prize":"0"},
    {"name":"背心","imageName":"8.jpg","prize":"0"},
    {"name":"地球","imageName":"9.jpg","prize":"0"},
    {"name":"菠萝","imageName":"10.jpg","prize":"0"},
    {"name":"火车","imageName":"11.jpg","prize":"0"},
    {"name":"铅笔","imageName":"12.jpg","prize":"0"},
    {"name":"斧头","imageName":"13.jpg","prize":"0"},
    {"name":"蝴蝶","imageName":"14.jpg","prize":"0"},
    {"name":"闹钟","imageName":"15.jpg","prize":"0"},
    {"name":"禅师","imageName":"staff (1).jpg","prize":"0"},
    {"name":"竹林","imageName":"staff (2).jpg","prize":"0"},
    {"name":"香蕉","imageName":"staff (3).jpg","prize":"0"},
    {"name":"吉他","imageName":"staff (4).jpg","prize":"0"},
    {"name":"桌子","imageName":"staff (5).jpg","prize":"0"},
    {"name":"轮胎","imageName":"staff (6).jpg","prize":"0"},
    {"name":"算盘","imageName":"staff (7).jpg","prize":"0"},
    {"name":"架子","imageName":"staff (8).jpg","prize":"0"},
    {"name":"医生","imageName":"staff (9).jpg","prize":"0"},
    {"name":"帽子","imageName":"staff (10).jpg","prize":"0"},
    {"name":"蜻蜓","imageName":"staff (11).jpg","prize":"0"},
    {"name":"大象","imageName":"staff (12).jpg","prize":"0"},
    {"name":"山羊","imageName":"staff (13).jpg","prize":"0"},
    {"name":"台灯","imageName":"staff (14).jpg","prize":"0"},
    {"name":"红灯笼","imageName":"staff (15).jpg","prize":"0"},
    {"name":"蘑菇","imageName":"staff (16).jpg","prize":"0"}
  ];

  showGo();
  beginShowPic();

  // 点击开始抽奖
  $("#go").click(function(){
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
        arrayPic[j].prize = "1";
        $("#img"+j).hide();
        var num = j;
        prizeName = arrayPic[j].name;
        // 延迟1.6秒显示中奖人员头像和名字，以配合音效。
        setTimeout(function(){
          $("#img"+num).css({
            'top': windowH/2-320,
            'left': windowW/2-120,
            'transform': 'scale(1.6)',
            'box-shadow': '0 0 60px red',
            'border-radius': '15px',
            'display': 'block',
            'Opacity': '0.9'
          });
          $("#main").css("background-image", "url('image/back2.jpg')");
          $(".showWord").html("恭喜<span style='color:red;font-size:96px;'>"+prizeName+"</span>中奖！");
          var wordWidth = $(".showWord").width();
          $(".showWord").css({
            'top': windowH/2-100,
            'left': windowW/2-wordWidth/2,
            'display': 'block'
          });
        },1600);
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
      actionPic(json,first);
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

});
