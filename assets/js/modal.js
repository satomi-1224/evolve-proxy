'use strict';

$(function() {
    let deck = [];

    // カードのDOM用文字列を作成
    const createCard = (src) => {
        return `<img class="modalCards" src="${src}">`;
    }
    // 配列をシャッフルする
    const arrayShuffle = (array) => {
        for(let i = (array.length - 1); 0 < i; i--){
      
          // 0〜(i+1)の範囲で値を取得
          let r = Math.floor(Math.random() * (i + 1));
      
          // 要素の並び替えを実行
          let tmp = array[i];
          array[i] = array[r];
          array[r] = tmp;
        }
        return array;
    }

    // デッキのURLを取得(並びはランダム)
    const getDeck = () => {
        const $deckElements = $('#cards').find('img');
        let arr = [];
        for (const deckElement of $deckElements) {
            arr.push($(deckElement).attr('src'));
        }
        return arrayShuffle(arr);
    }

    const drowInit = () => {
        deck = getDeck();
        $('.cardContents').empty();
        let cards = '';
        for (let i = 0; i < 4; i++) {
            cards += createCard(deck[0]);
            deck.shift();
        }
        $('.cardContents').append(cards);
    }
    //  マリガンボタン押下
    $(document).on('click', '.mulligan', function(){
        const $hands = $('.cardContents').find('img');
        let arr = [];
        for (const hand of $hands) {
            arr.push($(hand).attr('src'));
        }
        deck = deck.concat(arr);
        $('.cardContents').empty();

        let cards = '';
        for (let i = 0; i < 4; i++) {
            cards += createCard(deck[0]);
            deck.shift();
        }
        $('.cardContents').append(cards);
    });

    //  ドローボタン押下
    $(document).on('click', '.drow', function(){
        $('.cardContents').append(createCard(deck[0]));
        deck.shift();
    });

    //  リセットボタン押下
    $(document).on('click', '.reset', function(){
        drowInit();
    });

    // モーダルを開く
    $(document).on('click', '#openModal', function(){
        drowInit();
        $('#modalArea').fadeIn();
    });
    // モーダルを閉じる
    $(document).on('click', '#closeModal , #modalBg', function(){
        $('#modalArea').fadeOut();
    });
    // モーダルを閉じる
    $(document).on('click', '#closeModal , #modalBg', function(){
        $('#modalArea').fadeOut();
    });
});