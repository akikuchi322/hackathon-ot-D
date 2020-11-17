'use strict';

let userList = [];
let wordList = [];
module.exports = function (socket, io) {
    // 入室処理
    socket.on('sendEnterShiritoriUserName', function (data) {
        console.log(data);
        userList.push(data);
        io.sockets.emit('receiveUserList', userList);
    });

    // 退室処理
    socket.on('sendExitShiritoriUserName', function (data) {
        console.log(data);
        const index = userList.indexOf(data);
        userList.splice(index,1);
        console.log(userList);
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
        const word = data.split(":")[1];
        const user = data.split("さん:")[0];
        //語尾が「ん」でないかチェック
        if(word[word.length - 1] === 'ん'){
            io.sockets.emit('receiveEndFlag',user);
            return false;
        }
        //今まで使用された言葉を記録する
        console.log(word);
        wordList.push(word);
        console.log(wordList);
        socket.broadcast.emit('receiveWordList', wordList);
    });
};