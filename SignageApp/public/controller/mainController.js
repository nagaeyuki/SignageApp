var socket = io.connect(location.origin);

var urlTransition = ["http://192.168.53.41:80/controller/calendarController.html", "http://192.168.53.41:80/controller/accordionController.html","http://192.168.53.41:80/controller/questionController.html"];

var socketCut = 0;
var connection = 0;


$(function () {
	//start();
	
	$(".menuBtn1").click(function () {
		//course();
		//document.location.href = url[0];
		if(socketCut == 0) {
		socket.emit("courseStartFromController");
		console.log("aaa");
		window.location.href = urlTransition[0];
		}
    });
	$(".menuBtn2").click(function () {
		//course();
		if(socketCut == 0) {
		socket.emit("kyujinStartFromController");
		document.location.href = urlTransition[1];
		}
    });
	$(".menuBtn3").click(function () {
		//course();
		if(socketCut == 0) {
		socket.emit("faqStartFromController");
		window.location.href = urlTransition[2];
		}
    });
    
    //クリックしたときのファンクションをまとめて指定
    $('.tab li').click(function () {
        
        //.index()を使いクリックされたタブが何番目かを調べ、
        //indexという変数に代入します。
        var index = $('.tab li').index(this);
        
        //コンテンツを一度すべて非表示にし、
        $('.content li').css('display', 'none');
        
        //クリックされたタブと同じ順番のコンテンツを表示します。
        $('.content li').eq(index).css('display', 'block');
        
        //一度タブについているクラスselectを消し、
        $('.tab li').removeClass('select');
        
        //クリックされたタブのみにクラスselectをつけます。
        $(this).addClass('select');
    });
    

	$(".mainRelease").click(function () {
		socket.emit("FlagReset");
		socketCut = 1;
		socket.disconnect();
		//window.location.href = urlTransition[0];
    });
	
//一定時間ごとに接続確認
    /*testTimer = setInterval(function () {
        if (connection == 0) {
            socket.emit("ConnectCheck");
            alert("繋がってますか？");
            socket.emit("ConnectNow");
            console.log("connection:" + connection);
        }

    }, 10000);
    
    socket.on("ConnectEnd", function (data) {
        //window.open('about:blank','_self').close();
        //アラート止める処理
        connection = 1;
        clearInterval(testTimer);
        console.log("ConnectEnd");
        //切断後ボタン無効に
        socketCut = 1;
        socket.disconnect();
    });*/
	

});

/*function start() {
	$(".main").show();
	$(".course").hide();
	$(".business").hide();
	$(".kyujin").hide();
	$(".kyujin_detail").hide();
	$(".faq").hide();
}

function course() {
	$(".main").hide();
	$(".course").show();
	$(".business").hide();
	$(".kyujin").hide();
	$(".kyujin_detail").hide();
	$(".faq").hide();
}*/