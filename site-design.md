# VeerNeo Site Design System

This document outlines the design principles, technical specifications, and stylistic guidelines for the VeerNeo company website to ensure future consistency.

## 1. Design Philosophy
- **Style**: High-fidelity, Apple-inspired minimalist dark/light hybrid.
- **Vibe**: Professional, Visionary, Intelligence-driven.
- **Keywords**: Clean, Precise, Fluid, 3D.

## 2. Color Palette
- **Primary Bg**: `#ffffff` (Pure White)
- **Secondary Bg**: `#fbfbfd` (Ultra Light Gray)
- **Primary Text**: `#1d1d1f` (Deep Obsidian)
- **Secondary Text**: `#86868b` (Soft Silver Gray)
- **Accent Blue**: `#0066cc` (Apple Blue)
- **Borders**: `rgba(0,0,0,0.08)` (Subtle separation)

## 3. Typography
- **Font Stack**: `'Inter'`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
- **Hero Headings**: `font-weight: 700`, `letter-spacing: -3px`, `line-height: 1.05`.
- **Body Copy**: `font-weight: 400`, `line-height: 1.5`, `color: var(--apple-text-secondary)`.
- **Code**: `'SF Mono'`, `'Menlo'`, `monospace`.

## 4. Components
### Navigation Bar
- **Logo**: Stylized SVG "VN" geometric abstraction (Isometric V with mesh vertices).
- **Style**: Floating Card (24px from top).
- **Effect**: Glassmorphism (75% opacity, 20px blur), Border Radius 20px.
- **Behavior**: Fixed to top center, width 90% (max 1024px).

### Bento Grid
- **Border Radius**: 28px
- **Padding**: 40px
- **Interactivity**: Scale up `1.02x` on hover with soft shadow.

### 3D Cube (Hero)
- **Style**: Wireframe/Transparent faces.
- **Animation**: `rotate3d` 15-20s infinite linear.
- **Perspective**: 1000px.

## 5. Visual Effects & Animations
- **Reveals**: Elements should fade in and slide up from 30px using `IntersectionObserver`.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Transitions**: Standard 0.4s for cards, 0.2s for links.

## 6. Responsiveness Rules
- **Desktop**: 1024px max-width for main content.
- **Tablets**: Stack grids to single columns where clarity is lost.
- **Mobile**:
    - Reduce heading size to `42px`.
    - Nav: 95% width, 12px from top, 12px radius.
    - Reduce bento grid padding to `20px`.

## 7. Branding & Team
- **CEO & Co-founder**: Garima Varma (Management, Strategy).
- **Founding AI Engineer & Co-founder**: Nilesh Sarkar (AI Architecture, Engineering).
- **Contact**: veerneostudio@gmail.com

## 8. Project Structure
```
/
├── assets/
│   ├── css/
│   │   └── index.css
│   ├── images/
│   │   ├── Garima.png
│   │   └── Nilesh.png
│   └── js/
│       └── index.js
├── about.html
├── contact.html
├── index.html
├── privacy.html
├── solutions.html
└── technology.html
```

---
*Maintained by the VeerNeo Founding Team.*