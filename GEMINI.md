# GEMINI.md - Project `dunkui` Analysis

This document summarizes the current `dunkui` codebase after migration to SvelteKit.

## Project Overview

### Purpose
`dunkui` is being redesigned to match the "Reacbits" aesthetic, featuring a high-performance WebGL terminal background (`FaultyTerminal`) and a minimalist, dark theme.

### Technology Stack
- **Framework**: SvelteKit 2
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **UI**: Svelte 5, OGL (WebGL)
- **Adapter**: `@sveltejs/adapter-auto`
- **Styling**: Plain CSS (Dark theme)

### Architecture
- **Directory Structure**:
  - `src/routes`: Route files (`+layout.svelte`, `+page.svelte`)
  - `src/routes/docs`: Docs layout & index page
  - `src/routes/docs/faulty-terminal`: Faulty Terminal component page (live preview + controls)
  - `src/routes/docs/particle-field`: Particle Field component page
  - `src/routes/docs/aurora`: Aurora Borealis component page
  - `src/routes/docs/retro-grid`: Retro Grid component page
  - `src/routes/docs/glitch-text`: Glitch Text component page
  - `src/routes/docs/theme-kit`: Theme Kit tool page
  - `src/routes/docs/shader-forge`: Shader Forge tool page
  - `src/lib/components`: Svelte components (Navbar, HeroSection, StatsSection, ComponentsShowcase, ToolkitSection, TestimonialsSection, FooterSection, FaultyTerminal)
  - `static`: Public static files.
- **Current UI**:
  - Premium dark-themed landing page with FaultyTerminal WebGL background
  - Glassmorphism navbar with pill-shaped center nav, mobile hamburger drawer
  - ReactBits-inspired docs section with 3-column layout (sidebar | content | right panel)
  - Each component page has tabbed interface (Preview/Code left, ❤️/Contribute right)
  - Interactive customization controls with white-thumb sliders and toggle switches
  - Props tables with purple prop names, cyan type badges, and monospace defaults
  - Right panel with DunkUI Pro card and Sponsors section
  - Consistent footer across all pages ("Created with ❤️ by dunkui team")
  - Global dark theme in `src/app.css`

## Building and Running

Project scripts are defined in `package.json`:

- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Run Development Server**:
  ```bash
  npm run dev
  ```
- **Type/Svelte Check**:
  ```bash
  npm run check
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Development Conventions

- Prefer Svelte component composition in `src/routes` and `src/lib`.
- Keep static assets in `static/` and reference them with root-relative paths (e.g., `/images/placeholder-1.svg`).
- Use TypeScript in component scripts (`<script lang="ts">`) for data and props.
