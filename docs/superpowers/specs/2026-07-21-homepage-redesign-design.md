# EV Pro — Homepage Redesign Design Doc

**Date:** 2026-07-21
**Status:** Approved (pending implementation)
**Scope:** `index.html` transformation from a single splash screen into a scrollable, multi-section landing page.

---

## Context

EV-PRO-Web-Project is the landing page for **EV Pro**, a brand specializing in audio/electric
sound products distributed in LatAm. The current `index.html` is a closed splash screen:

- `body { overflow: hidden; height: 100vh; }` — no scroll, single viewport.
- White panel on top with navigation (Inicio / Productos / Servicios / Marcas / Ofertas / Contacto).
- Big Playfair hero title "SUMÉRGETE EN EL SONIDO".
- Decorative product image ("Elementos Decorativo.png") at the bottom center.
- Bottom-left: "STOCK DISPONIBLE" block.
- Mid-right: legal / privacy / "Sobre Nosotros" links.
- Bottom-right: circular "Hacer prueba de Sonido" button + social icons.
- Placeholder pages exist: `pages/productos.html`, `pages/cuenta.html`, `pages/contacto.html`,
  `pages/prueba.html`.

Goal: extend this splash into a proper scrollable homepage with three new sections that present
the brand, the distributed brands, and a way to get in touch.

## Decisions (locked)

| # | Decision            | Choice                                     |
|---|---------------------|--------------------------------------------|
| 1 | Site structure      | Hybrid — scrollable homepage + separate product pages. |
| 2 | Current hero         | Keep, but compact (~70–75vh) + scroll hint. |
| 3 | Color palette        | Dark hero + light editorial sections (zigzag dark/light). |
| 4 | Brands layout        | Horizontal carousel, vanilla JS.            |
| 5 | Contact section      | Form + contact info, both visible.         |
| 6 | Form backend         | Frontend-only + `mailto:` (backend deferred). |
| 7 | Scroll behavior      | Scroll + IntersectionObserver reveal animations. |

## Architecture

A single `index.html` rendered with five stacked sections plus a slim footer. The body
transitions from the existing dark splash hero into a light editorial body, then back to a
dark footer — giving the reader a downward rhythm: dark → light → dark.

```
┌────────────────────────────────────────────────────┐
│ HERO (dark, ~75vh)                                 │
│  - white panel with nav (unchanged)                │
│  - Playfair "SUMÉRGETE EN EL SONIDO"               │
│  - decorative product image (scaled down ~50%)     │
│  - scroll hint (animated chevron + line) at bottom │
└────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────┐
│ SOBRE NUESTRA MARCA (light, #f8f7f4)               │
│  Left: overline /03, Playfair title, 2 paragraphs │
│  Right: visual weight block (decorative image)    │
└────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────┐
│ MARCAS QUE DISTRIBUIMOS (light, #ffffff pure)      │
│  Horizontal carousel + arrows + dots              │
│  3 placeholder slides driven by a JS array        │
│  Auto-advance 5s, pause on hover                   │
└────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────┐
│ CONTACTO E CORREO (light, #f8f7f4 — warm again)   │
│  Left: form (Name / Email / Message / Enviar)     │
│       Submits via mailto:                          │
│  Right: contact info + WhatsApp + RRSS           │
└────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────┐
│ FOOTER (dark, compact)                             │
│  © 2026 EV Pro · RRSS · Legal / Privacidad / Sobre │
└────────────────────────────────────────────────────┘
```

## Section details

### 1. Hero (dark, ~75vh)

- Remove `body { overflow: hidden }` and change `height: 100vh` → `min-height: 75vh`.
- White top panel: preserved as-is (grid, nav, blue accents, hover underlines, ripple).
- Playfair title: stays, but slightly smaller so it no longer dominates the whole panel.
- Decorative image: scaled to ~50% of current size, centered below the title, kept visible.
- **Scroll hint**: centered at the bottom of the hero. A thin vertical 1px line (~40px tall)
  plus an animated `▼` chevron that translates down/up on a ~2s loop. Color: current
  `--color-text-beige` at ~0.5 opacity. Role: `aria-hidden="true"` — decorative only.
- Elements relocated: the bottom-left "STOCK DISPONIBLE" block, the mid-right legal links,
  and the bottom-right circular "Hacer prueba de Sonido" button + social icons **move into the
  footer** to keep the hero clean and compact. The "Hacer prueba de Sonido" CTA may optionally
  remain inline in the hero (kept as a single compact circle button at bottom-center next to
  the scroll hint) — implementation note: try inline, fallback to footer.

### 2. Sobre nuestra marca (light, #f8f7f4)

- Editorial section. Background warm off-white `#f8f7f4`.
- Overline: `→ /03 · SOBRE NUESTRA MARCA` — reuses the numbering style already present in the
  splash.
