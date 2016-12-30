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

  showGo();
  beginShowPic();

  // 点击开始抽奖
  $("#go").click(function(){
    showEnd();
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
    var xx = Math.floor(Math.random()*arrayPic.length);
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

      }
    }
    showGo();
  });

  // 显示开始
  function showGo(){
    $("#main").css("height",windowH-280);
    $("#start").css("height","200px");
    $("#start").css("width",windowW);
    $("#start").show();
    $("#stop").hide();
  }

  // 显示停止
  function showEnd(){
    $("#stop").css("height","200px");
    $("#stop").css("width",windowW);
    $("#start").hide();
    $("#stop").show();
  }

  // 首次进入界面
  function beginShowPic(){
    $.getJSON("info.json",function(json){
      arrayPic = json;
      actionPic(json,first);
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


});


//for(var i=0; i<json.length; i++) {
//  localStorage.setItem(i, JSON.stringify(json[i]));
//}
//var aa = JSON.parse(localStorage.getItem(3));
//aa.prize = 1;
//localStorage.removeItem(3);
//console.log(localStorage.length);
//var aa = JSON.parse(localStorage.getItem("info"));
//for(var i=0; i<aa.length; i++){
//  if (aa[i].prize != 1) {
//
//  } else {
//
//  }
//}