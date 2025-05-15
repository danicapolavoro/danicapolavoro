const immagineDistante = document.getElementById('paperPlane');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
let lastMouseX = 0;
const distanza = 55;

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX + window.scrollX; // Aggiunge lo scroll orizzontale
    const mouseY = event.clientY + window.scrollY; // Aggiunge lo scroll verticale

    const rect = immagineDistante.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + window.scrollX; // Considera lo scroll
    const centerY = rect.top + rect.height / 2 + window.scrollY; // Considera lo scroll

    const angleToMouse = Math.atan2(mouseY - centerY, mouseX - centerX);
    let angleDeg = angleToMouse * 180 / Math.PI + 45;

    const newX = mouseX - Math.cos(angleToMouse) * distanza - rect.width / 2;
    const newY = mouseY - Math.sin(angleToMouse) * distanza - rect.height / 2;
    
    immagineDistante.style.position = 'absolute'; // Assicurati che sia absolute
    immagineDistante.style.left = `${newX}px`;
    immagineDistante.style.top = `${newY}px`;

    const flip = mouseX < lastMouseX;
    lastMouseX = mouseX;

    if (flip) {
        angleDeg += 90;
        immagineDistante.style.transform = `rotate(${angleDeg}deg) rotateY(180deg)`;
    } else {
        immagineDistante.style.transform = `rotate(${angleDeg}deg)`;
    }
});






// Set up the IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

// Observe each animated element
animatedElements.forEach(el => observer.observe(el));


const slides = document.querySelectorAll(".slides img");
const slidesContainer = document.querySelector(".slides");
let slideIndex = 0;
let autoSlideInterval = null;
let autoSlideTimeout = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        updateSlidePosition();
        startAutoSlide();
    }
}

function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }

    updateSlidePosition();
}

function prevSlide() {
    stopAutoSlide();
    slideIndex--;
    showSlide(slideIndex);
    restartAutoSlideAfterDelay();
}

function nextSlide() {
    stopAutoSlide();
    slideIndex++;
    showSlide(slideIndex);
    restartAutoSlideAfterDelay();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
}

function restartAutoSlideAfterDelay() {
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => {
        startAutoSlide();
    }, 4000);
}
