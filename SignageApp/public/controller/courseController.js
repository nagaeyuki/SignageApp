var socket = io.connect(location.origin);


var urlTransition =["http://localhost:5000/controller/mainController.html"];

var socketCut = 0;
var connection = 0;

$(function () {

	coursePage();

	$(".courseBtn1").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 1 });
		buttonDisabled();
		}
    });
	$(".courseBtn2").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 2 });
		buttonDisabled();
		}
    });
	$(".courseBtn3").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 3 });
		buttonDisabled();
		}
    });
	$(".courseBtn4").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 4 });
		buttonDisabled();
		}
    });
	$(".courseBtn5").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 5 });
		buttonDisabled();
		}
    });
	$(".courseBtn6").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 6 });
		buttonDisabled();
		}
    });
	$(".courseBtn7").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 7 });
		buttonDisabled();
		}
    });
	$(".courseBtn8").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 8 });
		buttonDisabled();
		}
    });
	$(".courseBtn9").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 9 });
		buttonDisabled();
		}
    });
	$(".courseBtn10").click(function () {
		if(socketCut == 0) {
		socket.emit("courseNumberFromController", { "courseNumber": 10 });
		buttonDisabled();
		}
    });
	
	socket.on("courseNumberFromServer", function (data) {
		courseDetailPage();
	});
	
	$(".courseReturn").click(function () {
		if(socketCut == 0) {
		socket.emit("courseReturn");
		console.log("return");
		window.location.href = urlTransition[0];
		}
    });
	
	$(".courseRelease").click(function () {
		socket.emit("FlagReset");
		socketCut = 1;
		socket.disconnect();
		//window.location.href = urlTransition[0];
    });
	
	
	$(".courseBeforeReturn2").click(function () {
		//course();
		//history.back();
		//$(".course").show();
		if(socketCut == 0) {
		coursePage();
		buttonEnabled();
		socket.emit("courseBefore");
		}
    });
	$(".courseReturn2").click(function () {
		if(socketCut == 0) {
		document.location.href = urlTransition[0];
		socket.emit("courseReturn");
		}
    });
	
	$(".courseRelease2").click(function () {
		socket.emit("FlagReset");
		socketCut = 1;
		socket.disconnect();
		//window.location.href = urlTransition[0];
    });
	
	
	//一定時間ごとに接続確認
	testTimer = setInterval(function () {
        if (connection == 0) {
			socket.emit("ConnectCheck");
			alert("繋がってますか？");
            socket.emit("ConnectNow");
            console.log("connection:"+connection);
        }

    }, 500000000);
	
	socket.on("ConnectEnd", function (data) {
        //window.open('about:blank','_self').close();
		//アラート止める処理
        connection = 1;
        clearInterval(testTimer);
        console.log("ConnectEnd");
		//切断後ボタン無効に
		socketCut = 1;
		socket.disconnect();
    });
	
	//クリックしたときのファンクションをまとめて指定
	$('.tab li').click(function() {

		//.index()を使いクリックされたタブが何番目かを調べ、
		//indexという変数に代入します。
		var index = $('.tab li').index(this);

		//コンテンツを一度すべて非表示にし、
		$('.content li').css('display','none');

		//クリックされたタブと同じ順番のコンテンツを表示します。
		$('.content li').eq(index).css('display','block');

		//一度タブについているクラスselectを消し、
		$('.tab li').removeClass('select');

		//クリックされたタブのみにクラスselectをつけます。
		$(this).addClass('select')
	});
	
	
	function coursePage() {
		$(".course").show();
		$(".courseFooter").show();
		$(".courseDetailFooter").hide();
	}
	
	function courseDetailPage() {
		//$(".faq").();
		$(".courseFooter").hide();
		$(".courseDetailFooter").show();
	}
	
	function buttonDisabled() {
		$(".courseBtn1").prop("disabled", true);
		$(".courseBtn2").prop("disabled", true);
		$(".courseBtn3").prop("disabled", true);
		$(".courseBtn4").prop("disabled", true);
		$(".courseBtn5").prop("disabled", true);
		$(".courseBtn6").prop("disabled", true);
		$(".courseBtn7").prop("disabled", true);
		$(".courseBtn8").prop("disabled", true);
		$(".courseBtn9").prop("disabled", true);
		$(".courseBtn10").prop("disabled", true);
		
		//ボタンの色を変える処理
		$('.courseBtn1').css('background-color', '#BDBDBD');
		$('.courseBtn2').css('background-color', '#BDBDBD');
		$('.courseBtn3').css('background-color', '#BDBDBD');
		$('.courseBtn4').css('background-color', '#BDBDBD');
		$('.courseBtn5').css('background-color', '#BDBDBD');
		$('.courseBtn6').css('background-color', '#BDBDBD');
		$('.courseBtn7').css('background-color', '#BDBDBD');
		$('.courseBtn8').css('background-color', '#BDBDBD');
		$('.courseBtn9').css('background-color', '#BDBDBD');
		$('.courseBtn10').css('background-color', '#BDBDBD');
	}
	
	function buttonEnabled() {
		$(".courseBtn1").prop("disabled", false);
		$(".courseBtn2").prop("disabled", false);
		$(".courseBtn3").prop("disabled", false);
		$(".courseBtn4").prop("disabled", false);
		$(".courseBtn5").prop("disabled", false);
		$(".courseBtn6").prop("disabled", false);
		$(".courseBtn7").prop("disabled", false);
		$(".courseBtn8").prop("disabled", false);
		$(".courseBtn9").prop("disabled", false);
		$(".courseBtn10").prop("disabled", false);
		
		$('.courseBtn1').css('background-color', '#000080');
		$('.courseBtn2').css('background-color', '#000080');
		$('.courseBtn3').css('background-color', '#000080');
		$('.courseBtn4').css('background-color', '#000080');
		$('.courseBtn5').css('background-color', '#000080');
		$('.courseBtn6').css('background-color', '#000080');
		$('.courseBtn7').css('background-color', '#000080');
		$('.courseBtn8').css('background-color', '#000080');
		$('.courseBtn9').css('background-color', '#000080');
		$('.courseBtn10').css('background-color', '#000080');
	}
});