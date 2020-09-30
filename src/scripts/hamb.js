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