'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val() + 'さん:';
    // 入力されたメッセージを取得
    var message = $('#message').val();
    message = message.replace(/\n/g, "<br>");
    //テキストを空にする
    $('#message').val('')
    const data = { userName: [userName], message: [message] };
    // 投稿内容を送信
    socket.emit('publishMessage', data);
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (data) {
    $('tbody').prepend('<tr>' + '<th valign="top">' + '<p>' + data["userName"] + '</p>' + '</th>' + '<td>' + '<p>' + data["message"] + '</p>' + '</td>' + '</tr>');
});
