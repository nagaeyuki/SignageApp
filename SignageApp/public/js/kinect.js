var socket = io.connect('/');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// var grayImage=document.getElementById('grayImage');
// var imageCanvas=document.getElementById('imageCanvas');
// var imagectx=imageCanvas.getContext('2d');
// var grayctx=grayImage.getContext('2d');
var distance = document.getElementById('distance');
var state = document.getElementById('state');
var range = document.getElementById('range');
//var approach = document.getElementById('approach');
var target = document.getElementById('target');
var zero = document.getElementById('zero');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var bodyNumbertext = document.getElementById('bodyNumbertext');
//var averageText = document.getElementById('averageList');

//depth
var imageProcessing = false;
var imageWorkerThread = new Worker("js/GrayscaleImageWorker.js");

socket.emit("max", max);
socket.emit("min", min);
$(function() {
    $('#exec').click(function() {
        min = $('#min').val();
        max = $('#max').val();
        //middle = $('#middle').val();
        socket.emit("max", max);
        socket.emit("min", min);
        console.log(min);
    })
});

imageWorkerThread.addEventListener("message", function(event) {
    if (event.data.message === 'imageReady') {
        ctx.putImageData(event.data.imageData, 0, 0);
        imageProcessing = false;
    }
});

imageWorkerThread.postMessage({
    "message": "setImageData",
    "imageData": ctx.createImageData(canvas.width, canvas.height)
});

socket.on('depthFrame', function(imageBuffer) {
    if (!imageProcessing) {
        imageProcessing = true;
        imageWorkerThread.postMessage({
            "message": "processImageData",
            "imageBuffer": imageBuffer
        });
    }
});




//Skeleton
//var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
var colors = ['red.png', 'green.png', 'blue.png', 'yellow.ong', 'lightblue.png', 'pink.png']
    // handstate circle size
    // var HANDSIZE = 20;
    // // closed hand state color
    // var HANDCLOSEDCOLOR = "red";
    // // open hand state color
    // var HANDOPENCOLOR = "green";
    // // lasso hand state color
    // var HANDLASSOCOLOR = "blue";
    // function updateHandState(handState, jointPoint) {
    //     switch (handState) {
    //         case 3:
    //             drawHand(jointPoint, HANDCLOSEDCOLOR);
    //             break;
    //         case 2:
    //             drawHand(jointPoint, HANDOPENCOLOR);
    //             break;
    //         case 4:
    //             drawHand(jointPoint, HANDLASSOCOLOR);
    //             break;
    //     }
    // }
    // function drawHand(jointPoint, handColor) {
    //     // draw semi transparent hand cicles
    //     ctx.globalAlpha = 0.75;
    //     ctx.beginPath();
    //     ctx.fillStyle = handColor;
    //     ctx.arc(jointPoint.depthX * 512, jointPoint.depthY * 424, HANDSIZE, 0, Math.PI * 2, true);
    //     ctx.fill();
    //     ctx.closePath();
    //     ctx.globalAlpha = 1;
    // }




var frame = 30;
//var middle = 90;
var min = 80; //表示切替をする距離
var max = 200;
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



