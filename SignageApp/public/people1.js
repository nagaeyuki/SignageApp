var socket = io.connect(location.origin);
var test = 0;


$(function () {
    
    setInterval(function () {
        if (test == 0) {
            console.log("1");
            test = 1;
            page1();
        } else if (test == 1) {
            console.log("2");
            test = 2;
            page2();
        } else {
            console.log("3");
            test = 0;
            page3();
        }
    }, 3000);

	socket.on("ConnectClear", function(dataFromServer) {
		console.log("OKOK");
        document.location.href = "http://localhost:80/signage.html";
    });
    
    socket.on("inai", function (data) {
        document.location.href = "http://localhost:80/people2.html";    });

    function page1() {
        $('#logo2').attr('src', '/picture/0114.png');
        //$("#name").text("新商品");
    }
    
    function page2() {
        $('#logo2').attr('src', '/picture/0019.png');
        //$("#name").text("おすすめ商品");
    }

    function page3() {
        $('#logo2').attr('src', '/picture/0032.png');
        //$("#name").text("セール品");
    }
	
});
