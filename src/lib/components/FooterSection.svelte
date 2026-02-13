<!-- CTA Section -->
<section class="cta-section fade-in">
    <div class="cta-card">
        <div class="cta-glow"></div>
        <span class="section-label">Open Source</span>
        <h2 class="cta-title">
            Start <span class="gradient-text">Exploring</span>
        </h2>
        <p class="cta-subtitle">
            Join thousands of developers building the future of the web with
            DunkUI. Free and open source for personal projects.
        </p>
        <a href="/docs" class="btn-cta-main">
            Browse All Components
            <span class="material-symbols-rounded" style="font-size:18px"
                >arrow_forward</span
            >
        </a>
    </div>
</section>

<!-- Premium Footer -->
<footer class="footer fade-in">
    <div class="footer-inner">
        <div class="footer-brand-col">
            <div class="footer-brand">
                <span
                    class="material-symbols-rounded"
                    style="color: var(--accent-light); font-size: 1.4rem;"
                    >category</span
                >
                DunkUI
            </div>
            <p class="footer-tagline">
                The ultimate stop in high-performance visual component design.
                Thought by and for creative developers.
            </p>
        </div>
        <div class="footer-col">
            <h5>Product</h5>
            <a href="/docs">Showcase</a>
            <a href="#">Pricing</a>
            <a href="/docs">Resources</a>
        </div>
        <div class="footer-col">
            <h5>Technical</h5>
            <a href="/docs">Documentation</a>
            <a href="#">API Reference</a>
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer">GitHub</a
            >
        </div>
        <div class="footer-col">
            <h5>Support</h5>
            <a href="#">Discord Community</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms of Use</a>
        </div>
    </div>
    <div class="footer-bottom">
        <p>© 2026 DunkUI. All rights reserved.</p>
    </div>
</footer>

<style>
    /* CTA Section */
    .cta-section {
        padding: 80px 20px 40px;
    }

    .cta-card {
        max-width: 900px;
        margin: 0 auto;
        background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.15) 0%,
            rgba(168, 85, 247, 0.08) 50%,
            rgba(147, 51, 234, 0.05) 100%
        );
        border: 1px solid rgba(147, 51, 234, 0.2);
        border-radius: var(--radius-2xl);
        padding: 5rem 2rem;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .cta-glow {
        position: absolute;
        top: -50%;
        left: -20%;
        width: 140%;
        height: 200%;
        background: radial-gradient(
            ellipse,
            rgba(147, 51, 234, 0.08) 0%,
            transparent 60%
        );
        pointer-events: none;
    }

    .section-label {
        font-size: 0.85rem;
        color: var(--accent-light);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 12px;
        display: block;
        position: relative;
    }

    .cta-title {
        font-size: clamp(1.8rem, 4vw, 2.8rem);
        font-weight: 800;
        margin-bottom: 1rem;
        position: relative;
        letter-spacing: -1px;
        color: var(--text);
    }

    .gradient-text {
        background: var(--gradient-purple);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .cta-subtitle {
        color: var(--muted);
        font-size: 1rem;
        max-width: 450px;
        margin: 0 auto 2.5rem;
        line-height: 1.6;
        position: relative;
    }

    .btn-cta-main {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2.4rem;
        background: white;
        color: black;
        border-radius: var(--radius-full);
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.4s var(--ease-apple);
        text-decoration: none;
        position: relative;
    }

    .btn-cta-main:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 40px rgba(255, 255, 255, 0.15);
    }

    /* FOOTER */
    .footer {
        border-top: 1px solid var(--stroke);
        padding: 100px 8% 0;
    }

    .footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: 40px;
        padding-bottom: 60px;
    }

    .footer-brand {
        font-weight: 800;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 8px;
        letter-spacing: -0.5px;
        margin-bottom: 20px;
    }

    .footer-tagline {
        color: var(--muted);
        font-size: 0.85rem;
        line-height: 1.6;
        max-width: 300px;
    }

    .footer-col h5 {
        margin-bottom: 24px;
        font-size: 0.9rem;
        text-transform: uppercase;
        color: #fff;
        font-weight: 700;
        letter-spacing: 0.05em;
    }

    .footer-col a {
        display: block;
        margin-bottom: 12px;
        font-size: 0.9rem;
        color: var(--muted);
        text-decoration: none;
        transition: color 0.2s;
    }

    .footer-col a:hover {
        color: #fff;
    }

    .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        border-top: 1px solid var(--stroke);
        padding: 1.5rem 0;
        text-align: center;
    }

    .footer-bottom p {
        font-size: 0.78rem;
        color: var(--muted);
        opacity: 0.6;
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

    @media (max-width: 900px) {
        .footer-inner {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 600px) {
        .footer-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }
        .footer {
            padding: 60px 5% 0;
        }
    }
</style>
