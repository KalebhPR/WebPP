function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}

function closeMenu() {
  const nav = document.getElementById('nav');
  nav.classList.remove('active');
}

const images = [
  "files/bus1.png",
  "files/bus2.png",
  "files/bus3.png",
  "files/bus4.png"
];
 
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = images[currentIndex];
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  document.getElementById("lightbox-img").src = images[currentIndex];
}

const slider = document.getElementById("heroSlider");
const slides = document.querySelectorAll(".slide");

let sliderIndex = 0;

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

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === sliderIndex);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateDots();

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

setInterval(() => {
  moveSlide(1);
}, 5000);