'use strict';

let userList = [];
let wordList = [];
module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterShiritoriUserName', function (data) {
        console.log(data);
        userList.push(data);
        socket.broadcast.emit('receiveEnterShiritoriUserName', data);
        io.sockets.emit('receiveUserList', userList);
    });

    // 開始フラグを送信する
    socket.on('sendStartFlag', function () {
        console.log('shiritori start');
        socket.broadcast.emit('receiveStartFlag');
    });

    // 投稿内容を送信する
    socket.on('sendWord', function (data) {
        console.log(data);
        io.sockets.emit('receiveWord',data);
        //今まで使用された言葉を記録する
        const word = data.split("：")[1];
        console.log(word);
        wordList.push(word);
        console.log(wordList);
        socket.broadcast.emit('receiveWordList', wordList);
    });
};