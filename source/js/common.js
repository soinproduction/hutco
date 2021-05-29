// mobile menu
$(".hamburger").click(function (event) {
  $(".hamburger").toggleClass('hamburger__active'),
    $(".mobile__menu ").toggleClass('mobile__menu__active');
  $('body').toggleClass('body__scroll');
});

// переменная не переназначается, поэтому используем const
// используем querySelectorAll, чтобы собрать массив со всеми сущностями .select
const select = document.querySelectorAll('.select');

// если массив не пустой, пробегаемся в цикле по каждой найденой сущности
if (select.length) {
  select.forEach(item => {
    // достаем из текущей сущности .select__current
    const selectCurrent = item.querySelector('.select__current');

    item.addEventListener('click', event => {
      const el = event.target.dataset.choice;
      const text = event.target.innerText;

      // Проверяем является ли это choosen и не выбрано ли его значение уже
      if (el === 'choosen' && selectCurrent.innerText !== text) {
        selectCurrent.innerText = text;
      }

      item.classList.toggle('is-active');
    });
  });
}

// accordeon

$('.faq__item-question').click(function () {
  const parent = $(this).parent();

  if (parent.hasClass('faq__item--active')) {
    parent.removeClass('faq__item--active');
  } else {
    $('.faq__item').removeClass('faq__item--active')
    parent.addClass('faq__item--active');
  }
});

// accordeon mobile

$('.mobile__accordeon-header').click(function () {
  const parent = $(this).parent();

  if (parent.hasClass('mobile__nav-item--active')) {
    parent.removeClass('mobile__nav-item--active');
  } else {
    $('.mobile__nav-item').removeClass('mobile__nav-item--active')
    parent.addClass('mobile__nav-item--active');
  }
});

// -----------------  Слайдер --------------------

const Sliders = {
  INDEX_SLIDER: {
    ELEMENT: $('.publication__body'),
    SETTINGS: {
      accessibility: true,
      arrows: false,
      dots: false,
      speed: 1500,
      slidesToShow: 1,
      slideToScroll: 1,
      centerMode: true,
      centerPadding: "0",
      variableWidth: true,
      infinite: true,
      // adaptiveHeight: true,
    },
    BREAKPOINT: 576,
    CLASSNAME: 'latest__body',
  },
}

function initialazeSlickSlider(slider) {
  const {
    BREAKPOINT,
    SETTINGS,
    ELEMENT
  } = slider;
  (document.documentElement.clientWidth <= BREAKPOINT || BREAKPOINT === undefined) && ELEMENT.slick(SETTINGS);
}

function toggleSlider(slider) {
  const {
    BREAKPOINT,
    ELEMENT,
    SETTINGS
  } = slider;
  document.documentElement.clientWidth > BREAKPOINT && ELEMENT.hasClass('slick-initialized') && ELEMENT.slick('unslick');
  document.documentElement.clientWidth <= BREAKPOINT && !ELEMENT.hasClass('slick-initialized') && ELEMENT.slick(SETTINGS);
}

function toggleExtraClass(slider) {
  const {
    BREAKPOINT,
    ELEMENT,
    CLASSNAME
  } = slider;
  document.documentElement.clientWidth > BREAKPOINT && !ELEMENT.hasClass(CLASSNAME) && ELEMENT.addClass(CLASSNAME);
  document.documentElement.clientWidth <= BREAKPOINT && ELEMENT.hasClass(CLASSNAME) && ELEMENT.removeClass(CLASSNAME);
}

initialazeSlickSlider(Sliders.INDEX_SLIDER);

window.addEventListener('resize', () => {
  toggleSlider(Sliders.INDEX_SLIDER);
  toggleExtraClass(Sliders.INDEX_SLIDER);
});


// dinamic row
$(function () {
  if ($(window).width() < 769) {
    ScrollTrigger.create({
      trigger: ".animate__sec-inner",
      start: "center bottom",
      end: "center top",
      onUpdate: e => {
        gsap.to(".animate__sec-inner", {
          xPercent: 250 * -e.progress
        })
      }
    });
  }

  if ($(window).width() > 769) {
    ScrollTrigger.create({
      trigger: ".animate__sec-inner",
      start: "center bottom",
      end: "center top",
      onUpdate: e => {
        gsap.to(".animate__sec-inner", {
          xPercent: 70 * -e.progress
        })
      }
    });
  }
});

// btn on click
$('.btn').click(function () {
  $(this).css('background-color', '#E93D02');
});

$('.btn__reg').click(function () {
  $(this).css('color', '#E93D02');
  $(this).css('border', '1px solid #E93D02');
});

$('.btn__pag').click(function () {
  $(this).css('color', '#FFFFFF');
  $(this).css('background-color', '#FF5B22');
});

//mixitup

// $(function () {
//   $('.blog__inner').mixItUp({
//     selectors: {
//       target: '.latest__item',
//       filter: '.blog__btn',
//     }
//   });
// });

// owl
$(function () {
  function e() {
    $(".slide-progress").css({
      width: "100%",
      transition: "width 9600ms"
    })
  }

  function t() {
    $(".slide-progress").css({
      width: 0,
      transition: "width 0s"
    })
  }

  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: !0,
    animateOut: 'fadeOut',
    dotsContainer: ".system__bot",
    dots: !0,
    // autoplay: !0,
    // autoplayTimeout : 10000,
    onInitialize: firstStart,
    onTranslate: t,
    onTranslated: e
  });

  function firstStart() {
    $(".slide-progress").css({
      width: 0,
      transition: "width 0s"
    });
    setTimeout(() => {
      $(".slide-progress").css({
        width: "100%",
        transition: "width 9600ms"
      })
    }, 1000);
    startSlide();
  }

  var animationSlide = function (num) {
    setTimeout(() => {
        $('.system__title').eq(num).addClass('animate-fadeIn');
        $('.system__right').eq(num).addClass('animate-fadeIn');
      },
      500);

    setTimeout(() => {
        $('.system__subtitle').eq(num).addClass('animate-fadeIn');
      },
      1000);

    setTimeout(() => {
        $('.system__btns').eq(num).addClass('animate-fadeIn');
      },
      1500);
  }

  $('.owl-carousel').on('translate.owl.carousel', function (e) {

    var index = e.item.index;

    startSlide();

    $('.owl-stage').find('.animate-fadeIn').removeClass('animate-fadeIn');

    animationSlide(index);

  });

  var timeout;

  function startSlide() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $(".owl-carousel").trigger('next.owl.carousel');
    }, 10000);
  }

  // $('.owl-carousel').on('next.owl.carousel', function(e) {
  //   startSlide();
  // });
  // $('.system__bot-item:not(.active)').on('click', function() {
  //   startSlide();
  // });


});

// menu overlay
$('.header__nav-link').hover(function () {
  $('.overlay').toggleClass('overlay--display')
});

$('.menu__hover').hover(function () {
  $('.overlay').toggleClass('overlay--display')
});

// frame
// $(document).ready(function () {
//   $('#ifd').css({
//     'transform': 'scale(0.7)',
//     'transformOrigin': '0 0',
//     'minWidth': '100%',
//     'height': '100%'
//   });
// });
