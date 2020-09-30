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
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass)
    .siblings()
    .removeClass(activeClass);
};

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





















