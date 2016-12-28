/**
 * Created by zhouxin on 2016/12/28.
 */
$(function(){
  $("#start").css("height",$(document).height());
  $("#start").css("width",$(document).width());
  $("#start").show();
  beginShowPic();

  $(".go").click(function(){
    $("#start").hide();

  });

  function beginShowPic(){
    localStorage.clear();
    $.getJSON("info.json",function(json){
      for(var i=0; i<json.length; i++){
        if (json[i].prize != 1) {
          $(".picture").append("<img src='picture/"+json[i].imageName+"'>");
          $(this).style("top","60");
          $(this).style("left","20");
        }
      }

      //for(var i=0; i<json.length; i++) {
      //  localStorage.setItem(i, JSON.stringify(json[i]));
      //}
      //var aa = JSON.parse(localStorage.getItem(3));
      //aa.prize = 1;
      //localStorage.removeItem(3);
      //console.log(localStorage.length);
    })
  }

  function actionPic(){
    var aa = JSON.parse(localStorage.getItem("info"));
    for(var i=0; i<aa.length; i++){
      if (aa[i].prize != 1) {

      } else {

      }
    }
  }
});