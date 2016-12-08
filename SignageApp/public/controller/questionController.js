var socket = io.connect(location.origin);

var socketCut = 0;
var connection = 0;

var urlTransition = ["http://192.168.53.41:80/controller/mainController.html"];

$(function () {

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
});// JavaScript source code
