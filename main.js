//hamburger menu

const closeMenu = $('#menu__croce');
const hamburger = $('#hamburger');
const closeOverlay = $('.menu__link')

$(document).ready(() => {

  hamburger.on('click', e => {
    $(e.currentTarget).closest('.wrapper').next('.menu-mobile').toggleClass('menu_fullscreen');

  });
  hamburger.on('click', e => {
    $(e.currentTarget).closest('#no-scroll').addClass('no-scroll');
  });
  closeMenu.on('click', e => {
    $(e.currentTarget).closest('.menu-mobile').removeClass('menu_fullscreen');
    $(e.currentTarget).closest('#no-scroll').removeClass('no-scroll');
  });
  closeOverlay.on('click', e => {
    $(e.currentTarget).closest('.menu-mobile').removeClass('menu_fullscreen');
    $(e.currentTarget).closest('#no-scroll').removeClass('no-scroll');
  });
});



// drop первый вариант

// $(document).ready(() => {
//   $('.name').on('click', e => {
//     const drop = $(e.currentTarget).nextAll('.mini-drop');
//     const curElement = $(e.currentTarget).closest('.crew-section__item');
//     const activeElement = $('.crew-section__item.active');
//     const dropActive = activeElement.find('.mini-drop');

//     if (activeElement.length > 0) {
//       activeElement.removeClass('active');
//       dropActive.slideToggle();
//     }
//     if (!activeElement.length > 0 || activeElement.find('.name') !== $(e.currentTarget)) {
//       curElement.addClass('active');
//       drop.slideToggle();
//     }
//   })
// });


//drop новый вариант

$(document).ready(() => {

  $('.name').on('click', e => {

    $(e.currentTarget).closest('.crew-section__item').toggleClass('crew-section__item_active');

    const activeCrew = $('.crew-section__item_active');
    if (activeCrew.length > 0) {
      activeCrew.siblings('.crew-section__item').removeClass('crew-section__item_active');
      $(e.currentTarget).closest('.crew-section__item').addClass('crew-section__item_active');
    }
  });
});


//slideshow

$(document).ready(() => {
  const findBlockByElias = (alias) => {
    return $('.rev').filter((ndx, item) => {
      return $(item).attr('data-slide') === alias;
    });
  };

  $('.photo-gallery__link').click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const currentLi = $this.closest('.photo-gallery__item');
    const target = $this.attr('data-open');
    const curSlide = findBlockByElias(target);

    curSlide.addClass('active').siblings().removeClass('active');

    currentLi.addClass('active').siblings().removeClass('active');
  });
});



//slider

const slider = $('.section-slider__list').bxSlider({
  pager: false,
  controls: false
});


$('.arrow_type_left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$('.arrow_type_right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})



//form
const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}


$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");
  modal.removeClass("error-modal");


  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      success: data => {
        content.text(data.message);
        $.fancybox.open({
          src: "#modal",
          type: "inline",
        });
      },
      error: data => {
        const message = data.responseJSON.message;
        content.text(message);
        modal.addClass("error-modal");

        $.fancybox.open({
          src: "#modal",
          type: "inline",
        });
      }
    });
  }
});

$(".close-modal").click(e => {
  e.preventDefault();

  $.fancybox.close();
})

//colors

$(document).ready(() => {

  $('.colors-section__trigger').on('click', e => {
    e.preventDefault();

    $(e.currentTarget).closest('.colors-section__item').toggleClass('colors-section__item_active');

    const activeDesc = $('.colors-section__item_active');
    if (activeDesc.length > 0) {
      activeDesc.siblings('.colors-section__item').removeClass('colors-section__item_active');
      $(e.currentTarget).closest('.colors-section__item').addClass('colors-section__item_active');
    }
  });
});


//player

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '405',
    width: '660',
    videoId: 'gvYNxcZQ3B4',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}


//maps

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.937197, 30.365578],
    zoom: 12,
    controls: []
  });
  let coords = [
    [59.958122, 30.300003],
    [59.920913, 30.314423],
    [59.911956, 30.503647],
    [59.928479, 30.371114],
  ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);



//ops
const sections = $(".section");
const display = $(".main-content");
const sideMenu = $(".fixed__list");
let inScroll = false;
const menuItems = sideMenu.find(".fixed__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;
  if (isNaN(position)) {
    return 0;
  }
  return position;
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass)
    .siblings()
    .removeClass(activeClass);
}

const performTransition = (sectionEq) => {
  if (inScroll) return;
  const transitionHover = 1000;
  const mouseInertionHover = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed__item_active");
  }, transitionHover + mouseInertionHover);
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};


$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    //next section
    scroller.next();
  }
  if (deltaY < 0) {
    //prev sesction
    scroller.prev();
  }
});

//scroll клавиатурой
$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInputs = tagName === "input" || tagName === "textarea"

  if (userTypingInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller.prev();
      break;

    case 40:
      scroller.next();
      break;
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});


if (isMobile) {
  //touch устройства https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
}





