- H2 title: Playfair Display, `NUESTRA MARCA`. Slightly smaller scale than the hero h1.
- Body copy: 2 paragraphs (Spanish, placeholder text that the maintainer will replace).
- Visual: right-column "weight block" — either a solid color block with subtle texture, or the
  reused `Elementos Decorativo.png` cropped. No new design asset required.
- Layout: 2-column grid on desktop (`grid-template-columns: 1fr 1fr; gap: 48px`), single
  column on `max-width: 768px`.
- Reveal animation: title slides up 20px and fades in; paragraphs stagger 80ms each.

### 3. Marcas que distribuimos (light, #ffffff pure)

- Pure white background to subtly break from the previous warm tone.
- Section header pattern same as Section 2: overline `/02 · MARCAS QUE DISTRIBUIMOS`, H2, and a
  short descriptor sentence.
- **Carousel**: a horizontal `overflow-x: hidden` row containing slides laid out with `flex`.
  - Each slide: card with `logo placeholder + brand name (H3 Playfair) + short description +
    "Ver productos →" link`.
  - Arrows: large circular buttons (`48px`) on left/right margins, blue `#0066ff` background,
    white chevron, hover lift.
  - Dots: small indicators below the carousel; active dot widens.
  - Behavior: clicks → advance one slide. Auto-advance every 5s, pause on `mouseenter`,
    resume on `mouseleave`.
  - Data: a JS array `BRANDS = [...]` in `main.js` defines the slides; the maintainer edits
    the array, no DOM edits needed to add/remove brands.
  - Initial: 3 placeholder slides ("Marca 1", "Marca 2", "Marca 3") with descriptive text.
- Reveal animation: whole carousel fades and slides up 30px on first entry.

### 4. Contacto e correo (light, #f8f7f4 warm again)

- Warm off-white background to zigzag with the previous white.
- H2 "CONTACTO" + short subtitle.
- 2-column layout on desktop (`grid-template-columns: 1fr 1fr; gap: 56px`):
  - **Left column — form**:
    - Labels: Nombre, Email, Mensaje.
    - Inputs: standard styled inputs (`border: 1px solid #ddd; border-radius: 8px`,
      focus state with blue border).
    - Validation: HTML5 `required`, type `email` for the email field.
    - Submit button `.btn-catalog`-style filled blue, opens `mailto:` with subject
      `Contacto desde EV Pro — <name>` and body containing the email + message.
    - No backend, no fetch, no external service.
  - **Right column — contact info**:
    - Big WhatsApp icon that opens `https://wa.me/<number>?text=...` with prefilled message.
    - Email link (mailto), phone, address — all visible placeholders to be replaced.
    - Social icons (same set as the current hero, relocated) — Instagram, Facebook, WhatsApp.
- Reveal animation: two columns stagger — form fades in from left, info fades in from right,
  120ms apart.

### 5. Footer (dark, compact)

