let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .items'); // Ensure selector matches HTML
let countItem = items.length;
let active = 1;
let other_1 = null;
let other_2 = null;
let isAnimating = false;

next.onclick = () => {
  if (isAnimating) return;
  isAnimating = true;

  carousel.classList.remove('prev');
  carousel.classList.add('next');

  active = active + 1 >= countItem ? 0 : active + 1;
  other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
  other_2 = active + 1 >= countItem ? 0 : active + 1;

  changeSlider();

  setTimeout(() => {
    isAnimating = false;
  }, 500);
};

prev.onclick = () => {
  if (isAnimating) return;
  isAnimating = true;

  carousel.classList.remove('next');
  carousel.classList.add('prev');

  active = active - 1 < 0 ? countItem - 1 : active - 1;
  other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
  other_2 = active + 1 >= countItem ? 0 : active + 1;

  changeSlider();

  setTimeout(() => {
    isAnimating = false;
  }, 500);
};

const changeSlider = () => {
  let itemOldActive = document.querySelector('.carousel .items.active');
  if (itemOldActive) itemOldActive.classList.remove('active');

  let itemOldOther1 = document.querySelector('.carousel .items.other_1');
  if (itemOldOther1) itemOldOther1.classList.remove('other_1');

  let itemOldOther2 = document.querySelector('.carousel .items.other_2');
  if (itemOldOther2) itemOldOther2.classList.remove('other_2');

  // Reset animations for images and captions
  items.forEach(e => {
    let img = e.querySelector('.image img');
    let caption = e.querySelector('.image figcaption');

    if (img) {
      img.style.animation = 'none';
      void img.offsetWidth; // force reflow
      img.style.animation = '';
    }
    if (caption) {
      caption.style.animation = 'none';
      void caption.offsetWidth;
      caption.style.animation = '';
    }
  });

  items[active].classList.add('active');
  items[other_1].classList.add('other_1');
  items[other_2].classList.add('other_2');

  // Reset auto-play interval if you are using it
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    next.click();
  }, 5000);
};

let autoPlay = setInterval(() => {
  next.click();
}, 5000);
