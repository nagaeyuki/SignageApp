
var socket = io.connect(location.origin);
$(function () {

    socket.on("inai", function (data) {
        console.log("test");
        document.location.href = "http://localhost:80/DigitalSignage1.html";    });

    socket.on("ConnectClear", function (data) {
        document.location.href = "http://localhost:80/signage/pairingSignage.html";    });
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
    var ul=document.getElementById('ul');
    ul.innerHTML="";
    var li = "";
    for (var i = 1; i < result.length - 1; i++) {
      li="<li>"
        for (var j = 0; j < result[i].length; j++) {
            li +=result[i][j]+"<br>";
        }
        li +="</li>";
        ul.innerHTML+=li;
        li = "";
    }
  switch_view();
}

function switch_view() {
   

    var $setElm = $('#viewer'),
    fadeSpeed = 1500,
    switchDelay = 7000;
    $setElm.each(function(){
        var targetObj = $(this);
        var findUl = targetObj.find('ul');
        var findLi = targetObj.find('li');
        var findLiFirst = targetObj.find('li:first');
        findLi.css({display:'block',opacity:'0',zIndex:'99'});
        findLiFirst.css({zIndex:'100'}).stop().animate({opacity:'1'},fadeSpeed);
        setInterval(function(){
            findUl.find('li:first-child').animate({opacity:'0'},fadeSpeed).next('li').css({zIndex:'100'}).animate({opacity:'1'},fadeSpeed).end().appendTo(findUl).css({zIndex:'99'});
        },switchDelay);
    });
}
