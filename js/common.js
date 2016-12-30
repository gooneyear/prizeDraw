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
    exist = true;
    var len = 0;
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
        $("#img"+j).css({
          'top': windowH/2-320,
          'left': windowW/2-120,
          'transform': 'scale(1.6)',
          'box-shadow': '0 0 30px red',
          'border-radius': '15px'
        });

        $(".showWord").html("恭喜<span style='color:red;font-size:80px;'>\""+arrayPic[j].name+"\"</span>中奖！");
        var wordWidth = $(".showWord").width();
        $(".showWord").css({
          'top': windowH/2-100,
          'left': windowW/2-wordWidth/2
        });
      }
    }
    showGo();
  });

  // 显示开始
  function showGo(){
    $("#main").css({
      "height": windowH-280,
      "width": windowW-40
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
    $("#start").hide();
    $(".showWord").hide();
    $("#stop").show();
  }

  // 首次进入界面
  function beginShowPic(){
    $.getJSON("info.json",function(json){
      arrayPic = json;
      actionPic(json,first);
    });
    $(".go").css({
      'margin-left': windowW/2-80,
      'margin-top': '60px'
    })
  }

  // 图片随机洗牌效果
  function actionPic(json,first){
    for(var i=0; i<json.length; i++){
      if (json[i].prize != 1) {
        top = Math.random()*(windowH-450);
        left = Math.random()*(windowW-300);
        if (first){
          $(".picture").append("<img id='img"+i+"' src='picture/"+json[i].imageName+"'>");
        }
        $("#img"+i).css({
          'position': 'absoulte',
          'top': top,
          'left': left
        });
      }
    }
  }

  // 停止此前音乐播放
  function pauseMusic(){
    $("audio").each(function(){
      $(this)[0].pause();
    });
  }

});
