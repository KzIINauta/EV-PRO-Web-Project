---
name: EV Pro
description: Audio profesional de alta gama para Latinoamérica
colors:
  dynamic-blue: "#0066ff"
  dynamic-blue-deep: "#0052cc"
  absolute-black: "#000000"
  warm-beige: "#8c897d"
  pill-gray: "#f4f4f5"
  studio-paper: "#f8f7f4"
  studio-white: "#ffffff"
  rich-black: "#1b1219"
  dark-clay: "#3a3631"
  muted-border: "#dddddd"
  card-border: "#eeeeee"
  dot-inactive: "#d8d4cc"
  whatsapp-green: "#25D366"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "134px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-2px"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-1px"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.5px"
rounded:
  panel: "20px"
  pill: "40px"
  card: "16px"
  input: "8px"
  icon-box: "4px"
  circle: "50%"
spacing:
  section-padding: "96px 20px"
  section-inner: "1280px"
  grid-gap: "48px"
  grid-gap-contact: "56px"
  nav-gap: "22px"
  social-gap: "8px"
components:
  button-primary:
    backgroundColor: "{colors.dynamic-blue}"
    textColor: "{colors.studio-white}"
    rounded: "{rounded.pill}"
    padding: "12px 25px"
  button-primary-hover:
    backgroundColor: "{colors.dynamic-blue-deep}"
    rounded: "{rounded.pill}"
    padding: "12px 25px"
  button-circle:
    backgroundColor: "{colors.dynamic-blue}"
    textColor: "{colors.studio-white}"
    rounded: "{rounded.circle}"
    size: "135px"
  button-circle-hover:
    backgroundColor: "{colors.dynamic-blue-deep}"
    size: "135px"
  nav-link:
    textColor: "{colors.rich-black}"
    typography: "{typography.label}"
  pill-button:
    backgroundColor: "{colors.pill-gray}"
    textColor: "{colors.rich-black}"
    rounded: "{rounded.pill}"
    padding: "10px 25px"
  input-field:
    backgroundColor: "{colors.studio-white}"
    rounded: "{rounded.input}"
    padding: "12px 16px"
  brand-card:
    backgroundColor: "{colors.studio-white}"
    rounded: "{rounded.card}"
    textColor: "{colors.dark-clay}"
  social-icon:
    rounded: "{rounded.icon-box}"
    size: "28px"
---

# Design System: EV Pro

## Overview

**Creative North Star: "El Estudio Abierto"**

Un estudio profesional donde todo está a mano. Equipamiento serio, sin pretensiones, pero con la calidez de un espacio real de trabajo creativo. El diseño actual refleja esta dualidad: un hero oscuro y dramático (la cabina de grabación) se encuentra con un panel blanco nítido y preciso (la mesa de mezclas), conectados por una imagen decorativa de productos que flota entre ambos mundos.

El sistema es **premium, limpio, sofisticado y silencioso** — no grita, no necesita hacerlo. El azul Dynamic Blue actúa como única voz de acento, apareciendo solo donde la acción importa (botones, interacción, dots activos). Todo lo demás se apoya en una paleta de blancos cálidos, grises estudio y negro absoluto.

Técnicamente, es una implementación 100% estática: HTML + CSS vanilla + JS vanilla, sin bundler, sin framework, pensada para servirse desde cualquier hosting estático.

**Key Characteristics:**
- Hero de alto contraste: fondo negro → panel blanco → imagen decorativa central
- Una sola voz de acento (Dynamic Blue) aplicada con disciplina quirúrgica
- Tipografía display expresiva (Playfair Display) junto a cuerpo funcional (Inter)
- Esquinas generosas en superficies principales (20px panel, 40px pills), más contenidas en utilitarios (8px inputs)
- Elevación suave y cálida con sombras estratificadas
- Movimiento contenido: fade-in, slide-up, reveal en scroll, float sutil en decorativo

## Colors

La paleta es deliberadamente reducida. El negro y el blanco son los verdaderos protagonistas; Dynamic Blue aparece con moderación como acento funcional. Los grises medios (Warm Beige, Dark Clay, Pill Gray) proporcionan la textura sin competir.

### Primary
- **Dynamic Blue** (`#0066ff`): El único acento cromático. Se usa en botones primarios, hover de navegación, dots activos del carrusel, bordes de focus, y cualquier elemento que requiera acción. Su rareza es su fuerza.
- **Dynamic Blue Deep** (`#0052cc`): Hover y active del Dynamic Blue. Oscurece el tono manteniendo el mismo matiz.

