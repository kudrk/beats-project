//hamburger menu

const overlay = document.getElementById('menu');
const closeMenu = document.getElementById('menu__croce');
const hamburger = document.querySelector('.hamburger');
const noscroll = document.querySelector('#no-scroll');


document.getElementById('hamburger').addEventListener('click', function () {
  overlay.classList.add('menu_fullscreen');
  document.getElementById('no-scroll');
  noscroll.classList.add('no-scroll');
});

document.getElementById('menu__croce').addEventListener('click', function () {
  overlay.classList.remove('menu_fullscreen');
  document.getElementById('no-scroll');
  noscroll.classList.remove('no-scroll');
})


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


//player all

const video = document.querySelector('#player__video');
const playback = $('.player__playback');
const player = $('.player');
const play = document.querySelector('#play');
const splash = document.querySelector('#splash');
const start = $('.player__start');

play.addEventListener('click', e => {
  player.toggleClass('active');
  start.toggleClass('act');
  if (video.paused) {
    video.play()
  }
  else {
    video.pause()
  }
});

splash.addEventListener('click', e => {
  player.toggleClass('active');
  start.toggleClass('act');
  if (video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
});


//звук
const sound = document.querySelector('#volume');
const max_sound = 100;
sound.min = 0;
sound.max = max_sound;

sound.addEventListener('mouseup', e => {
  video.volume = sound.value / max_sound;
});


//беззвуч
const mute = document.querySelector('#mute');
let numOfClicks = 0;
mute.addEventListener('click', e => {
  ++numOfClicks;
  if (numOfClicks % 2 !== 0) {
    video.muted = true
  } else {
    video.muted = false
  };
});


//продолжительность

durationControl = document.querySelector('#durationLevel');
interval = setInterval(updateDuration);

durationControl.min = 0;
durationControl.value = 0;

durationControl.addEventListener('mousedown', e => {
  video.pause();
  clearInterval(interval);
});

durationControl.addEventListener('mouseup', e => {
  video.currentTime = durationControl.value;
  interval = setInterval(updateDuration);
});

function updateDuration() {
  durationControl.value = video.currentTime;
};


//вариант player youtube

// let player;
// const playerContainer = $(".player");


// let eventsInit = () => {
//   $(".player__start").click(e => {
//     e.preventDefault();

//     if (playerContainer.hasClass("paused")) {
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
//   });

//   $(".player__playback").click(e => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;

//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

//     $(".player__playback-button").css({
//       left: `${newButtonPositionPercent}%`
//     });

//     player.seekTo(newPlaybackPositionSec);
//   });

//   $(".player__splash").click(e => {
//     player.playVideo();
//   })
// };


// const formatTime = timeSec => {
//   const roundTime = Math.round(timeSec);

//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);

//   function addZero(num) {
//     return num < 10 ? `0${num}` : num;
//   }

//   return `${minutes} : ${seconds}`;
// };


// const onPlayerReady = () => {
//   let interval;
//   const durationSec = player.getDuration();

//   $(".player__duration-estimate").text(formatTime(durationSec));

//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;

//     $(".player__playback-button").css({
//       left: `${completedPercent}%`
//     });

//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// };

// const onPlayerStateChange = event => {
//   switch (event.data) {
//     case 1: //pause
//       playerContainer.addClass("active");
//       playerContainer.addClass("paused");
//       break;

//     case 2: //play
//       playerContainer.removeClass("active");
//       playerContainer.removeClass("paused");
//       break;
//   }
// };

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: '390',
//     width: '660',
//     videoId: 'gvYNxcZQ3B4',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 1,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 1
//     }
//   });
// }

// eventsInit();


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
const menuItems = sideMenu.find(".fixed__item")


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

$(".wrapper").on("toucmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

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





















