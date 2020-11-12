'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿内容を送信
    const data = userName + 'さん：' + message ;
    socket.emit('publishMessage', data);
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (data) {
    $('#thread').prepend('<p>' + data + '</p>');
});
