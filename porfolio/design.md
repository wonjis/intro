# Portfolio Design Principles

## 1. Core Visual Identity
The portfolio embodies a **premium, minimalist, and editorial** aesthetic. It relies on high contrast, elegant typography, and subtle motion to create a sophisticated user experience.

-   **Theme**: Strict Dark Mode. Deep blacks and dark grays form the canvas, allowing content to pop.
-   **Vibe**: Professional, Intellectual, Elegant, "Quiet Luxury".
-   **Key Metaphor**: A digital art gallery or high-end editorial magazine.

## 2. Color Palette
The design uses a restrained, monochrome palette with purposeful opacity layers.

| Variable | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--bg-black` | `#000000` | Main background, deep depth. |
| `--text-white` | `#ffffff` | Primary headings, active states. |
| `--text-gray` | `#b8b8b8` | Body text, secondary information. |
| `--border-gray` | `#333333` | Subtle dividers, card borders. |
| **Glass Effect** | `rgba(0,0,0,0.95)` | Navigation backgrounds (backdrop-blur). |

## 3. Typography
Typography is the primary design element, utilizing a dual-serif stack to maintain an editorial feel.

-   **Display / Headings**: **Cormorant Garamond**
    -   *Weights*: 300 (Light), 400 (Regular).
    -   *Usage*: Large refined headlines, section titles.
    -   *Characteristics*: High contrast, elegant ligatures, distinct "old-style" feel.
-   **Body / UI**: **Lora**
    -   *Usage*: Paragraphs, navigation links, buttons.
    -   *Characteristics*: Readable serif with contemporary roots, optimized for screens.

## 4. Layout & Grid System
-   **Container Width**: Max `1400px`, centered. Promotes readability on large screens.
-   **Spacing**: Generous vertical whitespace (`padding: 8rem 4rem`). Content is never cramped.
-   **Grids**:
    -   **Cards**: Responsive grid (`repeat(auto-fit, minmax(350px, 1fr))`).
    -   **Asymmetric Layouts**: The "About" section uses uneven columns (e.g., `400px 1fr`) to create visual interest.
-   **Responsiveness**:
    -   Fluid scaling for font sizes (`clamp()`).
    -   Stacks vertically on tablets (<1024px) and mobile.

## 5. Motion & Interaction
Motion should be meaningful, not decorative. It guides the user's attention.

-   **Entrance Animations**: `fadeInUp`, `fadeInLeft`, `fadeInRight`. Elements drift into place to create a sense of calm.
-   **Scroll Behavior**: Smooth scrolling (`scroll-behavior: smooth`) coupled with a custom progress bar.
-   **Micro-interactions**:
    -   **Hover**: Cards lift slightly (`translateY(-2px)`) and borders may shift or glow.
    -   **Links**: Underlines expand from center or left (`width: 0` -> `100%`).
    -   **Nav**: Transforms from transparent to blurred solid background on scroll.

## 6. Component Guidelines

### Navigation
-   **Sticky**: Always present but unobtrusive.
-   **Glassmorphism**: High blur (`10px`) background to maintain context of the page below.
-   **Active States**: Clear indication of current section via underline or opacity.

### Cards (Projects / Blog)
-   **Minimalist Borders**: Thin, dark borders (`1px solid #333`).
-   **Depth**: Subtle use of pseudo-elements or double-borders on hover to create a 3D "offset" effect.
-   **Background**: Near-transparent (`rgba(255,255,255,0.01)`) to maintain the dark theme integrity.

### Buttons & Tabs
-   **Ghost Style**: Transparent backgrounds with borders or underlines.
-   **Text-First**: Tabs rely on text color and bottom borders rather than blocky backgrounds.

## 7. Content Strategy
-   **Bios**: Split into "Hero" (the hook) and "Detail" (the story).
-   **Blog**:
    -   **Dynamic Rendering**: Structure content as data objects to allow for client-side filtering.
    -   **Categorization**: Clear taxonomy (Reflection, Analysis, How-To).
    -   **Empty States**: Always design for the "no results" state.
