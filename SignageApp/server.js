﻿var Kinect2 = require('../lib/kinect2'), //change to 'kinect2' in a project of your own
    //express.HTTPServer のインスタンスを生成するには createServer() メソッドを呼び出すだけです
    express = require('express'),
    app = express(),
    //server = require('http').createServer(app),
    //io = require('socket.io').listen(server),
    zlib = require('zlib');
var kinect = new Kinect2();

// httpモジュールの読み込み
var http = require("http");
// fsモジュールの読み込み
var fs = require("fs");
// pathモジュールの読み込み
var path = require("path");

var server = http.Server(app);

// socket.ioの読み込み
var socketIO = require("socket.io");
// サーバーでSocket.IOを使える状態にする
var io = socketIO.listen(server);
server.listen(80);
var http_port = 80;

if (kinect.open()) {
  console.log('Server listening on port' + http_port);
  console.log('Point your browser to http://localhost:' + http_port);

    //depth
    app.use(express.static(__dirname + '/public'));

    var compressing = false;
    kinect.on('depthFrame', function (data) {
        //compress the depth data using zlib
        if (!compressing) {
            compressing = true;
            zlib.deflate(data, function (err, result) {
                if (!err) {
                    var buffer = result.toString('base64');
                    io.sockets.sockets.forEach(function (socket) {
                        socket.volatile.emit('depthFrame', buffer);
                    });
                }
                compressing = false;
            });
        }
    });
    kinect.openDepthReader();
    kinect.openBodyReader();
}

//skeleton
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//skeleton
app.get('/c/', function (req, res) {
    res.sendFile(__dirname + '/c/index.html');
});

kinect.on('bodyFrame', function (bodyFrame) {
    io.sockets.emit('bodyFrame', bodyFrame);
});

var flag = 0;
/**
 * サーバーにリクエストがあった際に実行される関数
 */
function requestListener(request, response) {

    var requestURL = request.url;
    // リクエストのあったファイルの拡張子を取得
    // リクエストがあったファイル
    var extensionName = path.extname(requestURL);
    // ファイルの拡張子に応じてルーティング処理
    switch (extensionName) {
        case ".html":
            readFileHandler(requestURL, "text/html", false, response);
            break;
        case ".css":
            readFileHandler(requestURL, "text/css", false, response);
            break;
        case ".js":
        case ".ts":
            readFileHandler(requestURL, "text/javascript", false, response);
            break;
        case ".png":
            readFileHandler(requestURL, "image/png", true, response);
            break;
        case ".jpg":
            readFileHandler(requestURL, "image/jpeg", true, response);
            break;
        case ".gif":
            readFileHandler(requestURL, "image/gif", true, response);
            break;

        default:
            // どこにも該当しない場合は、controller.htmlを読み込む
            readFileHandler("controller.html", "text/html", false, response);

            break;
    }
}


/**
 * ファイルの読み込み
 */
function readFileHandler(fileName, contentType, isBinary, response) {
    // エンコードの設定
    var encoding = !isBinary ? "utf8" : "binary";
    var filePath = __dirname + "public" + fileName;

    fs.exists(filePath, function (exits) {
        if (exits) {
            fs.readFile(filePath, { encoding: encoding }, function (error, data) {
                if (error) {
                    response.statusCode = 500;
                    response.end("Internal Server Error");
                } else {
                    response.statusCode = 200;
                    response.setHeader("Content-Type", contentType);
                    if (!isBinary) {
                        response.end(data);
                    }
                    else {
                        response.end(data, "binary");
                    }
                }
            });
        }
        else {
            // ファイルが存在しない場合は400エラーを返す。
            response.statusCode = 400;
            response.end("400 Error");
        }
    });
}




var testTimer;
var cutTimer;
var time_limit = 30 * 1000;
var cut_limit = 10 * 1000;


function loop() {
    //console.log("testNumber:" + testNumber);
    console.log("ConnectCut");
    io.sockets.emit("ConnectCheck");
    cutTimer = setTimeout(stop, cut_limit);

}

function stop() {
    clearInterval(testTimer);
    io.sockets.emit("ConnectStop");
    console.log("stop");
}

