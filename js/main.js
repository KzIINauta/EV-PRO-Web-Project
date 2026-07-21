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
})();