### Neutral
- **Absolute Black** (`#000000`): Fondo del hero y del footer. Puro, sin concesiones. Representa el silencio antes de la música.
- **Studio White** (`#ffffff`): Panel superior del hero, tarjetas de marca, fondos de inputs, section-pure. El lienzo sobre el que todo ocurre.
- **Studio Paper** (`#f8f7f4`): Fondo de secciones editoriales (sobre, contacto). Un blanco ligeramente cálido que quita la dureza hospitalaria.
- **Rich Black** (`#1b1219`): Texto principal sobre fondos claros. Casi negro, con un leve matiz cálido que iguala el tono del papel estudio.
- **Dark Clay** (`#3a3631`): Texto de cuerpo y párrafos secundarios. Un gris oscuro con temperatura.
- **Warm Beige** (`#8c897d`): Texto muted, overlines, borders de iconos sociales, scroll hint. El color del equipo de estudio que no llama la atención pero está ahí.
- **Pill Gray** (`#f4f4f5`): Fondo de la pill de cuenta/carrito, placeholder visual de marcas, fondo de tarjeta about-visual. Gris neutro casi blanco.
- **Muted Border** (`#dddddd`): Bordes de inputs y separadores finos.
- **Card Border** (`#eeeeee`): Borde sutil de tarjetas de marca.

### Named Rules
**The Dynamic Blue Discipline.** Dynamic Blue se usa en ≤5% de cualquier pantalla. Si un elemento no es interactivo o no necesita ser visto primero, no es azul. La rareza del acento es lo que le da poder.

## Typography

**Display Font:** Playfair Display (900, 700) con Georgia como fallback serif.
**Body Font:** Inter (400, 500, 600) con system-ui como fallback sans-serif.

**Character:** Una serif expresiva y dramática para titulares que exigen presencia, contrastada con una sans-serif limpia y funcional para el cuerpo. La serif pone el arte; la sans pone el trabajo. El pairing funciona porque ambos comparten una cualidad de claridad vertical.

### Hierarchy
- **Display** (Playfair Display 900, 134px, line-height 1, letter-spacing -2px): Solo para el hero h1. Escala con `scaleY(1.75)` como efecto dramático. Nunca se repite en otra superficie.
- **Headline** (Playfair Display 700, 3rem/48px, line-height 1, letter-spacing -1px): Títulos de sección editorial (Nuestra Marca, Marcas, Contacto). Escala a 2.2rem en mobile.
- **Title** (Playfair Display 700, 1.4rem, line-height 1.2): Títulos de tercer nivel en secciones de contacto (Hablemos) y títulos de marca en el carrusel.
- **Body** (Inter 400, 1rem, line-height 1.7): Párrafos, descripciones de marca. Máximo 46-60ch para legibilidad.
- **Label / Nav** (Inter 500, 0.72rem, letter-spacing 0.5px): Navegación, overlines, etiquetas de formulario, botones. Todo en mayúsculas por convención.

### Named Rules
**The Display Monopoly Rule.** Playfair Display solo se usa para titulares. Nunca para cuerpo, botones, navegación, etiquetas o decoración. Cuando aparece, es porque el contenido merece presencia escultórica.

## Layout

El layout se organiza en dos modos: el hero ocupa el viewport completo como una composición absoluta de 1920×1080 escalada dinámicamente, y las secciones editoriales viven fuera de esa caja, en un flujo vertical estándar con max-width de 1280px centrado.

- **Hero**: Layout absoluto con posicionamiento preciso. Panel blanco anclado a top:20px con padding interno de 20px 25px. Imagen decorativa centrada. Elementos inferiores (stock, CTA, social) posicionados en absolute. El wrapper mide min-height:75vh.
- **Secciones editoriales**: Grid de 2 columnas (1:1) con gap de 48px. En mobile se colapsa a 1 columna.
- **Sección contacto**: Grid de 2 columnas con gap de 56px. En mobile colapsa a 1 columna.
- **Footer**: Flex horizontal con 3 zonas (copyright, redes, legal). Distribución space-between.
- **Contenedor interno**: max-width: 1280px, margin: 0 auto, padding: 96px 20px en secciones.
- **Densidad**: Moderada a generosa. Hay espacio para respirar.

## Elevation & Depth

El sistema usa **capas suaves y cálidas** en lugar de un sistema de sombras complejo. La profundidad se transmite a través de tres mecanismos: sombras de elevación (capas que flotan), contraste tonal (capas que se separan por valor) y superposición absoluta (el hero como caja cerrada).

### Shadow Vocabulary
- **Panel Elevation** (`box-shadow: 0 12px 40px rgba(0,0,0,0.30)`): Sombra del panel blanco sobre el hero oscuro. La más pronunciada del sistema.
- **Circle Button Hover** (`box-shadow: 0 10px 24px rgba(0,102,255,0.45)`): Glow azul intenso en hover del botón circular "Hacer prueba de Sonido".
- **Button Hover** (`box-shadow: 0 8px 16px rgba(0,102,255,0.35)`): Glow azul en hover de botones primarios.
- **Card Rest** (`box-shadow: 0 4px 16px rgba(0,0,0,0.04)`): Sombra sutil de reposo en tarjetas de marca.
- **Pill Rest** (`box-shadow: 0 2px 8px rgba(0,0,0,0.06)`): Micro-sombra en el botón pill de cuenta/carrito.

