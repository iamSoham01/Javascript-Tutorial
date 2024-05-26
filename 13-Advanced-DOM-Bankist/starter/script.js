'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const allNavLinks = document.querySelectorAll(`.nav__link`);
const navLinks = document.querySelector(`.nav__links`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const header = document.querySelector(`.header`);
const allSections = document.querySelectorAll(`.section`);
const slides = document.querySelectorAll(`.slide`);


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener(`click`, function() {
  section1.scrollIntoView({behavior: `smooth`});
})

// Event Delegation
navLinks.addEventListener(`click`, function(e) {

  e.preventDefault();

  // Matching Strategies
  if(e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({behavior: `smooth`});
  }

});


tabsContainer.addEventListener(`click`, function(e) {

  const clicked = e.target.closest(`.operations__tab`);

  // Guard Class
  if(!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove(`operations__tab--active`));
  
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));

  
  clicked.classList.add(`operations__tab--active`);

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add(`operations__content--active`);

})

const navHoverEffect = function(e) {

  if(e.target.classList.contains(`nav__link`)){
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);

    siblings.forEach(el => {
      if(el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }

};

nav.addEventListener(`mouseover`, navHoverEffect.bind(0.5));
nav.addEventListener(`mouseout`, navHoverEffect.bind(1));


const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) {
    nav.classList.add(`sticky`);
  }else {
    nav.classList.remove(`sticky`);
  }

}

const options = { 
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

// Reveal Section
const revealSection = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll(`img[data-src]`);

const loadImg = function(entries) {

  const [entry] = entries;
  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener(`load`, function(){
    entry.target.classList.remove(`lazy-img`);
  })

  imgObserver.unobserve(entry.target);

}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `-200px`
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = document.querySelector(`.slide`);
const btnLeft = document.querySelector(`.slider__btn--left`);
const btnRight = document.querySelector(`.slider__btn--right`);
let currentSlide = 0;
const maxSlides = slides.length;

slider.style.transform = `scale(0.2) translateX(-800px)`;
slider.style.overflow = `visible`;

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100*(i-slide)}%)`);
}
goToSlide(0);

const nextSlide = function() {
  if(currentSlide === maxSlides - 1) currentSlide=0;
  else currentSlide++;
  goToSlide(currentSlide);
}

const prevSlide = function() {
  if(currentSlide === 0) currentSlide = maxSlides - 1;
  currentSlide--;
  goToSlide(currentSlide);
}

btnRight.addEventListener(`click`, nextSlide);
btnLeft.addEventListener(`click`, prevSlide);