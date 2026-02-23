// DunkUI Component Registry (Svelte Native)
// Auto-generated from src/newbits directory structure

export interface RegistryItem {
    name: string;
    route: string;
    slug: string;
    description?: string;
    category?: 'animations' | 'backgrounds' | 'components' | 'text-animations';
}

export const animations: RegistryItem[] = [
    { name: "Target Cursor", slug: "target-cursor", route: "/docs/animations/target-cursor" },
    { name: "Splash Cursor", slug: "splash-cursor", route: "/docs/animations/splash-cursor", category: "animations", description: "Fluid simulation cursor effect using WebGL." },
    { name: "Shape Blur", slug: "shape-blur", route: "/docs/animations/shape-blur" },
    { name: "Meta Balls", slug: "meta-balls", route: "/docs/animations/meta-balls" },
    { name: "Electric Border", slug: "electric-border", route: "/docs/animations/electric-border" },
    { name: "Crosshair", slug: "crosshair", route: "/docs/animations/crosshair" },
    { name: "Blob Cursor", slug: "blob-cursor", route: "/docs/animations/blob-cursor", category: "animations", description: "Cursor effect with a trail of gooey blobs following the mouse." },
    { name: "Antigravity", slug: "antigravity", route: "/docs/animations/antigravity" },
];

export const backgrounds: RegistryItem[] = [
    { name: "Ballpit", slug: "ballpit", route: "/docs/backgrounds/ballpit" },
    { name: "Beams", slug: "beams", route: "/docs/backgrounds/beams" },
    { name: "Dark Veil", slug: "dark-veil", route: "/docs/backgrounds/dark-veil" },
    { name: "Dither", slug: "dither", route: "/docs/backgrounds/dither" },
    { name: "Floating Lines", slug: "floating-lines", route: "/docs/backgrounds/floating-lines" },
    { name: "Gradient Blinds", slug: "gradient-blinds", route: "/docs/backgrounds/gradient-blinds" },
    { name: "Grainient", slug: "grainient", route: "/docs/backgrounds/grainient" },
    { name: "Grid Motion", slug: "grid-motion", route: "/docs/backgrounds/grid-motion" },
    { name: "Letter Glitch", slug: "letter-glitch", route: "/docs/backgrounds/letter-glitch" },
    { name: "Light Pillar", slug: "light-pillar", route: "/docs/backgrounds/light-pillar" },
    { name: "Light Rays", slug: "light-rays", route: "/docs/backgrounds/light-rays" },
    { name: "Lightning", slug: "lightning", route: "/docs/backgrounds/lightning" },
    { name: "Orb", slug: "orb", route: "/docs/backgrounds/orb" },
    { name: "Particles", slug: "particles", route: "/docs/backgrounds/particles" },
    { name: "Plasma", slug: "plasma", route: "/docs/backgrounds/plasma" },
    { name: "Ripple Grid", slug: "ripple-grid", route: "/docs/backgrounds/ripple-grid" },
    { name: "Silk", slug: "silk", route: "/docs/backgrounds/silk" },
    { name: "Squares", slug: "squares", route: "/docs/backgrounds/squares" },
];

export const components: RegistryItem[] = [
    { name: "Animated List", slug: "animated-list", route: "/docs/components/animated-list" },
    { name: "Bounce Cards", slug: "bounce-cards", route: "/docs/components/bounce-cards" },
    { name: "Bubble Menu", slug: "bubble-menu", route: "/docs/components/bubble-menu" },
    { name: "Card Nav", slug: "card-nav", route: "/docs/components/card-nav" },
    { name: "Card Swap", slug: "card-swap", route: "/docs/components/card-swap" },
    { name: "Carousel", slug: "carousel", route: "/docs/components/carousel" },
    { name: "Chroma Grid", slug: "chroma-grid", route: "/docs/components/chroma-grid" },
    { name: "Circular Gallery", slug: "circular-gallery", route: "/docs/components/circular-gallery" },
    { name: "Counter", slug: "counter", route: "/docs/components/counter" },
    { name: "Decay Card", slug: "decay-card", route: "/docs/components/decay-card" },
    { name: "Dock", slug: "dock", route: "/docs/components/dock" },
    { name: "Dome Gallery", slug: "dome-gallery", route: "/docs/components/dome-gallery" },
    { name: "Elastic Slider", slug: "elastic-slider", route: "/docs/components/elastic-slider" },
    { name: "Flowing Menu", slug: "flowing-menu", route: "/docs/components/flowing-menu" },
    { name: "Fluid Glass", slug: "fluid-glass", route: "/docs/components/fluid-glass" },
    { name: "Flying Posters", slug: "flying-posters", route: "/docs/components/flying-posters" },
    { name: "Folder", slug: "folder", route: "/docs/components/folder" },
    { name: "Glass Icons", slug: "glass-icons", route: "/docs/components/glass-icons" },
    { name: "Glass Surface", slug: "glass-surface", route: "/docs/components/glass-surface" },
    { name: "Gooey Nav", slug: "gooey-nav", route: "/docs/components/gooey-nav" },
    { name: "Infinite Menu", slug: "infinite-menu", route: "/docs/components/infinite-menu" },
    { name: "Lanyard", slug: "lanyard", route: "/docs/components/lanyard" },
    { name: "Magic Bento", slug: "magic-bento", route: "/docs/components/magic-bento" },
    { name: "Masonry", slug: "masonry", route: "/docs/components/masonry" },
    { name: "Model Viewer", slug: "model-viewer", route: "/docs/components/model-viewer" },
    { name: "Pill Nav", slug: "pill-nav", route: "/docs/components/pill-nav" },
    { name: "Pixel Card", slug: "pixel-card", route: "/docs/components/pixel-card" },
    { name: "Profile Card", slug: "profile-card", route: "/docs/components/profile-card" },
    { name: "Reflective Card", slug: "reflective-card", route: "/docs/components/reflective-card" },
    { name: "Scroll Stack", slug: "scroll-stack", route: "/docs/components/scroll-stack" },
    { name: "Spotlight Card", slug: "spotlight-card", route: "/docs/components/spotlight-card" },
    { name: "Stack", slug: "stack", route: "/docs/components/stack" },
    { name: "Staggered Menu", slug: "staggered-menu", route: "/docs/components/staggered-menu" },
    { name: "Stepper", slug: "stepper", route: "/docs/components/stepper" },
    { name: "Tilted Card", slug: "tilted-card", route: "/docs/components/tilted-card" },
];

