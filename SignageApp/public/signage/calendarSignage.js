var socket = io.connect(location.origin);

var dates = 0;
var month = 0;
var num=0;
var number = 0;

var connect = 1;
var check = 1;
var urlTransition = ["https://192.168.53.41:443/signage/mainSignage.html", "https://192.168.53.41:443/DigitalSignage2.html"];

$(function() {

	//CSVファイルを読み込む関数getCSV()の定義
    function getCSV(){
        var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
        req.open("get", "../csv/courseData2016.csv", true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行

        // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
        req.onload = function(){
    	convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
        }
    }

    // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
    function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
        var result = []; // 最終的な二次元配列を入れるための配列
        var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            result[i] = tmp[i].split(',');
        }
        
        for (var i = 1; i <= 33; i++) {
            $("#season" + i).text(result[i][4]);
            $("#courseName" + i).text(result[i][3]);
            $("#courseName" + i).addClass("name");
            $("#place" + i).text(result[i][5]);
            $("#time" + i).text(result[i][6]);
        }

        $('p').addClass("chara");
        

    }

	console.log("できてます");
    getCSV(); //最初に実行される

	

	console.log("start");
	socket.on("dateCalendarFromServer", function (data) {
		dates = data.dateNum;
		
        var target = "#season" + dates;
        console.log(target);
  var th = $(target).position();
  var sh = $(".scroll").scrollTop();
  var pos = th.top + sh + 1;
  $(".scroll").animate({
    scrollTop: pos
  },"slow", "swing");


	});
	
	var pos = $("#c4").position();
$(".scroll").scrollTop(pos.top + 1);

	socket.on("ChangeMonthFromServer", function (data) {
		month = data.monthNum;
		var target = "#c" + month;
  var th = $(target).position();
  var sh = $(".scroll").scrollTop();
  var pos = th.top + sh + 1;
  $(".scroll").animate({
    scrollTop: pos
  },"slow", "swing");
		console.log(month);
		});
    
    socket.on("ReturnFromServer", function (data) {
        window.location.href = urlTransition[0];        console.log("Restart");    });
    
    socket.on("Restart", function (data) {
        window.location.href = urlTransition[1];        console.log("mainRestart");    });    //接続解除命令が来た時    socket.on("ConnectStop", function (data) {        window.location.href = urlTransition[1];    });
	    
        moveArrow2();

        function moveArrow2() {
            $("#arrow")
                .animate({
                    'margin-left': '-30px',
                }, 2000)
                .animate({
                    opacity: 0
                }, 500)
                .animate({
                    'margin-left': '20px',
                    opacity: 1
                }, 0);
            setTimeout(moveArrow2, 1500); //アニメーションを繰り返す間隔
        }
  });