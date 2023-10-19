'use strict';

$(function() {
    // 乱数（整数）生成
    const random = () => {
        return Math.floor(Math.random() * 10000000000000000);
    }

    // メニューのインプットを増やすためにDOM生成。
    // classをユニークにするために乱数で生成したものを渡す。
    const createMenueDom = (num) => {
        return   `<div class="${num}">
                    <button class="up">⇧</button>
                    <button class="down">⇩</button>
                    <input type="text" class="urlInput" />
                    <input type="number" class="numberInput" value="0" />
                    <button class="remove">🗑</button>
                </div>`;
    }

    // カードのspanを増やすためにDOM生成。
    // classをユニークにするために乱数で生成したものを渡す。
    const createCardDom = (num) => {
        return   `<span class="${num}"></span>`;
    }

    // カードimgを増やすためにDOM生成。
    const createImgDom = (url='') => {
        return `<img src="${url}">`;
    }

    // メニューのDOMをすべて取得し、JSON化する。
    const formatSaveData = (data) => {
        const arr = [];
        for (const element of data) {
            const item ={
                'class': $(element).attr('class'),
                'url': $(element).children('.urlInput').val(),
                'num': $(element).children('.numberInput').val()
            }
            arr.push(item);
        }
        return arr
    }

    // 入力部分追加時の挙動
    $(document).on('click', '.add', function() {
        const randomClass = random();
        $(this).before(createMenueDom(randomClass));
        $('#cards').append(createCardDom(randomClass));
    });

    // 削除ボタンクリック時の挙動
    $(document).on('click', '.remove', function() {
        const randomClass = $(this).parent().attr('class');
        $(`.${randomClass}`).remove();
    });

    // upボタンを押したときの挙動
    $(document).on('click', '.up', function() {
        const $menueChildren = $('#menue').children('div');
        const $cardsChildren = $('#cards').children('span');
        const $selectedMenue = $(this).parent();
        const currentNo = $menueChildren.index($selectedMenue);
        // １つ上に上げる
        if (currentNo !== 0) {
            // 入力部分
            $menueChildren[currentNo - 1].before($menueChildren[currentNo]);
            // カード部分
            $cardsChildren[currentNo - 1].before($cardsChildren[currentNo]);
        }
    });

    // downボタンを押したときの挙動
    $(document).on('click', '.down', function() {
        const $menueChildren = $('#menue').children('div');
        const $cardsChildren = $('#cards').children('span');
        const $selectedMenue = $(this).parent();
        const menueChildrenLength = $menueChildren.length;
        const currentNo = $menueChildren.index($selectedMenue);
        // １つ下に下げる
        if (currentNo !== menueChildrenLength - 1) {
            // 入力部分
            $menueChildren[currentNo + 1].after($menueChildren[currentNo]);
            // カード部分
            $cardsChildren[currentNo + 1].after($cardsChildren[currentNo]);
        }
    });

    // URL入力時
    $(document).on('keyup', '.urlInput', function() {
        const currentClass = $(this).parent().attr('class');
        const inputValue = $(this).val();
        $(`span.${currentClass} > img`).attr('src', inputValue);
    });

    // 枚数変更時
    $(document).on('change', '.numberInput', function() {
        const inputValue = Number($(this).val());
        if (inputValue < 0 || !Number.isInteger(inputValue)) {
            alert('有効ではない枚数です。');
            $(this).val(0);
        } else {
            const currentClass = $(this).parent().attr('class');
            const url = $(`#menue > div.${currentClass} > .urlInput`).val();
            const $targetDom = $(`span.${currentClass}`);
            $targetDom.empty();
            let cards = '';
            for (let i = 0; i < inputValue; i++) {
                cards += createImgDom(url);
            }
            $targetDom.append(cards);
        }
    });

    // カードをクリックしたときに該当のInputへ飛ぶ
    $(document).on('click', 'span', function() {
        const currentClass = $(this).attr('class');
        $(`div.${currentClass} > .urlInput`).focus();
    });

    // セーブ
    $(document).on('click', '#save', function() {
        const $menue = $('#menue').children('div');
        const data = formatSaveData($menue);
        localStorage.setItem('data', JSON.stringify(data));
        alert('セーブしました');
    });

    //ロード
    $(document).on('click', '#load', function() {
        const data = JSON.parse(localStorage.getItem('data'));
        $('#menue>div').remove();
        $('#cards').empty();

        data.forEach(element => {
            $('.add').before(createMenueDom(element.class));
            $(`div.${element.class} > .urlInput`).val(element.url);
            $(`div.${element.class} > .numberInput`).val(Number(element.num));
            $('#cards').append(createCardDom(element.class));
            let items = '';
            for (let i = 0; i < element.num; i++) {
                items += createImgDom(element.url);
            }
            $(`span.${element.class}`).append(items);
        });
        alert('ロードしました');
    });

    //読み込みボタン押下
    $(document).on('click', '#importBtn', function() {
        const inputValue = $('#importData').val();
        const data = JSON.parse(inputValue);

        $('#menue>div').remove();
        $('#cards').empty();

        data.forEach(element => {
            $('.add').before(createMenueDom(element.class));
            $(`div.${element.class} > .urlInput`).val(element.url);
            $(`div.${element.class} > .numberInput`).val(Number(element.num));
            $('#cards').append(createCardDom(element.class));
            let items = '';
            for (let i = 0; i < element.num; i++) {
                items += createImgDom(element.url);
            }
            $(`span.${element.class}`).append(items);
        });
        alert('ペーストを読み込みました');
    });
    // 書き出しボタン押下
    $(document).on('click', '#exportBtn', function() {
        const $textArea = $('#importData');
        const $menue = $('#menue').children('div');
        const data = formatSaveData($menue);
        $textArea.val(JSON.stringify(data));
        alert('ペーストの書き出しを行いました');
    });
});