export const textAnimations: RegistryItem[] = [
    { name: "ASCII Text", slug: "ascii-text", route: "/docs/text-animations/ascii-text" },
    { name: "Blur Text", slug: "blur-text", route: "/docs/text-animations/blur-text", category: "text-animations", description: "Text with staggered blur-in reveal animation." },
    { name: "Circular Text", slug: "circular-text", route: "/docs/text-animations/circular-text", category: "text-animations", description: "Text arranged in a circular path with rotation and hover effects." },
    { name: "Count Up", slug: "count-up", route: "/docs/text-animations/count-up" },
    { name: "Curved Loop", slug: "curved-loop", route: "/docs/text-animations/curved-loop", category: "text-animations", description: "Infinite scrolling text along a curved SVG path." },
    { name: "Decrypted Text", slug: "decrypted-text", route: "/docs/text-animations/decrypted-text", category: "text-animations", description: "Cyberpunk-style text scrambling reveal effect." },
    { name: "Falling Text", slug: "falling-text", route: "/docs/text-animations/falling-text" },
    { name: "Fuzzy Text", slug: "fuzzy-text", route: "/docs/text-animations/fuzzy-text" },
    { name: "Glitch Text", slug: "glitch-text", route: "/docs/text-animations/glitch-text", category: "text-animations", description: "Glitch effect with chromatic aberration and text replacement." },
    { name: "Gradient Text", slug: "gradient-text", route: "/docs/text-animations/gradient-text", category: "text-animations", description: "Text with a smooth moving gradient background." },
    { name: "Rotating Text", slug: "rotating-text", route: "/docs/text-animations/rotating-text" },
    { name: "Scrambled Text", slug: "scrambled-text", route: "/docs/text-animations/scrambled-text" },
    { name: "Scroll Float", slug: "scroll-float", route: "/docs/text-animations/scroll-float" },
    { name: "Scroll Reveal", slug: "scroll-reveal", route: "/docs/text-animations/scroll-reveal" },
    { name: "Scroll Velocity", slug: "scroll-velocity", route: "/docs/text-animations/scroll-velocity" },
    { name: "Shiny Text", slug: "shiny-text", route: "/docs/text-animations/shiny-text", category: "text-animations", description: "Text with a dynamic shining gradient animation." },
    { name: "Shuffle", slug: "shuffle", route: "/docs/text-animations/shuffle" },
    { name: "Split Text", slug: "split-text", route: "/docs/text-animations/split-text" },
    { name: "Text Cursor", slug: "text-cursor", route: "/docs/text-animations/text-cursor" },
    { name: "Text Pressure", slug: "text-pressure", route: "/docs/text-animations/text-pressure", category: "text-animations", description: "Dynamic font variation based on mouse pressure." },
    { name: "Text Type", slug: "text-type", route: "/docs/text-animations/text-type" },
    { name: "True Focus", slug: "true-focus", route: "/docs/text-animations/true-focus", category: "text-animations", description: "Mouse-following focus box highlighting text." },
    { name: "Variable Proximity", slug: "variable-proximity", route: "/docs/text-animations/variable-proximity", category: "text-animations", description: "Variable font weight/width reactive to cursor proximity." },
];

// Helper to find an item by slug
export function findBySlug(items: RegistryItem[], slug: string): RegistryItem | undefined {
    return items.find(i => i.slug === slug);
}
