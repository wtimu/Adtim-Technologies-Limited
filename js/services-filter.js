// Service Category Filtering
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    const category = this.getAttribute('data-category');
    
    // Filter services
    document.querySelectorAll('.service-card').forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Animation on Scroll
const animateElements = document.querySelectorAll('.service-card, .section-title');

const animateOnScroll = () => {
  animateElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Initialize animations
animateElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Google Map
  function initMap() {
    // Kampala coordinates - replace with your exact location
    const location = { lat: 0.3136, lng: 32.5811 };
    const map = new google.maps.Map(document.getElementById("googleMap"), {
      zoom: 15,
      center: location,
      styles: [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#000000"
            },
            {
              "weight": 2
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    });
    
    // Add marker with your logo
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Adtim Technologies",
      icon: {
        url: 'images/Logo Small.png',
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    
    // Info window
    const infoWindow = new google.maps.InfoWindow({
      content: '<h3>Adtim Technologies</h3><p>Security & IT Solutions</p>'
    });
    
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
  
  // Load Google Maps API
  if (document.getElementById("googleMap")) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Send form data
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Success message
          alert('Thank you for your message! We will contact you soon.');
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
      })
      .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      });
    });
  }
});

// Initialize Owl Carousels
$(document).ready(function(){
  $('.services-slider').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive:{
      0:{ items:1 },
      600:{ items:2 },
      1000:{ items:3 }
    }
  });

  $('.clients-slider').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive:{
      0:{ items:2 },
      600:{ items:4 },
      1000:{ items:6 }
    }
  });
});
 // Header replacement system with all original functionality
    $(document).ready(function() {
      // Original services filtering
      $('.category-tab').click(function() {
        $('.category-tab').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).data('category');
        $('.service-card').hide();
        if (category === 'all') {
          $('.service-card').show();
        } else {
          $(`.service-card[data-category="${category}"]`).show();
        }
      });
      
      // Gallery filtering
      $('.gallery-tab').click(function() {
        $('.gallery-tab').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).data('gallery-category');
        $('.gallery-item').hide();
        if (category === 'all') {
          $('.gallery-item').show();
        } else {
          $(`.gallery-item[data-gallery-category="${category}"]`).show();
        }
      });
      
      // Header replacement logic
      const mainNav = $('#main-nav');
      const servicesSelector = $('#services-selector');
      const gallerySelector = $('#gallery-selector');
      
      function calculateOffsets() {
        const servicesOffset = $('#services').offset().top - 80;
        const galleryOffset = $('#gallery').offset().top - 80;
        return { servicesOffset, galleryOffset };
      }
      
      let { servicesOffset, galleryOffset } = calculateOffsets();
      
      $(window).resize(function() {
        ({ servicesOffset, galleryOffset } = calculateOffsets());
      });
      
      $(window).scroll(function() {
        const scrollPos = $(window).scrollTop();
        
        if (scrollPos >= galleryOffset) {
          mainNav.css('transform', 'translateY(-100%)');
          servicesSelector.removeClass('visible');
          gallerySelector.addClass('visible');
        } 
        else if (scrollPos >= servicesOffset) {
          mainNav.css('transform', 'translateY(-100%)');
          servicesSelector.addClass('visible');
          gallerySelector.removeClass('visible');
        } 
        else {
          mainNav.css('transform', 'translateY(0)');
          servicesSelector.removeClass('visible');
          gallerySelector.removeClass('visible');
        }
      });
      
      // Smooth scrolling
      $('a[href*="#"]').not('[href="#"]').on('click', function(e) {
        if (this.hash !== '') {
          e.preventDefault();
          const hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 80
          }, 800, function() {
            window.location.hash = hash;
          });
        }
      });
      
      // Initialize based on hash
      if (window.location.hash === '#gallery') {
        $('html, body').scrollTop(galleryOffset + 80);
        $('.gallery-tab[data-gallery-category="all"]').click();
      } else if (window.location.hash === '#services') {
        $('html, body').scrollTop(servicesOffset + 80);
        $('.category-tab[data-category="all"]').click();
      }
    });
