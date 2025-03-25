/**
 * EQUINOX - Equipos Inoxidables S.L.
 * Archivo JavaScript principal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar efectos de animación
    initAnimations();
    
    // Inicializar menú de navegación con animación de scroll
    initNavbarScroll();
    
    // Inicializar botón de volver arriba
    initBackToTop();
    
    // Inicializar los carruseles
    initCarousels();
    
    // Inicializar lightbox para imágenes
    initLightbox();
    
    // Inicializar validación de formularios
    initFormValidation();
    
    // Inicializar preloader
    initPreloader();
    
    // Inicializar tooltips y popovers de Bootstrap
    initBootstrapComponents();
    
    // Añadir efecto al hacer clic en los enlaces de anclaje
    initSmoothScroll();
    
    // Inicializar contadores
    initCounters();
});

// Mostrar elementos con animación al hacer scroll
function initAnimations() {
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const fadeCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const fadeObserver = new IntersectionObserver(fadeCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeElems.forEach(elem => {
        fadeObserver.observe(elem);
    });
}

// Cambiar apariencia de la barra de navegación al hacer scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
        
        // Marcar enlace activo según la sección visible
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let scrollPosition = window.scrollY + 200;
            
            sections.forEach(section => {
                if (section.offsetTop <= scrollPosition && 
                    section.offsetTop + section.offsetHeight > scrollPosition) {
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// Botón para volver al inicio de la página
function initBackToTop() {
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar carruseles
function initCarousels() {
    // Se inicializan automáticamente con Bootstrap 5
}

// Inicializar lightbox para imágenes
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const fullImgSrc = this.getAttribute('data-full') || this.src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${fullImgSrc}" alt="${this.alt}">
                    <p class="lightbox-caption">${this.alt}</p>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });
}

// Validación de formularios
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Procesar el formulario y mostrar mensaje de éxito
                if (!form.hasAttribute('data-no-toast')) {
                    event.preventDefault();
                    showToast('¡Formulario enviado con éxito!', 'success');
                    form.reset();
                }
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

// Mostrar notificaciones tipo toast
function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast ${type}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">EQUINOX</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 5000 });
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(preloader);
    
    // Ocultar preloader cuando la página esté cargada
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.remove();
        }, 500);
    });
}

// Inicializar componentes de Bootstrap
function initBootstrapComponents() {
    // Inicializar todos los tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar todos los popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Scroll suave para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contador para números (estadísticas)
function initCounters() {
    const counterElements = document.querySelectorAll('.counter-number');
    
    const counterCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                const duration = 2000;
                const step = Math.ceil(target / (duration / 16));
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current > target) {
                        current = target;
                        clearInterval(interval);
                    }
                    element.textContent = current.toLocaleString();
                };
                
                const interval = setInterval(updateCounter, 16);
                observer.unobserve(element);
            }
        });
    };
    
    const counterObserver = new IntersectionObserver(counterCallback, {
        threshold: 0.5
    });
    
    counterElements.forEach(elem => {
        counterObserver.observe(elem);
    });
}

// Función para manejar las cookies
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Mostrar alerta de cookies si no se ha aceptado
if (!getCookie('cookie-consent')) {
    setTimeout(function() {
        const cookieAlert = document.createElement('div');
        cookieAlert.className = 'cookie-alert alert alert-info alert-dismissible fade show';
        cookieAlert.innerHTML = `
            <h5>Uso de cookies</h5>
            <p>Utilizamos cookies para mejorar su experiencia en nuestro sitio web.</p>
            <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary btn-sm cookie-decline">Rechazar</button>
                <button type="button" class="btn btn-primary btn-sm cookie-accept">Aceptar</button>
            </div>
        `;
        document.body.appendChild(cookieAlert);
        
        document.querySelector('.cookie-accept').addEventListener('click', function() {
            setCookie('cookie-consent', 'accepted', 365);
            cookieAlert.remove();
        });
        
        document.querySelector('.cookie-decline').addEventListener('click', function() {
            setCookie('cookie-consent', 'declined', 30);
            cookieAlert.remove();
        });
    }, 1000);
}
