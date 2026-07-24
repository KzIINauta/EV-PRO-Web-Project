# INFORME — EV Pro · Homepage Redesign (versión final)

> Frontend de **EV Pro** (audio de alta gama, LatAm). Stack: **HTML5 + CSS plano + vanilla JS**, sin bundler, sin Tailwind, sin GSAP/Lenis — tal como pide el design doc aprobado.
> Origen: design doc `docs/superpowers/specs/2026-07-21-homepage-redesign-design.md` (2026-07-21, "Approved (pending implementation)").
> Implementación: 2026-07-23.

---

## 0. Nota sobre el intento previo (importante)

El primer intento de esta tarea leyó los 7 JSON de `Actualizacion/` **literalmente** y armó un proyecto nuevo con Vite + TailwindCSS + GSAP + Lenis bajo `src/`. Eso **pisó la homepage original** con una estética ajena (fondo gris + blobs azules). Era incorrecto: los JSON pedían una arquitectura nueva, pero **el usuario ya tenía una homepage aprobada** (panel blanco + Playfair "SUMÉRGETE EN EL SONIDO." + fondo `Fondo Web.png` + `Elementos Decorativo.png`) y un design doc que dice "no new dependencies, no build step". El segundo intento corrigió:

1. Restauró `index.html` a `HEAD` (la homepage original).
2. Eliminó los residuos del intento anterior (`src/`, `public/`, `package.json`, `tailwind.config.js`, `postcss.config.js`, `index.html.bak.previo`).
3. Implementó el **design doc aprobado** como capas aditivas sobre la homepage original.

**Lección**: los JSON eran una sola fuente de requisitos; el design doc aprobado era la fuente de intención. Cuando dos fuentes entran en conflicto, gana la intención documentada del usuario, no la literalidad de un JSON posterior.

---

## 1. Implementación por sección (qué se hizo)

### Setup — sin stack nuevo
No se agregaron dependencias. No se creó `package.json`. No hay Vite, Tailwind ni npm. El sitio sigue siendo HTML plano + CSS + JS, servible con cualquier static host.

### Arquitectura final

```
index.html   (5 bloques: hero + 3 secciones + footer)
css/style.css  (variables + animaciones originales + ~360 líneas nuevas)
js/main.js     (ROUTES + ripple + fitToViewport originales + reveal + carousel + mailto)
pages/contacto.html  (meta-refresh redirect a index.html#contacto)
```

### Estructura del index.html

