﻿var Kinect2 = require('../lib/kinect2'), //change to 'kinect2' in a project of your own
    //express.HTTPServer のインスタンスを生成するには createServer() メソッドを呼び出すだけです
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    zlib = require('zlib');
var kinect = new Kinect2();

// httpモジュールの読み込み
var http = require("http");
// fsモジュールの読み込み
var fs = require("fs");
// pathモジュールの読み込み
var path = require("path");
// httpサーバーを立てる
//var server = http.createServer(requestListener);
// httpサーバーを起動する。
//server.listen((process.env.PORT || 8000), function () {
//console.log((process.env.PORT || 8000) + "でサーバーが起動しました");
//});
// socket.ioの読み込み
//var socketIO = require("socket.io");
// サーバーでSocket.IOを使える状態にする
//var io = socketIO.listen(server);


//require('http').createServer(requestListener);
var port = 80;
server.listen(port);

if (kinect.open()) {

    console.log('Server listening on port' + port);
    console.log('Point your browser to http://localhost:' + port);

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



eddystone = require('eddystone-beacon');
eddystone.advertiseUrl('http://goo.gl/1DwQAB');

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

    socket.on("kyujinSelect", function (data) {
        clickNum = data.clickNum;
        console.log(clickNum);
        io.sockets.emit("kyujinSelectFromServer", { "selectNum": clickNum });
    });

    socket.on("dateCalendar", function (data) {
        date = data.dateText;
        console.log(date);
        io.sockets.emit("dateCalendarFromServer", { "dateNum": date });
    });

    socket.on("ChangeMonth", function (data) {
        month = data.monthText;
        console.log("date");
        io.sockets.emit("ChangeMonthFromServer", { "monthNum": month });
    });


    //コントローラーに接続されたとき
    socket.on("ConnectStart", function (data) {
        io.sockets.emit("ConnectClear");
        console.log("ConnectStart");
    });

    //コントローラーに接続されなかったとき
	/*socket.on("ConnectCancel", function (data) {
        io.sockets.emit("ConnectFailed");
        console.log("ConnectCancel");
    });*/

    //pairingSignageからのpairingFromSignageというデータを受信（サイネージのペアリング）
    socket.on("pairingFromSignage", function (data) {
        roomID = data.roomID;
        socket.join(roomID);
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

    //courseControllerからのcourseNumberFromControllerというデータを受信
    socket.on("courseNumberFromController", function (data) {
        courseNumber = data.courseNumber;
        console.log("courseNumber:" + courseNumber);
        io.sockets.emit("courseNumberFromServer", { "courseNum": courseNumber });
    });

	/*//courseSignageからのcourseDetailFromSignageというデータを受信
	socket.on("courseDetailFromSignage", function (data) {
		courseDetail = data.courseDetail;
		console.log("courseDetail:" + courseDetail);
        io.sockets.emit("courseDetailFromServer",{"courseDetail" : courseDetail });
    });*/

    //mainControllerからのbusinessStartFromControllerというデータを受信
    socket.on("businessStartFromController", function (data) {
        io.sockets.emit("businessStartFromServer");
    });

    //kyujinControllerからのbusinessNumberFromControllerというデータを受信
    socket.on("businessNumberFromController", function (data) {
        businessNumber = data.businessNumber;
        console.log("businessNumber:" + businessNumber);
        io.sockets.emit("businessNumberFromServer", { "businessNum": businessNumber });
    });

    //mainControllerからのkyujinStartFromControllerというデータを受信
    socket.on("kyujinStartFromController", function (data) {
        io.sockets.emit("kyujinStartFromServer");
    });

    //kyujinControllerからのkyujinNumberFromControllerというデータを受信
    socket.on("kyujinNumberFromController", function (data) {
        kyujinNumber = data.kyujinNumber;
        console.log("kyujinNumber:" + kyujinNumber);
        io.sockets.emit("kyujinNumberFromServer", { "kyujinNum": kyujinNumber });
    });

    //kyujinControllerからのobogFromControllerというデータを受信
    socket.on("obogFromController", function (data) {
        io.sockets.emit("obogFromServer");
    });

    //kyujinControllerからのgenreFromControllerというデータを受信
    socket.on("genreFromController", function (data) {
        genre = data.genreNumber;
        console.log("genreNumber:" + genre);
        io.sockets.emit("genreFromServer", { "genreNum": genre });
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
        console.log("ConnectNow");
    });

    //一定時間ごとに接続解除命令
    socket.on("ConnectCheck", function (data) {
        console.log("ConnectCheck");
        setTimeout(function () {
            io.sockets.emit("ConnectCut");
        }, 5000);
    });

    socket.on("ConfirmTest2", function (data) {
        console.log("ConfirmTest2");
        setTimeout(function () {
            io.sockets.emit("ConnectCut2");
        }, 5000);
    });

    socket.on("FlagReset", function (data) {
        console.log("flag");
        io.sockets.emit("Restart");
        //io.sockets.emit("ConnectEnd3");
    });

    socket.on("EndConnect", function (data) {
        io.sockets.emit("ConnectEnd");
        console.log("ConnectEnd");
    });

    socket.on("EndConnect2", function (data) {
        io.sockets.emit("ConnectEnd2");
        console.log("ConnectEnd2");
    });


    socket.on("stop", function (data) {
            io.sockets.emit("stop");
    });
    socket.on("none", function (data) {
        io.sockets.emit("none");
    });

    socket.on("through", function (data) {
        io.sockets.emit("through");
        
    });

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
