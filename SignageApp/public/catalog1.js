var socket = io.connect(location.origin);

var connect = 1;
var test = 0;
var test2 = 1;


$(function () {
    
    /*socket.on("catalogMain1", function(dataFromServer) {
		test = 1;
    });
	
	socket.on("catalogMain2", function(dataFromServer) {
		test = 2;
    });
	
	socket.on("catalogMain3", function(dataFromServer) {
		test = 3;
    });
	
	if(test = 1) {
		display1();
	} else if(test = 2) {
		display2();
	} else {
		display3();
	}*/

    socket.on("catalogTest1", function (dataFromServer) {
        display1();
    });
    
    socket.on("catalogTest2", function (dataFromServer) {
        display2();
    });
    
    socket.on("catalogTest3", function (dataFromServer) {
        display3();
    });
    
    /*socket.on("catalogTest4", function(dataFromServer) {
		//document.location.href = "http://localhost:80/catalogMain.html";
    });*/
    
	socket.on("Restart", function (dataFromServer) {
        document.location.href = "http://localhost:80/people1.html";
    });
    
    socket.on("ConnectCut", function (data) {
        if (connect == 1) {
            socket.emit("EndConnect");
            document.location.href = "http://localhost:80/people1.html";
            console.log("miss");
        }
        
        if (test2 = 2) {
            connect = 1;
            test2 = 1;
        } else {
            connect = 2;
            test2 = 2;
        }
    });
    
    socket.on("DontStop", function (data) {
        connect = 3;
    });
    
    
    function display1() {
        $("#title").text("新商品のページを表示しています。");
        //$("#word").text("新商品一覧");
        $("#body").css('background-color', '#66CCFF');
        $("#title").css('color', 'white');
        $("#word").css('color', 'white');
        $('#logo1').attr('src', '/picture/0113.png');
        $('#logo2').attr('src', '/picture/0114.png');
        $('#logo3').hide();
    }
    
    function display2() {
        $("#title").text("おすすめ商品のページを表示しています。");
        //$("#word").text("おすすめ商品一覧");
        $("#body").css('background-color', '#33CC99');
        $("#title").css('color', 'black');
        $("#word").css('color', 'black');
        $('#logo1').attr('src', '/picture/0019.png');
        $('#logo2').attr('src', '/picture/0038.png');
        $('#logo3').hide();
    }
    
    function display3() {
        $("#title").text("セール品のページを表示しています。");
       // $("#word").text("セール品一覧");
        $("#body").css('background-color', '#FF6699');
        $("#title").css('color', 'white');
        $("#word").css('color', 'white');
        $('#logo1').attr('src', '/picture/0032.png');
        $('#logo2').attr('src', '/picture/0012.png');
        $('#logo3').hide();
    }
	
});
