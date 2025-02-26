/**
 * Smooth scroll and reveal animation functionality
 */
document.addEventListener("DOMContentLoaded", function() {
  // Smooth scroll function for the scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const nextSection = document.querySelector(".next-section");
  
  if (scrollIndicator && nextSection) {
    scrollIndicator.addEventListener("click", function() {
      nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Reveal elements on scroll
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

  // Initial check for elements in viewport
  checkScroll();
  
  // Check on scroll
  window.addEventListener("scroll", checkScroll);
});