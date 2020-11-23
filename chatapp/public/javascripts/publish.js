'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val() + 'さん:';
    // 入力されたメッセージを取得
    var message = $('#message').val();
    //投稿日時表示
    var Day = new Date();
    Day = '(' + (Day.getMonth()+1) + '/' + Day.getDate() + '&nbsp' +  Day.getHours() + ':' + Day.getMinutes() + ')'　+ '&nbsp';
    //テキストを空にする
    $('#message').val('');

    //空だけでの送信を認めない
    if(message == ``){
        alert(`メッセージが空(から)です。`);
        return -1;
    }
    //改行だけでの送信を認めない
    if(message == `\n`){
        alert(`メッセージが改行のみです。`);
        return -1;
    }
    if(message == `\r\n`){
        alert(`メッセージが改行のみです。`);
        return -1;
    }
    if(message == `\r`){
        alert(`メッセージが改行のみです。`);
        return -1;
    }

    //空白だけでの送信を認めない
    if(message == ` `){
        alert(`メッセージが半角空白のみです。`);
        return -1;
    }
    if(message == `　`){
        alert(`メッセージが全角空白のみです。`);
        return -1;
    }

    // 投稿内容を送信
    message = message.replace(/\n/g, "<br>");
    const data = { userName: [userName], message: [message], day:[Day] };
    socket.emit('publishMessage', data);
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (data) {
    $('tbody').prepend('<tr>' + '<th valign="top">' + '<p>' + data["userName"] + '</p>' + '</th>'
                       + '<td valign="top">' + '<p>' + data["day"] + '</p>' + '</td>' +'<td>' + '<p>' + data["message"] + '</p>' + '</td>' + '</tr>');
});
