# AeroVoyage

A high-performance 3D spatial travel discovery web application built with React 18, TypeScript, Three.js, and Tailwind CSS.

As a freelance developer, I designed and built this project using Google Antigravity to showcase how AI-assisted engineering can accelerate the delivery of complex, production-grade web applications. It demonstrates interactive 3D WebGL graphics, custom shader mechanics, real-time geospatial coordinate mapping, and responsive UI architecture.

---

## Overview

AeroVoyage is built around an interactive 3D Earth globe that lets users explore worldwide travel destinations in real time. Rather than relying on static images or flat list views, the interface uses WebGL rendering and spatial navigation inspired by Apple VisionOS to create an engaging visual experience.

---

## Core Features

- Interactive 3D Earth Globe: Built with Three.js and WebGL using multi-layer NASA surface textures, normal bump mapping, specular ocean reflectance, and a dynamic atmospheric cloud mesh.
- Geospatial Coordinate Mapping: Converts geographic latitude and longitude into 3D Cartesian vectors to place interactive destination pins with hover states across the globe.
- Performance and Frame Rate Optimization: Solved startup delays by bundling local high-resolution textures, throttling raycasting calculations to 30 FPS, and using IntersectionObserver to sleep offscreen WebGL renderers, keeping the application at a steady 60 FPS.
- VisionOS Glassmorphism Interface: Floating translucent control panels, search bar, and modals styled with Tailwind CSS backdrop filters.
- Commercial Integration: Configured with Stripe checkout handling and Supabase backend architecture for booking management and saved lists.
- Smooth Scroll Physics: Integrated Lenis inertial scrolling for smooth, natural page transitions.

---

## Tech Stack

- Frontend: React 18, TypeScript, Tailwind CSS, Lucide React
- 3D Graphics: Three.js, WebGL
- Physics and Animation: Lenis smooth scroll
- Payments and Backend: Stripe.js, Supabase
- Tooling: Vite, Git, Google Antigravity

---

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) and npm installed.

### Installation

1. Clone the repository:
   git clone https://github.com/saniyasultana1221-cloud/Areovoyage....git

2. Navigate into the project folder:
   cd Areovoyage...

3. Install the dependencies:
   npm install

4. Start the development server:
   npm run dev

Open http://localhost:5173 in your browser to view the project.

### Production Build

To create an optimized production build:
npm run build

---

## Freelance Services

I work with startups, agencies, and businesses looking for creative frontend development. Services include:

- Custom 3D and WebGL websites (Three.js, interactive visualizers, landing pages)
- Performance optimization and lag elimination for web applications
- Clean UI/UX implementation from Figma into responsive React or Next.js code
- AI-augmented engineering workflows for rapid project delivery

If you would like to discuss a project, feel free to reach out via Upwork or open an issue on this repository.
