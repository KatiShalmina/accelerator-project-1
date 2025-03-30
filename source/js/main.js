import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const scrollButton = document.querySelector('.hero__button');
const priceSection = document.querySelector('.price');
const tabButtons = document.querySelectorAll('.tabs__button');
const cardLists = document.querySelectorAll('.tabs__card-list');
const accordionTabs = document.querySelectorAll('.faq__tab-button');
const accordionLists = document.querySelectorAll('.faq__accordion-list');
const accordions = document.querySelectorAll('.faq__accordion-item button');
const form = document.querySelector('.request__form-wrapper form');

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
    content.style.maxHeight = 'none';
    requestAnimationFrame(() => {
      const height = content.scrollHeight;
      content.style.maxHeight = `${height}px`;
    });

    item.classList.add('faq__accordion-item--open');
  }

  button.setAttribute(
    'aria-expanded',
    item.classList.contains('faq__accordion-item--open')
  );

  saveAccordionState();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq__accordion-item--open p').forEach((content) => {
    requestAnimationFrame(() => {
      content.style.maxHeight = `${content.scrollHeight}px`;
    });
  });
});

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
}

// form:invalid
form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    form.classList.add('was-validated');
  }
});

// jury-slider
document.addEventListener('DOMContentLoaded', () => {
  const jurySlider = new Swiper('.jury__slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
      nextEl: '.slider-jury__button--next',
      prevEl: '.slider-jury__button--prev',
    },
    allowTouchMove: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
      1366: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
    },
  });
});

// slider-jury__slide:hover
document.addEventListener('DOMContentLoaded', () => {
  const juryData = [
    {
      id: 1,
      name: 'Aнна Павлова',
      position: 'CrossFit',
      achievements: [
        'Certified Level 1 Trainer',
        'Победитель чемпионата Казахстана по CrossFit',
        'Опыт — 8 лет'
      ],
    },
    {
      id: 2,
      name: 'Алексей Лавров',
      position: 'CrossFit',
      achievements: [
        'Certified Level 2 Trainer',
        'Победитель чемпионата Камчатки по CrossFit',
        'Опыт — 4 года'
      ],
    },
    {
      id: 3,
      name: 'Александр Пашков',
      position: 'CrossFit',
      achievements: [
        'Certified Level 3 Trainer',
        'Победитель чемпионата России по CrossFit',
        'Опыт — 6 лет'
      ],
    },
    {
      id: 4,
      name: 'Мария Кетова',
      position: 'CrossFit',
      achievements: [
        'Certified Level 4 Trainer',
        'Победитель чемпионата Астрахани по CrossFit',
        'Опыт — 7 лет'
      ],
    },
    {
      id: 5,
      name: 'София Михайлова',
      position: 'CrossFit',
      achievements: [
        'Certified Level 5 Trainer',
        'Победитель чемпионата Геленджика по CrossFit',
        'Опыт — 11 лет'
      ],
    },
    {
      id: 6,
      name: 'Сергей Бедный',
      position: 'CrossFit',
      achievements: [
        'Certified Level 3 Trainer',
        'Победитель чемпионата Керчи по CrossFit',
        'Опыт — 3 года'
      ],
    },
    {
      id: 7,
      name: 'Юрий Марков',
      position: 'CrossFit',
      achievements: [
        'Certified Level 7 Trainer',
        'Победитель чемпионата Удмуртии по CrossFit',
        'Опыт — 2 года'
      ],
    },
    {
      id: 8,
      name: 'Надежда Беляева',
      position: 'CrossFit',
      achievements: [
        'Certified Level 2 Trainer',
        'Победитель чемпионата Чувашии по CrossFit',
        'Опыт — 9 лет'
      ],
    }
  ];

  const addTrainerInfo = (slide, trainer) => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const name = document.createElement('h3');
    name.innerText = trainer.name;
    overlay.appendChild(name);

    const position = document.createElement('p');
    position.classList.add('position');
    position.innerText = trainer.position;
    overlay.appendChild(position);

    const achievements = document.createElement('ul');
    achievements.classList.add('achievements');
    trainer.achievements.forEach((achievement) => {
      const li = document.createElement('li');
      li.innerText = achievement;
      achievements.appendChild(li);
    });
    overlay.appendChild(achievements);

    slide.appendChild(overlay);
  };

  const slides = document.querySelectorAll('.slider-jury__slide');
  slides.forEach((slide) => {
    const trainerId = slide.getAttribute('data-trainer');
    const trainerData = juryData.find((trainer) => trainer.id === trainerId);

    if (trainerData) {
      addTrainerInfo(slide, trainerData);
    }
  });
});

// slider-review
document.addEventListener('DOMContentLoaded', () => {
  const reviewSlider = new Swiper('.reviews__slider', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
      nextEl: '.slider-review__button--next',
      prevEl: '.slider-review__button--prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1366: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
    },
    on: {
      init: function () {
        const nextButton = document.querySelector('.slider-review__button--next');
        const prevButton = document.querySelector('.slider-review__button--prev');

        prevButton.classList.add('swiper-button-disabled');

        this.on('slideChange', () => {
          if (this.isBeginning) {
            prevButton.classList.add('swiper-button-disabled');
          } else {
            prevButton.classList.remove('swiper-button-disabled');
          }

          if (this.isEnd) {
            nextButton.classList.add('swiper-button-disabled');
          } else {
            nextButton.classList.remove('swiper-button-disabled');
          }
        });
      },
    },
  });
});