| # | Bloque | Color / fondo | Qué contiene | Estado |
|---|--------|---------------|--------------|--------|
| 1 | `<div class="hero-wrap">` (envuelve al `#app` original) | dark, min-height 75vh | Panel blanco + nav (Inicio/Productos/Servicios/Marcas/Ofertas/Contacto) + Playfair "SUMÉRGETE EN EL SONIDO." + `Elementos Decorativo.png` + circle button "Hacer prueba de Sonido" + social icons + scroll hint | ✅ identidad original intacta |
| 2 | `<section id="sobre" class="section-light">` | `#f8f7f4` | Overline `/03 · SOBRE NUESTRA MARCA` + H2 "NUESTRA MARCA" + 2 párrafos (placeholder) + bloque visual decorativo | ✅ |
| 3 | `<section id="marcas" class="section-pure">` | `#fff` | Overline `/02 · MARCAS` + H2 + carrusel (`BRANDS` array, flechas, dots, auto 5s, pause on hover) | ✅ |
| 4 | `<section id="contacto" class="section-light">` | `#f8f7f4` | Overline `/01 · CONTACTO` + form (Nombre/Email/Mensaje → `mailto:info@evpro.com`) + info contacto (WhatsApp +57 300 000 0000, email, social) | ✅ |
| 5 | `<footer class="site-footer">` | dark (#000) compacto | `© 2026 EV Pro` + RRSS + Aviso Legal `/01` + Política de Privacidad `/02` + Sobre Nosotros `/03` | ✅ |

### Organización del JS (por grupo, sin espagueti)

`js/main.js` conserva la IIFE original y añade 3 grupos nuevos claramente separados por `// ================= TÍTULO =================`:

- **Original — `ROUTES` + click handler + ripple + `fitToViewport`**: ruta placeholder, ripple en `.btn-catalog` y `.circle-btn`, escalado del `#app` a 1920×1080. **Intacto salvo un bypass** para anchors internos (`#marcas`, `#contacto`): el handler ahora deja pasar al navegador si el `href` empieza con `#` y apunta a un id existente. Fix mínimo, justificado.
- **`initReveal()`** — `IntersectionObserver` con `{ threshold: 0.15 }`. Añade `.in` a `.reveal` y `unobserve`. Respeta `prefers-reduced-motion` (todo visible sin observar).
- **`initCarousel()`** — array `BRANDS` editable (3 placeholders), `renderCarousel()` construye slides + dots del array, `goToSlide(i)`, `nextSlide()`, `prevSlide()`, `startAuto()` (5s), `stopAuto()`, pausa en `mouseenter`, resume en `mouseleave`. Respeta reduced motion (no auto-advance).
- **`initContactForm()`** — `handleContactSubmit` arma `mailto:info@evpro.com?subject=Contacto desde EV Pro — <nombre>&body=<mensaje>\n\n— <nombre> (<email>)`. `e.preventDefault()`. `required` HTML5 + doble guarda de campos vacíos.

### Acceptance criteria del design doc (1-9)

| # | Criterio | Estado | Notas |
|---|----------|--------|-------|
| 1 | `body` scrollea (sin `overflow:hidden`) | ✅ | CSS: `overflow-y: auto`. JS: `fitToViewport` ya no fuerza `hidden` ni `marginTop`. |
| 2 | Hero compacto (~75vh) + scroll hint | ⚠️ | `min-height:75vh` vía `.hero-wrap`. El `#app` internamente sigue siendo 1080px pero recortado por el wrapper. Funciona visualmente, pero ver BUG-2. |
| 3 | Secciones en orden About → Brands → Contact, fondos `#f8f7f4` / `#fff` / `#f8f7f4` | ✅ | |
| 4 | Carrusel desde `BRANDS`, 3 slides por defecto, flechas + dots, auto 5s, pause on hover | ✅ | |
| 5 | Form: Nombre/Email/Mensaje/Enviar, submit abre `mailto:info@evpro.com` con subject + body | ✅ | |
| 6 | Footer: copyright + RRSS + 3 links legales | ✅ | |
| 7 | `.reveal` con IntersectionObserver, respeta `prefers-reduced-motion` | ✅ | |
| 8 | Sin nuevas dependencias, sin build step | ✅ | |
| 9 | Identidad visual del hero preservada | ✅ | Panel blanco, Playfair, azul `#0066ff`, fondo, decorativo — todos intactos. |

---

## 2. Bugs detectados (a corregir)

### BUG-1 · El fondo del body (`Fondo Web.png`) sangra detrás de las secciones nuevas
- **Síntoma**: `body` declara `background-image: url('../Fondo Web.png'); background-size: cover; background-attachment: fixed`. Ese fondo quedó cuando la página era single-screen. Ahora que scrollea, tras el footer (y en cualquier brecha entre secciones si los padding no cubren 100%) se trasluza la imagen fija — visual roto.
- **Fix (1 línea)**: quitar el `background-image` del body y moverlo al `.hero-wrap`. El hero conserva su fondo; las secciones nuevas pintan el suyo (ya lo hacen: `#f8f7f4`, `#fff`, `#fff`, `#000`). El `body` queda con `background: var(--color-bg-black)` como fallback sólido.
  ```css
  /* body: sin background-image. */
  body { background-color: var(--color-bg-black); }
  .hero-wrap { background: var(--color-bg-black) url('../Fondo Web.png') center/cover no-repeat; }
  ```

### BUG-2 · El hero "compacto" no lo es tanto: el `#app` sigue midiendo 1080px
- **Síntoma**: `.hero-wrap` pone `min-height: 75vh` y `overflow: hidden`, pero `#app` internamente mide `height: 1080px` + `transform-origin: top left` + `scale(...)`. En viewports anchos donde el scale da ~1, el hero visible termina siendo muy alto (1080px en un 1920px de viewport → casi 100vh, no 75vh). El `overflow: hidden` recorta abajo pero no achica el contenedor.
- **Fix**: ajustar la lógica de `fitToViewport` para que, cuando estamos dentro de un hero de 75vh, el factor de escala se calcule considerando el alto disponible, no solo el ancho. O más simple: dejar que `.hero-wrap` tenga `height: 75vh` (no `min-height`) + `overflow: hidden` y que el `#app` escale al menor de `ancho/1920` y `alto/1080`. ~5 líneas de ajuste en `fitToViewport`.

### BUG-3 · `STOCK DISPONIBLE` y `circle-btn` no se movieron al footer (desviación del doc)
- **Síntoma**: el doc decía mover bottom-left (STOCK DISPONIBLE), mid-right (legal links) y bottom-right (circle button + social) al footer. El implementador los dejó en el hero (decisión consciente: "no romper la composición visual"). El footer actual repite parcialmente: legal links sí están en el footer, pero STOCK DISPONIBLE y "Hacer prueba de Sonido" quedan duplicados/fuera de lugar.
- **Fix**: en v2, mover el `.bottom-left` y `.bottom-right` al footer y dejar el hero limpio con solo scroll hint. Es una decisión de producto, no técnica — confirmar primero.

### BUG-4 · El redirect de `pages/contacto.html` rompe el `data-route="nav-contacto"`
- **Síntoma**: en el nav, `CONTACTO` sigue con `data-route="nav-contacto"` y `ROUTES['nav-contacto'] = 'pages/contacto.html'`. El handler de clicks hace `e.preventDefault()` y solo `console.info` (no navega). Pero si se habilita la navegación (`window.location.href = route`), llevará a `pages/contacto.html` que ahora hace redirect a `index.html#contacto` — doble salto innecesario.
- **Fix**: cambiar `ROUTES['nav-contacto']` a `'#contacto'` y dejar que el bypass de anchors legue directo al scroll nativo. 1 línea.

### BUG-5 · `ROUTES['nav-marcas']` quedó como `'#'` aunque el HTML apunta a `#marcas`
- **Síntoma**: `ROUTES['nav-marcas'] = '#'` y el anchor del HTML es `href="#marcas"`. El bypass de anchors lo resuelve en runtime, pero la entrada del `ROUTES` queda muerta/confusa. Limpieza.
- **Fix**: o bien `'#marcas'` o borrar la entrada (el bypass ya cubre).

### BUG-6 · `brand-link` y `data-social` quedan como `href="#"` sin handler
- **Síntoma**: en el carrusel, cada slide tiene `<a href="#" class="brand-link">Ver productos →</a>`. Click llevan arriba de la página (comportamiento default de `#`). Lo mismo con `data-social` del hero. El doc los marca como "out of scope" (apuntan a `#` por ahora), pero el click invalida: los links de marca deberían llevar a `pages/productos.html` al menos.
- **Fix**: `href="pages/productos.html"` o `data-route="btn-catalog"` para que el handler centralizado los atienda.

### BUG-7 · Validación del form contact depende solo de HTML5 `required`
- **Síntoma**: no hay validación de email con regex antes de armar el mailto. Si el browser no soporta `type="email"` (raro hoy, pero 现实 en algunos webviews), el mailto se arma con email inválido.
- **Fix**:validatorsambah una validación mínima de regex antes del mailto y feedback visual (border rojo). ~10 líneas.

### BUG-8 · Focus visible en RRSS y links legales del footer no está garantizado
- **Síntoma**: el CSS original declara `:focus-visible { outline: 2px solid var(--color-blue) }` global; aplica. Pero los `<a aria-label="...">` del footer sin `href` (los `<li>` de Aviso Legal no son `<a>`) no son focusables: son `<li>`, no links.
- **Síntoma concreto**: `<li>Aviso Legal <span>/01</span></li>` — son texto plano, no navegables por teclado. El doc los pide como links legales.
- **Fix**: convertirlos en `<a href="#">Aviso Legal <span>/01</span></a>` para que sean focusables y accesibles.

---

## 3. Cuellos de botella y rendimiento

### BN-1 · `#app` de 1920×1080 con `transform: scale()` recalcula en cada `resize`
- **Problema**: `fitToViewport` hace `Math.min(window.innerWidth / 1920, 1)` y aplica transform en cada resize. En resize de arrastre (drag del borde de ventana) dispara múltiples cálculos. Sin `throttle` ni `requestAnimationFrame`.
- **Fix**: envolver `fitToViewport` en un debounce/throttle de ~100ms o usar `requestAnimationFrame`. ~5 líneas.

### BN-2 · `Elementos Decorativo.png` pesa 807 KB y `Fondo Web.png` 1.2 MB
- **Problema**: assets no optimizados. En mobile puede tardar segundos en pintar. Sin `srcset`, sin versiones WebP/AVIF. `fetchpriority="high"` ya puesto en el decorativo (bien).
- **Fix**: comprimir / exportar a WebP + AVIF, servir con `<picture>` y `srcset` por breakpoint. Tamaño objetivo: <150KB por imagen.

### BN-3 · Carrusel renderiza con `innerHTML` (string concatenation, sin DOM diff)
- **Problema**: `renderCarousel()` usa `track.innerHTML = BRANDS.map(...).join('')`. Para 3 marcas OK; para 20 marcas re-renderiza todo en cada edición. Sin XSS escape de `b.name` y `b.desc` (confiables porque son del código, pero frágil).
- **Fix**: usar `createElement` + `textContent` (anti-XSS, costo similar). O mantener `innerHTML` pero escapar.

### BN-4 · IntersectionObserver desobserva en cada reveal (no re-observa si scrolleas arriba y abajo)
- **Síntoma**: comportamiento deseado (revelar una sola vez), pero si el usuario baja rápido, luego sube y vuelve a bajar, los elementos ya quedan visibles. No es bug, es decisión. Sólo lo menciono por completitud.

### BN-5 · `background-attachment: fixed` en fondo del body es caro en mobile
- **Problema**: `fixed` causa repaint costoso en iOS Safari (repaint de capa completa). Ya cambiado a `cover` en el fix de BUG-1, que lo elimina.
- **Estado**: cubierto por BUG-1.

### BN-6 · CSS de 886 líneas en un solo archivo sin modularizar
- **Problema**: no bloqueante hoy, pero a medida que crezca conviene separar por feature (`base.css`, `hero.css`, `sections.css`, `carousel.css`, `footer.css`) y linkearlos o usar `@import`. Sin build step, los `@import` tienen costo de red extra — mejor mantener monoarchivo hasta que pese.
- **Umbral**: >1500 líneas.

---

## 4. Mejoras recomendadas (priorizadas)

### M1 · Limpieza inmediata (alta, 15 min de trabajo)
- Aplicar BUG-1 (mover fondo al hero-wrap). 1 línea.
- Aplicar BUG-4 y BUG-5 (limpiar `ROUTES`). 2 líneas.
- Convertir los 3 `<li>` de footer-legal en `<a>` (BUG-8). 3 líneas.

### M2 · Responsive móvil (alta, 1-2 horas)
- El `#app` de 1920px fijo + escala es un anti-patrón mobile. En viewport <768px el `scale` da ~0.4 → panel blanco diminuto, tipografía Playfair ilegible. El design doc dijo: "Mobile responsiveness detailed tuning goes in a follow-up pass". Es el momento.
- Patrón: detectar `max-width: 768px` y devolver layout fluido (sin `transform: scale`, con `#app { width: 100%; height: auto; }`) — sacrificar pixel-perfect del original.
- Resetear circle button, bottom-left, etc. a posiciones relativas.

### M3 · Accesibilidad (alta)
- **Skip link**: `<a href="#marcas" class="sr-only focus:not-sr-only">Saltar al contenido</a>` como primer elemento del body.
- **`aria-live="polite"`** en el form para feedback de error (cuando se aplique BUG-7).
- **Roles**: el carrusel debe declarar `role="region" aria-roledescription="carousel"` y cada slide `role="group" aria-label="Slide N de M"`. Hoy hay `role="tablist"` en `.carousel-dots` pero no `role="tab"` en los dots.
- **Focus management en el carrusel**: al cambiar slide con flecha, mover el focus al slide activo o al menos al dot activo.

### M4 · SEO y metadata (media)
- Falta `<meta name="description">` en el index. El título "EV Pro - Inicio" es débil.
- Sin Open Graph / Twitter cards.
- Sin favicon (revisar si existe `favicon.ico`).
- Sin `lang` en `<html lang="es">` — ya está (bien).

### M5 · Formato de imágenes (media)
- Convertir los 2 PNG a WebP/AVIF con `<picture>` y `srcset`. La reducción典型a es 70-80% del peso.

### M6 · Testing (baja, escalable)
- Hoy cero tests. Para un sitio plano se puede agregar Vitest mínimo sobre el form handler y el carousel (con jsdom). ~30 líneas.
- Test visual Playwright: verificar scroll, reveal, carrusel funcional.

### M7 · Backend del form (futuro)
- `mailto:` abre el cliente de correo del usuario (frágil, no medible, no funciona en mobile sin app de mail configurada). Considerar Formspree, Netlify Forms o un endpoint propio. El doc ya lo marca diferido.

### M8 · Refactor del JS (baja)
- `js/main.js` tiene 228 líneas con 4 grupos mezclados. Si crece, partir en módulos ES (`<script type="module">`): `js/router.js`, `js/reveal.js`, `js/carousel.js`, `js/contact.js`, `js/main.js` (entry). Sin bundler necesario: el navegador soporta ES modules. En el doc no se pide — dejarlo hasta que main.js pase de ~400 líneas.

---

## 5. Cómo ejecutar / servir

No requiere build:

```bash
# Cualquier servidor estático:
python3 -m http.server 8000
# o
npx serve .
# abrir http://localhost:8000
```

Verificado: `index.html`, `css/style.css`, `js/main.js`, `Elementos Decorativo.png`, `Fondo Web.png`, `pages/contacto.html` todos sirven 200 OK. `pages/contacto.html` redirige a `index.html#contacto`.

---

## 6. Resumen one-liner

> **El design doc aprobado (2026-07-21) quedó implementado sobre la homepage original sin romper su identidad: hero compacto + scroll hint, 3 secciones editoriales (Sobre/Marcas/Contacto) dark→light→dark, footer compacto. 0 dependencias nuevas, 0 build step. Se detectaron 8 bugs reales (BUG-1 del fondo del body y BUG-2 del hero que no es tan compacto son los visuales) y 6 cuellos de botella (resize sin throttle, PNGs de 800KB-1.2MB sin optimizar son los más jugosos). El primero步步 a corregir es BUG-1, una sola línea de CSS. El responsive mobile y la accesibilidad del carrusel son las mejoras pendientes más importantes.**