// サーバーへのアクセスを監視。アクセスがあったらコールバックが実行
io.sockets.on("connection", function (socket) {
  var roomID;
    var flag = 0;
    var test = 0;
    var url = "";
    var secret = 0;
    var courseNumber = 0;
    //var courseDetail = 0;
    var businessNumber = 0;
    var kyujinNumber = 0;
    var faqNumber = 0;
    var obog = 0;
    var date = 0;
    var month = 0;
    var clickNum = 0;
    var socketID;

    socket.on("IpAddress", function () {
        var os = require('os');
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                console.log(ifname, iface.address);
                io.sockets.emit("IpAddress", iface.address);

            });
        });
    });

    socket.on("kyujinSelect", function (data) {
        clickNum = data.clickNum;
        console.log(clickNum);
        io.sockets.emit("kyujinSelectFromServer", { "selectNum": clickNum });
    });

    socket.on("dateCalendar", function (data) {
        //date = data.dateText;
        console.log(data);
        io.sockets.emit("dateCalendarFromServer", { "dateNum": data });
    });

    socket.on("ChangeMonth", function (data) {
        month = data.monthText;
        console.log("date");
        io.sockets.emit("ChangeMonthFromServer", { "monthNum": month });
    });


    //コントローラーに接続されたとき
    socket.on("ConnectStart", function (data) {
        io.sockets.emit("ConnectClear");
        testTimer = setInterval(loop, time_limit);
        console.log("ConnectStart");
    });

    //pairingSignageからのpairingFromSignageというデータを受信（サイネージのペアリング）
    socket.on("pairingFromSignage", function (data) {
        roomID = data.roomID;
        socketID = socket.id;
        socket.join(roomID);
        console.log(data);
    });

    //pairingControllerからのpairingFromControllerというデータを受信（コントローラーのペアリングイベント）
    socket.on("pairingFromController", function (data) {
        roomID = data.roomID;
        console.log(roomID);
        socket.join(roomID);
        //ルームIDがroomIDのグループにpairingSuccessというデータを送信
        io.sockets.to(roomID).emit("pairingSuccess");
        io.sockets.emit("pairingFault");
    });

    //pairingSignageからのpairingFaultFromSignageというデータを受信
    socket.on("pairingFaultFromSignage", function (data) {
        io.sockets.emit("pairingFailure");
    });

    //pairingSignageからのpairingSuccessFromSignageというデータを受信
    socket.on("pairingSuccessFromSignage", function (data) {
        io.sockets.emit("pairingCompletion");
    });

    //mainControllerからのcourseStartFromControllerというデータを受信
    socket.on("courseStartFromController", function (data) {
        io.sockets.emit("courseStartFromServer");
    });

    //mainControllerからのkyujinStartFromControllerというデータを受信
    socket.on("kyujinStartFromController", function (data) {
        io.sockets.emit("kyujinStartFromServer");
    });

    //mainControllerからのfaqStartFromControllerというデータを受信
    socket.on("faqStartFromController", function (data) {
        io.sockets.emit("faqStartFromServer");
    });

    //faqControllerからのfaqNumberFromControllerというデータを受信
    socket.on("faqNumberFromController", function (data) {
        faqNumber = data.faqNumber;
        console.log("faqNumber:" + faqNumber);
        io.sockets.emit("faqNumberFromServer", { "faqNum": faqNumber });
    });


    socket.on("ReturnFromController", function (data) {
        console.log("return");
        io.sockets.emit("ReturnFromServer");
    });

    socket.on("ReleaseFromController", function (data) {
        console.log("return");
        io.sockets.emit("ReleaseFromServer");
    });

    //ユーザが反応したら接続解除をやめさせる
    socket.on("ConnectNow", function (data) {
        io.sockets.emit("DontStop");
        clearInterval(testTimer);
        testTimer = setInterval(loop, time_limit);
        console.log("ConnectNow");
    });

    //一定時間ごとに接続解除命令
    socket.on("ConnectContinue", function (data) {
        console.log("ConnectContinue");
        clearTimeout(cutTimer);
        //testTimer = setInterval(loop, time_limit);
    });

    socket.on("FlagReset", function (data) {
        console.log("flag");
        io.sockets.emit("Restart");
    });



    socket.on("stop", function () {
        io.sockets.emit("stop");
    });
    socket.on("none", function () {
        io.sockets.emit("none");
    });
    socket.on("move", function () {
        io.sockets.emit("move");
    });

    socket.on("distance", function (distance) {
        io.sockets.emit("distance", distance);
    });

    socket.on("distancedata", function (distancedata) {
        io.sockets.emit("distancedata", distancedata);
    });
    socket.on("max", function (max) {
        io.sockets.emit("max", max);
    });
    socket.on("min", function (min) {
        io.sockets.emit("min", min);
    });
    // socket.on("middle", function (data) {
    //     io.sockets.emit("middle", data);
    // });
    socket.on("shortenurl", function(shortenurl){
      eddystone = require('eddystone-beacon');
      eddystone.advertiseUrl(shortenurl);
    })

});
// 接続エラー
io.sockets.on("connect_error", function (socket) {
    console.log("connect_error");
});
// 接続終了
io.sockets.on("disconnect", function (socket) {
    socket.emit("disconnectEvent");
    console.log("disconnecth");
});


//eddystone.advertiseUrl('https://goo.gl/KX8qQZ');
//eddystone.advertiseUrl('https://goo.gl/5h09Zz');
//eddystone.advertiseUrl('https://v.gd/erfQ03');//クッションページを送信
