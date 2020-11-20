'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('publishMessage', function (message) {
        io.sockets.emit('receiveMessage', message);
    });

    socket.on('publishUserName', function (userName) {
        io.sockets.emit('receiveUserName', userName);
    });
};
