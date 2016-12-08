var socket = io.connect(location.origin);

var genre = 0;
var url = new Array(3);

var socketCut = 0;
var connection = 0;
var obog = 0;

var urlTransition =["http://localhost:5000/controller/kyujinController.html","http://localhost:5000/controller/mainController.html","http://localhost:5000/secret.html"];

$(function () {
	businessPage();
	
	/*$(window).on('scroll', function() {
    if ($(this).scrollBottom() > 50) {
      $('#footer').addClass('fixed');
    } else {
      $('#footer').removeClass('fixed');
    }
  });*/
	

	$(".busiBtn1").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 1 });
		genre = 1;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
		console.log("busiBtn1");
	});
	$(".busiBtn2").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 2 });
		genre = 2;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	$(".busiBtn3").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 3 });
		genre = 3;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	$(".busiBtn4").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 4 });
		genre = 4;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	$(".busiBtn5").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 5 });
		genre = 5;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	$(".busiBtn6").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 6 });
		genre = 6;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	$(".busiBtn7").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 7 });
		genre = 7;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	$(".busiBtn8").click(function () {
		if(socketCut == 0) {
		socket.emit("businessNumberFromController", { "businessNumber": 8 });
		genre = 8;
		socket.emit("genreFromController", { "genreNumber": genre });
		}
	});
	
	socket.on("businessNumberFromServer", function (data) {
		kyujinPage();
	});
	

	$(".kyujinBtn1").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 1 });
		}
	});
	$(".kyujinBtn2").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 2 });
		}
	});
	$(".kyujinBtn3").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 3 });
		}
	});
	$(".kyujinBtn4").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 4 });
		}
	});
	$(".kyujinBtn5").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 5 });
		}
	});
	$(".kyujinBtn6").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 6 });
		}
	});
	$(".kyujinBtn7").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 7 });
		}
	});
	$(".kyujinBtn8").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 8 });
		}
	});
	$(".kyujinBtn9").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 9 });
		}
	});
	$(".kyujinBtn10").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinNumberFromController", { "kyujinNumber": 10 });
		}
	});
	
	/*$(".secret").click(function () {
		window.open(urlTransition[2]);
	});*/
	
	socket.on("kyujinNumberFromServer", function (data) {
		kyujinDetailPage();
	});
	
	$(".urlBtn").click(function () {
		console.log("urlBtn:"+url[0]);
		if(url[0] != null) {
        window.open(url[0]);
		}
    });
	
	socket.on("urlDetail", function (data) {
        url[0] = data.url2;
    });
	
	socket.on("obogFromServer", function (data) {
        obog = data.obog2;
		console.log(obog);
    });
	
	
	$(".businessReturn").click(function () {<br>
		if(socketCut == 0) {
		document.location.href = urlTransition[1];
		socket.emit("kyujinReturn");
		}
    });
	
	$(".businessRelease").click(function () {
		socket.emit("FlagReset");
		socketCut = 1;
		socket.disconnect();
		//window.location.href = urlTransition[1];
    });
	
	
	/*$(".businessReturn").click(function () {
		document.location.href = urlTransition[1];
		socket.emit("kyujinReturn");
    });*/ 
	
	/*$(".kyujinBeforeReturn").click(function () {
		//$(".business").hide();
		$(".kyujin").show();
		$(".kyujinDetail").hide();
    });*/
	
	$(".kyujinBeforeReturn").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinBefore");
		businessPage();
		}
    });
	
	$(".kyujinReturn").click(function () {
		if(socketCut == 0) {
		window.location.href = urlTransition[1];
		socket.emit("kyujinReturn");
		}
    });
	
	$(".kyujinRelease").click(function () {
		socket.emit("FlagReset");
		socketCut = 1;
		socket.disconnect();
		//window.location.href = urlTransition[1];
    });
	
	
	
	$(".kyujinBeforeReturn2").click(function () {
		if(socketCut == 0) {
		socket.emit("kyujinBefore2");
		kyujinPage();
		}
    });
	
	$(".kyujinReturn2").click(function () {
		if(socketCut == 0) {
		document.location.href = urlTransition[1];
		socket.emit("kyujinReturn");
		}
    });
	
	$(".kyujinRelease2").click(function () {
		socket.emit("FlagReset");
		socketCut = 1;
		socket.disconnect();
		//window.location.href = urlTransition[1];
    });
	
	//一定時間ごとに接続確認
	testTimer = setInterval(function () {
        if (connection == 0) {
			socket.emit("ConnectCheck");
			alert("繋がってますか？");
            socket.emit("ConnectNow");
            console.log("connection:"+connection);
        }

    }, 50000000);
	
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
	
	
	
	function businessPage() {
		$(".business").show();
		$(".businessFooter").show();
		$(".kyujin").hide();
		$(".kyujinFooter").hide();
		$(".kyujinDetail").hide();
		$(".kyujinDetailFooter").hide();
	}
	
	function kyujinPage() {
		$(".business").hide();
		$(".businessFooter").hide();
		$(".kyujin").show();
		$(".kyujinFooter").show();
		$(".kyujinDetail").hide();
		$(".kyujinDetailFooter").hide();
	}
	
	function kyujinDetailPage() {
		$(".business").hide();
		$(".businessFooter").hide();
		$(".kyujin").hide();
		$(".kyujinFooter").hide();
		$(".kyujinDetail").show();
		$(".kyujinDetailFooter").show();
		$("#obog").text(obog);
	}
	
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
	
	/*$(".tab").each(function(){
		$(this).nextAll(":not(:first)").hide();
		$(this).children(":first").addClass("select");
	});
	
	$(".tab > li").click(function(){
		var ul = $(this).parent();
		var index = ul.children().index(this);
		ul.children().removeClass("select");
		ul.children(":eq(" + index + ")").addClass("select");
		ul.nextAll().hide();
		ul.nextAll(":eq(" + index + ")").show();
		$(".tab2").attr('src', '/picture/career.png');
	});
	//$(".tab2").attr('src', '/picture/career.png');*/
});