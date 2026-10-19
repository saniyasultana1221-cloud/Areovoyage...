# 🌍 AeroVoyage — 3D Spatial Travel Concierge & WebGL Experience

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

> A modern, production-grade 3D spatial web application that reimagines global travel discovery through high-performance WebGL graphics, photorealistic NASA earth textures, and an Apple VisionOS-inspired glassmorphism user interface.

---

## 💼 Available for Freelance & Contract Work
I built this project to demonstrate end-to-end creative frontend engineering, 3D WebGL architecture, and performance optimization for commercial client applications.

- **Available for:** Full-stack frontend development, 3D interactive landing pages, WebGL/Three.js web apps, and modern UI/UX implementation.
- **Hire me on Upwork:** [Upwork Profile](https://www.upwork.com)
- **GitHub:** [saniyasultana1221-cloud](https://github.com/saniyasultana1221-cloud)

---

## ✨ Key Features & Architectural Highlights

### 🛰️ 1. Interactive 3D Spatial Earth (Three.js & WebGL)
- **Photorealistic NASA Textures**: Multi-layered Earth rendering with diffuse surface maps, specular ocean reflectance, normal bump mapping, and a dynamic atmospheric cloud layer.
- **Geospatial City Coordinate Mapping**: Accurate spherical coordinate conversion (`lat/lon` to `Vector3`) displaying worldwide destination pins with animated hover states and pulse rings.
- **Raycaster Interaction**: 30 FPS throttled raycasting for real-time cursor hover detection and destination focus.

### ⚡ 2. 60 FPS Performance & Zero Startup Latency
- **Sub-5ms Texture Delivery**: Bundled local high-resolution assets to eliminate multi-second remote network roundtrips.
- **Offscreen WebGL Throttling**: Integrated `IntersectionObserver` to pause GPU rendering and animation loops when components are out of viewport.
- **Smooth Inertial Physics**: Custom smooth scrolling powered by **Lenis** combined with native GPU hardware acceleration.

### 🎨 3. VisionOS Spatial Glassmorphism UI
- **Futuristic Floating HUD**: Dynamic blur backdrops, translucent glass pills, and responsive status controls.
- **Multi-Currency Engine**: Instant live currency switching (USD, EUR, GBP, JPY, INR, AED, AUD, CAD) across all booking packages.
- **Interactive Travel Gamification**: Integrated "Spin & Win" promotional rewards engine and Vibe Quiz matching system.

### 💳 4. Commercial-Ready Checkout & Backend Readiness
- **Stripe Integration**: Secure payment flow handling with `@stripe/stripe-js`.
- **Supabase Real-Time Backend Architecture**: Ready for booking persistence, user authentication, and bookmark/bucket-list storage.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
|---|---|
| **React 18** | UI component architecture and state management |
| **TypeScript** | Strict type safety, clean data modeling, and robust developer experience |
| **Three.js** | 3D scene management, shaders, lighting, camera controls, and geometries |
| **Tailwind CSS** | Utility-first styling with custom glassmorphism and keyframe animations |
| **Lenis Scroll** | Ultra-smooth inertial kinetic scrolling |
| **Lucide React** | Clean, lightweight iconography |
| **Vite 6** | Instant HMR development server and optimized production bundling |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/saniyasultana1221-cloud/Areovoyage....git

# Navigate into project directory
cd Areovoyage...

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` to explore the experience locally.

### Production Build
```bash
npm run build
```

---

## 🤝 Client Services Offered (Upwork & Freelance)
Need a similar interactive experience for your product, brand, or SaaS?
- 🌟 **3D Landing Pages & Websites** (Three.js, WebGL, Spline, Canvas)
- 🚀 **Performance Optimization** (Diagnosing web lag, 60fps WebGL optimization, bundle reduction)
- 📱 **Custom React & Next.js Web Apps** (Tailwind, Stripe payments, Supabase/Firebase)
- 💎 **Modern UI/UX Implementation** (Figma to pixel-perfect responsive code)
