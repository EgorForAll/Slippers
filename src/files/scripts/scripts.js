import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

const oldPrice = document.querySelector(".inro-main__new-price");
oldPrice.innerHTML = "R 250.00";
const newPrice = document.querySelector(".inro-main__new-price");
newPrice.innerHTML = "R 160.00";
const timerCount = document.querySelector(".inro-main__time-count");

var time = 3600;

const updateCountDown = () => {
  let minutes = Math.floor(time / 60);
  let hours = Math.floor(minutes / 60);
  let seconds = time % 60;
  seconds < 10 ? "0" + seconds : seconds;
  timerCount.innerHTML = `${hours}:${minutes}:${seconds}`;
  time--;
  if (time === 0) {
    alert("Время вышло");
    clearInterval(interval);
    timerCount.innerHTML = `00:00`;
  }
};

const interval = setInterval(updateCountDown, 1000);
