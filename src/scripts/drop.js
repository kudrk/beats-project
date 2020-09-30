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
