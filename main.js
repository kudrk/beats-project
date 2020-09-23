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


// drop !!!!!!!!!!!!

$(document).ready(() => {
  $('.name').on('click', e => {
    let drop = $(e.currentTarget).nextAll('.mini-drop');
    drop.slideToggle();

    const name = $('.name');
    const more = $(e.currentTarget).next('.more');

    if (name.hasClass('active')) {
      $(more).css({
        'transform': 'rotate(0deg)'
      });
      $(e.currentTarget).removeClass('active');
    } else {
      $(more).css({
        'transform': 'rotate(180deg)'
      });
      $(e.currentTarget).addClass('active');
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

    // const item = $(e.currentTarget).closest('.colors-section__item');
    // $('.colors-section__item').filter(() => {
    //   (item).removeClass('colors-section__item_active');
    // }
    // if (item.hasClass('colors-section__item_active')) {
    //   $(e.currentTarget).closest().removeClass('colors-section__item_active');
    // }
  });
});


