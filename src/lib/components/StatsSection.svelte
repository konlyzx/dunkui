<section class="performance-section reveal" id="performance">
    <div class="performance-grid">
        <div class="perf-item fade-in">
            <span class="perf-number">0.2s</span>
            <h4>FCP Faster</h4>
            <p>
                Components optimized to load in milliseconds with zero external
                dependencies.
            </p>
        </div>
        <div class="perf-item fade-in">
            <span class="perf-number">60fps</span>
            <h4>Always Fluid</h4>
            <p>
                Visualizations rendered directly on the user's GPU for
                buttery-smooth motion.
            </p>
        </div>
        <div class="perf-item fade-in">
            <span class="perf-number">2.1kb</span>
            <h4>Tiny Footprint</h4>
            <p>
                Modular architecture — import only the bits you need for your
                app.
            </p>
        </div>
    </div>
</section>

<style>
    .performance-section {
        position: relative;
    }

    .performance-grid {
        max-width: 1200px;
        margin: 80px auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--stroke);
    }

    .perf-item {
        background: var(--bg);
        padding: 60px 40px;
        text-align: left;
        transition: background 0.5s var(--ease-apple);
    }

    .perf-item:hover {
        background: rgba(255, 255, 255, 0.015);
    }

    .perf-number {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        color: var(--accent-light);
        letter-spacing: -2px;
        line-height: 1;
        display: block;
        margin-bottom: 12px;
    }

    .perf-item h4 {
        margin: 0 0 10px;
        font-size: 1.2rem;
        color: #fff;
        font-weight: 700;
    }

    .perf-item p {
        color: var(--muted);
        font-size: 0.9rem;
        line-height: 1.6;
    }

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

    .performance-grid .fade-in:nth-child(2) {
        transition-delay: 0.1s;
    }
    .performance-grid .fade-in:nth-child(3) {
        transition-delay: 0.2s;
    }

    @media (max-width: 900px) {
        .performance-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
