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
const accordions = document.querySelectorAll('.faq__accordion-item button');
const accordionItems = document.querySelectorAll('.faq__accordion-item');

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

// faq__tab-button
accordionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedTab = tab.dataset.tab;

    accordionTabs.forEach((btn) => btn.classList.toggle('faq__tab-button--active', btn === tab));

    accordionLists.forEach((list) => {
      list.classList.toggle('hidden', list.dataset.tab !== selectedTab);
    });

    tab.classList.add('no-hover');
    setTimeout(() => {
      tab.classList.remove('no-hover');
    }, 1000);
  });
});

// faq__accordion-item--open
function toggleAccordion(button) {
  const item = button.closest('.faq__accordion-item');
  const content = item.querySelector('p');

  if (item.classList.contains('faq__accordion-item--open')) {
    content.style.maxHeight = null;
    item.classList.remove('faq__accordion-item--open');
  } else {
    content.style.maxHeight = `${content.scrollHeight }px`;
    item.classList.add('faq__accordion-item--open');
  }

  button.setAttribute(
    'aria-expanded',
    item.classList.contains('faq__accordion-item--open')
  );

  saveAccordionState();
}

accordions.forEach((button) => {
  button.addEventListener('click', () => {
    toggleAccordion(button);
  });
});

function saveAccordionState() {
  const state = {};
  accordionLists.forEach((list) => {
    const tabName = list.dataset.tab;
    state[tabName] = [];

    const items = list.querySelectorAll('.faq__accordion-item');
    items.forEach((item, index) => {
      state[tabName][index] = item.classList.contains('faq__accordion-item--open');
    });
  });

  sessionStorage.setItem('faqState', JSON.stringify(state));
}

function restoreAccordionState(tabName) {
  const savedState = sessionStorage.getItem('faqState');
  if (!savedState) {
    return;
  }

  const state = JSON.parse(sessionStorage.getItem('faqState'));
  if (!state || !state[tabName]) {
    return;
  }

  const content = document.querySelector(`.faq__accordion-list[data-tab="${tabName}"]`);
  if (!content) {
    return;
  }

  content.querySelectorAll('.faq__accordion-item').forEach((item, index) => {
    if (state[tabName][index]) {
      item.classList.add('faq__accordion-item--open');
    } else {
      item.classList.remove('faq__accordion-item--open');
    }
  });
}
