
//Header navigation
let menu = document.querySelector('nav ul'); 
menu.addEventListener('click', (e) => {
    for (let i = 0; i < menu.childElementCount; i++) { 
        menu.children[i].children[0].classList.remove('nav__list__item-active');
    }
    e.target.classList.add('nav__list__item-active');
})

document.addEventListener('scroll', onScroll);

function onScroll(event) {
  const curPos = window.scrollY;
  const lis = document.querySelectorAll('section > a');
  const links = document.querySelectorAll('#nav__list a');

  lis.forEach((el) => {

    if (el.offsetTop <= curPos && (el.offsetTop + el.parentElement.offsetHeight) > curPos){
      links.forEach((a) => {
        a.classList.remove('nav__list__item-active');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)){
          a.classList.add('nav__list__item-active');
        }
        if (curPos >= document.body.scrollHeight - window.innerHeight){
          a.classList.remove('nav__list__item-active');
          document.querySelector('nav__list_contact').classList.add('nav__list__item-active');
        }
      });
    }
  });
}

//Portfolio. Switching tabs

let portfolioImages = document.querySelectorAll('.portfolio__img');
const tags = document.querySelector('.portfolio__nav');

tags.addEventListener('click', (event) => {
  if(event.target.tagName === "LI"){
    tags.querySelectorAll('.nav__tag').forEach(item => item.classList.remove('nav__tag_selected'));
    event.target.classList.add('nav__tag_selected');
    changeImg();
  }
  return;
});

function changeImg(){
  let images = [...document.querySelectorAll('.portfolio__img')];
  let imagesContainer = document.querySelector('.pictures__wrapper');
  let fragment = document.createDocumentFragment();

  while (images.length){
    let img = images.splice(Math.floor(Math.random() * images.length), 1)[0];
    fragment.append(img);
  }
  imagesContainer.append(fragment);
}

//Portfolio. Active image board
document.querySelector('.pictures__wrapper').addEventListener('click', (event) => {
    if (event.target.className === "portfolio__img"){
      document.querySelectorAll('.portfolio__img').forEach(item => item.classList.remove('portfolio__img_active'));
      event.target.classList.add('portfolio__img_active');
    }
    return;
});

// slider
// const left = document.querySelector('.slider__arrow__left');
// const right = document.querySelector('.slider__arrow__right');
// left.addEventListener('click', sliding);
// right.addEventListener('click', sliding);
// function sliding() {
//     const first = document.querySelector('.slider');
//     const second = document.querySelector('.slider-second');
//     if (second.classList.contains('hidden')) {
//         first.classList.add('hidden');
//         second.classList.remove('hidden');
//     } else {
//         first.classList.remove('hidden');
//         second.classList.add('hidden');
//     }
// }

let slides = document.querySelectorAll('.section__slider .slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showSlide(direction) {
    slides[currentSlide].classList.add('next', direction);
    slides[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
}

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
}

document.querySelector('.slider__arrow__left').addEventListener('click', function() {
    if (isEnabled) {
        previousSlide(currentSlide);
    }
});

document.querySelector('.slider__arrow__right').addEventListener('click', function() {
    if (isEnabled) {
        nextSlide(currentSlide);
    }
});


//Switch phone screen
let verticalIphone = document.querySelector('.vertical-phone__button');
let blackScreenVertical = document.querySelector('.vertical-phone');

verticalIphone.addEventListener('click', (event) => {
blackScreenVertical.classList.toggle('offScreen');
});

let horizontalIphone = document.querySelector('.horizontal-phone__button');
let blackScreenHorizontal = document.querySelector('.horizontal-phone');

horizontalIphone.addEventListener('click', (event) => {
blackScreenHorizontal.classList.toggle('offScreen');
})

const verticalPhone = document.getElementById('vertical-phone'); 
const horizontalPhone = document.getElementById('horizontal-phone'); 
verticalPhone.addEventListener('click', () => event.target.style.opacity = event.target.style.opacity == 0 ? 1 : 0);
horizontalPhone.addEventListener('click', () => event.target.style.opacity = event.target.style.opacity == 0 ? 1 : 0);


// Submiting form

document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();
  let subject = document.querySelector('.subject').value;
  subject = subject === '' ? "Без темы" : "Тема: " + subject;
  if (document.querySelector('.name').checkValidity() && document.querySelector('.email').checkValidity()){
    document.querySelector('.modal__subject').innerHTML = '';
    document.querySelector('.modal__subject').innerHTML = subject;
    let description = document.querySelector('.form__textarea_value').value;
    description = description === '' ? "Без описания" : "Описание: " + description;
    document.querySelector('.modal__description').innerHTML = '';
    document.querySelector('.modal__description').innerHTML = description;
    document.querySelector('.quote__modal').style.display = "block";
  }
})

document.querySelector('.modal__footer .button').addEventListener('click', (event) => {
  subject = '';
  description = '';
  document.querySelector('.subject').value = '';
  document.querySelector('.form__textarea_value').value = '';
  document.querySelector('.name').value = '';
  document.querySelector('.email').value = '';
  document.querySelector('.quote__modal').style.display = "none";
})
