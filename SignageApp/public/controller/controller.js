var socket = io.connect(location.origin);

var company = new Array(80);
var obog = new Array(80);
var url = new Array(80);
var num = 0;

var roomID;
var flag;
var test = 1;
var test2 = 1;
var testTimer;
var testTimer2;

var socketCut = 0;
var connection = 0;

var urlTransition = ["http://192.168.53.41:80/controller/mainController.html"];

var forClass4 = ['2016-05-16', '2016-05-17', '2016-05-18', '2016-05-19', '2016-05-20', '2016-05-21', '2016-06-24', '2016-07-12', '2016-07-13', '2016-07-15', '2016-07-16'];
var forClass3 = ['2016-04-11', '2016-04-13', '2016-04-14', '2016-04-15', '2016-04-18', '2016-04-21', '2016-04-22', '2016-04-25', '2016-06-07', '2016-06-08', '2016-06-10', '2016-06-13', '2016-06-20', '2016-06-21', '2016-06-30', '2016-07-01', '2016-07-04', '2016-07-08', '2016-07-19', '2016-08-03', '2016-08-04', '2016-08-06', '2016-10-17', '2016-10-18', '2016-10-20', '2016-10-21', '2016-11-15', '2016-11-16', '2016-11-29', '2016-11-30', '2016-12-01', '2016-12-12', '2016-12-13', '2016-12-15', '2016-12-19', '2016-12-20', '2017-01-17', '2017-01-21', '2017-02-09', '2017-02-10', '2017-02-13', '2017-02-14', '2017-02-16', '2017-02-17', '2017-02-21', '2017-02-22', '2017-02-23', '2017-02-24', '2017-03-01', '2017-03-02', '2017-03-04', '2017-03-09', '2017-03-10', '2017-03-14', '2017-03-17', '2017-03-21', '2017-03-22', '2017-03-23', '2017-03-24'];
var forClassW = ['2016-07-11', '2016-07-14'];
var check = 0;


