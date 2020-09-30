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