$(function(){
  moveArrow2();

function moveArrow2() {
    $("#arrow")
      .animate({
          'margin-top':'0px',


        }, 2000)
        .animate({
          opacity:0
        },500)
        .animate({
          'margin-top':'150px',

          opacity:1
        },0);
  setTimeout(moveArrow2, 1500); //アニメーションを繰り返す間隔

}


});

var socket = io.connect(location.origin);
$(function () {
    socket.on("stop", function (data) {
        document.location.href = "http://localhost:80/DigitalSignage2.html";    });

});