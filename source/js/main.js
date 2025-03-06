// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

// scrollButton
const scrollButton = document.querySelector('.hero__button');
const priceSection = document.querySelector('.prices');

scrollButton.addEventListener("click", () => {
  priceSection.scrollIntoView({ behavior: "smooth" });
});

// video
document.addEventListener("DOMContentLoaded", () => {
  const videoWrapper = document.querySelector(".video");
  const playButton = videoWrapper.querySelector(".video__play");
  const videoContainer = videoWrapper.querySelector(".video__container");

  playButton.addEventListener("click", () => {
    const videoId = videoContainer.dataset.videoId;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    videoContainer.innerHTML = ""; // Очистка контейнера
    videoContainer.appendChild(iframe); // Добавление iframe

    playButton.remove(); // Удаляем кнопку после клика
  });
});

// tabs
const tabButtons = document.querySelectorAll('.tabs__button');
const cardLists = document.querySelectorAll('.tabs__card-list');

tabButtons.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedPeriod = tab.dataset.period;

    // Убираем активный класс у всех кнопок и добавляем только на кликнутую
    tabButtons.forEach((btn) => btn.classList.toggle("active", btn === tab));

    // Переключаем списки цен
    cardLists.forEach((list) => {
      list.classList.toggle("hidden", list.dataset.period !== selectedPeriod);
    });
  });
});

// accordion
document.faq__accordion-item.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling; // Получаем следующий элемент (ответ)
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    // скрываем
    button.setAttribute('aria-expanded', !isOpen);
    answer.classList.toggle('active');
  });
});
