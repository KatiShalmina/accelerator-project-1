// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

const scrollButton = document.querySelector('.hero__button');
const priceSection = document.querySelector('.price');
const tabButtons = document.querySelectorAll('.tabs__button');
const cardLists = document.querySelectorAll('.tabs__card-list');
const accordionTabs = document.querySelectorAll('.faq__tab-button');
const accordionLists = document.querySelectorAll('.faq__accordion-list');
const accordionItems = document.querySelectorAll('.faq__accordion-item');
const accordionState = {};

// scrollButton
scrollButton.addEventListener('click', () => {
  priceSection.scrollIntoView({ behavior: 'smooth' });
});

// video
document.addEventListener('DOMContentLoaded', () => {
  const videoWrapper = document.querySelector('.video');
  const playButton = videoWrapper.querySelector('.video__play');
  const videoContainer = videoWrapper.querySelector('.video__container');

  playButton.addEventListener('click', () => {
    const videoId = videoContainer.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);

    playButton.remove();
  });
});

// price__tabs
tabButtons.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedPeriod = tab.dataset.period;

    tabButtons.forEach((btn) => btn.classList.toggle('tabs__button--active', btn === tab));

    cardLists.forEach((list) => {
      list.querySelectorAll('.tabs__card').forEach((card) => {
        card.classList.add('hidden');
      });
    });

    document.querySelectorAll(`.tabs__card-list[data-period="${selectedPeriod}"] .tabs__card`).forEach((card) => {
      card.classList.remove('hidden');
    });
  });
});

// card__price::before
document.querySelectorAll('.card__price').forEach((price) => {
  price.dataset.price = price.textContent;
});

// accordion
accordionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedTab = tab.dataset.tab;

    accordionTabs.forEach((btn) => btn.classList.toggle('faq__tab-button--active', btn === tab));

    accordionLists.forEach((list) => {
      list.classList.toggle('hidden', list.dataset.tab !== selectedTab);
    });
  });
});

// no-hover
accordionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.classList.add('no-hover');

    setTimeout(() => {
      tab.classList.remove('no-hover');
    }, 1000);
  });
});
