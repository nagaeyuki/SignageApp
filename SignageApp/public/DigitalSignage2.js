//var roomID = Math.floor(Math.random() * 10000);
var roomID = 2650;
var socket = io.connect(location.origin);
var number = 0;

var test = 1;
var connect = 1;
var test2 = 1;

var connect = 1;
var check = 1;


var urlTransition = ["https://iothis.aitech.ac.jp/signage/mainSignage.html", "https://iothis.aitech.ac.jp/DigitalSignage1.html", "https://iothis.aitech.ac.jp/DigitalSignage2.html"];

// roomIDに入室
socket.emit("pairingFromSignage", {
    "roomID": roomID
});

var max = 0;

$(function() {

    socket.on("none", function(data) {
        window.location.href = urlTransition[1];
    });

    // var distance = 0;
    // socket.on("move", function (data) {
    //     if (distance == 100){
    //         window.location.href = urlTransition[1];
    //     }
    //
    // });
    socket.on("max", function(data) {
        max = data;
    });
    socket.on("distancedata", function(data) {
        if (data > max) {
            window.location.href=urlTransition[1];
        }
        console.log(data);
    });

    socket.on("ConnectClear", function(data) {
        window.location.href = urlTransition[0];

    });

    //roomID = $("#roomID").val();
    //var roomID = 1234;
    //
    console.log("1234");


    var elem = document.getElementById("pairingCode");
    elem.textContent += roomID;


    // サーバーからpairingSuccessというデータを受信
    socket.on("pairingSuccess", function(data) {
        loginSuccessHandler();
        test = 2;
        console.log(test);
    });

    socket.on("pairingFault", function(data) {

        if (test != 2) {
            socket.emit("pairingFaultFromSignage");
            console.log(test);
        }
    });

    socket.on("Restart", function(dataFromServer) {
        window.location.href = urlTransition[2];
    });

    //接続解除命令が来た時
    socket.on("ConnectCut", function(data) {
        if (connect == 1) {
            socket.emit("EndConnect");
            window.location.href = urlTransition[1];
            console.log("miss");
        }

        if (check = 2) {
            connect = 1;
            check = 1;
        } else {
            connect = 2;
            check = 2;
        }
    });

    //ユーザが反応して接続解除をやめさせる時
    socket.on("DontStop", function(data) {
        connect = 2;
    });

    function loginSuccessHandler() {
        //ペアリング完了した時の処理
        socket.emit("pairingSuccessFromSignage");
        //console.log(number);
        //テストページに遷移
        window.location.href = urlTransition[0];
        console.log("ペアリング完了しました");
        //console.log(roomID);
        //number = 1;
    }
});

function getCSV() {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "/csv/event2.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function() {
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    };
}


// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
    list_view(result);
}

function list_view(result) {
    var ul = document.getElementById('ul');
    ul.innerHTML = "";
    var li = "";
    for (var i = 1; i < result.length - 1; i++) {
        li = "<li>"
        for (var j = 0; j < result[i].length; j++) {
            li += result[i][j] + "<br>";
        }
        li += "</li>";
        ul.innerHTML += li;
        li = "";
    }
    switch_view();
}

function switch_view() {
    var $setElm = $('#viewer'),
        fadeSpeed = 1500,
        switchDelay = 7000;
    $setElm.each(function() {
        var targetObj = $(this);
        var findUl = targetObj.find('ul');
        var findLi = targetObj.find('li');
        var findLiFirst = targetObj.find('li:first');
        findLi.css({
            display: 'block',
            opacity: '0',
            zIndex: '99'
        });
        findLiFirst.css({
            zIndex: '100'
        }).stop().animate({
            opacity: '1'
        }, fadeSpeed);
        setInterval(function() {
            findUl.find('li:first-child').animate({
                opacity: '0'
            }, fadeSpeed).next('li').css({
                zIndex: '100'
            }).animate({
                opacity: '1'
            }, fadeSpeed).end().appendTo(findUl).css({
                zIndex: '99'
            });
        }, switchDelay);
    });
}