$(function () {
    
    pairingSet();
    getCSV();
    
    if (window.confirm("ペアリングページに移動します")) {
        socket.emit("ConnectStart");
    } else {
        history.back();
    }
    
    $(".mainRelease").click(function () {
        if (socketCut == 0) {
            console.log("1111");
            socket.emit("FlagReset");
            socketCut = 1;
        //socket.disconnect();
        }
    });
    
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
        window.open(url[num - 1]);
    });


    // ボタンクリック
    $(".pairingButton").click(function () {
        test = 2;
        
        console.log(test);
        roomID = $("#roomID").val();
        socket.emit("pairingFromController", { "roomID": roomID });
        console.log(roomID);
    });
    
    
    socket.on("pairingFailure", function (data) {
        test = 1;
        console.log("pairingFailure:" + test);
    });
    
    
    // ペアリングに成功
    socket.on("pairingCompletion", function (data) {
        console.log(test);
        console.log("connection:" + connection);
        if (test == 2) {
            mainSet();
        }
    });
    

    $(".menuBtn1").click(function () {
        //course();
        //document.location.href = url[0];
        if (socketCut == 0) {
            socket.emit("courseStartFromController");
            calendarSet();
        }
    });
    $(".menuBtn2").click(function () {
        //course();
        if (socketCut == 0) {
            socket.emit("kyujinStartFromController");
            accordionSet();
        }
    });
    $(".menuBtn3").click(function () {
        //course();
        if (socketCut == 0) {
            socket.emit("faqStartFromController");
            faqSet();
        }
    });

    $.datepicker.setDefaults($.datepicker.regional[ "ja" ]);

    $('#datepicker').datepicker({
                       // 土日祝日色変更
        beforeShowDay: function (date) {
            for (var i = 0; i < forClass4.length; i++) {
                var for4 = new Date();
                for4.setTime(Date.parse(forClass4[i]));   // 祝日を日付型に変換
                
                if (for4.getYear() == date.getYear() &&  // 祝日の判定
				for4.getMonth() == date.getMonth() &&
				for4.getDate() == date.getDate()) {
                    return [true, 'class-event4', '4年'];
                }
            }
            
            for (var i = 0; i < forClass3.length; i++) {
                var for3 = new Date();
                for3.setTime(Date.parse(forClass3[i]));   // 祝日を日付型に変換
                
                if (for3.getYear() == date.getYear() &&  // 祝日の判定
				for3.getMonth() == date.getMonth() &&
				for3.getDate() == date.getDate()) {
                    return [true, 'class-event3', '3年'];
                }
            }
            
            for (var i = 0; i < forClassW.length; i++) {
                var forW = new Date();
                forW.setTime(Date.parse(forClassW[i]));   // 祝日を日付型に変換
                
                if (forW.getYear() == date.getYear() &&  // 祝日の判定
				forW.getMonth() == date.getMonth() &&
				forW.getDate() == date.getDate()) {
                    return [true, 'class-eventW', '両方'];
                }
            }
            
            if (date.getDay() == 0) {                     // 日曜日
                return [false, 'class-sunday', '日曜日'];
            } else if (date.getDay() == 6) {              // 土曜日
                return [false, 'class-saturday', '土曜日'];
            } else {                                      // 平日
                return [false, 'class-weekday', '平日'];
            }
        },
        dateFormat: 'yy-mm-dd',
        minDate: new Date(2016, 4 - 1, 1),
        maxDate: new Date(2017, 3 - 1, 31),
        onSelect: function (dateText, inst) {
            //$("#date_val").val(dateText);
            var dates = dateText.split('/');
            var year = parseInt(dates[0]);
            var month = parseInt(dates[1]);
            var day = parseInt(dates[2]);
            console.log(dates);
            console.log(year);
            console.log(month);
            console.log(day);
            
            if (dates == forClass4[0] || dates == forClass4[1] || dates == forClass4[2] || dates == forClass4[3] || dates == forClass4[4]) {
                check = 2;
            } else if (dates == forClass4[5]) {
                check = 3;
            } else if (dates == forClass4[6]) {
                check = 8;
            } else if (dates == forClass4[7] || dates == forClass4[8] || dates == forClass4[9] || dates == forClassW[0] || dates == forClassW[1]) {
                check = 12;
            } else if (dates == forClass4[10]) {
                check = 14;
            } else if (dates == forClass3[0] || dates == forClass3[1] || dates == forClass3[2] || dates == forClass3[3] || dates == forClass3[4] || dates == forClass3[5] || dates == forClass3[6] || dates == forClass3[7]) {
                check = 1;
            } else if (dates == forClass3[8] || dates == forClass3[9]) {
                check = 4;
            } else if (dates == forClass3[10]) {
                check = 5;
            } else if (dates == forClass3[11]) {
                check = 6;
            } else if (dates == forClass3[12] || dates == forClass3[13]) {
                check = 7;
            } else if (dates == forClass3[14]) {
                check = 9;
            } else if (dates == forClass3[15] || dates == forClass3[16]) {
                check = 10;
            } else if (dates == forClass3[17]) {
                check = 11;
            } else if (dates == forClass3[18]) {
                check = 13;
            } else if (dates == forClass3[19] || dates == forClass3[20]) {
                check = 15;
            } else if (dates == forClass3[21]) {
                check = 16;
            } else if (dates == forClass3[22] || dates == forClass3[23] || dates == forClass3[24] || dates == forClass3[25]) {
                check = 17;
            } else if (dates == forClass3[26]) {
                check = 18;
            } else if (dates == forClass3[27]) {
                check = 19;
            } else if (dates == forClass3[28] || dates == forClass3[29]) {
                check = 20;
            } else if (dates == forClass3[30]) {
                check = 21;
            } else if (dates == forClass3[31] || dates == forClass3[32] || dates == forClass3[33]) {
                check = 22;
            } else if (dates == forClass3[34] || dates == forClass3[35]) {
                check = 23;
            } else if (dates == forClass3[36]) {
                check = 24;
            } else if (dates == forClass3[37]) {
                check = 25;
            } else if (dates == forClass3[38] || dates == forClass3[39]) {
                check = 26;
            } else if (dates == forClass3[40] || dates == forClass3[41] || dates == forClass3[42] || dates == forClass3[43]) {
                check = 27;
            } else if (dates == forClass3[44] || dates == forClass3[45]) {
                check = 28;
            } else if (dates == forClass3[46] || dates == forClass3[47]) {
                check = 29;
            } else if (dates == forClass3[48] || dates == forClass3[49] || dates == forClass3[50]) {
                check = 30;
            } else if (dates == forClass3[51] || dates == forClass3[52]) {
                check = 31;
            } else if (dates == forClass3[53] || dates == forClass3[54]) {
                check = 32;
            } else if (dates == forClass3[55] || dates == forClass3[56] || dates == forClass3[57] || dates == forClass3[58]) {
                check = 33;
            } else if (dates == forClass3[53] || dates == forClass3[54]) {
                check = 32;
            }
            
            socket.emit("dateCalendar", { "dateText": check });
        },
        onChangeMonthYear: function (year, month, inst) {
            // その月の休日情報をajaxで取得
            socket.emit("ChangeMonth", { "monthText": month });
            console.log(month);
        }
    })

    
    $(".faqBtn1").click(function () {
        console.log("faq1");
        if (socketCut == 0) {
            socket.emit("faqNumberFromController", { "faqNumber": 1 });
        }
    });
    $(".faqBtn2").click(function () {
        if (socketCut == 0) {
            socket.emit("faqNumberFromController", { "faqNumber": 2 });
        }
    });
    $(".faqBtn3").click(function () {
        if (socketCut == 0) {
            socket.emit("faqNumberFromController", { "faqNumber": 3 });
        }
    });
    

    /*$(".mainRelease").click(function () {
        console.log("1111");
        socket.emit("FlagReset");
        socketCut = 1;
        //socket.disconnect();
		//window.location.href = urlTransition[0];
    });*/
    
    $(".Return").click(function () {
        if (socketCut == 0) {
            mainSet();
            socket.emit("ReturnFromController");
        }
    });
    
    $(".Release").click(function () {
        if (socketCut == 0) {
            socket.emit("ReleaseFromController");
        }
    });
    
    socket.on("ReleaseFromServer", function (data) {
        socket.emit("FlagReset");
        socketCut = 1;
        socket.disconnect();
    });

    //一定時間ごとに接続確認
    testTimer = setInterval(function () {
        if (connection == 0) {
            socket.emit("ConnectCheck");
            alert("繋がってますか？");
            socket.emit("ConnectNow");
            console.log("connection:" + connection);
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
});

function pairingSet() {
    $(".pairingController").show();
    $(".mainController").hide();
    $(".mainRelease").show();
    $("#datepicker").hide();
    $(".accordionController").hide();
    $(".faqController").hide();
    $(".Reset").hide();
}

function mainSet() {
    $(".pairingController").hide();
    $(".mainController").show();
    $(".mainRelease").show();
    $("#datepicker").hide();
    $(".accordionController").hide();
    $(".faqController").hide();
    $(".Reset").hide();
}

function calendarSet() {
    $(".pairingController").hide();
    $(".mainController").hide();
    $(".mainRelease").hide();
    $("#datepicker").show();
    $(".accordionController").hide();
    $(".faqController").hide();
    $(".Reset").show();
}

function accordionSet() {
    $(".pairingController").hide();
    $(".mainController").hide();
    $(".mainRelease").hide();
    $("#datepicker").hide();
    $(".accordionController").show();
    $(".faqController").hide();
    $(".Reset").show();
}

function faqSet() {
    $(".pairingController").hide();
    $(".mainController").hide();
    $(".mainRelease").hide();
    $("#datepicker").hide();
    $(".accordionController").hide();
    $(".faqController").show();
    $(".Reset").show();
}

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

function buttonDisabled() {
    $(".faqBtn1").prop("disabled", true);
    $(".faqBtn2").prop("disabled", true);
    $(".faqBtn3").prop("disabled", true);
    
    //ボタンの色を変える処理
    $('.faqBtn1').css('background-color', '#BDBDBD');
    $('.faqBtn2').css('background-color', '#BDBDBD');
    $('.faqBtn3').css('background-color', '#BDBDBD');
}

function buttonEnabled() {
    $(".faqBtn1").prop("disabled", false);
    $(".faqBtn2").prop("disabled", false);
    $(".faqBtn3").prop("disabled", false);
    
    $('.faqBtn1').css('background-color', '#00ff23');
    $('.faqBtn2').css('background-color', '#00ff23');
    $('.faqBtn3').css('background-color', '#00ff23');
}