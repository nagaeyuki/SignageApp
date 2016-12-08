var socket = io.connect(location.origin);

var num = 0;
var topPos = 0;
var leftPos = 0;

var connect = 1;
var check = 1;

var urlTransition = ["http://192.168.53.41:80/signage/mainSignage.html", "http://192.168.53.41:80/DigitalSignage2.html"];

$(function () {
    
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
    
    console.log("�ł��Ă܂�");
    getCSV(); //�ŏ��Ɏ��s�����

	$(".Btn1").click(function () {
	//window.scrollBy(100,300) ;
	$('body').animate({scrollTop: 400}, 1000, 'swing');
	console.log("okok");
    });

    socket.on("kyujinSelectFromServer", function (data) {
        num = data.selectNum;
        console.log(num);
        selectCheck(num);
    });

    function selectCheck() {
        if (num <= 5) {
            topPos = 120;
        } else if (6 <= num && num <= 10) {
            topPos = 820;
        } else if (11 <= num && num <= 15) {
            topPos = 1520;
        } else if (16 <= num && num <= 20) {
            topPos = 2220;
        } else if (21 <= num && num <= 25) {
            topPos = 2920;
        } else if (26 <= num && num <= 30) {
            topPos = 3620;
        } else if (31 <= num && num <= 35) {
            topPos = 4320;
        } else if (36 <= num && num <= 40) {
            topPos = 5020;
        } else if (41 <= num && num <= 45) {
            topPos = 5720;
        } else if (46 <= num && num <= 50) {
            topPos = 6420;
        } else if (51 <= num && num <= 55) {
            topPos = 7120;
        } else if (56 <= num && num <= 60) {
            topPos = 7820;
        } else if (61 <= num && num <= 65) {
            topPos = 8520;
        } else if (66 <= num && num <= 70) {
            topPos = 9220;
        } else if (71 <= num && num <= 75) {
            topPos = 9920;
        } else if (76 <= num && num <= 80) {
            topPos = 10620;
        }
        
        switch (num % 5) {
            case 1:
                leftPos = 250;
                break;
            case 2:
                leftPos = 1200;
                break;
            case 3:
                leftPos = 2150;
                break;
            case 4:
                leftPos = 3100;
                break;
            case 0:
                leftPos = 4050;
                break;
        }
        console.log("top"+ topPos +"left"+leftPos);
        $('html,body').animate({ scrollTop: topPos+"px", scrollLeft: leftPos+"px" }, 2000, "swing");
        
    }
    
    socket.on("ReturnFromServer", function (data) {
        window.location.href = urlTransition[0];

    socket.on("Restart", function (data) {
        window.location.href = urlTransition[1];
    socket.on("ConnectCut", function (data) {
        if (connect == 1) {
            socket.emit("EndConnect");
            window.location.href = urlTransition[0];
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