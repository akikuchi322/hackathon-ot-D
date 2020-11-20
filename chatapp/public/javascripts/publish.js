'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val() + 'さん:';
    // 入力されたメッセージを取得
    const message = $('#message').val();
    //テキストを空にする
    $('#message').val('')
    const data = ここから
    // 投稿内容を送信
    socket.emit('publishMessage', message);
    socket.emit('publishUserName', userName);
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (message) {
    $('#thread').prepend('<p>' + message + '</p>');
});
socket.on('receiveUserName', function (userName) {
    $('#user-name').prepend('<p>' + userName + '</p>');
});
