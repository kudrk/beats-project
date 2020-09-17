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

// drop

$(document).ready(() => {

  $('.more').on('click', e => {
    let drop = $(e.currentTarget).next();
    drop.slideToggle();

    const more = $('.more');

    if (more.hasClass('active')) {
      $(e.currentTarget).css({
        'transform': 'rotate(0deg)'
      });
      $(e.currentTarget).removeClass('active');
    } else {
      $(e.currentTarget).css({
        'transform': 'rotate(180deg)'
      });
      $(e.currentTarget).addClass('active');
    }
  });
});

// $(document).ready(() => {
//   $('.crew-section__img').prependTo('.mini-drop');

// });