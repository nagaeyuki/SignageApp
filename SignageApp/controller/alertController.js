$(function () {

    if (window.confirm("�y�A�����O�y�[�W�Ɉړ����܂�")) {
        window.location.href = "https://192.168.53.41:443/controller/controller.html";
        socket.emit("ConnectStart");
    } else {
        history.back();
    }
});