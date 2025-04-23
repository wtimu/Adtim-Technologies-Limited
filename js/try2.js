
// Initialize Owl Carousel for services and clients sliders
$(document).ready(function(){
  $('.services-slider').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
  });

  $('.clients-slider').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:4
        },
        1000:{
            items:6
        }
    }
  });
});


// JavaScript Document
// contact.js - Contact Page Functionality

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
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu elements
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  const body = document.body;

  // Toggle mobile menu
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    hamburger.setAttribute('aria-expanded', 
      hamburger.classList.contains('active'));
  }

  // Event listeners
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking on links
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = navMenu.contains(event.target) || 
                         hamburger.contains(event.target);
    
    if (!isClickInside && navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Reset menu on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Sticky navbar on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
});

//PopUp contact Modal functions
function showModal() {
  const modal = document.getElementById('contactModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
  const modal = document.getElementById('contactModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Initialize modal after 7 seconds
window.addEventListener('load', function() {
  setTimeout(showModal, 7000);
});

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
  const modal = document.getElementById('contactModal');
  if (e.target === modal) {
    closeModal();
  }
});

// Handle both inline and modal form submissions
document.addEventListener('DOMContentLoaded', function() {
  // Generic form handler function
  const handleFormSubmit = async (form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalHTML = submitButton.innerHTML;
    
    // Visual feedback
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      alert('Message sent successfully!');
      form.reset();
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      submitButton.innerHTML = originalHTML;
      submitButton.disabled = false;
    }
  };

  // Attach to inline form
  const inlineForm = document.querySelector('.contact-form form');
  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(inlineForm);
    });
  }

  // Attach to modal form
  const modalForm = document.querySelector('#contactModal form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(modalForm);
    });
  }
});

