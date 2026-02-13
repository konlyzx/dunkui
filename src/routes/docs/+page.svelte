<svelte:head><title>Introduction — DunkUI</title></svelte:head>

<div class="intro-page">
    <h2 class="sub-category">Introduction</h2>
    <p class="intro-desc">
        A growing collection of GPU-accelerated, animated UI components for
        Svelte 5. Copy, paste, and customize.
    </p>

    <div class="install-block">
        <span class="install-label">Quick Install</span>
        <div class="install-code">
            <code>npm install dunk-ui</code>
        </div>
    </div>

    <div class="section-block">
        <h2 class="demo-title-extra">Components</h2>
        <div class="card-list">
            <a href="/docs/glitch-text" class="intro-card">
                <span class="card-name">Glitch Text</span>
                <span class="card-desc"
                    >Cyberpunk-inspired text distortion effects.</span
                >
            </a>
        </div>
    </div>

    <div class="section-block">
        <h2 class="demo-title-extra">Backgrounds</h2>
        <div class="card-list">
            <a href="/docs/faulty-terminal" class="intro-card">
                <span class="card-name">Faulty Terminal</span>
                <span class="card-desc"
                    >CRT-style terminal background powered by WebGL shaders.</span
                >
            </a>
            <a href="/docs/particle-field" class="intro-card">
                <span class="card-name">Particle Field</span>
                <span class="card-desc"
                    >Interactive particle system with mouse reactivity.</span
                >
            </a>
            <a href="/docs/aurora" class="intro-card">
                <span class="card-name">Aurora Borealis</span>
                <span class="card-desc"
                    >Flowing gradient waves mimicking the northern lights.</span
                >
            </a>
            <a href="/docs/retro-grid" class="intro-card">
                <span class="card-name">Retro Grid</span>
                <span class="card-desc"
                    >Infinite scrolling perspective grids, synthwave style.</span
                >
            </a>
        </div>
    </div>

    <div class="section-block">
        <h2 class="demo-title-extra">Tools</h2>
        <div class="card-list">
            <a href="/docs/theme-kit" class="intro-card">
                <span class="card-name">Theme Kit</span>
                <span class="card-desc"
                    >Customize the design system via JSON config.</span
                >
            </a>
            <a href="/docs/shader-forge" class="intro-card">
                <span class="card-name">Shader Forge</span>
                <span class="card-desc"
                    >Visual node editor for custom WebGL shaders.</span
                >
            </a>
        </div>
    </div>
</div>

<style>
    .intro-page {
        max-width: 100%;
    }

    .sub-category {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: #fff;
        margin-bottom: 0.6rem;
    }

    .intro-desc {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.45);
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .install-block {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        padding: 1rem 1.25rem;
        margin-bottom: 2.5rem;
    }

    .install-label {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: rgba(255, 255, 255, 0.35);
        font-weight: 600;
        display: block;
        margin-bottom: 0.5rem;
    }

    .install-code code {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.88rem;
        color: #a78bfa;
    }

    .section-block {
        margin-bottom: 2rem;
    }

    .demo-title-extra {
        font-size: 1.15rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 1rem;
        letter-spacing: -0.02em;
    }

    .card-list {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .intro-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 8px;
        transition: all 0.2s;
        text-decoration: none;
    }
    .intro-card:hover {
        border-color: rgba(139, 92, 246, 0.15);
        background: rgba(255, 255, 255, 0.02);
        transform: translateX(4px);
    }

    .card-name {
        font-size: 0.88rem;
        font-weight: 600;
        color: #fff;
        min-width: 140px;
    }

    .card-desc {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.4);
    }
</style>
