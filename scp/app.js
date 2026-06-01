/**
 * ════════════════════════════════════════════════════════════════════════════════
 * PRIMERA PLUS CR - SCRIPT CONSOLIDADO CON SWIPE/DRAG EN SLIDER
 * Todas las funciones en un solo archivo (reemplaza main.js, contact.js y home.js)
 * ════════════════════════════════════════════════════════════════════════════════
 */

// ═════════════════════════════════════════════════════════════════════════════════
// 1. FUNCIONES DEL MENÚ (común a todas las páginas)
// ═════════════════════════════════════════════════════════════════════════════════

function toggleMenu() {
  const nav = document.getElementById('nav');
  if (nav) {
    nav.classList.toggle('active');
  }
}

function closeMenu() {
  const nav = document.getElementById('nav');
  if (nav) {
    nav.classList.remove('active');
  }
}

// ═════════════════════════════════════════════════════════════════════════════════
// 2. FUNCIONES DE LIGHTBOX / GALERÍA (para index.html y galery.html)
// ═════════════════════════════════════════════════════════════════════════════════

let images;

if (window.location.pathname.includes('galery')) {
  // Para galery.html - TODAS las imágenes
  images = [
    "img/galery/bus1.png",
    "img/galery/bus2.png",
    "img/galery/bus3.jpeg",
    "img/galery/bus4.jpeg",
    "img/galery/bus5.jpeg",
    "img/galery/bus6.jpeg",
    "img/galery/bus7.jpeg",
    "img/galery/bus8.jpeg",
    "img/galery/bus9.jpeg",
    "img/galery/bus10.jpeg",
    "img/galery/bus11.jpeg",
    "img/galery/bus12.jpeg",
    "img/galery/bus13.jpeg",
    "img/galery/bus14.jpeg",
    "img/galery/bus15.jpeg",
    "img/galery/bus16.jpeg",
    "img/galery/bus17.jpeg",
    "img/galery/bus18.jpeg",
    "img/galery/bus19.jpeg",
    "img/galery/bus20.jpeg",
    "img/galery/bus21.jpeg",
    "img/galery/bus22.jpeg"

  ];
} else {
  // Para index.html - SOLO algunas
  images = [
    "img/andare.jpeg",
    "img/caio.jpeg",
    "img/county.jpeg",
    "img/daewoo.jpeg",
    "img/grandBird.jpeg", 
    "img/jac.jpeg",
    "img/kingLong.jpeg", 
    "img/kingLong2.jpeg",
    "img/viaggio.jpeg",
    "img/urbanuss.jpeg"
  ];
}

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

// ═════════════════════════════════════════════════════════════════════════════════
// 3. FUNCIONES DEL SLIDER DE HERO (para index.html y galery.html)
// CON SOPORTE DE SWIPE (MOBILE) Y DRAG (DESKTOP)
// ═════════════════════════════════════════════════════════════════════════════════

const slider = document.getElementById("heroSlider");
const slides = document.querySelectorAll(".slide");

if (slider && slides.length > 0) {
  let sliderIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let isAnimating = false;
  let isDragging = false;
  let dragStartX = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${sliderIndex * 100}%)`;
    updateDots();
  }

  function moveSlide(direction) {
    // Prevenir múltiples cambios simultáneos
    if (isAnimating) return;
    
    isAnimating = true;
    sliderIndex += direction;

    if (sliderIndex < 0) sliderIndex = slides.length - 1;
    if (sliderIndex >= slides.length) sliderIndex = 0;

    updateSlider();

    // Permitir siguiente swipe después de la animación
    setTimeout(() => {
      isAnimating = false;
    }, 600); // Coincide con la duración de transition del CSS
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

  // ═══════════════════════════════════════════════════════════════════════════════
  // FUNCIONALIDAD DE SWIPE Y DRAG (COMPATIBLE MÓVIL Y DESKTOP)
  // ═══════════════════════════════════════════════════════════════════════════════
  
  // ┌─ EVENTOS TOUCH (MÓVIL) ──────────────────────────────────────────────────────
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isDragging = true;
  }, false);

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    // Opcional: descomentar para prevenir scroll mientras arrastra
    // e.preventDefault();
  }, false);

  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    touchEndX = e.changedTouches[0].screenX;
    isDragging = false;
    handleSwipe();
  }, false);

  // ┌─ EVENTOS MOUSE (DESKTOP) ────────────────────────────────────────────────────
  
  slider.addEventListener('mousedown', (e) => {
    dragStartX = e.screenX;
    isDragging = true;
    slider.style.cursor = 'grabbing';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    // Opcional: para feedback visual del arrastre en tiempo real
  });

  slider.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    touchEndX = e.screenX;
    isDragging = false;
    slider.style.cursor = 'grab';
    handleSwipe();
  });

  slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
  });

  // ┌─ LÓGICA DE DETECCIÓN DE SWIPE/DRAG ──────────────────────────────────────────
  
  function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe válido
    const difference = touchStartX - touchEndX;

    // Si el swipe fue hacia la izquierda (negativo) = siguiente slide
    if (difference > swipeThreshold) {
      moveSlide(1);
    }
    // Si el swipe fue hacia la derecha (positivo) = slide anterior
    else if (difference < -swipeThreshold) {
      moveSlide(-1);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════

  // Exponer funciones globales para HTML inline onclick
  window.moveSlide = moveSlide;
  window.currentSlide = currentSlide;

  updateDots();

  // Auto-play cada 5 segundos
  setInterval(() => {
    moveSlide(1);
  }, 5000);
}

// ═════════════════════════════════════════════════════════════════════════════════
// 4. FUNCIONES DEL FORMULARIO DE CONTACTO (solo para contact.html)
// ═════════════════════════════════════════════════════════════════════════════════

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const serviceSelect = document.getElementById('tipoServicio');
  const subjectInput = document.getElementById('subject');
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  function updateSubject() {
    if (serviceSelect && serviceSelect.value && subjectInput) {
      subjectInput.value = `Cotización: ${serviceSelect.value}`;
    }
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateSubject);
  }

  // Manejar envío del formulario
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar que hay un servicio seleccionado
    if (!serviceSelect.value) {
      alert('Por favor selecciona un tipo de servicio');
      return;
    }

    // Actualizar el asunto
    updateSubject();

    // Mostrar cargando
    if (loading) loading.style.display = 'block';
    if (submitBtn) submitBtn.disabled = true;
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';

    try {
      const formData = new FormData(contactForm);

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Éxito
        contactForm.reset();
        if (loading) loading.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        // Scroll al mensaje
        if (successMessage) {
          successMessage.scrollIntoView({ behavior: 'smooth' });
        }

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
          // Puedes descomientar si quieres redirigir a inicio
          // window.location.href = 'index.html';
        }, 3000);
      } else {
        // Error
        if (loading) loading.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'block';
        if (submitBtn) submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Error:', error);
      if (loading) loading.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'block';
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// ═════════════════════════════════════════════════════════════════════════════════
// 5. INICIALIZACIÓN DEL DOCUMENTO
// ═════════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});