- Background `var(--color-bg-black)` (#000), tight padding `24px 32px`.
- 3-column flex: copyright (left) · social icons (center) · legal links (right).
- Copyright: `© 2026 EV Pro — Todos los derechos reservados`.
- Legal links: "Aviso Legal / Política de Privacidad / Sobre Nosotros" — same content as the
  current `mid-right-links` block but relocated to the footer. Numbering (`/01`, `/02`, `/03`)
  preserved as a typographic detail.

## Technical plan

### Files touched

| File            | Change                                                                 |
|-----------------|------------------------------------------------------------------------|
| `index.html`    | Rewrite: keep nav/top-panel and hero, add `<section>`s for Sobre / Marcas / Contacto, add footer. Add `data-route` keys to new CTAs. |
| `css/style.css` | Add classes for: hero scroll hint, section overline/title typography, section padding, brand carousel, contact form inputs, footer. Preserve all existing variables. Adjust `body { overflow: hidden }` and `height: 100vh` only. |
| `js/main.js`    | Add: carousel init (slides from JS array, arrows, dots, auto-advance, hover pause), IntersectionObserver for reveal-on-scroll animations, mailto compose function for the form submit. Keep existing ROUTES map and ripple hook. Add new routes to ROUTES if needed. |
| `pages/contacto.html` | Reviewed and either: (a) kept as standalone for direct linking from nav, or (b) replaced by a redirect to `index.html#contacto`. Preference: replace with `<meta http-equiv="refresh" content="0; url=../index.html#contacto">` so old links don't 404. |

No new dependencies. No new libraries. No build step.

### CSS additions (key new rules only)

```css
/* Reveal-on-scroll */
.reveal      { opacity: 0; transform: translateY(20px); transition: opacity .6s var(--ease-smooth), transform .6s var(--ease-smooth); }
.reveal.in   { opacity: 1; transform: translateY(0); }
.reveal.r-l  { transform: translateX(-30px); }   /* from left  */
.reveal.r-r  { transform: translateX(30px);  }   /* from right */
.reveal.in.r-l, .reveal.in.r-r { transform: translateX(0); }

/* Section rhythm */
section           { padding: 96px 20px; }
.section-dark     { background: #000; color: #fff; }
.section-light    { background: #f8f7f4; color: #1b1219; }
.section-pure     { background: #fff; color: #1b1219; }

/* Hero scroll hint */
.scroll-hint     { position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; }
.scroll-hint svg  { animation: bounceDown 2s var(--ease-smooth) infinite; }
@keyframes bounceDown { 0%,100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(6px); opacity: 1; } }

/* Carousel shell */
.carousel        { position: relative; overflow: hidden; }
.carousel-track  { display: flex; transition: transform .5s var(--ease-smooth); }
.carousel-slide  { flex: 0 0 100%; padding: 0 20px; }

/* Contact form inputs */
.contact-form input, .contact-form textarea { width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 8px; font: inherit; background: #fff; }
.contact-form input:focus, .contact-form textarea:focus { border-color: var(--color-blue); outline: none; }
```

### JS additions (key new logic only)

```js
// 1) Carousel
const BRANDS = [
  { name: 'Marca 1', desc: 'Descripción placeholder 1 — reemplazar con la real.' },
  { name: 'Marca 2', desc: 'Descripción placeholder 2 — reemplazar con la real.' },
  { name: 'Marca 3', desc: 'Descripción placeholder 3 — reemplazar con la real.' },
];
let currentSlide = 0;
let carouselTimer = null;

function renderCarousel() { /* builds slides + dots from BRANDS */ }
function goToSlide(i)     { /* transforms track, updates active dot */ }
function nextSlide()      { goToSlide((currentSlide + 1) % BRANDS.length); }
function prevSlide()      { goToSlide((currentSlide - 1 + BRANDS.length) % BRANDS.length); }
function startAuto()      { carouselTimer = setInterval(nextSlide, 5000); }
function stopAuto()       { clearInterval(carouselTimer); }

// 2) Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 3) Contact form submit -> mailto
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.querySelector('[name="nombre"]').value;
  const email = document.querySelector('[name="email"]').value;
  const message = document.querySelector('[name="mensaje"]').value;
  const subject = encodeURIComponent(`Contacto desde EV Pro — ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:info@evpro.com?subject=${subject}&body=${body}`;
}
```

## Out of scope

- Backend for the contact form (deferred — flag with `todo` in JS).
- Real brand assets (placeholder logos only).
- Brand detail pages (links point to `#` for now).
- Replacing copy in the "Sobre nuestra marca" paragraphs (placeholder text only).
- Generated design images for the "visual weight" block in Section 2.
- Animations of the existing nav and ripple button beyond what is already there.
- Mobile responsiveness detailed tuning (a basic single-column fallback is defined; final
  mobile polish goes in a follow-up pass).

## Risks / edge cases

- **Existing animations**: the current `decorativeBreathe` 4s loop and `titleSlideIn` should
  still play on load inside the compact hero; keep their definitions, only scale down the
  decorative image.
- **`prefers-reduced-motion`**: the existing media query already neutralizes animations — new
  reveal/scroll-hint animations should respect the same query (set them to `animation: none`
  and `transition: none` inside that block, or just force `.reveal { opacity: 1 }`).
- **Carousel on mobile**: arrows may be too large at small viewports; cap at 36px on
  `max-width: 480px`.
- **mailto length**: if the user writes a very long message, mailto URLs may be truncated by
  the OS email client. Acceptable trade-off for v1; consider a real form service for v2.
- **Existing routes**: the `ROUTES` map in `main.js` stays unchanged; new CTAs (carousel
  arrows, contact submit) use `addEventListener` directly, not `data-route`, so they don't
  conflict.

## Acceptance criteria

1. `index.html` scrolls; `body` no longer has `overflow: hidden`.
2. Hero renders compact (~70–75vh) with a visible scroll hint at the bottom.
3. Three new sections present in order About → Brands → Contact, all with light backgrounds
   per spec, separated from the dark hero and dark footer.
4. Brand carousel initializes from the `BRANDS` JS array, has 3 placeholder slides by default,
  advances on arrow click and auto-advances every 5s, pauses on hover.
5. Contact form has Name / Email / Message / Enviar fields; submit opens `mailto:info@evpro.com`
   with subject and body prefilled; fails visibly if required fields are empty.
6. Footer contains copyright, social icons, and the three legal links as specified.
7. Reveal animations trigger once on scroll for each element with class `.reveal`. Respects
   `prefers-reduced-motion`.
8. No new dependencies; no changes to `package.json` (there isn't one); no build step.
9. No existing visual identity (white panel, blue, Playfair title) lost in the hero.

## Next step

Transition to `writing-plans` skill to create the implementation plan.
