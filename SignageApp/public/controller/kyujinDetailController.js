var urlTransition =["http://localhost:5000/controller/controller.html"];

$(function () {
	$(".kyujinBeforeReturn2").click(function () {
		document.location.href = urlTransition[0];
    });
	$(".kyujinBeforeReturn2").click(function () {
		history.back();
    });
	
});