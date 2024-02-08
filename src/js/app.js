import * as flsFunctions from "./modules/functions.js";
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';

flsFunctions.isWebp();

// correct ratio
function forcedOriginalScale(containerClass) {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (!isMobile) {
    var App = document.querySelector(containerClass);
    App.style.zoom = 1 / devicePixelRatio;
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function() {
    forcedOriginalScale('.wrapper');
  }
);

// swiper

Swiper.use([Navigation, Pagination]);

new Swiper('.plans-items', {
  slidesPerView: "auto",
  spaceBetween: 20,
  // centeredSlides: true,
  pagination: {
    el: '.plans-pagination',
  },
  breakpoints: {
    992: {
      spaceBetween: 30,
    }
  },
});

// mobile menu

document.addEventListener("DOMContentLoaded", function() {
  var btnMenu = document.querySelector('.btn-menu');
  var mobileMenu = document.querySelector('.mobile-menu');
  var menuLinks = document.querySelectorAll('.menu__item-link');

  btnMenu.addEventListener('click', function() {
    btnMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  document.addEventListener('click', function(event) {
    var target = event.target;

    if (!mobileMenu.contains(target) && !btnMenu.contains(target)) {
      btnMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });

  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      btnMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
});


