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
});
