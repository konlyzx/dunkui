<section class="bento-section" id="showcase">
    <span class="section-label fade-in">Premium Components</span>
    <div class="bento-grid">
        <!-- Large card: Universal Design Library -->
        <div class="bento-card card-lg fade-in">
            <div class="visual-demo">
                <div class="dots-grid"></div>
                <div class="glow-orb"></div>
            </div>
            <h2>Universal Design Library</h2>
            <p>
                Components that don't just look good — they're built for native
                accessibility and effortless interactivity out of the box.
            </p>
        </div>

        <!-- Small card: Node Generator -->
        <div
            class="bento-card card-sm fade-in"
            style="background: linear-gradient(135deg, rgba(147, 51, 234, 0.08), transparent);"
        >
            <span class="material-symbols-rounded card-icon">hub</span>
            <h2>Node Generator</h2>
            <p>
                Generate WebGL shaders without touching complex GLSL code.
                Visual nodes, real results.
            </p>
        </div>

        <!-- Small card: Reliability -->
        <div class="bento-card card-sm fade-in">
            <span class="material-symbols-rounded card-icon accent"
                >verified_user</span
            >
            <h2>Reliability</h2>
            <p>
                Stress-tested across thousands of browsers and mobile devices
                for pixel-perfect output.
            </p>
        </div>

        <!-- Large card: WebGL for Creators -->
        <div
            class="bento-card card-lg fade-in"
            style="background: radial-gradient(circle at bottom right, rgba(147, 51, 234, 0.08), transparent);"
        >
            <h2 class="card-title-xl">WebGL for Creators</h2>
            <p>
                Add post-processing effects, liquid distortion, and noise lab in
                seconds — not hours.
            </p>
            <div class="visual-demo small">
                <div class="orbit-ring"></div>
                <div class="orbit-ring ring-2"></div>
                <div class="orbit-dot"></div>
            </div>
        </div>

        <!-- Component Preview Cards Row -->
        <div class="bento-card card-md fade-in">
            <div class="component-mini particles-mini">
                {#each Array(15) as _, i}
                    <span
                        class="p-dot"
                        style="--delay:{i * 0.2}s; --x:{Math.random() *
                            100}%; --y:{Math.random() * 100}%"
                    ></span>
                {/each}
            </div>
            <div class="mini-info">
                <h3>Particle Field</h3>
                <a href="/docs/particle-field" class="component-link">
                    View
                    <span
                        class="material-symbols-rounded"
                        style="font-size:14px">arrow_forward</span
                    >
                </a>
            </div>
        </div>

        <div class="bento-card card-md fade-in">
            <div class="component-mini glitch-mini">
                <span class="glitch-text" data-text="GLITCH">GLITCH</span>
            </div>
            <div class="mini-info">
                <h3>Glitch Text</h3>
                <a href="/docs/glitch-text" class="component-link">
                    View
                    <span
                        class="material-symbols-rounded"
                        style="font-size:14px">arrow_forward</span
                    >
                </a>
            </div>
        </div>

        <div class="bento-card card-md fade-in">
            <div class="component-mini aurora-mini">
                <div class="aurora-wave"></div>
                <div class="aurora-wave two"></div>
            </div>
            <div class="mini-info">
                <h3>Aurora Borealis</h3>
                <a href="/docs/aurora" class="component-link">
                    View
                    <span
                        class="material-symbols-rounded"
                        style="font-size:14px">arrow_forward</span
                    >
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .bento-section {
        position: relative;
        padding: 80px 0;
    }

    .section-label {
        font-size: 0.85rem;
        color: var(--accent-light);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 24px;
        display: block;
        text-align: center;
    }

    .bento-grid {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 24px;
    }

    .bento-card {
        background: var(--surface);
        border: 1px solid var(--stroke);
        border-radius: var(--radius-2xl);
        overflow: hidden;
        padding: 40px;
        position: relative;
        transition: all 0.5s var(--ease-apple);
    }

    .bento-card:hover {
        border-color: var(--stroke-hover);
        background: rgba(255, 255, 255, 0.02);
    }

    .card-lg {
        grid-column: span 8;
    }
    .card-sm {
        grid-column: span 4;
    }
    .card-md {
        grid-column: span 4;
    }

    .bento-card h2 {
        font-size: 2.2rem;
        margin-bottom: 12px;
        letter-spacing: -1px;
        font-weight: 800;
    }

    .card-title-xl {
        font-size: 2.8rem !important;
        margin-bottom: 20px !important;
    }

    .bento-card p {
        color: var(--muted);
        font-size: 1.1rem;
        line-height: 1.5;
    }

    .card-icon {
        font-size: 3rem;
        color: var(--accent-light);
        display: block;
        margin-bottom: 16px;
    }

    .card-icon.accent {
        color: var(--accent-light);
    }

    /* Visual demo area */
    .visual-demo {
        height: 180px;
        width: 100%;
        background: #000;
        border-radius: 20px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--stroke);
    }

    .visual-demo.small {
        height: 100px;
        margin-top: 24px;
        margin-bottom: 0;
    }

    .dots-grid {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(var(--accent) 1px, transparent 1px);
        background-size: 15px 15px;
        opacity: 0.2;
    }

    .glow-orb {
        width: 150px;
        height: 150px;
        background: var(--accent);
        border-radius: 40px;
        filter: blur(40px);
        opacity: 0.5;
        animation: orbPulse 4s ease-in-out infinite;
    }

    @keyframes orbPulse {
        0%,
        100% {
            transform: scale(1);
            opacity: 0.4;
        }
        50% {
            transform: scale(1.15);
            opacity: 0.6;
        }
    }

    /* Orbit animation */
    .orbit-ring {
        width: 60px;
        height: 60px;
        border: 1px solid rgba(147, 51, 234, 0.3);
        border-radius: 50%;
        animation: orbitSpin 6s linear infinite;
    }

    .orbit-ring.ring-2 {
        position: absolute;
        width: 40px;
        height: 40px;
        border-color: rgba(56, 189, 248, 0.2);
        animation-direction: reverse;
        animation-duration: 4s;
    }

    .orbit-dot {
        position: absolute;
        width: 6px;
        height: 6px;
        background: var(--accent-light);
        border-radius: 50%;
        box-shadow: 0 0 12px var(--accent-glow);
        animation: orbitSpin 6s linear infinite;
        transform-origin: 35px 35px;
    }

    @keyframes orbitSpin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* Component Mini Previews */
    .component-mini {
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        background: rgba(6, 0, 16, 0.6);
        border-radius: 16px;
        margin-bottom: 16px;
        border: 1px solid var(--stroke);
    }

    .mini-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .mini-info h3 {
        font-size: 1rem;
        font-weight: 700;
    }

    .component-link {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--accent);
        transition: gap 0.25s var(--ease-apple);
    }

    .component-link:hover {
        gap: 0.55rem;
    }

    /* Particles preview */
    .particles-mini {
        position: relative;
    }
    .p-dot {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: var(--accent);
        left: var(--x);
        top: var(--y);
        opacity: 0;
        animation: floatParticle 3s var(--delay) ease-in-out infinite;
    }
    @keyframes floatParticle {
        0%,
        100% {
            opacity: 0;
            transform: translateY(0);
        }
        50% {
            opacity: 0.8;
            transform: translateY(-20px);
        }
    }

    /* Glitch preview */
    .glitch-text {
        font-family: "JetBrains Mono", monospace;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text);
        position: relative;
    }
    .glitch-text::before,
    .glitch-text::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
    }
    .glitch-text::before {
        color: #ff0055;
        animation: glitchAnim 2s infinite;
        clip-path: inset(0 0 60% 0);
    }
    .glitch-text::after {
        color: #35d3ff;
        animation: glitchAnim 2s 0.5s infinite reverse;
        clip-path: inset(60% 0 0 0);
    }
    @keyframes glitchAnim {
        0%,
        100% {
            transform: translate(0);
        }
        20% {
            transform: translate(-3px, 2px);
        }
        40% {
            transform: translate(3px, -1px);
        }
        60% {
            transform: translate(-2px, -2px);
        }
        80% {
            transform: translate(2px, 1px);
        }
    }

    /* Aurora preview */
    .aurora-wave {
        position: absolute;
        bottom: 0;
        left: -20%;
        width: 140%;
        height: 60%;
        background: linear-gradient(
            90deg,
            rgba(147, 51, 234, 0.3),
            rgba(53, 211, 255, 0.3),
            rgba(147, 51, 234, 0.3)
        );
        border-radius: 50% 50% 0 0;
        filter: blur(20px);
        animation: auroraFloat 4s ease-in-out infinite;
    }
    .aurora-wave.two {
        height: 40%;
        animation-delay: -2s;
        background: linear-gradient(
            90deg,
            rgba(53, 211, 255, 0.2),
            rgba(192, 132, 252, 0.2),
            rgba(53, 211, 255, 0.2)
        );
    }
    @keyframes auroraFloat {
        0%,
        100% {
            transform: translateX(0) scaleY(1);
        }
        50% {
            transform: translateX(10px) scaleY(1.15);
        }
    }

    /* Fade-in */
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

    .bento-grid .fade-in:nth-child(2) {
        transition-delay: 0.08s;
    }
    .bento-grid .fade-in:nth-child(3) {
        transition-delay: 0.16s;
    }
    .bento-grid .fade-in:nth-child(4) {
        transition-delay: 0.24s;
    }
    .bento-grid .fade-in:nth-child(5) {
        transition-delay: 0.32s;
    }
    .bento-grid .fade-in:nth-child(6) {
        transition-delay: 0.4s;
    }
    .bento-grid .fade-in:nth-child(7) {
        transition-delay: 0.48s;
    }

    @media (max-width: 1024px) {
        .card-lg,
        .card-sm,
        .card-md {
            grid-column: span 12;
        }
        .bento-card h2 {
            font-size: 1.8rem;
        }
        .card-title-xl {
            font-size: 2rem !important;
        }
    }

    @media (max-width: 768px) {
        .bento-card {
            padding: 24px;
        }
    }
</style>
