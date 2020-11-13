'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterUserName', function (data) {
        console.log(data);
        socket.broadcast.emit('receiveEnterUserName', data);
    });
};
