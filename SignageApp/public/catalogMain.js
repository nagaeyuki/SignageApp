var socket = io.connect(location.origin);


$(function() {
    
    socket.on("catalogTest1", function(dataFromServer) {
        document.location.href = "http://localhost:80/catalog1.html";
    });

    socket.on("catalogTest2", function(dataFromServer) {
        document.location.href = "http://localhost:80/catalog2.html";
    });
    
    socket.on("catalogTest3", function(dataFromServer) {
        document.location.href = "http://localhost:80/catalog3.html";
    });
	
    socket.on("Restart", function (dataFromServer) {
        document.location.href = "http://localhost:80/people1.html";
    });
});
