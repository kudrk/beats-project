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



