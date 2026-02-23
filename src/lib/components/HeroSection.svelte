<section class="hero-section">
    <div class="ambient-glow"></div>
    <div class="ambient-glow-2"></div>

    <div class="hero-content">
        <span class="section-label">GPU-Accelerated Ecosystem</span>
        <h1 class="hero-title">
            Engineered for<br />
            <span class="hero-fade">Perfect Interfaces.</span>
        </h1>
        <p class="hero-subtitle">
            A massive library of WebGL-powered Svelte 5 components. Constant
            60fps performance for immersive experiences that redefine modern
            web.
        </p>
        <div class="hero-actions">
            <a href="/docs" class="btn-hero primary">
                <span class="material-symbols-rounded" style="font-size:18px"
                    >rocket_launch</span
                >
                Explore Library
            </a>
            <a href="/docs" class="btn-hero outline">
                <span class="material-symbols-rounded" style="font-size:18px"
                    >menu_book</span
                >
                Documentation
            </a>
        </div>
    </div>

    <!-- Code Preview Card -->
    <div class="code-preview-card fade-in">
        <div class="code-card-header">
            <div class="code-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
            </div>
            <span class="code-filename">App.svelte</span>
            <button class="copy-btn" aria-label="Copy code">
                <span class="material-symbols-rounded" style="font-size:16px"
                    >content_copy</span
                >
            </button>
        </div>
        <div class="code-card-body">
            <pre class="code-block"><code
                    ><span class="code-kw">import</span> {"{"} <span
                        class="code-comp">Aurora</span
                    > {"}"} <span class="code-kw">from</span> <span
                        class="code-str">'@konlyzx/dunkui'</span
                    >;

<span class="code-tag">&lt;Aurora</span>
  <span class="code-attr">colors</span>={"{"}<span class="code-str"
                        >["#7c4dff", "#35d3ff", "#ff0055"]</span
                    >{"}"}
  <span class="code-attr">speed</span>={"{"}<span class="code-num">0.5</span
                    >{"}"}
  <span class="code-attr">intensity</span>={"{"}<span class="code-num">1.2</span
                    >{"}"}
<span class="code-tag">/&gt;</span>

<span class="code-comment">// GPU-accelerated effects</span>
<span class="code-comment">// Zero-runtime overhead</span>
<span class="code-comment">// Fully typed props</span></code
                ></pre>
        </div>
        <div class="code-card-glow"></div>
    </div>
</section>

<style>
    .hero-section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 220px 20px 100px;
        gap: 3rem;
    }

    /* Ambient background glows */
    .ambient-glow {
        position: absolute;
        top: -200px;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        height: 800px;
        background: radial-gradient(
            circle,
            rgba(255, 62, 0, 0.1) 0%,
            transparent 60%
        );
        pointer-events: none;
        animation: pulseGlow 8s ease-in-out infinite;
    }

    .ambient-glow-2 {
        position: absolute;
        top: 200px;
        right: -150px;
        width: 500px;
        height: 500px;
        background: radial-gradient(
            circle,
            rgba(56, 189, 248, 0.06) 0%,
            transparent 60%
        );
        pointer-events: none;
    }

    @keyframes pulseGlow {
        0%,
        100% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1);
        }
        50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.08);
        }
    }

    .hero-content {
        text-align: center;
        max-width: 800px;
        position: relative;
        z-index: 2;
    }

    .section-label {
        font-size: 0.85rem;
        color: var(--accent-light);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 16px;
        display: block;
    }

    .hero-title {
        font-size: clamp(3.5rem, 10vw, 6.5rem);
        line-height: 0.95;
        letter-spacing: -4px;
        font-weight: 800;
        background: linear-gradient(180deg, #fff 40%, rgba(255, 255, 255, 0.4));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 24px;
    }

    .hero-fade {
        opacity: 0.6;
        -webkit-text-fill-color: initial;
        background: none;
        -webkit-background-clip: initial;
        background-clip: initial;
        color: rgba(255, 255, 255, 0.45);
    }

    .hero-subtitle {
        color: var(--muted);
        font-size: 1.25rem;
        max-width: 600px;
        margin: 0 auto 40px;
        font-weight: 400;
        letter-spacing: -0.2px;
        line-height: 1.6;
    }

    .hero-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
    }

    /* Hero Buttons */
    .btn-hero {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 12px 30px;
        border-radius: var(--radius-full);
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.4s var(--ease-apple);
        border: none;
        font-family: inherit;
        text-decoration: none;
    }

    .btn-hero.primary {
        background: var(--accent);
        color: white;
        box-shadow: 0 4px 30px rgba(255, 62, 0, 0.4);
    }

    .btn-hero.primary:hover {
        background: #7e22ce;
        transform: translateY(-3px);
        box-shadow: 0 8px 40px rgba(255, 62, 0, 0.6);
    }

    .btn-hero.outline {
        background: rgba(255, 255, 255, 0.05);
        color: white;
        border: 1px solid var(--stroke);
    }

    .btn-hero.outline:hover {
        border-color: var(--stroke-hover);
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-3px);
    }

    /* Code Preview Card */
    .code-preview-card {
        position: relative;
        width: 100%;
        max-width: 640px;
        background: rgba(10, 5, 24, 0.7);
        border: 1px solid var(--stroke);
        border-radius: var(--radius-xl);
        overflow: hidden;
        backdrop-filter: blur(20px);
        z-index: 2;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    }

    .code-card-header {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(255, 255, 255, 0.02);
    }

    .code-dots {
        display: flex;
        gap: 6px;
        margin-right: 1rem;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .dot.red {
        background: #ff5f57;
    }
    .dot.yellow {
        background: #febc2e;
    }
    .dot.green {
        background: #28c840;
    }

    .code-filename {
        font-size: 0.78rem;
        color: var(--muted);
        font-family: "JetBrains Mono", monospace;
        flex: 1;
    }

    .copy-btn {
        background: transparent;
        border: none;
        color: var(--muted);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
    }

    .copy-btn:hover {
        color: var(--text);
        background: rgba(255, 255, 255, 0.05);
    }

    .code-card-body {
        padding: 1.5rem;
    }

    .code-block {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.82rem;
        line-height: 1.8;
        color: var(--muted);
        margin: 0;
        overflow-x: auto;
    }

    .code-block :global(.code-kw) {
        color: #ff7a45;
    }
    .code-block :global(.code-comp) {
        color: #35d3ff;
    }
    .code-block :global(.code-str) {
        color: #4ade80;
    }
    .code-block :global(.code-tag) {
        color: #f472b6;
    }
    .code-block :global(.code-attr) {
        color: #a78bfa;
    }
    .code-block :global(.code-num) {
        color: #fbbf24;
    }
    .code-block :global(.code-comment) {
        color: #6b5a8e;
        font-style: italic;
    }

    .code-card-glow {
        position: absolute;
        bottom: -40%;
        left: 50%;
        transform: translateX(-50%);
        width: 120%;
        height: 60%;
        background: radial-gradient(
            ellipse,
            rgba(255, 62, 0, 0.06) 0%,
            transparent 70%
        );
        pointer-events: none;
    }

    /* Fade-in animation */
    .fade-in {
        opacity: 0;
        transform: translateY(60px);
        transition:
            opacity 1.2s var(--ease-apple),
            transform 1.2s var(--ease-apple);
    }

    .fade-in:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        .hero-section {
            padding: 160px 1.5rem 60px;
        }
        .hero-title {
            letter-spacing: -2px;
        }
        .hero-subtitle {
            font-size: 1.05rem;
        }
        .hero-actions {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
