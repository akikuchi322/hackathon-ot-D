'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendUserName', function (data) {
        console.log(data);
        socket.broadcast.emit('receiveUserName', data);
    });
};
