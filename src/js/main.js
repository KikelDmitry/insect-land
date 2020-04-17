//wow.js
new WOW().init();


    

$(document).ready(function () {
    //slick
    //certificates
    function slickInit(cb) {
        $('.certificates__slider-inner').slick({
            slidesToShow: 2,
            prevArrow: '<button class="slider-arr slider-arr--left"><span class="visually-hidden">previous</span></button>',
            nextArrow: '<button class="slider-arr slider-arr--right"><span class="visually-hidden">next</span></button>',
            responsive: [
                {
                    breakpoint: 600,
                    settings: 'unslick'
                }
            ]
        })
        //reviews
        $('.reviews__top').slick({
            slidesToShow: 5,
            asNavFor: '.reviews__bottom',
            centerMode: true,
            focusOnSelect: true,
            prevArrow: '<button class="slider-arr slider-arr--left"><span class="visually-hidden">previous</span></button>',
            nextArrow: '<button class="slider-arr slider-arr--right"><span class="visually-hidden">next</span></button>',
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 460,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
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
            centerMode: true,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false
                    }
                }
            ]
        })        
        cb();
    }
    //expandable blocks
    function hideExp() {
        setTimeout(function() {
            $('.section--expandable > .section__body').slideUp();
        }, 500)
        
    }
    slickInit(hideExp);
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
    } else if (parentSection.hasClass('how-work')) {
        textOpen = 'Открыть график';
        textClose = 'Закрыть график ';
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

//modals

$('.header__menu a').click(function() {
    $.fancybox.close()
    
    let blockId = $(this).attr('href');
    console.log($(blockId).find('.js-expand'));
    
    $(blockId).find('.js-expand').click();


})
//tabs


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
$('.type-head__item').SKtab({
    active: 0, 
    tabActiveClass: 'is-active',
    containerActiveClass: 'is-active',
    tabContainerClass: 'tab-container',
});
; (function (window, document, $, undefined) {
    if (!$) {
        return undefined;
    }
    $.fn.extend({
        SKtab: function (options) {
            let tabActiveClass = 'is-active';
            let containerActiveClass = 'is-active';
            let tabContainerClass = 'tab-container2';
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
$('.price-nav__item').SKtab({
    active: 0, 
    tabActiveClass: 'is-active',
    containerActiveClass: 'is-active',
    tabContainerClass: 'tab-container2',
});

let contactForm = $('.contacts-form');
contactForm.on('submit', function(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/mail.php');
    let data = new FormData(this);
    xhr.send(data);
    xhr.onload = function () {
        if (xhr.status == 200) {
            $.fancybox.open({
                src: '#modal-success'
            });
        } else if (xhr.status != 200) {
            $.fancybox.open('ERROR !200');
            
        }
        setTimeout(function() {            
            $.fancybox.close(true);
        }, 2000)
    }
    this.reset();
})
