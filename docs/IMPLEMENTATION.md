# Reference study & implementation scope

## What was studied

Reference: https://www.zalak-patel.com/ . Study performed on 11 October 2026.

The public desktop and mobile interface, navigation, compiled dependency signals, CSS, hover interactions and major views were inspected before implementation. Reference downloads and study tooling are deliberately not included in this repository.

Observed technology signals: React 18.3.1, Tailwind CSS 4.2.4, Framer Motion-style animation APIs, Three.js revision 185, a React globe wrapper, and a Vite-style build.

Observed structure:
- A six-card dashboard on a white 22px dotted field, with dark 16px dotted cards.
- A 3.1-second typographic introduction.
- A rainbow cursor trail and live pointer-speed indicator.
- 2D, 3D, VR-style and AR controls; sticky pill navigation; mobile menu.
- 15 folder-style case studies with detailed project views.
- A 51-item, category-filtered media gallery.
- An editorial profile with a central portrait, testimonials, book carousel and article ticker.
- A hover/tap design-roadmap view, draggable work-wall component and scroll-to-top button.
- A rotating, zoomable experience globe and CV link.

## Measured dashboard geometry

| Viewport | Reference | Recreated demo |
| --- | --- | --- |
| 1440px desktop width | 1119px total page height; top cards 459px, lower cards 528px | 1119px total page height; same card-row heights |
| 390px mobile width | Approximately 2834px total page height | Approximately 2836px in the tested browser |
| 768px tablet width | Two top cards, full-width skill matrix, two lower cards, full-width globe | Same responsive section order and grid structure |

New text and imagery intentionally change line breaks and pixels. Browser rendering, font rasterisation, animation timing and camera permission also vary. This is not a promise of 100% pixel identity across devices.

## Deliberate differences

- All identity, project, research, CV, illustration and writing content is replaced with original, explicitly fictional demonstration content.
- Original SVG/CSS/React studies replace remote gallery videos. They preserve the gallery’s count, aspect ratios, filtering and full-screen interactions, but not its original media.
- The original award badge is omitted: including it would imply an award this template has not received.
- The camera has a permission/error message and 2D fallback.
- VR is a visual presentation mode, not an actual headset session. AR is a camera compositing mode, not spatial tracking.
- The roadmap is native React rather than a bundled iframe document.
- Music is locally synthesised rather than embedded from a third party.
- Keyboard labels, focus handling, reduced-motion support and hash-based direct links are added.

## Checks completed

The implementation was built successfully with Vite and browser-tested in headless Chromium using desktop and mobile widths. Checks covered dashboard layout, folder navigation, snapshot tabs, the working prototype, experiment filtering and player controls, the profile, roadmap explanations, viewing-mode switching and the mobile menu. No uncaught page errors were observed in that run.

Content/asset checks are reproducible with `npm test`. This does not certify every browser, camera, assistive technology or GPU. Test your own final content and devices before publishing.
