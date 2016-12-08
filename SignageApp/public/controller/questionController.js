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

    //�N���b�N�����Ƃ��̃t�@���N�V�������܂Ƃ߂Ďw��
    $('.tab li').click(function () {

        //.index()���g���N���b�N���ꂽ�^�u�����Ԗڂ��𒲂ׁA
        //index�Ƃ����ϐ��ɑ�����܂��B
        var index = $('.tab li').index(this);

        //�R���e���c����x���ׂĔ�\���ɂ��A
        $('.content li').css('display', 'none');

        //�N���b�N���ꂽ�^�u�Ɠ������Ԃ̃R���e���c��\�����܂��B
        $('.content li').eq(index).css('display', 'block');

        //��x�^�u�ɂ��Ă���N���Xselect�������A
        $('.tab li').removeClass('select');

        //�N���b�N���ꂽ�^�u�݂̂ɃN���Xselect�����܂��B
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


    //��莞�Ԃ��Ƃɐڑ��m�F
    /*testTimer = setInterval(function () {
        if (connection == 0) {
            socket.emit("ConnectCheck");
            alert("�q�����Ă܂����H");
            socket.emit("ConnectNow");
            console.log("connection:" + connection);
        }

    }, 10000);
    
    socket.on("ConnectEnd", function (data) {
        //window.open('about:blank','_self').close();
        //�A���[�g�~�߂鏈��
        connection = 1;
        clearInterval(testTimer);
        console.log("ConnectEnd");
        //�ؒf��{�^��������
        socketCut = 1;
        socket.disconnect();
    });*/

    function buttonDisabled() {
        $(".faqBtn1").prop("disabled", true);
        $(".faqBtn2").prop("disabled", true);
        $(".faqBtn3").prop("disabled", true);

        //�{�^���̐F��ς��鏈��
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
