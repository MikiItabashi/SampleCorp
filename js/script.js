// ------------------
// ナビゲーションリンク
// ------------------
$('a[href^="#"]').click(function() {
    // 画面幅を取得
    var windowWidth = $(window).width();
    // ヘッダーの高さを取得
    var header = $('header').innerHeight();
    if (windowWidth > 767) {
        // PC表示の場合はヘッダーの高さを0にする
        header = 0;
    }
    // 移動速度を指定（ミリ秒）
    var speed = 300;
    // hrefで指定されたidを取得
    var id = $(this).attr("href");
    // position初期化
    var position = 0;
    // ページのトップを基準にターゲットの位置を取得
    if (id != '#' && id != "") {
        position = $(id).offset().top - header;
    }
    // ターゲットの位置までspeedの速度で移動
    $("html, body").animate({
            scrollTop: position
        },
        speed
    );
    return false;
});

// ------------------
// ドロワーメニュー
// ------------------
$('.drawer-icon').on('click', function(e) {
    e.preventDefault();
    $('.drawer-icon').toggleClass('is-active');
    $('.drawer-content').toggleClass('is-active');
    $('.drawer-background').toggleClass('is-active');

    return false;
})

$('.drawer-content_item a').on('click', function(e) {
    e.preventDefault();
    $('.drawer-icon').toggleClass('is-active');
    $('.drawer-content').toggleClass('is-active');
    $('.drawer-background').toggleClass('is-active');

    return false;
})

// ------------------
// スワイパー
// ------------------
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 1.3,
    spaceBetween: 20,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    // PC表示の場合
    breakpoints: {
        // when window width is >= 768px
        768: {
            slidesPerView: 2.68,
            spaceBetween: 40
        }
    }
});

// ------------------
// FAQアコーディオン
// ------------------
$('.FAQ-q').on('click', function() {
    $(this).next().slideToggle();
    $(this).children('.FAQ-toggle').toggleClass('is-open');
})

// ------------------
// formの入力確認
// ------------------
let $submit = $('#js-submit');
$('#js-form input, #js-form textarea').on('change', function() {
    if (
        $('#name').val() !== "" &&
        $('#kana').val() !== "" &&
        $('#js-form input[type="checkbox"]').prop('checked') === true
    ) {
        // すべて入力されたとき
        $submit.prop('disabled', false)
    } else {
        // 入力されていないとき
        $submit.prop('disabled', true)
    }
})

// ------------------
// google form
// ------------------
let $form = $('#js-form')
$form.submit(function(e) {
    $.ajax({
        url: $form.attr('action'),
        data: $form.serialize(),
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                //送信に成功したときの処理 
                $form.slideUp();
                $('#js-success').slideDown();
            },
            200: function() {
                //送信に失敗したときの処理 
                $form.slideUp();
                $('#js-error').slideDown();
            }
        }
    });
    return false;
});

// ------------------
// 上へ戻る
// ------------------
$(window).on('scroll', function() {
    if (100 < $(this).scrollTop()) {
        $('.to-top').addClass('is-show');
    } else {
        $('.to-top').removeClass('is-show');
    }
})