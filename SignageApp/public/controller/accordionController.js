var socket = io.connect(location.origin);

var company = new Array(80);
var obog = new Array(80);
var url = new Array(80);
var num = 0;

var socketCut = 0;

var urlTransition = ["http://192.168.53.41:80/controller/mainController.html"];


$(function () {
    
    
    
    //CSVファイルを読み込む関数getCSV()の定義
    function getCSV() {
        var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
        req.open("get", "../csv/kyujinTest.csv", true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行
        
        // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
        req.onload = function () {
            convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
        }
    }
    
    // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
    function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
        var result = []; // 最終的な二次元配列を入れるための配列
        var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
        
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for (var i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(',');
        }
        
        for (var i = 1; i <= 80; i++) {
            
            $(".company" + i).text(result[i][1]);
            $(".company" + i).hide();
            company[i - 1] = result[i][1];
            obog[i - 1] = result[i][8];
            url[i - 1] = result[i][7];
            console.log(obog[i - 1]);
		}
    }

	console.log("できてます");
    getCSV(); //最初に実行される

	
	
	
	$("dl dt").click(function () {
		$(this).nextUntil("dt", "dd").slideToggle();
		$(this).nextUntil("dd").siblings("dd").slideUp();
		$(this).toggleClass("open");    
		$(this).siblings("dt").removeClass("open");
    });
			
	$("#business1").click(function () {
		 console.log("親要素");
	});
    

    $("dd").click(function () {
        var clickNum = $(this).data("n");
        //socketでおくる
        socket.emit("kyujinSelect", { "clickNum": clickNum });
        $(".company").text(company[clickNum - 1]);
        $(".number").text('OB・OG数：' + obog[clickNum - 1]);
        num = clickNum;
        console.log(clickNum);
    });

    $(".url").click(function () {
        window.open(url[num-1]);
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

    $(".Return").click(function () {
        if (socketCut == 0) {
            window.location.href = urlTransition[0];
            socket.emit("ReturnFromController");
        }
    });
    
    $(".Release").click(function () {
        if (socketCut == 0) {
            socket.emit("FlagReset");
            socketCut = 1;
            socket.disconnect();
        }
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