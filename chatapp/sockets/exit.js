'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitUserName', function (data) {
        console.log(data);
        socket.broadcast.emit('receiveExitUserName', data);

    });
};
