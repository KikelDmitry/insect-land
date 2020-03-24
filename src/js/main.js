//slick
$(document).ready(function() {
})

//expandable blocks
$(document).ready(function() {
    $('.certificates__slider-inner').slick({
        slidesToShow: 2,
        prevArrow: '<button class="slider-arr slider-arr--left"><span class="visually-hidden">previous</span></button>',
        nextArrow: '<button class="slider-arr slider-arr--right"><span class="visually-hidden">next</span></button>',
    })
})
let expandBtn = $('.js-expand');
expandBtn.click(expandToggle);

function expandToggle() {
    let $parentBlock = $(this).parent('.section--expandable'),
        $parentBlockBody = $(this).siblings('.section__body');
    if(!$parentBlock.hasClass('is-expand')) {
        $(this).html('Свернуть список')
        $parentBlock.addClass('is-expand');
        $parentBlockBody.slideDown();
    } else {
        $(this).html('Открыть список')
        $parentBlock.removeClass('is-expand');
        $parentBlockBody.slideUp();
    }
}
