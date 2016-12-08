var socket = io.connect(location.origin);
var test = 0;

$(function () {
    
    $('#logo2').hide();
    
    setInterval(function () {
        if (test == 0) {
            console.log("1");
            test = 1;
            page1();
        } else if (test == 1) {
            console.log("2");
            test = 0;
            page2();
        } /*else {
            console.log("3");
            test = 0;
            page3();
        }*/
    }, 2000);
     
    socket.on("iru", function (data) {
        document.location.href = "http://localhost:80/people1.html";    });

    function page1() {
        $('#time').show();
        $('#logo2').hide();
        $("#body").css('background-color', '#0000FF');
        $("#title").text("営業時間のご案内");
        $("#title").css('color', 'white');
    }
	
    function page2() {
        $('#time').hide();
        $('#logo2').show();
        $("#body").css('background-color', '#B1F9D0');
        $("#title").text("セールは明日開催！！");
        $("#title").css('color', 'black');
        $('#logo2').attr('src', '/picture/30sale.png');
    }
    

    /*function page3() {
        $("#body").css('background-color', '#DCC2FF');
        $("#title").text("ランダムページ3");
    }*/
});
