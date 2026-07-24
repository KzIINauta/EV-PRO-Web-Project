// ================= EV Pro - main.js =================
// Por ahora: placeholders de navegación. Las rutas reales se implementan cuando
// existan las páginas funcionales.

(function () {
    'use strict';

    // Mapa de rutas placeholder (se activan cuando las páginas estén listas)
    const ROUTES = {
        'nav-inicio':    'index.html',
        'nav-productos': 'pages/productos.html',
        'nav-servicios': '#',
        'nav-marcas':    '#',
        'nav-ofertas':   '#',
        'nav-contacto':  'pages/contacto.html',
        'btn-catalog':   'pages/productos.html',
        'btn-prueba':    'pages/prueba.html',
        'nav-cuenta':    'pages/cuenta.html',
        'nav-carrito':   '#'
    };

    // Manejo centralizado de clicks: lee data-route del elemento
    document.addEventListener('click', function (e) {
        const el = e.target.closest('[data-route]');
        if (!el) return;
        const route = ROUTES[el.dataset.route];

        // Si el <a> apunta a un anchor interno válido (#id con sección en la misma
        // página), dejamos que el navegador haga su scroll nativo. Ej: MARCAS / CONTACTO.
        const href = el.getAttribute('href') || '';
        if (href.charAt(0) === '#' && href.length > 1 && document.querySelector(href)) {
            return;
        }

        if (!route || route === '#') {
            e.preventDefault();
            console.info('[placeholder] Ruta no implementada todavía:', el.dataset.route);
            return;
        }
        // Si el destino existe, dejamos que el ancla navegue; si no, evitamos 404
        e.preventDefault();
        console.info('[placeholder] Navegando a:', route);
        // window.location.href = route;  // Se habilita cuando existan las páginas
    });

    // Pequeño feedback visual en botones al click (ripple simple)
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn-catalog, .circle-btn');
        if (!btn) return;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText =
            'position:absolute;border-radius:50%;background:rgba(255,255,255,0.45);' +
            'width:' + size + 'px;height:' + size + 'px;' +
            'left:' + (e.clientX - rect.left - size / 2) + 'px;' +
            'top:' + (e.clientY - rect.top - size / 2) + 'px;' +
            'pointer-events:none;transform:scale(0);' +
            'animation:rippleAnim 0.6s ease-out;' +
            'opacity:1;';
        btn.style.position = btn.style.position || 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // Inyecta keyframes del ripple si no existen
    const style = document.createElement('style');
    style.textContent =
        '@keyframes rippleAnim { to { transform: scale(2.2); opacity: 0; } }';
    document.head.appendChild(style);

    // ================= SCALING CONTAINER =================
    // Escala la página proporcionalmente al ANCHO del viewport (nunca escala arriba).
    // Si el alto escalado supera el viewport, activa scroll vertical.
    const DESIGN_W = 1920, DESIGN_H = 1080;
    const app = document.getElementById('app');
    const body = document.body;
    const root = document.documentElement;

    function fitToViewport() {
        const scale = Math.min(window.innerWidth / DESIGN_W, 1);

        // Exponer scale como CSS custom property para contrarrestar en elementos críticos
        root.style.setProperty('--page-scale', scale);

        // El body gestiona su propio scroll (auto en CSS). Solo bloqueamos overflow horizontal.
        body.style.overflowX = 'hidden';

        // Centrar horizontalmente el #app dentro del viewport. No centramos vertical:
        // el hero fluye al top del body, las secciones nuevas van debajo suyo.
        const marginLeft = Math.max(0, (window.innerWidth - DESIGN_W * scale) / 2);

        app.style.transform = 'scale(' + scale + ')';
        app.style.marginLeft = marginLeft + 'px';
        app.style.marginTop = '0px';
    }

    fitToViewport();
    window.addEventListener('resize', fitToViewport);

    // ================= REVEAL ON SCROLL =================
    // IntersectionObserver: añade .in a .reveal cuando entra en viewport, desobserva.
    // Respeta prefers-reduced-motion: si está activo, todo queda visible sin observar.
    (function initReveal() {
        const revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealEls.forEach((el) => el.classList.add('in'));
            return;
        }

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach((el) => revealObserver.observe(el));
    })();

    // ================= CARRUSEL DE MARCAS =================
    // BRANDS es el array editable; renderCarousel construye slides + dots.
    // Flechas/dots/submit usan addEventListener directo (no data-route), como pide el doc.
    const BRANDS = [
        { name: 'Marca 1', desc: 'Descripción placeholder 1 — reemplazar con la real.' },
        { name: 'Marca 2', desc: 'Descripción placeholder 2 — reemplazar con la real.' },
        { name: 'Marca 3', desc: 'Descripción placeholder 3 — reemplazar con la real.' },
    ];

    function initCarousel() {
        const root = document.getElementById('brands-carousel');
        if (!root) return;

        const track = root.querySelector('.carousel-track');
        const dotsWrap = root.querySelector('.carousel-dots');
        const prevBtn = root.querySelector('[data-carousel="prev"]');
        const nextBtn = root.querySelector('[data-carousel="next"]');
        if (!track || !dotsWrap) return;

        let currentSlide = 0;
        let carouselTimer = null;

        function renderCarousel() {
            track.innerHTML = BRANDS.map(function (b) {
                return (
                    '<div class="carousel-slide">' +
                      '<div class="brand-card">' +
                        '<div class="brand-logo" aria-hidden="true">' + b.name + '</div>' +
                        '<h3>' + b.name + '</h3>' +
                        '<p>' + b.desc + '</p>' +
                        '<a href="#" class="brand-link">Ver productos &rarr;</a>' +
                      '</div>' +
                    '</div>'
                );
            }).join('');

            dotsWrap.innerHTML = BRANDS.map(function (_, i) {
                return '<button class="carousel-dot" data-dot="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
            }).join('');
        }

        function goToSlide(i) {
            currentSlide = (i + BRANDS.length) % BRANDS.length;
            track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
            dotsWrap.querySelectorAll('.carousel-dot').forEach(function (d, di) {
                d.classList.toggle('active', di === currentSlide);
            });
        }
        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }
        function startAuto() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            stopAuto();
            carouselTimer = setInterval(nextSlide, 5000);
        }
        function stopAuto() {
            if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
        }

        renderCarousel();
        goToSlide(0);

        prevBtn && prevBtn.addEventListener('click', function (e) { e.preventDefault(); prevSlide(); });
        nextBtn && nextBtn.addEventListener('click', function (e) { e.preventDefault(); nextSlide(); });
        dotsWrap.addEventListener('click', function (e) {
            const d = e.target.closest('[data-dot]');
            if (!d) return;
            goToSlide(parseInt(d.dataset.dot, 10));
        });

        // Pausa en hover del track
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);

        startAuto();
    }

    initCarousel();

    // ================= CONTACTO → MAILTO =================
    // Frontend-only. Backend differido (todo marcado en doc). HTML5 required cubre validación.
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameEl = form.querySelector('[name="nombre"]');
            const emailEl = form.querySelector('[name="email"]');
            const msgEl = form.querySelector('[name="mensaje"]');
            if (!nameEl || !emailEl || !msgEl) return;
            const name = nameEl.value.trim();
            const email = emailEl.value.trim();
            const message = msgEl.value.trim();
            // Doble defensa: aunque required lo cubre, no abrimos mailto con campos vacíos.
            if (!name || !email || !message) return;
            const subject = encodeURIComponent('Contacto desde EV Pro \u2014 ' + name);
            const body = encodeURIComponent(message + '\n\n\u2014 ' + name + ' (' + email + ')');
            window.location.href = 'mailto:info@evpro.com?subject=' + subject + '&body=' + body;
        });
    }

    initContactForm();
})();
