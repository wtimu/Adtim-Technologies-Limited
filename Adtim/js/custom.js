// custom.js
(() => {
  'use strict';

  // Navigation Scroll Effect
  const handleNavScroll = () => {
    const navWrapper = document.querySelector('.nav-wrapper');
    window.addEventListener('scroll', () => {
      navWrapper.classList.toggle('scrolled', window.scrollY > 50);
    });
  };

  // Initialize Owl Carousel
  const initOwlCarousel = () => {
    $(document).ready(() => {
      $('.owl_carousel1').owlCarousel({
        loop: true,
        margin: 25,
        nav: true,
        navText: [
          "<i class='fa fa-chevron-left'></i>",
          "<i class='fa fa-chevron-right'></i>"
        ],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 }
        }
      });
    });
  };

  // Hero Text Scroll Transitions
  const initHeroAnimations = () => {
    const heroTextElement = document.querySelector('.hero-text');
    if (!heroTextElement) return;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const isScrollingDown = currentScroll > lastScroll;
      
      heroTextElement.classList.toggle('visible', isScrollingDown);
      heroTextElement.classList.toggle('hidden', !isScrollingDown);
      lastScroll = currentScroll;
    };

    let lastScroll = window.pageYOffset;
    heroTextElement.addEventListener('animationend', () => {
      heroTextElement.classList.add('scroll-transition', 'visible');
      window.addEventListener('scroll', handleScroll);
    });
  };

  // Mobile Menu Functionality
  const initMobileMenu = () => {
    const mobileToggler = document.querySelector('.mobile-toggler');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menuContainer = document.querySelector('.mobile-menu-container');

    const closeMenuFunction = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    const eventHandlers = {
      openMenu: (e) => {
        e.stopPropagation();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      },
      closeOnClick: (e) => {
        if (!menuContainer.contains(e.target) && !mobileToggler.contains(e.target)) {
          closeMenuFunction();
        }
      },
      closeOnEscape: (e) => {
        if (e.key === 'Escape') closeMenuFunction();
      }
    };

    // Event Listeners
    mobileToggler.addEventListener('click', eventHandlers.openMenu);
    closeMenu.addEventListener('click', closeMenuFunction);
    document.addEventListener('click', eventHandlers.closeOnClick);
    document.addEventListener('keydown', eventHandlers.closeOnEscape);
  };

  // Initialize All Components
  document.addEventListener('DOMContentLoaded', () => {
    handleNavScroll();
    initOwlCarousel();
    initHeroAnimations();
    initMobileMenu();
  });
})();