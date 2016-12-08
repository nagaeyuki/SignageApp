var socket = io.connect('/');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//depth
var imageProcessing = false;
var imageWorkerThread = new Worker("js/GrayscaleImageWorker.js");



imageWorkerThread.addEventListener("message", function (event) {
    if (event.data.message === 'imageReady') {
        ctx.putImageData(event.data.imageData, 0, 0);
        imageProcessing = false;
    }
});

imageWorkerThread.postMessage({
    "message": "setImageData",
    "imageData": ctx.createImageData(canvas.width, canvas.height)
});

socket.on('depthFrame', function (imageBuffer) {
    if (!imageProcessing) {
        imageProcessing = true;
        imageWorkerThread.postMessage({ "message": "processImageData", "imageBuffer": imageBuffer });
    }
});


//Skeleton
var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

// handstate circle size
var HANDSIZE = 20;

// closed hand state color
var HANDCLOSEDCOLOR = "red";

// open hand state color
var HANDOPENCOLOR = "green";

// lasso hand state color
var HANDLASSOCOLOR = "blue";

function updateHandState(handState, jointPoint) {
    switch (handState) {
        case 3:
            drawHand(jointPoint, HANDCLOSEDCOLOR);
            break;

        case 2:
            drawHand(jointPoint, HANDOPENCOLOR);
            break;

        case 4:
            drawHand(jointPoint, HANDLASSOCOLOR);
            break;
    }
}

function drawHand(jointPoint, handColor) {
    // draw semi transparent hand cicles
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.fillStyle = handColor;
    ctx.arc(jointPoint.depthX * 512, jointPoint.depthY * 424, HANDSIZE, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
}

function stopTimer() {
    clearInterval(timer);
}
var flag = true;
var test = 0;
socket.on('bodyFrame', function (bodyFrame) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var index = 0;  
    bodyFrame.bodies.forEach(function (body) {
        if (body.tracked) {
            for (var jointType in body.joints) {
                var joint = body.joints[jointType];
                ctx.fillStyle = colors[index];
                ctx.fillRect(joint.depthX * 512, joint.depthY * 424, 10, 10);
            }
            
            //if (test = 0) {
                //if (flag) {
                    //socket.emit("hitoiru", { "roomID2": "iru" });
            //console.log("hitoiru");
            test = 2;
        
                    flag = false;
               // } //else {
               
                //}
            //}        
            //draw hand states
            /* var timer = setInterval(function () {
                socket.emit("hitoiru", { "roomID2": "iru" });
                        },1000);*/
            updateHandState(body.leftHandState, body.joints[7]);
            updateHandState(body.rightHandState, body.joints[11]);
            index++;
        } else {
           
                //if (flag) {
                    //socket.emit("hitoiru", { "roomID2": "inai" });
            flag = false;
           // test = 1;
               // } //else {
               
            //}*/
        }
       // if (flag) {
         //   flag = false;
        //} else {
               
        //}
    });
   
    
});

setInterval(function () {
    console.log(test);
    if (test == 2) {
        socket.emit("hitoiru", { "roomID2": "iru" });
    } else {
        socket.emit("hitoiru", { "roomID2": "inai" });
    }
    test = 0;
}, 500);

/*var timer = setInterval(function () {   
    socket.emit("hitoiru", { "roomID2": "inai" });
}, 1000);
 * */
socket.on("ConnectEnd", function () {
    test = 0;
    console.log(test);
});

socket.on("ConnectClear", function () {
    test = 1;
    console.log(test);
    stopTimer(timer);
});
    
   

/*function drawSkeleton(var joint) {
    if (joint != null) {
        
    } else {
        socket.emit("hitoiru", { "roomID2": "inai" });
    }
    joint = null;
    
    
}*/




