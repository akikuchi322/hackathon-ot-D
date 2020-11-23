'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $("#userName").val();
    // ユーザ名が未入力でないかチェックする
    if (userName !== '') {
        $('form').submit();
    } else {
        alert('なまえをいれてね！')
    }
}

$(function () {
    $('input').keypress(function (e) {
        var key = e.which;
        if (key == 13) { // key13 == enter
            enter()
            return false;
        }
    });
});