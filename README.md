# Heby T Paul — Full Stack Developer Portfolio

A modern, highly optimized, and conversion-focused developer portfolio built for **Heby T Paul** (Full Stack Developer based in Kochi, India). 

This website blends modern full-stack positioning with a dark-mode aesthetic, high-end WebGL shaders (water ripple and paint reveal effects), smooth scrolling, and responsive editorial layout.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router) + [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom Theme Variables (`globals.css`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for DOM animations, spring physics, and scroll triggers
- **WebGL & Shaders**: [OGL](https://github.com/oframe/ogl) (ultra-lightweight WebGL engine) for custom GLSL fragment shaders
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/) for fluid scroll feel
- **Icons**: Custom SVG icons (`Icons.tsx`) & [Lucide React](https://lucide.dev/)
- **Image Optimization**: `next/image` for responsive WebP image delivery

---

## 🌟 Key Features & Architecture

### 1. Hero Section & WebGL Paint Reveal Shader (`HeroCanvas.tsx`)
- **Procedural Artwork Reveal**: Uses a 2D canvas brush mask (`tPaint`) combined with a 3D Simplex Noise fragment shader to reveal colorful artwork as the cursor moves over dark theme elements.
- **Refraction & Ripple Physics**: Calculates real-time distance-based multi-wave ripples with normal vector distortion and subtle chromatic aberration.
- **Optimized Performance**: WebGL context handled via `ogl` with an `IntersectionObserver` loop cleanup so rendering pauses when off-screen.

### 2. Modern Conversion Flow & Section Ordering
1. **Hero**: Clear positioning ("Full Stack Developer"), social links rail, and dual primary/secondary CTAs.
2. **About**: Editorial 4/8 asymmetric split with a sticky profile photo, availability indicator, and numbered core capability rows.
3. **Featured Projects (Work)**: Shows selected real-world work (**Berakah**, **Tutoria**, **Travel Advisor**) before experience. Magnetic 3D tilt cards tuned to ±5° for optimal link accessibility and immediate content readability.
4. **Experience**: Open-source contributions at Layer5 (Meshery) & freelance full-stack development journey.
5. **Skills / Tech Stack**: Categorized into scannable domain groups (*Frontend*, *Backend*, *AI & Tools*) replacing redundant tag clouds.
6. **Contact & Footer**: Direct email link (`hebytpaul@gmail.com`) and social presence.

### 3. Snappy Spring Physics Custom Cursor
- Custom spring-driven cursor (`CustomCursor.tsx`) tuned with physics (`damping: 30, stiffness: 400, mass: 0.2`) to eliminate artificial drag while maintaining smooth fluid motion.

---

## 📂 Project Structure

```text
├── public/                # Public assets (profile.png, images, SVGs)
├── src/
│   ├── app/               # Next.js App Router pages and layouts
│   │   ├── globals.css    # Tailwind CSS v4 setup and color tokens
│   │   ├── layout.tsx     # Root layout with metadata, Lenis scroll, and Custom Cursor
│   │   └── page.tsx       # Main page assembling sections in strategic order
│   ├── components/        # Feature components
│   │   ├── about/         # About section with sticky photo and capabilities
│   │   ├── canvas/        # WebGL shader canvas (OGL paint & water ripple)
│   │   ├── contact/       # Direct contact section and social links
│   │   ├── experience/    # Experience timeline (Layer5, Freelance)
│   │   ├── hero/          # Hero section with animated typography & social rail
│   │   ├── projects/      # Work showcase and magnetic 3D ProjectCards
│   │   ├── skills/        # Categorized skills breakdown
│   │   └── ui/            # UI components (Navbar, CustomCursor, Icons, Loader, Footer)
│   └── lib/               # Utilities (clsx + tailwind-merge)
└── next.config.ts         # Next.js Configuration
```

---

## 🛠️ Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Adding Your Images

- **Profile Picture**: Place `profile.png` inside the `public/` directory. It is automatically imported by `src/components/about/About.tsx`.
- **Project Screenshots**: Place images (e.g., `berakah.jpg`, `tutoria.jpg`, `travel.jpg`) inside `public/projects/` and update the `image` field in `src/components/projects/Projects.tsx`.

---

## ⚡ Performance Best Practices

- **Zero Layout Thrashing**: Framer Motion targets CSS `transform` and `opacity` exclusively.
- **Dynamic Imports**: Below-the-fold components and the WebGL canvas are lazily loaded using `next/dynamic` with `ssr: false`.
- **Optimized GPU Overhead**: Unnecessary `backdrop-blur` layers were stripped from card grids to maximize frame rates on mid-range and mobile devices.
