const images = [
  "files/bus1.png",
  "files/bus2.png",
  "files/bus3.png",
  "files/bus4.png"
];

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg) return;

  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex];
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    lightbox.style.display = "none";
  }
}

function changeSlide(direction) {
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightboxImg) return;

  currentIndex += direction;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  lightboxImg.src = images[currentIndex];
}

const slider = document.getElementById("heroSlider");
const slides = document.querySelectorAll(".slide");

if (slider && slides.length > 0) {

  let sliderIndex = 0;

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === sliderIndex);
    });
  }
 
  function updateSlider() {
    slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
    updateDots();
  }

  function moveSlide(direction) {
    sliderIndex += direction;

    if (sliderIndex < 0) sliderIndex = slides.length - 1;
    if (sliderIndex >= slides.length) sliderIndex = 0;

    updateSlider();
  }

  function currentSlide(index) {
    sliderIndex = index;
    updateSlider();
  }

  window.moveSlide = moveSlide;
  window.currentSlide = currentSlide;

  updateDots();

  setInterval(() => {
    moveSlide(1);
  }, 5000);
}