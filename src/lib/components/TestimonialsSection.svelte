<section class="faq-section" id="faq">
    <div class="faq-inner fade-in">
        <h2 class="faq-title">Frequently Asked Questions</h2>

        <div class="faq-list">
            <details class="faq-item">
                <summary>Does DunkUI support React or only Svelte?</summary>
                <p>
                    DunkUI was born for Svelte 5, but our core engine is
                    currently being ported to React and Vue under the Web
                    Component standard. Stay tuned for universal compatibility.
                </p>
            </details>

            <details class="faq-item">
                <summary>How's the mobile device compatibility?</summary>
                <p>
                    Absolutely all our shaders are responsive. We use
                    intelligent fallbacks to ensure the UI remains perfectly
                    usable on older devices and low-power GPUs.
                </p>
            </details>

            <details class="faq-item">
                <summary>Can I use it in commercial projects?</summary>
                <p>
                    Yes! The free version comes with an MIT license. The Pro
                    version includes premium components for advanced dashboards
                    and enterprise-grade visual effects.
                </p>
            </details>

            <details class="faq-item">
                <summary>What about bundle size and tree-shaking?</summary>
                <p>
                    Every component is fully tree-shakeable. Import only what
                    you need — the average component weighs under 2kb gzipped
                    with zero external dependencies.
                </p>
            </details>

            <details class="faq-item">
                <summary>How do I get started?</summary>
                <p>
                    Install via npm with <code>npm install @konlyzx/dunkui</code
                    >, import any component, and drop it into your SvelteKit
                    project. Check out our docs for interactive examples.
                </p>
            </details>
        </div>
    </div>
</section>

<style>
    .faq-section {
        position: relative;
        padding: 100px 20px;
    }

    .faq-inner {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-title {
        font-size: clamp(2rem, 4vw, 2.5rem);
        text-align: center;
        margin-bottom: 48px;
        font-weight: 800;
        letter-spacing: -1px;
    }

    .faq-list {
        display: flex;
        flex-direction: column;
    }

    .faq-item {
        border-bottom: 1px solid var(--stroke);
        padding: 24px 0;
        cursor: pointer;
    }

    .faq-item:first-child {
        border-top: 1px solid var(--stroke);
    }

    .faq-item summary {
        list-style: none;
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text);
        transition: color 0.3s var(--ease-apple);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        user-select: none;
    }

    .faq-item summary::-webkit-details-marker {
        display: none;
    }

    .faq-item summary::after {
        content: "+";
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--muted);
        transition:
            transform 0.3s var(--ease-apple),
            color 0.3s;
        flex-shrink: 0;
    }

    .faq-item[open] summary::after {
        content: "−";
        color: var(--accent-light);
    }

    .faq-item summary:hover {
        color: var(--accent-light);
    }

    .faq-item p {
        padding-top: 14px;
        color: var(--muted);
        font-size: 1rem;
        line-height: 1.7;
        animation: fadeDown 0.3s var(--ease-apple);
    }

    .faq-item code {
        background: rgba(147, 51, 234, 0.15);
        color: var(--accent-light);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.85em;
    }

    @keyframes fadeDown {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
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

    @media (max-width: 768px) {
        .faq-item summary {
            font-size: 1.1rem;
        }
    }
</style>
