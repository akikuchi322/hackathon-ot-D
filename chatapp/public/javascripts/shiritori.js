'use strict';

let userList;
let wordList;
let userNum;
let turn = 0;
let initial = 'り';

// ユーザ名を取得する
const userName = $('#userName').val();
// 入室メッセージイベントを送信する
socket.emit('sendEnterShiritoriUserName', userName);

//開始ボタンを押したときの処理
function shiritoriStart(){
    //しりとりのテキストエリアなどを非表示から表示状態に変更
    $('#shiritori-contents').css('display', 'block');
    //開始、終了ボタンは非表示状態に変更
    $('#start-button').css('display', 'none');
    $('#end-button').css('display', 'none');
    //他のプレイヤーも開始状態にする
    socket.emit('sendStartFlag');
    //誰の順番かを表示させる
    $('#turn').html('<p>' + userList[turn] + 'の順番です</p>');
    //しりとりの「り」から開始
    $('#initial').html('<p>「' + initial + '」から始まる言葉を入力してください</p>');

    return false;
}

//しりとりの投稿ボタンを押したときの処理
function shiritoriPublish(){
    // ユーザ名を取得
    const userName = $('#userName').val();
    //自分の順番であるかチェック
    if(userName !== userList[turn]){
        alert('あなたの順番ではありません。');
        return false;
    }
    // 入力された言葉を取得
    const word = $('#word').val();
    //頭文字が正しいかチェック
    if(word[0] !== initial){
        alert(`${initial}から始まる言葉を入力してください。`);
        return false;
    }
    //空欄でないかチェック
    if(word === ''){
        alert('空欄です');
        return false;
    }
    //テキストを空にする
    $('#word').val('')
    // 投稿内容を送信
    const data = userName + 'さん:' + word ;
    socket.emit('sendWord', data);
    return false;
}


// サーバから受信したユーザリストを画面上に表示する
socket.on('receiveUserList', function (data) {
    userList = data;
    userNum = data.length;
    $('#userList').html('<p>' + '参加ユーザ: ' + data + '</p>');
    if(userNum >= 2){
        $('#start-button').css('display', 'block');
    };
    console.log(userNum);
});

// しりとりを開始させる
socket.on('receiveStartFlag', function () {
    //しりとりのテキストエリアなどを非表示から表示状態に変更
    $('#shiritori-contents').css('display', 'block');
    //開始、終了ボタンは非表示状態に変更
    $('#start-button').css('display', 'none');
    $('#end-button').css('display', 'none');
    //誰の順番かを表示させる
    $('#turn').html('<p>' + userList[turn] + 'の順番です ' + '</p>');
    //しりとりの「り」から開始
    $('#initial').html('<p>「' + initial + '」から始まる言葉を入力してください</p>');
});

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveWord', function (data) {
    //頭文字を更新
    initial = data[data.length - 1];
    $('#initial').html('<p>「' + initial + '」から始まる言葉を入力してください</p>');
    //順番を更新
    turn += 1;
    if(turn >= userNum){
        turn = 0;
    }
    $('#turn').html('<p>' + userList[turn] + 'の順番です ' + '</p>');
    //投稿内容を表示
    $('#thread').prepend('<p>' + data + '</p>');
});