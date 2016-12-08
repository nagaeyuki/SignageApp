var socket = io.connect(location.origin);

var check = 0;
var socketCut = 0;

var urlTransition = ["http://192.168.53.41:80/controller/mainController.html"];


$(function() {

	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
	
	

	var forClass4 = ['2016-05-16','2016-05-17','2016-05-18','2016-05-19','2016-05-20','2016-05-21','2016-06-24','2016-07-12','2016-07-13','2016-07-15','2016-07-16'];
	var forClass3 = ['2016-04-11','2016-04-13','2016-04-14','2016-04-15','2016-04-18','2016-04-21','2016-04-22','2016-04-25','2016-06-07','2016-06-08','2016-06-10','2016-06-13','2016-06-20','2016-06-21','2016-06-30','2016-07-01','2016-07-04','2016-07-08','2016-07-19','2016-08-03','2016-08-04','2016-08-06','2016-10-17','2016-10-18','2016-10-20','2016-10-21','2016-11-15','2016-11-16','2016-11-29','2016-11-30','2016-12-01','2016-12-12','2016-12-13','2016-12-15','2016-12-19','2016-12-20','2017-01-17','2017-01-21','2017-02-09','2017-02-10','2017-02-13','2017-02-14','2017-02-16','2017-02-17','2017-02-21','2017-02-22','2017-02-23','2017-02-24','2017-03-01','2017-03-02','2017-03-04','2017-03-09','2017-03-10','2017-03-14','2017-03-17','2017-03-21','2017-03-22','2017-03-23','2017-03-24'];
	var forClassW = ['2016-07-11','2016-07-14'];

	$('#datepicker').datepicker({                       // 土日祝日色変更
		beforeShowDay: function(date) {
		for (var i = 0; i < forClass4.length; i++) {
			var for4 = new Date();
			for4.setTime(Date.parse(forClass4[i]));   // 祝日を日付型に変換

			if (for4.getYear() == date.getYear() &&  // 祝日の判定
				for4.getMonth() == date.getMonth() &&
				for4.getDate() == date.getDate()) {
				return [true, 'class-event4', '4年'];
			}
		}
		
		for (var i = 0; i < forClass3.length; i++) {
			var for3 = new Date();
			for3.setTime(Date.parse(forClass3[i]));   // 祝日を日付型に変換

			if (for3.getYear() == date.getYear() &&  // 祝日の判定
				for3.getMonth() == date.getMonth() &&
				for3.getDate() == date.getDate()) {
				return [true, 'class-event3', '3年'];
			}
		}
		
		for (var i = 0; i < forClassW.length; i++) {
			var forW = new Date();
			forW.setTime(Date.parse(forClassW[i]));   // 祝日を日付型に変換

			if (forW.getYear() == date.getYear() &&  // 祝日の判定
				forW.getMonth() == date.getMonth() &&
				forW.getDate() == date.getDate()) {
				return [true, 'class-eventW', '両方'];
			}
		}

		if (date.getDay() == 0) {                     // 日曜日
			return [false, 'class-sunday', '日曜日'];
		} else if (date.getDay() == 6) {              // 土曜日
			return [false, 'class-saturday', '土曜日'];
		} else {                                      // 平日
			return [false, 'class-weekday', '平日'];
		}
		},
		dateFormat: 'yy-mm-dd',
		minDate: new Date(2016, 4 - 1, 1),
		maxDate: new Date(2017, 3 - 1, 31),
		onSelect: function(dateText, inst) {
                    //$("#date_val").val(dateText);
					var dates = dateText.split('/');
					var year = parseInt(dates[0]);
					var month = parseInt(dates[1]);
					var day = parseInt(dates[2]);
					console.log(dates);
					console.log(year);
					console.log(month);
					console.log(day);
					
					if(dates == forClass4[0] ||dates == forClass4[1] ||dates == forClass4[2] ||dates == forClass4[3] ||dates == forClass4[4] ) {
						check = 2;
					} else if(dates == forClass4[5]) {
						check = 3;
					} else if(dates == forClass4[6]) {
						check = 8;
					} else if(dates == forClass4[7] ||dates == forClass4[8] ||dates == forClass4[9] || dates == forClassW[0] || dates == forClassW[1]) {
						check = 12;
					} else if(dates == forClass4[10]) {
                        check = 14;
					} else if(dates == forClass3[0] ||dates == forClass3[1] ||dates == forClass3[2] ||dates == forClass3[3] ||dates == forClass3[4] ||dates == forClass3[5] ||dates == forClass3[6] ||dates == forClass3[7]) {
						check = 1;
					} else if(dates == forClass3[8]||dates == forClass3[9]) {
						check = 4;
					} else if(dates == forClass3[10]) {
						check = 5;
					} else if(dates == forClass3[11]) {
						check = 6;
					} else if(dates == forClass3[12] ||dates == forClass3[13]) {
						check = 7;
					} else if(dates == forClass3[14]) {
						check = 9;
					} else if(dates == forClass3[15] ||dates == forClass3[16]) {
						check = 10;
					} else if(dates == forClass3[17]) {
						check = 11;
					} else if(dates == forClass3[18]) {
						check = 13;
					} else if(dates == forClass3[19]||dates == forClass3[20]) {
						check = 15;
					} else if(dates == forClass3[21]) {
						check = 16;
					} else if(dates == forClass3[22] ||dates == forClass3[23] ||dates == forClass3[24] ||dates == forClass3[25]) {
						check = 17;
					} else if(dates == forClass3[26]) {
						check = 18;
					} else if(dates == forClass3[27]) {
						check = 19;
					} else if(dates == forClass3[28] ||dates == forClass3[29]) {
						check = 20;
					} else if(dates == forClass3[30]) {
						check = 21;
					} else if(dates == forClass3[31] ||dates == forClass3[32] ||dates == forClass3[33]) {
						check = 22;
					} else if(dates == forClass3[34] ||dates == forClass3[35]) {
						check = 23;
					} else if(dates == forClass3[36]) {
						check = 24;
					} else if(dates == forClass3[37]) {
						check = 25;
					} else if(dates == forClass3[38] ||dates == forClass3[39]) {
						check = 26;
					} else if(dates == forClass3[40] ||dates == forClass3[41] ||dates == forClass3[42] ||dates == forClass3[43]) {
						check = 27;
					} else if(dates == forClass3[44] ||dates == forClass3[45]) {
						check = 28;
					} else if(dates == forClass3[46] ||dates == forClass3[47]) {
						check = 29;
					} else if(dates == forClass3[48] ||dates == forClass3[49] ||dates == forClass3[50]) {
						check = 30;
					} else if(dates == forClass3[51] ||dates == forClass3[52]) {
						check = 31;
					} else if(dates == forClass3[53] ||dates == forClass3[54]) {
						check = 32;
					} else if(dates == forClass3[55] ||dates == forClass3[56] ||dates == forClass3[57] ||dates == forClass3[58]) {
						check = 33;
					} else if (dates == forClass3[53] || dates == forClass3[54]) {
                        check = 32;
                    } 
					 
					socket.emit("dateCalendar",{ "dateText": check });
        },
		onChangeMonthYear: function(year, month, inst) {
      // その月の休日情報をajaxで取得
		socket.emit("ChangeMonth",{ "monthText": month });
		console.log(month);
		}
    });
    
    
    //クリックしたときのファンクションをまとめて指定
    $('.tab li').click(function () {
        
        //.index()を使いクリックされたタブが何番目かを調べ、
        //indexという変数に代入します。
        var index = $('.tab li').index(this);
        
        //コンテンツを一度すべて非表示にし、
        $('.content li').css('display', 'none');
        
        //クリックされたタブと同じ順番のコンテンツを表示します。
        $('.content li').eq(index).css('display', 'block');
        
        //一度タブについているクラスselectを消し、
        $('.tab li').removeClass('select');
        
        //クリックされたタブのみにクラスselectをつけます。
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

//一定時間ごとに接続確認
    /*testTimer = setInterval(function () {
        if (connection == 0) {
            socket.emit("ConnectCheck");
            alert("繋がってますか？");
            socket.emit("ConnectNow");
            console.log("connection:" + connection);
        }

    }, 10000);
    
    socket.on("ConnectEnd", function (data) {
        //window.open('about:blank','_self').close();
        //アラート止める処理
        connection = 1;
        clearInterval(testTimer);
        console.log("ConnectEnd");
        //切断後ボタン無効に
        socketCut = 1;
        socket.disconnect();
    });*/


    /*$("#datepicker").datepicker({
		beforeShow : function(input, inst){
        console.log(input);
    },
        // 日付が選択された時、日付をテキストフィールドへセット
        onSelect: function(dateText, inst) {
                    //$("#date_val").val(dateText);
					var dates = dateText.split('/');
					var year = parseInt(dates[0]);
					var month = parseInt(dates[1]);
					var day = parseInt(dates[2]);
					console.log(dateText);
					console.log(year);
					console.log(month);
					console.log(day);
					socket.emit("dateCalendar",{ "dateText": dates });
                }
    });*/
  });