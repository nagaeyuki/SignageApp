var socket = io.connect(location.origin);

var roomID;
var flag;
var test = 1;
var test2 = 1;
var testTimer;
var testTimer2;

var socketCut = 0;
var connection = 0;

var urlTransition = ["http://192.168.53.41:80/controller/mainController.html"];

$(function () {    
    
    if (window.confirm("ペアリングページに移動します")) {
        socket.emit("ConnectStart");
    } else {
        history.back();
    }
    
    // ボタンクリック
    $(".pairingButton").click(function () {
        test = 2;
        //roomID = $("#roomID").val();
        //$(this).text((new Date()).toLocaleString());
        //alert(roomID);
        
        console.log(test);
        roomID = $("#roomID").val();
        //startPairing();
		socket.emit("pairingFromController", { "roomID": roomID });
        console.log(roomID);
        //alert(roomID);

    });
    
    
    socket.on("pairingFailure", function (data) {
        test = 1;
        
        console.log("pairingFailure:"+ test);
	
	//alert("ペアリングコードが違います");
	
    });
    
    
    // ペアリングに成功
    socket.on("pairingCompletion", function (data) {
		
        console.log(test);
		console.log("connection:" + connection);
        
        if (test == 2) {
			window.location.href = urlTransition[0];
        }
    });
    
    
    //一定時間ごとに接続確認
	testTimer = setInterval(function () {
        if (connection == 0) {
			socket.emit("ConnectCheck");
			alert("繋がってますか？");
            socket.emit("ConnectNow");
            console.log("connection:"+connection);
        }

    }, 30000);
	
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
});
