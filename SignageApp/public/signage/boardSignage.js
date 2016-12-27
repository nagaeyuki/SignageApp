var socket = io.connect(location.origin);

var num = 0;
var topPos = 0;
var leftPos = 0;

var connect = 1;
var check = 1;

var urlTransition = ["https://192.168.53.41:443/signage/mainSignage.html", "https://192.168.53.41:443/DigitalSignage2.html"];

$(function () {

    $('html,body').offset({ top:-150, left: -350 });
    
    //CSV�t�@�C����ǂݍ��ފ֐�getCSV()�̒�`
    function getCSV() {
        var req = new XMLHttpRequest(); // HTTP�Ńt�@�C����ǂݍ��ނ��߂�XMLHttpRrequest�I�u�W�F�N�g�𐶐�
        req.open("get", "../csv/kyujin.csv", true); // �A�N�Z�X����t�@�C�����w��
        req.send(null); // HTTP���N�G�X�g�̔��s
        
        // ���X�|���X���Ԃ��Ă�����convertCSVtoArray()���Ă�
        req.onload = function () {
            convertCSVtoArray(req.responseText); // �n�����͓̂ǂݍ���CSV�f�[�^
        }
    }
    
    // �ǂݍ���CSV�f�[�^��񎟌��z��ɕϊ�����֐�convertCSVtoArray()�̒�`
    function convertCSVtoArray(str) { // �ǂݍ���CSV�f�[�^��������Ƃ��ēn�����
        var result = []; // �ŏI�I�ȓ񎟌��z������邽�߂̔z��
        var tmp = str.split("\n"); // ���s����؂蕶���Ƃ��čs��v�f�Ƃ����z��𐶐�
        
        // �e�s���ƂɃJ���}�ŋ�؂����������v�f�Ƃ����񎟌��z��𐶐�
        for (var i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(',');
        }
        
        for (var i = 1; i <= 80 ; i++) {
            
            //$(".kyujin" + i).text(result[i][1]);
            $(".kyujin" + i).append($("<img/>").attr({ "src": "../picture/pin005.png" }));
            $("img").attr('id', 'img'+i);
            $("img").addClass("img");

            $(".kyujin" + i).append('<h1>' + result[i][1] + '</h1>');
            $('h1').addClass("company");
            $(".detail" + i).append('<p>' + result[i][2] + '</p>');
            $(".detail" + i).append('<p>' + result[i][3] + '</p>');
            $(".detail" + i).append('<p>' + result[i][4] + '</p>');
            $(".detail" + i).append('<p>' + result[i][5] + '</p>');
            $(".detail" + i).append('<p>' + result[i][6] + '</p>');
            $(".detail" + i).append('<p>' + result[i][7] + '</p>');
            $(".kyujin" + i).append('<h2>�R���g���[����URL�{�^���Ŋ�Ƃ̃z�[���y�[�W�������܂�</h2>');
            $('h2').addClass("urlText");


            if (result[i][9]==1) {
                $(".kyujin" + i).append('<p>�L�����A�Z���^�[�Ƀp���t���b�g����܂�</p>');
                $('p:last').addClass("text");
            }
        }
    }
    
    console.log("ok");
    getCSV(); //�ŏ��Ɏ��s�����

    socket.on("kyujinSelectFromServer", function (data) {
        num = data.selectNum;
        console.log(num);
        selectCheck(num);
    });

    function selectCheck() {
        var off = $('.kyujin' + num).offset();
        topPos = off.top - 200;
        leftPos = off.left - 375;
        console.log("top:" + topPos + "left:" + leftPos);
        $('html,body').animate({ scrollTop: topPos + "px", scrollLeft: leftPos + "px" }, 2000, "swing");
    }
    
    socket.on("ReturnFromServer", function (data) {
        window.location.href = urlTransition[0];        console.log("Restart");    });

    socket.on("Restart", function (data) {
        window.location.href = urlTransition[1];        console.log("mainRestart");    });    //�ڑ��������߂�������
    socket.on("ConnectCut", function (data) {
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
    
    //���[�U���������Đڑ���������߂����鎞
    socket.on("DontStop", function (data) {
        connect = 2;
    });
		

});