# Premium Interactive Portfolio

This is a premium, interactive personal portfolio website designed as a digital canvas. It features a dark mode aesthetic, high-end WebGL shaders (water ripple and paint reveal effects), smooth scrolling, and magnetic 3D interactions.

## 🚀 Tech Stack

- **Framework**: [Next.js 16.2.12](https://nextjs.org) (App Router) + [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom CSS Variables for theme tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for DOM animations, spring physics, and scroll triggers
- **WebGL & Shaders**: [OGL](https://github.com/oframe/ogl) (a minimal, fast WebGL library) used for custom fragment shaders
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/) for a premium scroll feel
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`

---

## ✨ Core Interactive Effects & How They Work

### 1. The Paint Reveal Mask & Water Ripple (HeroCanvas)

Instead of using heavy libraries like Three.js, this project uses `ogl` to render a highly optimized, fullscreen raw WebGL shader. The hero canvas combines two primary effects: **a paint mask reveal** and **a multi-wave ripple**.

#### **How it works:**

1. **The 2D Mask Canvas**: A hidden HTML5 `<canvas>` element tracks mouse movement. As the mouse moves, it draws a soft radial gradient (the "brush") at the cursor position. The brush size dynamically scales based on mouse velocity, simulating "pressure".
2. **Texture Upload**: This 2D canvas is uploaded as a texture (`tPaint`) to the WebGL GPU program every frame. 
3. **The Fragment Shader**:
   - The shader generates a procedural, vibrant gradient "artwork" underneath using a 3D Simplex Noise (`snoise`) function.
   - It reads the `tPaint` texture. Where the mask is painted, it reveals the vibrant artwork; where it isn't, it renders the dark base theme.
   - **The Ripple**: A mathematical distance-based wave (`sin(dist * 40.0 - uTime * 5.0) * exp(-dist * 5.0)`) is calculated from the mouse coordinates. This wave distorts the UV coordinates of the underlying noise pattern, creating a realistic, high-framerate water refraction effect.

*Example Shader Logic snippet:*

```glsl
// Pre-compute energy once (shared across all normal samples)
float energy = clamp(length(uMouseVelocity) * 0.012, 0.0, 1.4);

// Generate Normal from water heightmap gradient (3 getHeight calls, energy pre-shared)
const float eps = 0.001;
float h  = getHeight(uv, mouseUV, aspect, energy);
float hx = getHeight(uv + vec2(eps, 0.0), mouseUV, aspect, energy);
float hy = getHeight(uv + vec2(0.0, eps), mouseUV, aspect, energy);
vec3 normal = normalize(vec3(hx - h, hy - h, 0.012));

// Fake Refraction via normal distortion
vec2 refractedUV = uv + normal.xy * 0.08;

// Chromatic Aberration: sample getArt ONCE at center, then offset R/B channels
vec3 artBase = getArt(refractedUV);
float caOffset = 0.0018;
float rCh = getArt(refractedUV + normal.xy * caOffset).r;
float bCh = getArt(refractedUV - normal.xy * caOffset).b;
vec3 artColor = vec3(rCh, artBase.g, bCh);

// Mix the base dark color with the procedural artwork based on the canvas paint mask
vec3 finalColor = mix(baseColor, artColor, smoothstep(0.0, 1.0, texture2D(tPaint, uv).r));
```

### 2. Magnetic 3D Project Cards

The project cards (`ProjectCard.tsx`) feature a 3D tilt effect and magnetic hover interaction, built entirely with Framer Motion.

#### **How it works:**

- It uses `useMotionValue` to track the local `x` and `y` coordinates of the mouse within the card boundary.
- These coordinates are fed into a `useSpring` to add physical weight (damping and stiffness) to the movement.
- `useTransform` maps these spring values to CSS `rotateX` and `rotateY` properties, wrapping the card in a `preserve-3d` container for realistic perspective.

---

## 📂 Project Structure

To replicate or navigate this project, here is the feature-based architecture used:

```text
├── public/                # Static assets (fonts, icons, images)
├── src/
│   ├── app/               # Next.js 15 App Router pages and layouts
│   │   ├── globals.css    # Global Tailwind and custom theme styles
│   │   ├── layout.tsx     # Root layout with Lenis Smooth Scrolling and Custom Cursor
│   │   └── page.tsx       # Main landing page assembling all sections
│   ├── components/        # Feature-based components
│   │   ├── about/         # About section with scroll animations
│   │   ├── canvas/        # WebGL and Canvas shaders (OGL ripple & paint)
│   │   ├── contact/       # Contact section
│   │   ├── experience/    # Timeline component
│   │   ├── hero/          # Hero section with animated typography
│   │   ├── projects/      # Project grid and 3D magnetic cards
│   │   ├── skills/        # Animated skills tags
│   │   └── ui/            # Reusable UI (CustomCursor, Loader, Footer)
│   ├── lib/               # Utilities (clsx + tailwind-merge)
└── next.config.ts         # Next.js Configuration
```

---

## 🛠️ Getting Started & Replication

If you want to replicate this portfolio or start a new project with this setup:

### 1. Installation

Clone the repository, then install dependencies:

```bash
npm install
```

*(If starting from scratch elsewhere, the required packages are: `npm install framer-motion lenis lucide-react clsx tailwind-merge ogl`)*

### 2. Development Server

Run the development environment:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Performance & Optimization Notes

- **Lightweight WebGL**: We use `ogl` instead of Three.js. Combined with procedural shaders (instead of FBO fluid simulations), it ensures a locked 60 FPS across devices with a minimal bundle size.
- **Dynamic Imports**: The heavy WebGL `HeroCanvas` is lazily loaded using `next/dynamic` with `ssr: false` to prevent hydration mismatches and minimize the initial HTML payload.
- **Hardware Acceleration**: All Framer Motion animations only animate CSS `transform` and `opacity` to prevent browser layout thrashing.
- **Canvas Optimization**: The 2D paint mask canvas is initialized with `{ willReadFrequently: false }` and drawn at half resolution to halve the GPU texture upload cost.

### 4. Deployment (Vercel)

This project is optimized for deployment on Vercel.

1. Push your code to a Git repository.
2. Import the repository into [Vercel](https://vercel.com/).
3. Vercel will automatically detect the Next.js framework, configure the build command (`npm run build`), and assign an edge domain.