### Named Rules
**The Flat-by-Default Rule.** Las superficies son predominantemente planas. Las sombras aparecen como respuesta a estado (hover, elevación de panel). Un estudio de grabación no tiene sombras proyectadas en sus paredes; la profundidad está en la disposición de los elementos, no en una jerarquía de sombras.

## Shapes

El lenguaje formal es de **esquinas generosas en superficies principales** y **ángulos retenidos en utilitarios**. Esto crea una jerarquía inconsciente: lo grande es amigable, lo pequeño es preciso.

- **Panel del hero**: 20px radius — la superficie más grande, la curva más pronunciada.
- **Pills (botones, cuenta/carrito, badge WhatsApp)**: 40px radius — completamente capsulares. Invitan al tacto.
- **Tarjetas de marca**: 16px radius — amables pero contenidas.
- **Inputs**: 8px radius — funcionales, no decorativos.
- **Iconos sociales / legales**: 4px radius — casi cuadrados, precisos.
- **Botón circular**: 50% a 135×135px — la forma más distintiva del sistema.
- **Bordes**: Líneas de 1px en inputs y tarjetas. Bordes punteados (2px dotted) solo en la línea decorativa del hero.

No se usan clips, máscaras, ni geometrías complejas. El lenguaje formal es honesto: las curvas siguen a la función.

## Components

### Buttons
- **Shape:** Completamente capsular (pill-radius, 40px). Existe una variante circular de 135×135px.
- **Primary (btn-catalog):** Dynamic Blue (#0066ff) sobre blanco, padding 12px 25px. Font: Inter 600, ~0.75rem. En hover: Dynamic Blue Deep, translateY(-2px), glow azul de 8px.
- **Circle (circle-btn):** Dynamic Blue, 135×135px, 50% radius. Contiene texto e icono de play. En hover: Dynamic Blue Deep, scale(1.08), glow azul de 10px.
- **Pill (nav-right-pill):** Pill Gray (#f4f4f5) sobre blanco, padding 10px 25px. Inter 500. En hover: fondo más oscuro (#e8e8ea), translateY(-2px).

### Brand Cards (carrusel)
- **Corner Style:** 16px radius.
- **Background:** Studio White.
- **Border:** 1px solid Card Border (#eee).
- **Shadow:** 0 4px 16px rgba(0,0,0,0.04) en reposo.
- **Internal Padding:** 40px 32px.
- **Content:** Logo circular placeholder (96×96px, pill-gray background, 50% radius), título marca en Playfair 700 1.6rem, descripción en Dark Clay, link "Ver productos →" en Dynamic Blue.

### Inputs & Fields
- **Style:** Studio White, 1px solid Muted Border (#ddd), 8px radius, padding 12px 16px.
- **Focus:** Dynamic Blue border, outline none, box-shadow glow de 0 0 0 3px rgba(0,102,255,0.12).
- **Textarea:** Mismos valores, min-height 140px, resize vertical.
- **Labels:** Inter 500, 0.85rem, Dark Clay.

### Navigation
- **Style:** Text links centrados con underline hover animado. Inter 500, ~0.72rem, uppercase. Rich Black en reposo, Dynamic Blue en hover con underline de 1.5px que crece desde 0.
- **Nav right (pill):** Botón pill con icono de lupa, texto "MI CUENTA", icono de carrito y contador.

### Footer
- **Estilo:** Absolute Black, espacio horizontal de 3 zonas. Copy en gris claro (#aaa), iconos sociales en Warm Beige con hover a Dynamic Blue, links legales en Warm Beige con hover a blanco.
- **Legal links:** Texto plano sin href (pendiente de corrección), con span numerado `/01`, `/02`, `/03`.

### Scroll Hint
- **Estilo:** Línea vertical de 1px de alto (40px) en Warm Beige, + chevron SVG que bounceDown infinito. Posicionado en absolute center-bottom del hero. pointer-events: none. Aria-hidden.

## Do's and Don'ts

### Do:
- **Do** mantener Dynamic Blue como el único acento cromático en ≤5% de la pantalla.
- **Do** usar Playfair Display exclusivamente para titulares principales — nunca para cuerpo, botones o navegación.
- **Do** respetar el contraste hero oscuro vs secciones claras — es la señal rítmica fundamental del sistema.
- **Do** mantener las sombras sutiles y localizadas — la elevación es estado, no decoración.
- **Do** revelar contenido progresivamente con IntersectionObserver — el movimiento es información, no espectáculo.

### Don't:
- **Don't** agregar un segundo color de acento. Dynamic Blue es la única voz cromática.
- **Don't** usar el botón circular fuera del hero — es una forma exclusiva de esa superficie.
- **Don't** mezclar fuentes serif para cuerpo — Playfair es solo display.
- **Don't** eliminar el reveal o bloqueado en `prefers-reduced-motion` — la accesibilidad no es opcional.
- **Don't** crear layouts absolutos fuera del hero — el resto del sitio usa flujo vertical estándar.
