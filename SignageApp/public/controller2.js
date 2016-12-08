var socket = io.connect(location.origin);

$(function() {
    
  // ボタンクリック
  $("#Button1").click(function() {
    socket.emit("catalogFromController1");
		console.log("button1");
  });
  
  $("#Button2").click(function() {
    socket.emit("catalogFromController2");
		console.log("button2");
  });
  
  $("#Button3").click(function() {
    socket.emit("catalogFromController3");
		console.log("button3");
  });
  
  $("#Release").click(function() {
	socket.emit("FlagReset", {
            "flag": 3
        });
    socket.disconnect();
	});
  
});
