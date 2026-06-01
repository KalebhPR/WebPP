function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');  // Agrega/quita la clase 'active'
}

function closeMenu() {
  const nav = document.getElementById('nav');
  nav.classList.remove('active');  // Cierra el menú
}

document.addEventListener('DOMContentLoaded', () => {
  updateDots();

  // Cierra el menú cuando haces clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

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

if (slider && slides.length > 0) {

  let sliderIndex = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
  }

  function moveSlide(direction) {
    sliderIndex += direction;

    if (sliderIndex >= slides.length) {
      sliderIndex = 0;
    }

    if (sliderIndex < 0) {
      sliderIndex = slides.length - 1;
    }

    updateSlider();
  }

  setInterval(() => {
    moveSlide(1);
  }, 5000);

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

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === sliderIndex);
  });
}

setInterval(() => {
  moveSlide(1);
}, 5000);

document.addEventListener('DOMContentLoaded', () => {
  updateDots();
});


function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}

function closeMenu() {
  const nav = document.getElementById('nav');
  nav.classList.remove('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Actualizar asunto basado en tipo de servicio
const serviceSelect = document.getElementById('tipoServicio');
const subjectInput = document.getElementById('subject');

function updateSubject() {
  if (serviceSelect.value) {
    subjectInput.value = `Cotización: ${serviceSelect.value}`;
  }
}

serviceSelect.addEventListener('change', updateSubject);

// Manejar el envío del formulario
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar que hay un servicio seleccionado
 if (!serviceSelect.value) {
  alert('Por favor selecciona un tipo de servicio');
  return;
}

  // Actualizar el asunto
  updateSubject();

  // Mostrar cargando
  loading.style.display = 'block';
  submitBtn.disabled = true;
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  try {
    const formData = new FormData(form);
    
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Éxito
      form.reset();
      loading.style.display = 'none';
      successMessage.style.display = 'block';
      
      // Scroll al mensaje
      successMessage.scrollIntoView({ behavior: 'smooth' });
      
      // Ocultar el mensaje después de 5 segundos y redirigir
      setTimeout(() => {
        //window.location.href = 'index.html';
      }, 3000);
    } else {
      // Error
      loading.style.display = 'none';
      errorMessage.style.display = 'block';
      submitBtn.disabled = false;
    }
  } catch (error) {
    console.error('Error:', error);
    loading.style.display = 'none';
    errorMessage.style.display = 'block';
    submitBtn.disabled = false;
  }
});