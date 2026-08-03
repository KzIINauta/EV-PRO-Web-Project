# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary**: Profesionales del audio en Latinoamérica que necesitan equipo profesional a precio accesible — músicos, estudios de grabación, ingenieros de sonido, productores de eventos, integradores de sistemas de audio. EV Pro cubre todo el espectro pro-audio, desde estudio hasta escenario en vivo.

Cada segmento comparte la misma necesidad: acceso a equipo de calidad profesional que en LatAm suele ser difícil de conseguir, con asesoría que entienda el problema real, no solo una transacción.

## Product Purpose

EV Pro es un distribuidor de equipo de audio profesional de alta gama en Latinoamérica. El sitio web existe como presencia corporativa, punto de contacto y vitrina de marcas — no como e-commerce transaccional. Su objetivo es conectar al profesional del audio con el equipo que necesita, y facilitar el primer contacto (WhatsApp, email, formulario).

## Positioning

Relación calidad/precio. Equipo profesional a precios accesibles para la realidad latinoamericana. No compiten siendo los más baratos, sino ofreciendo la mejor relación entre calidad técnica y costo para la región — un diferenciador que un competidor importando equipo premium europeo no podría replicar sin cambiar su modelo de negocio.

## Operating Context

- **Sitio 100% estático**: HTML5, CSS vanilla, JavaScript vanilla. Sin bundler, sin framework, sin build step. Se sirve con cualquier servidor estático (python3 http.server, npx serve, nginx, etc.). Sin dependencias runtime.
- **Host**: estático, aunque el proveedor concreto no está explicitado en el código.
- **Flujo principal**: el usuario llega al landing, conoce la marca/posicionamiento, explora marcas en el carrusel, y contacta vía formulario (mailto), WhatsApp directo, o email.
- **Páginas secundarias**: `productos.html`, `cuenta.html`, `prueba.html` y `contacto.html` existen como archivos separados pero su contenido actual es placeholder o redirección.
- **Idioma**: español (LatAm). Sin i18n.
- **Ámbito geográfico**: LatAm con presencia confirmada en Colombia (WhatsApp +57). El resto de la cobertura regional no está especificada.

## Capabilities and Constraints

**Funcionalidades existentes:**
- Hero con identidad visual (panel blanco, tipografía grande Playfair, imagen decorativa de productos)
- Navegación con links a secciones internas y rutas a páginas secundarias
- Carrusel de marcas (JS vanilla, configurable vía array `BRANDS`, auto-play 5s, pausa en hover)
- Sección "Sobre nuestra marca" con contenido placeholder
- Formulario de contacto (Nombre/Email/Mensaje → mailto:info@evpro.com)
- Footer compacto con copyright, redes sociales, links legales
- Efecto reveal en scroll via IntersectionObserver
- Escalado del hero mediante `fitToViewport` (mantiene ratio 1920×1080)

**Restricciones técnicas conocidas:**
- Zero nuevas dependencias (sin npm, sin build step)
- Sin backend, sin base de datos
- Formulario de contacto limitado a mailto (abre cliente de correo del usuario)
- Imágenes PNG sin optimizar (~800KB-1.2MB)
- Sin responsive tuning profundo (el hero escala con transform, no es fluido en mobile)
- Sin tests automatizados
- Sin Open Graph / SEO metadata
- Accesibilidad parcial (faltan roles de carrusel, skip link, focus management)

**Decisiones explícitamente pendientes:**
- Si BUG-3 (mover bottom-left y bottom-right del hero al footer) es una decisión de producto pendiente de confirmación
- Si las páginas secundarias (productos, cuenta, prueba) deben tener contenido real o seguir como placeholder

## Brand Commitments

- **Nombre**: EV Pro — confirmado, no se cambia.
- **Logo**: `logo.png` existente — confirmado, no se cambia.
- El resto de la identidad visual (colores, tipografía, tono, imágenes) no está contractualmente atada y puede replantearse.

## Evidence on Hand

- `Fondo Web.png` — imagen de fondo del hero (1.2MB, sin optimizar)
- `Elementos Decorativo.png` — imagen decorativa de productos (807KB, sin optimizar)
- `logo.png` — logotipo de la marca
- `INFORME.md` — informe post-implementación con 8 bugs detectados, 6 cuellos de botella y mejoras recomendadas
- `Actualizacion/` — 7 JSON con especificaciones técnicas detalladas de la implementación anterior
- `docs/superpowers/specs/` — design docs históricos

**Ausencias que no deben fabricarse**: testimonios de clientes, casos de estudio, precios concretos de productos, métricas de rendimiento de equipo, cobertura regional específica fuera de Colombia.

## Product Principles

1. **Sin fricción técnica.** Todo el sitio debe poder servirse desde cualquier hosting estático sin build step, sin dependencias runtime, sin backend. La simplicidad técnica es una ventaja competitiva para el mantenimiento a largo plazo.
2. **El contenido real gobierna.** Placeholders, textos de relleno y datos ficticios no se publican. Cada sección debe tener contenido aprobado por la marca o no existir.
3. **Mobile-first por necesidad, no por moda.** El público objetivo en LatAm accede mayoritariamente desde móvil. El sitio debe funcionar bien en cualquier pantalla, no solo escalar un diseño de escritorio.
4. **El primer contacto es la conversión.** El sitio no vende directamente; su trabajo es hacer que el profesional del audio quiera contactar. Cada sección debe empujar suavemente hacia WhatsApp, email o formulario.
5. **Accesibilidad no es opcional.** Profesionales del audio pueden tener necesidades de accesibilidad (lectores de pantalla, navegación por teclado, contraste suficiente, prefers-reduced-motion). El sitio debe cumplir estándares básicos WCAG.

## Accessibility & Inclusion

No se ha establecido un estándar WCAG específico. El sitio actual tiene `:focus-visible` global, respeta `prefers-reduced-motion`, pero carece de skip link, roles ARIA en el carrusel, y los links legales del footer no son focusables. El público incluye profesionales que pueden usar lectores de pantalla o navegación por teclado.
