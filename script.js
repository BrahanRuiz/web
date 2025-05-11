// Máquina de escribir
const message = "Eres la mejor mamá del mundo. Te amo. 💕";
let i = 0;
const speed = 60;

function typeWriter() {
  if (i < message.length) {
    document.getElementById("typewriter").innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

// Corazones animados
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", () => {
  resizeCanvas();
  createHearts(); // Regenerar corazones al redimensionar
});

let hearts = [];

function createHearts() {
  hearts = [];
  const numHearts = Math.floor(window.innerWidth / 15); // cantidad proporcional al ancho
  for (let i = 0; i < numHearts; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 10, // tamaño entre 10 y 30
      speed: Math.random() * 1 + 0.5, // velocidad entre 0.5 y 1.5
      opacity: Math.random() * 0.5 + 0.5 // entre 0.5 y 1
    });
  }
}
createHearts();

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 20px Arial";
  hearts.forEach((heart) => {
    ctx.font = `bold ${heart.size}px Arial`;
    ctx.fillStyle = `rgba(255, 105, 180, ${heart.opacity})`;
    ctx.fillText("♥", heart.x, heart.y);
  });
  moveHearts();
}

function moveHearts() {
  hearts.forEach((heart) => {
    heart.y += heart.speed;
    if (heart.y > canvas.height) {
      heart.y = 0;
      heart.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawHearts, 30);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Mostrar carta
document.getElementById("btnSorpresa").addEventListener("click", () => {
    const mensaje = document.getElementById("mensajeSorpresa");
    const slider = document.querySelector(".slider");
    const boton = document.getElementById("btnSorpresa");
  
    mensaje.classList.toggle("mostrar");
    slider.classList.toggle("mostrar");
  
    if (mensaje.classList.contains("mostrar")) {
      boton.textContent = "💌 Ocultar sorpresa";
    } else {
      boton.textContent = "🎁 Haz clic para ver mi sorpresa";
    }
  });
  

// Swiper slider
const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

// Lightbox para imágenes
document.addEventListener('DOMContentLoaded', function() {
    // Referencias DOM
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
    const sliderImages = document.querySelectorAll('.swiper-slide img');
    
    // Prevenir que Swiper interfiera con el lightbox
    document.querySelectorAll('.swiper-container, .swiper-wrapper, .swiper-slide').forEach(el => {
      el.addEventListener('click', e => {
        // Solo detiene la propagación si el click fue directo en estos elementos
        // y no en sus hijos (como las imágenes)
        if (e.target === el) {
          e.stopPropagation();
        }
      });
    });
    
    // Añadir evento a cada imagen del slider
    sliderImages.forEach(img => {
      img.style.cursor = 'pointer';
      
      // Función para abrir el lightbox
      function openLightbox(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Desactivar Swiper temporalmente
        if (window.swiper) {
          swiper.allowTouchMove = false;
        }
        
        // Configurar y mostrar el lightbox
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        // Asegurar que la página esté al inicio
        window.scrollTo(0, 0);
        
        return false;
      }
      
      // Agregar múltiples listeners para mayor compatibilidad
      img.addEventListener('click', openLightbox);
      img.addEventListener('touchend', function(e) {
        // Solo activar si fue un toque simple, no un deslizamiento
        if (!this.touchStartY || Math.abs(this.touchStartY - e.changedTouches[0].pageY) < 10) {
          openLightbox(e);
        }
      });
      
      // Guardar la posición inicial del toque
      img.addEventListener('touchstart', function(e) {
        this.touchStartY = e.touches[0].pageY;
      }, {passive: true});
    });
    
    // Función para cerrar el lightbox
    function closeLightbox() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
      lightboxImg.src = ''; // Liberar la imagen
      window.scrollTo(0, scrollPosition);
      // Reactivar Swiper
      if (window.swiper) {
        swiper.allowTouchMove = true;
      }
    }
    
    // Evento para el botón de cierre
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  });
// Reproducción automática de audio
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("musica");
  audio.volume = 0.5;
  
  // Primera estrategia: intentar reproducir directamente
  const playAudio = () => {
    audio.muted = false;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Reproducción automática bloqueada: ", error);
        
        // Si falla, configuramos para reproducir con la primera interacción
        const playOnInteraction = () => {
          audio.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    }
  };
  
  // Intenta reproducir después de un pequeño retraso
  setTimeout(playAudio, 1000);
  
  // Opción adicional: reproducir al primer clic en cualquier parte
  const bodyPlayHandler = () => {
    audio.muted = false;
    audio.play();
    document.body.removeEventListener('click', bodyPlayHandler);
  };
  
  document.body.addEventListener('click', bodyPlayHandler);
});
