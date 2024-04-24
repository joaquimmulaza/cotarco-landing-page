var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

var swipper4 = new Swiper(".mySwiper4", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swipper3 = new Swiper(".mySwiper3", {
  loop: true,
  spaceBetween: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swipper4,
  },
});

//MOBILE
var swipper5 = new Swiper(".mySwiper5", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swipper6 = new Swiper(".mySwiper6", {
  loop: true,
  spaceBetween: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swipper5,
  },
});

//ELECTRODOMESTICO
var swipper7 = new Swiper(".mySwiper7", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swipper8 = new Swiper(".mySwiper8", {
  loop: true,
  spaceBetween: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swipper7,
  },
});