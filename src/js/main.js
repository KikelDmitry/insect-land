//slick

$(document).ready(function () {
    //certificates
    $('.certificates__slider-inner').slick({
        slidesToShow: 2,
        prevArrow: '<button class="slider-arr slider-arr--left"><span class="visually-hidden">previous</span></button>',
        nextArrow: '<button class="slider-arr slider-arr--right"><span class="visually-hidden">next</span></button>',
    })
    //reviews
    $('.reviews__top').slick({
        slidesToShow: 5,
        asNavFor: '.reviews__bottom',
        centerMode: true,
        focusOnSelect: true,
        prevArrow: '<button class="slider-arr slider-arr--left"><span class="visually-hidden">previous</span></button>',
        nextArrow: '<button class="slider-arr slider-arr--right"><span class="visually-hidden">next</span></button>',
    })
    $('.reviews__bottom').slick({
        slidesToShow: 1,
        asNavFor: '.reviews__top',
        arrows: false,
        fade: true
    })
    //our works
    $('.our-works').slick({
        slidesToShow: 3,
        arrows: false,
        dots: true,
        dotsClass: 'our-works__dots',
        centerMode: true
    })
    
})
//expandable blocks
$(document).ready(function () {
    $('.section--expandable > .section__body').slideUp();
})
let expandBtn = $('.js-expand'),
    mobExpandBtn = $('.js-mobile-expand');

expandBtn.click(expandToggle);
mobExpandBtn.click(mobileExpand);

function expandToggle() {
    let $parentBlock = $(this).parents('.section--expandable'),
        $parentBlockBody = $(this).parent().siblings('.section__body');
    if (!$parentBlock.hasClass('is-expand')) {
        $(this).html('Свернуть список')
        $parentBlock.addClass('is-expand');
        $parentBlockBody.slideDown(300);
    } else {
        $(this).html('Открыть список')
        $parentBlock.removeClass('is-expand');
        $parentBlockBody.slideUp(300);
    }
}
function mobileExpand() {
    let t = $(this),
        collapsable = t.prev(),
        parentSection = t.parent(),
        textOpen,
        textClose;
    if (parentSection.hasClass('reasons-section')) {
        parentSection.css('background', 'none');
        textOpen = 'Открыть преимущества';
        textClose = 'Закрыть преимущества';
    // } else if() {

    } else {
        textOpen = 'Открыть default';
        textClose = 'Закрыть default';
    }    
    if (!collapsable.hasClass('is-colapse')) {
        t.html(textOpen);
        collapsable.addClass('is-colapse');
        collapsable.slideUp(300);
    } else {
        t.html(textClose);
        collapsable.removeClass('is-colapse');
        collapsable.slideDown(300);
    }    
}

//sktabs
; (function (window, document, $, undefined) {
    if (!$) {
        return undefined;
    }
    $.fn.extend({
        SKtab: function (options) {
            let tabActiveClass = 'is-active';
            let containerActiveClass = 'is-active';
            let tabContainerClass = 'tab-container';
            let activeTab = 0;

            if (options.active) {
                activeTab = options.active;
            }

            if (options.tabContainerClass) {
                tabContainerClass = options.tabContainerClass;
            }

            if (options.tabActiveClass) {
                tabActiveClass = options.tabActiveClass;
            }

            if (options.containerActiveClass) {
                containerActiveClass = options.containerActiveClass;
            }

            $('.' + tabContainerClass).hide();

            let classess = '.' + this[0].classList[0];

            $(document).on('click', classess, function () {
                if ($(this).hasClass(tabActiveClass)) {
                    return false;
                }                
                $(classess).removeClass(tabActiveClass);
                $(this).addClass(tabActiveClass);
                let container = '#' + $(this).data('container');
                $('.' + tabContainerClass).hide();
                $(container).fadeIn().addClass(containerActiveClass);

                return false;
            });

            $($(classess)[activeTab]).click();

        }
    });
}(window, document, window.jQuery));

$('.tab-item').SKtab({
    active: 0, //Какой таб будет выбран по умолчанию
    tabActiveClass: 'is-active', //Класс который назначается выбранному табу
    containerActiveClass: 'is-active', //Класс который назначается выбранному контейнеру
    tabContainerClass: 'tab-container', //Класс табконтейнеров табов
});

