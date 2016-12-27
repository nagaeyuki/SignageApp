$(function () {

    if (window.confirm("ペアリングページに移動します")) {
        window.location.href = "https://192.168.53.41:443/controller/controller.html";
        socket.emit("ConnectStart");
    } else {
        history.back();
    }
});