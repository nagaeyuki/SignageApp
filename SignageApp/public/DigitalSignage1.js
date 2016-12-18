var socket = io.connect(location.origin);
$(function () {
    /*socket.on("through", function (data) {
        document.location.href = "http://localhost:80/approach.html";    });

    socket.on("stop", function (data) {
        document.location.href = "http://localhost:80/DigitalSignage2.html";    });*/

});

function getCSV(ulId) {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "csv/event2.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function() {
        convertCSVtoArray(req.responseText,ulId); // 渡されるのは読み込んだCSVデータ
    };
}


// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str,ulId) { // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
        list_view(result,ulId);
}

function list_view(result, ulId) {
    if (ulId == ul1) {
        var ul = document.getElementById('ul1');
    } else {
        var ul = document.getElementById('ul2');
    }
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
  switch_view(ulId);
}

function switch_view(ulId){
    if (ulId == ul1) {
        var $setElm = $('#viewer1');
    } else {
        var $setElm = $('#viewer2');
    }
    
    var fadeSpeed = 1500,
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






var frame = 45;
var min = 80;
var max = 300;
var move = 40;
var flag = false;
var count = 0;
var listX = [0, 1, 2, 3, 4, 5];
for (var y = 0; y < listX.length; y++) {
    listX[y] = [];
}
var listZ = [0, 1, 2, 3, 4, 5];
for (var y = 0; y < listZ.length; y++) {
    listZ[y] = [];
}
var bodyNumber = 0;
var sum = 0;
var averageList = [0, 1, 2, 3, 4, 5];
for (var y = 0; y < averageList.length; y++) {
    averageList[y] = [];
}
var averageList2 = [];
var targetNumber;
var recognition = "";

socket.on('bodyFrame', function (bodyFrame) {
   
    var index = 0;
    var bodyNumberList = [];

    bodyFrame.bodies.forEach(function (body) {
        if (body.tracked) {
            for (var jointType in body.joints) {
                var joint = body.joints[jointType];
                
            }
            flag = true;
            bodyNumber = body.bodyIndex;

            if (bodyNumberList.indexOf(bodyNumber) == -1) {
                bodyNumberList.push(bodyNumber);
            }

            var SpineMidZ = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].cameraZ * 100);
            var SpineMidX = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].cameraX * 100);

            
            listZ[bodyNumber].push(SpineMidZ);
            listX[bodyNumber].push(SpineMidX);

            if (targetNumber != null && listZ[targetNumber].length == frame) {          
                //kinectからの距離がmin,maxの範囲内
                if (min < SpineMidZ && SpineMidZ < max) {
                    //立ち止まっているなら
                    if (Math.abs(listZ[targetNumber][0] - listZ[targetNumber][frame - 1]) < move) {
                        if ($("#zone2").is(':hidden')) {
                            $.when(setZone2Contents());
                        }
                    } else {
                        //min,maxの範囲内だが動いている時
                        for (var i = 4; i < frame; i += 4) {
                            if (listZ[targetNumber][0] < listZ[targetNumber][i]) {
                                count++;
                            }
                        }
                        if (count > 5) {
                            //approach.innerHTML = "leave";
                            

                        } else {
                            //approach.innerHTML = "approach";
                           

                        }
                    }
                    //min,maxの範囲外の場合
                } else {
                    if ($("#zone1").is(':hidden')) {
                        $.when(setZone1Contents());
                    }
                }
                listZ[targetNumber].shift();
                listX[targetNumber].shift();
            }
            if (listZ[bodyNumber].length == frame) {
                listZ[bodyNumber].shift();
                listX[bodyNumber].shift();
            }
           
            index++;
        }
        count = 0;
    });
    //ここから下は配列の長さが44になっている
    

    

    for (var i = 0; i < bodyNumberList.length; i++) {
        for (var j = 0; j < listZ[bodyNumberList[i]].length; j++) {
            sum += listZ[bodyNumberList[i]][j];
        }
        averageList[bodyNumberList[i]] = Math.floor(sum / listZ[bodyNumberList[i]].length);
        sum = 0;
    }

    for (var i = 0; i < listZ.length; i++) {
        if (bodyNumberList.indexOf(i) == -1) {
            averageList[i] = [];
            listZ[i] = [];
        } else {
            averageList2.push(averageList[i]);
        }
    }
    var minimum = Math.min.apply(null, averageList2);
    for (var i = 0; i < averageList.length; i++) {
        if (minimum == averageList[i]) {
            targetNumber = i;
           
        }
    }

   
    averageList2 = [];

});


setInterval(function () {
    if (flag) {
        flag = false;

    } else {
        for (var i = 0; i < 6; i++) {
            listZ[i] = [];
            listX[i] = [];
            targetNumber = null;
            if ($("#zone1").is(':hidden')) {
                $.when(setZone1Contents());
            }
        }
    }
}, 1000);

function setZone1Contents() {
    $("#zone1").fadeIn(1000);
    $("#zone2").fadeOut(300);
    getCSV(ul1);
    
}

function setZone2Contents() {
    $("#zone2").fadeIn(1000);
    $("#zone1").fadeOut(300);
    getCSV(ul2);
}