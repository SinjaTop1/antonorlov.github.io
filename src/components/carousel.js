// Initialize carousel functionality when the document is ready
document.addEventListener("DOMContentLoaded", function() {
  // Smooth scroll function (keeping your existing code)
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const nextSection = document.querySelector(".next-section");
  
  if (scrollIndicator && nextSection) {
    scrollIndicator.addEventListener("click", function() {
      nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Reveal elements on scroll (keeping your existing code)
  const revealElements = document.querySelectorAll(".reveal-element");
  
  function checkScroll() {
    let windowHeight = window.innerHeight;
    revealElements.forEach(element => {
      let elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.classList.add("revealed");
      }
    });
  }

  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener("scroll", checkScroll);

  // Carousel functionality
  const carousel = document.querySelector('.carousel');
  
  if (carousel) {
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoplayInterval;
    
    // Add active class to first slide
    if (slides.length > 0) {
      slides[0].classList.add('active');
    }
    
    // Function to update the carousel display
    function updateCarousel() {
      // Update transform to show the current slide
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update active states
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
      
      indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Function to go to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }
    
    // Function to go to the previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
      resetAutoplay();
    }
    
    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Reset autoplay (used after manual navigation)
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }
    
    // Touch events for swipe functionality on mobile
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      // Minimum distance required for a swipe (pixels)
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - show next slide
        nextSlide();
        resetAutoplay();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - show previous slide
        prevSlide();
        resetAutoplay();
      }
    }
    
    // Add event listeners for buttons and indicators
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
    
    indicators.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Pause autoplay when hovering over the carousel
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      startAutoplay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (isCarouselInView()) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoplay();
        }
      }
    });
    
    // Check if carousel is in the viewport
    function isCarouselInView() {
      const rect = carousel.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Start the autoplay when the page loads
    startAutoplay();
  }
});