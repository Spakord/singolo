window.onload = () => {
  addMenuActiveLinksHandler();
  addMenuScrollHandler();
  addPhoneDisplayHandler();
  addPortfolioFilterHandler();
  addPortfolioItemHandler();
  addModalWindowContactFormHandler();
  // addSliderHandler();
  burgerMenuHandler();
}

const addMenuActiveLinksHandler = () => {
  const menuLinks = document.querySelectorAll('.nav__link');
  menuLinks.forEach(item => {
    item.addEventListener('click', (event) => {
      menuLinks.forEach(link => link.classList.remove('nav_active'));
      event.target.classList.add('nav_active');
    })
  });
}

const addMenuScrollHandler = () => {
  const sections = document.querySelectorAll('section');
  const menuLinks = document.querySelectorAll('.nav__link');
  document.addEventListener('scroll', (event) => {
    let cursorPositionY = window.scrollY + 75;
    sections.forEach(item => {
      if (item.offsetTop <= cursorPositionY && (item.offsetTop + item.offsetHeight) > cursorPositionY) {
        menuLinks.forEach(link => {
          link.classList.remove('nav_active');
          if (item.getAttribute('id') === link.getAttribute('href').substring(1)) {
            link.classList.add('nav_active');
          } else if (item.getAttribute('id') === 'slider' && link.getAttribute('href') === '#') {
            link.classList.add('nav_active');
          } else if (cursorPositionY + 1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight && link.getAttribute('href') === '#contacts') {
            menuLinks.forEach(link => {
              link.classList.remove('nav_active');
            })
            link.classList.add('nav_active');
          }
        })
      }
    })
  })
}


const addPhoneDisplayHandler = () => {
  const phones = document.querySelectorAll('.phone');
  phones.forEach(phone => {
    phone.addEventListener('click', (event) => {
      if (event.target.classList.contains('phone__shadow')) return;
      const display = phone.querySelector('.phone__display');
      display.classList.toggle('phone__display_showed');
    });
  })
}

const addPortfolioFilterHandler = () => {
  const filterTags = document.querySelectorAll('.nav__tag');
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio__item'));
  const portfolioFilter = document.querySelector('.portfolio__nav');
  const portfolioLayout = document.querySelector('.portfolio__pictures__wrapper');
  portfolioFilter.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__tag') && !event.target.classList.contains('nav__tag_active')) {
      filterTags.forEach(tag => tag.classList.remove('nav__tag_active'));
      event.target.classList.add('nav__tag_active');
      portfolioItems.unshift(portfolioItems.pop());
      while (portfolioLayout.firstElementChild) {
        portfolioLayout.removeChild(portfolioLayout.firstElementChild);
      }
      portfolioItems.forEach(item => {
        portfolioLayout.append(item);
      })
    }
  })
}

const addPortfolioItemHandler = () => {
  const portfolioItems = document.querySelectorAll('.portfolio__item');
  document.querySelector('.portfolio__pictures__wrapper').addEventListener('click', (event) => {
    if (event.target.classList.contains('portfolio__item')) {
      portfolioItems.forEach(item => item.classList.remove('portfolio__item_active'))
      event.target.classList.add('portfolio__item_active');
    }
  })
}

const addModalWindowContactFormHandler = () => {
  document.querySelector('.contacts__form').addEventListener('submit', (event) => {
    event.preventDefault();
    let subject = document.querySelector('.contacts__form__subject').value;
    let message = document.querySelector('.contacts__form__message').value;
    subject = subject ? `Тема: ${subject}` : `Нет темы`;
    message = message ? `Описание: ${message}` : `Нет описания`;
    let modal = createModal(subject, message);
    document.body.append(modal);
    document.contacts__form.reset();
    closeModal(modal);
  });
}

const createModal = (subject, message) => {
  const layout = document.createElement('div');
  layout.classList.add('layout');
  let template = `
  <div class="modal">
    <h3 class="modal__sent">Письмо отправлено</h3>
    <p class="modal__subject"></p>
    <p class="modal__message"></p>
    <button class="modal_close">OK</button>
  </div>`;
  layout.innerHTML = template;
  const divSubject = layout.querySelector('.modal__subject');
  const divMessage = layout.querySelector('.modal__message');
  divSubject.innerText = subject;
  divMessage.innerText = message;
  return layout;
}

const closeModal = (modal) => {
  modal.querySelector('.modal_close').addEventListener('click', (event) => {
    modal.remove();
  })
}

// const addSliderHandler = () => {
//   let isEnabled = true;
//   const slides = Array.from(document.querySelectorAll('.slider__item'));
//   const leftArrow = document.querySelector('.slider__arrow__left');
//   const rightArrow = document.querySelector('.slider__arrow__right');
//   const sliderContainer = document.querySelector('.slider__container');

//   let currentSlide = 0;
//   let position = 0;
//   leftArrow.addEventListener('click', (event) => {
//     if (!isEnabled) return false;
//     isEnabled = false;
//     currentSlide = slideTransform('left', currentSlide, slides);
//   })
//   rightArrow.addEventListener('click', (event) => {
//     if (!isEnabled) return false;
//     isEnabled = false;
//     currentSlide = slideTransform('right', currentSlide, slides);
//   })

//   const slideTransform = (direction, currentSlide, slides) => {
//     let step = sliderContainer.offsetWidth;
//     if (direction === 'left') {
//       position--;
//       if (currentSlide - 1 < 0) currentSlide = slides.length - 1;
//       else currentSlide = currentSlide - 1;
//       slides[currentSlide].style.transform = `translateX(${(-position)* step - currentSlide * step}px)`
//       sliderContainer.style.transform = `translateX(${position * step}px)`
//       setTimeout(() => isEnabled = true, 600);
//     }
//     if (direction === 'right') {
//       position++;
//       if (currentSlide + 1 > slides.length - 1) currentSlide = 0;
//       else currentSlide = currentSlide + 1;
//       slides[currentSlide].style.transform = `translateX(${(-position)* step - currentSlide * step}px)`
//       sliderContainer.style.transform = `translateX(${position * step}px)`;
//       setTimeout(() => isEnabled = true, 600);
//     }
//     return currentSlide;
//   }
// }

let slides = document.querySelectorAll('.section__slider .slider__item');
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


const burgerMenuHandler = () => {
  const burgerButton = document.querySelector('.burger_button');
  const mobileMenuBG = document.querySelector('.header__mobile_background');
  const menuItems = document.querySelectorAll('.nav__item');

  burgerButton.addEventListener('click', drawMenu);
  mobileMenuBG.addEventListener('click', drawMenu);
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', drawMenu);
  })

}

const drawMenu = () => {
  const burgerButton = document.querySelector('.burger_button');
  const menu = document.querySelector('.nav');
  const logo = document.querySelector('.header__logo');
  const mobileMenuBG = document.querySelector('.header__mobile_background');

  burgerButton.classList.toggle('burger_button_active');
  menu.classList.toggle('nav_active');
  logo.classList.toggle('logo_to-left');
  mobileMenuBG.classList.toggle('header__mobile_background_active');
}