socket.on('bodyFrame', function(bodyFrame) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    var index = 0;
    var bodyNumberList = [];

    bodyFrame.bodies.forEach(function(body) {
        if (body.tracked) {
            // for (var jointType in body.joints) {
            //     var joint = body.joints[jointType];
            //     ctx.fillStyle = colors[index];
            //     ctx.fillRect(joint.depthX * 512, joint.depthY * 424, 10, 10);
            // }
            flag = true;
            bodyNumber = body.bodyIndex;

            if (bodyNumberList.indexOf(bodyNumber) == -1) {
                bodyNumberList.push(bodyNumber);
            }

            var SpineMidZ = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].cameraZ * 100);
            // var SpineMidY = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].cameraY * 100);
            // var SpineMidX = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].cameraX * 100);
            var SpineMidY = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].depthY * 100);
            var SpineMidX = Math.floor(bodyFrame.bodies[bodyNumber].joints[1].depthX * 100);


            distance.innerHTML = SpineMidZ;;
            listZ[bodyNumber].push(SpineMidZ);
            listX[bodyNumber].push(SpineMidX);


            var InsertImage = document.getElementById('Imageframe');
            InsertImage.innerHTML = "";
            InsertImage.innerHTML += "<img id=img_" + index + " src='/picture/" + colors[index] + "'/>";
            InsertImage.innerHTML += "<img id=gray_" + index + " src='/picture/gray.png'/>"





            // grayctx.clearRect(0,0,canvas.width, canvas.height);
            // grayctx.globalAlpha=0.7;
            // var gray= new Image();
            // gray.src="/picture/gray.png";
            //
            // grayctx.drawImage(gray,SpineMidX,SpineMidY);

            // imagectx.clearRect(0, 0, canvas.width, canvas.height);
            // imagectx.globalAlpha = 0.7;
            // var img = new Image();
            // img.src="/picture/"+colors[index];
            // imagectx.drawImage(img,SpineMidX,SpineMidY);

            if (targetNumber != null && listZ[targetNumber].length == frame) {
                //kinect�����̋�����min,middle�͈͓̔�
                //if (min < SpineMidZ && SpineMidZ < max) {
                var ratio = 1 - (SpineMidZ - min) / (max - min);
                if (SpineMidZ <= min) {
                    //�����~�܂��Ă����Ȃ�
                    if (Math.abs(listZ[targetNumber][0] - listZ[targetNumber][frame - 1]) < move) {
                        state.innerHTML = "stop";
                        range.innerHTML = "true";
                        // approach.innerHTML = "stop";
                        if (recognition != "stop") {
                            socket.emit("stop");
                        }
                        recognition = "stop";
                        socket.emit("distancedata", SpineMidZ);

                        $('#img_' + index).css({
                            opacity: 1,
                            top: bodyFrame.bodies[bodyNumber].joints[1].depthY * canvas.height - 230,
                            left: bodyFrame.bodies[bodyNumber].joints[1].depthX * canvas.width - 250,
                            width: $('#gray_'+index).width(),
                            height: $('#gray_'+index).height()
                          })
                          $('#gray_'+index).css({
                            opacity: 0
                          })

                    }
                } else if (min < SpineMidZ && SpineMidZ <= max) {
                    state.innerHTML = "move";
                    range.innerHTML = "true";
                    //approach.innerHTML = "move";
                    if (recognition != "move") {
                        socket.emit("move");
                    }
                    recognition = "move";

                    socket.emit("distance", SpineMidZ);

                    $('#img_' + index).css({
                        opacity: 0.7,
                        top: bodyFrame.bodies[bodyNumber].joints[1].depthY * canvas.height -230,
                        left: bodyFrame.bodies[bodyNumber].joints[1].depthX * canvas.width - 250,
                        width: $('#gray_'+index).width() * ratio,
                        height: $('#gray_'+index).height() * ratio,
                        margin: ($('#gray_'+index).height() / 2 - $('#gray_'+index).height() / 2 * ratio)
                    })
                    $('#gray_'+index).css({
                        top: bodyFrame.bodies[bodyNumber].joints[1].depthY * canvas.height -230,
                        left: bodyFrame.bodies[bodyNumber].joints[1].depthX * canvas.width - 250
                    });
                } else if (SpineMidZ > max) {

                    range.innerHTML = "false";
                    state.innerHTML = "none";
                    // approach.innerHTML = "none";
                    if (recognition != "none") {
                        socket.emit("none");
                    }
                    recognition = "none";
                }

                listZ[targetNumber].shift();
                listX[targetNumber].shift();
            }
            if (listZ[bodyNumber].length == frame) {
                listZ[bodyNumber].shift();
                listX[bodyNumber].shift();
            }
            // updateHandState(body.leftHandState, body.joints[7]);
            // updateHandState(body.rightHandState, body.joints[11]);
            index++;
        }
        count = 0;
    });
    //�������牺�͔z���̒�����44�ɂȂ��Ă���
    switch (bodyNumber) {
        case 0:
            zero.innerHTML = listZ[bodyNumber];
            break;
        case 1:
            one.innerHTML = listZ[bodyNumber];
            break;
        case 2:
            two.innerHTML = listZ[bodyNumber];
            break;
        case 3:
            three.innerHTML = listZ[bodyNumber];
            break;
        case 4:
            four.innerHTML = listZ[bodyNumber];
            break;
        case 5:
            five.innerHTML = listZ[bodyNumber];
            break;
    }


    bodyNumbertext.innerHTML = bodyNumberList;

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
            target.innerHTML = targetNumber;
        }
    }

    //averageText.innerHTML = averageList;
    averageList2 = [];

});



setInterval(function() {
    if (flag) {
        flag = false;
    } else {
        for (var i = 0; i < 6; i++) {
            listZ[i] = [];
            listX[i] = [];
            targetNumber = null;
            if (recognition != "none") {
                socket.emit("none");
            }
            recognition = "none";
        }

        $('#gray_0').css({
            opacity: '0'

        });
    }
}, 1000);
