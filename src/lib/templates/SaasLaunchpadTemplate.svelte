<script lang="ts">
    // SaaS Launchpad Template - DunkUI
    // A premium dark theme landing page template

    let isMenuOpen = false;
</script>

<div class="saas-template">
    <!-- Navbar -->
    <nav class="navbar">
        <div class="nav-content">
            <div class="logo">
                <svg viewBox="0 0 24 24" fill="none" class="logo-icon">
                    <path d="M12 2L2 22h20L12 2z" fill="url(#logo-grad)" />
                    <defs>
                        <linearGradient
                            id="logo-grad"
                            x1="12"
                            y1="2"
                            x2="12"
                            y2="22"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#A855F7" />
                            <stop offset="1" stop-color="#EC4899" />
                        </linearGradient>
                    </defs>
                </svg>
                <span class="logo-text">Nexus</span>
            </div>

            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#pricing">Pricing</a>
            </div>

            <div class="nav-actions">
                <button class="btn btn-secondary">Sign In</button>
                <button class="btn btn-primary">Get Started</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
        <div class="hero-glow"></div>
        <div class="hero-content">
            <div class="badge">
                <span class="badge-dot"></span>
                v2.0 is now live
            </div>
            <h1 class="hero-title">
                Unleash Your <br />
                <span class="text-gradient">Productivity</span>. <br />
                Powered by AI.
            </h1>
            <p class="hero-subtitle">
                Automate your workflows, generate insights, and scale your
                business with the most advanced AI assistant built for modern
                teams.
            </p>
            <div class="hero-cta">
                <button class="btn btn-primary btn-large">Start for free</button
                >
                <button class="btn btn-outline btn-large">Book demo</button>
            </div>
        </div>
    </header>

    <!-- Features Bento Grid -->
    <section class="features" id="features">
        <h2 class="section-title">Everything you need</h2>
        <p class="section-subtitle">
            A complete suite of tools to supercharge your workflow.
        </p>

        <div class="bento-grid">
            <div class="bento-card col-span-2 row-span-2">
                <div class="card-icon gradient-1">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        ><path
                            d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                        /></svg
                    >
                </div>
                <h3>Advanced Analytics</h3>
                <p>
                    Track your growth in real-time with custom AI-powered
                    dashboards and automated reporting.
                </p>
                <div class="bento-visual visual-analytics"></div>
            </div>

            <div class="bento-card">
                <div class="card-icon gradient-2">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        ><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg
                    >
                </div>
                <h3>Lightning Fast</h3>
                <p>Global edge network ensures sub-50ms latency everywhere.</p>
            </div>

            <div class="bento-card">
                <div class="card-icon gradient-3">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        ><path
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                        /></svg
                    >
                </div>
                <h3>Enterprise Security</h3>
                <p>SOC2 compliant with end-to-end encryption by default.</p>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <h2 class="section-title">Loved by innovators</h2>
        <p class="section-subtitle">
            See what our community is saying about Nexus.
        </p>

        <div class="testimonial-grid">
            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p class="quote">
                    "Nexus has completely transformed how our engineering team
                    ships. We've cut delivery time by 40%."
                </p>
                <div class="author">
                    <div
                        class="avatar-ph"
                        style="background: linear-gradient(135deg, #a855f7, #ec4899);"
                    ></div>
                    <div class="author-info">
                        <strong>Sarah Jenkins</strong>
                        <span>CTO at TechFlow</span>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p class="quote">
                    "The AI insights are honestly like having a data scientist
                    on staff 24/7. Incredible ROI within month one."
                </p>
                <div class="author">
                    <div
                        class="avatar-ph"
                        style="background: linear-gradient(135deg, #3b82f6, #2dd4bf);"
                    ></div>
                    <div class="author-info">
                        <strong>Marcus Chen</strong>
                        <span>Founder at DataSync</span>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p class="quote">
                    "Clean UI, lightning fast, and secure. What more could you
                    ask for? A must-have tool for modern teams."
                </p>
                <div class="author">
                    <div
                        class="avatar-ph"
                        style="background: linear-gradient(135deg, #f59e0b, #ef4444);"
                    ></div>
                    <div class="author-info">
                        <strong>Elena Rodriguez</strong>
                        <span>VP Engineering, ScaleUp</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing" id="pricing">
        <h2 class="section-title">Simple, transparent pricing</h2>
        <p class="section-subtitle">
            Start for free, upgrade when you need to.
        </p>

        <div class="pricing-grid">
            <!-- Free Plan -->
            <div class="pricing-card">
                <div class="plan-name">Starter</div>
                <div class="plan-price">Free</div>
                <p class="plan-desc">
                    For individuals and small teams just getting started.
                </p>
                <ul class="plan-features">
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Up to 3 users
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Basic analytics
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Community support
                    </li>
                    <li class="disabled">
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#475569"
                            stroke-width="2"
                            ><line x1="18" y1="6" x2="6" y2="18"></line><line
                                x1="6"
                                y1="6"
                                x2="18"
                                y2="18"
                            ></line></svg
                        > AI integrations
                    </li>
                </ul>
                <button class="btn btn-outline btn-block">Get Started</button>
            </div>

            <!-- Pro Plan -->
            <div class="pricing-card popular">
                <div class="popular-badge">Most Popular</div>
                <div class="plan-name">Pro</div>
                <div class="plan-price">$29<span>/mo</span></div>
                <p class="plan-desc">
                    Advanced features for growing teams and businesses.
                </p>
                <ul class="plan-features">
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Unlimited users
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Advanced analytics
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Priority 24/7 support
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Full AI integrations
                    </li>
                </ul>
                <button class="btn btn-primary btn-block"
                    >Start Free Trial</button
                >
            </div>

            <!-- Enterprise Plan -->
            <div class="pricing-card">
                <div class="plan-name">Enterprise</div>
                <div class="plan-price">Custom</div>
                <p class="plan-desc">
                    Security and control for large scale organizations.
                </p>
                <ul class="plan-features">
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Everything in Pro
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Custom deployment
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > Dedicated CSM
                    </li>
                    <li>
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="2"
                            ><polyline points="20 6 9 17 4 12"></polyline></svg
                        > SLA & SOC2 Reports
                    </li>
                </ul>
                <button class="btn btn-outline btn-block">Contact Sales</button>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bottom-cta">
        <div class="cta-card">
            <h2>Ready to transform your work?</h2>
            <p>Join thousands of forward-thinking teams already using Nexus.</p>
            <button class="btn btn-primary btn-large" style="margin-top: 2rem;"
                >Get Started Now</button
            >
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-brand">
                <div class="logo">
                    <svg viewBox="0 0 24 24" fill="none" class="logo-icon">
                        <path
                            d="M12 2L2 22h20L12 2z"
                            fill="url(#logo-grad-2)"
                        />
                        <defs>
                            <linearGradient
                                id="logo-grad-2"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="22"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#A855F7" />
                                <stop offset="1" stop-color="#EC4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span class="logo-text">Nexus</span>
                </div>
                <p>Building the future of work.</p>
            </div>
            <div class="footer-links">
                <div class="link-col">
                    <h4>Product</h4>
                    <a href="#features">Features</a>
                    <a href="#integrations">Integrations</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <div class="link-col">
                    <h4>Company</h4>
                    <a href="#about">About</a>
                    <a href="#blog">Blog</a>
                    <a href="#careers">Careers</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>
                &copy; {new Date().getFullYear()} Nexus Inc. All rights reserved.
            </p>
        </div>
    </footer>
</div>

<style>
    /* CSS Scoped Base */
    .saas-template {
        background-color: #030014;
        color: #f8fafc;
        font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
        min-height: 100vh;
        overflow-x: hidden;
        position: relative;
    }

    * {
        box-sizing: border-box;
    }

    /* Navbar */
    .navbar {
        position: sticky;
        top: 0;
        z-index: 50;
        backdrop-filter: blur(12px);
        background: rgba(3, 0, 20, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding: 0.75rem 2rem;
    }

    .nav-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .logo-icon {
        width: 28px;
        height: 28px;
    }

    .logo-text {
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #fff;
    }

    .nav-links {
        display: none;
        gap: 2rem;
    }

    @media (min-width: 768px) {
        .nav-links {
            display: flex;
        }
    }

    .nav-links a {
        color: #94a3b8;
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 500;
        transition: color 0.2s;
    }

    .nav-links a:hover {
        color: #fff;
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    /* Buttons */
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        font-weight: 500;
        transition: all 0.2s ease;
        cursor: pointer;
        outline: none;
        border: none;
    }

    .btn-primary {
        background: linear-gradient(135deg, #a855f7, #ec4899);
        color: white;
        padding: 0.5rem 1.25rem;
        font-size: 0.95rem;
        box-shadow: 0 4px 14px 0 rgba(236, 72, 153, 0.39);
    }

    .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px 0 rgba(236, 72, 153, 0.5);
    }

    .btn-secondary {
        background: transparent;
        color: #e2e8f0;
        padding: 0.5rem 1rem;
        font-size: 0.95rem;
    }

    .btn-secondary:hover {
        color: #fff;
    }

    .btn-outline {
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 0.5rem 1.25rem;
        font-size: 0.95rem;
    }

    .btn-outline:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .btn-large {
        padding: 0.875rem 2rem;
        font-size: 1.05rem;
        font-weight: 600;
    }

    /* Hero */
    .hero {
        position: relative;
        padding: 8rem 2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }

    .hero-glow {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.15) 0%,
            rgba(3, 0, 20, 0) 70%
        );
        z-index: 0;
        pointer-events: none;
    }

    .hero-content {
        position: relative;
        z-index: 10;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.85rem;
        background: rgba(168, 85, 247, 0.05);
        border: 1px solid rgba(168, 85, 247, 0.2);
        border-radius: 9999px;
        color: #d8b4fe;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 2rem;
    }

    .badge-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #a855f7;
        box-shadow: 0 0 8px #a855f7;
    }

    .hero-title {
        font-size: clamp(3rem, 8vw, 5rem);
        line-height: 1.1;
        font-weight: 800;
        letter-spacing: -0.04em;
        margin: 0 0 1.5rem;
    }

    .text-gradient {
        background: linear-gradient(
            135deg,
            #a855f7 0%,
            #ec4899 50%,
            #f43f5e 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-subtitle {
        font-size: clamp(1.125rem, 3vw, 1.25rem);
        color: #94a3b8;
        line-height: 1.6;
        max-width: 600px;
        margin: 0 0 2.5rem;
    }

    .hero-cta {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    /* Sections Shared */
    .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        margin: 0 0 1rem;
        text-align: center;
    }

    .section-subtitle {
        font-size: 1.125rem;
        color: #94a3b8;
        text-align: center;
        margin: 0 0 4rem;
    }

    /* Features Bento Grid */
    .features {
        max-width: 1200px;
        margin: 0 auto;
        padding: 6rem 2rem;
    }

    .bento-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (min-width: 768px) {
        .bento-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 240px;
        }

        .col-span-2 {
            grid-column: span 2;
        }

        .row-span-2 {
            grid-row: span 2;
        }
    }

    .bento-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 24px;
        padding: 2.5rem;
        position: relative;
        overflow: hidden;
        transition:
            transform 0.3s ease,
            border-color 0.3s ease;
    }

    .bento-card:hover {
        transform: translateY(-4px);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .card-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        color: white;
    }

    .card-icon.gradient-1 {
        background: linear-gradient(135deg, #a855f7, #6366f1);
    }
    .card-icon.gradient-2 {
        background: linear-gradient(135deg, #ec4899, #f43f5e);
    }
    .card-icon.gradient-3 {
        background: linear-gradient(135deg, #10b981, #06b6d4);
    }

    .bento-card h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.75rem;
    }

    .bento-card p {
        color: #94a3b8;
        line-height: 1.5;
        font-size: 0.95rem;
        margin: 0;
    }

    .bento-visual {
        margin-top: 2rem;
        height: 200px;
        background: linear-gradient(transparent, rgba(168, 85, 247, 0.1));
        border-radius: 12px 12px 0 0;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-bottom: none;
        position: relative;
    }

    /* CTA Section */
    .bottom-cta {
        padding: 6rem 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .cta-card {
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0) 100%
        );
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 32px;
        padding: 5rem 2rem;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .cta-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.5),
            transparent
        );
    }

    .cta-card h2 {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        margin: 0 0 1rem;
    }

    .cta-card p {
        font-size: 1.125rem;
        color: #94a3b8;
        max-width: 500px;
        margin: 0 auto;
    }

    /* Testimonials */
    .testimonials {
        max-width: 1200px;
        margin: 0 auto;
        padding: 6rem 2rem;
    }

    .testimonial-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    @media (min-width: 768px) {
        .testimonial-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .testimonial-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 24px;
        padding: 2.5rem;
        transition: transform 0.3s ease;
    }

    .testimonial-card:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.03);
    }

    .stars {
        color: #f59e0b;
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        letter-spacing: 2px;
    }

    .quote {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #f8fafc;
        margin-bottom: 2rem;
        flex-grow: 1;
    }

    .author {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .avatar-ph {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }

    .author-info strong {
        display: block;
        color: #fff;
        font-weight: 600;
        margin-bottom: 0.2rem;
    }

    .author-info span {
        font-size: 0.85rem;
        color: #94a3b8;
    }

    /* Pricing */
    .pricing {
        max-width: 1200px;
        margin: 0 auto;
        padding: 6rem 2rem;
    }

    .pricing-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: center;
    }

    @media (min-width: 768px) {
        .pricing-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .pricing-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 24px;
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
    }

    .pricing-card.popular {
        background: rgba(168, 85, 247, 0.03);
        border: 1px solid rgba(168, 85, 247, 0.3);
        transform: scale(1.05);
        z-index: 10;
        box-shadow: 0 0 40px rgba(168, 85, 247, 0.1);
    }

    .popular-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #a855f7, #ec4899);
        color: white;
        padding: 0.25rem 1rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .plan-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #94a3b8;
        margin-bottom: 0.5rem;
    }

    .popular .plan-name {
        color: #a855f7;
    }

    .plan-price {
        font-size: 3rem;
        font-weight: 800;
        color: #fff;
        margin-bottom: 1rem;
        display: flex;
        align-items: baseline;
    }

    .plan-price span {
        font-size: 1rem;
        color: #64748b;
        font-weight: 500;
        margin-left: 0.25rem;
    }

    .plan-desc {
        color: #94a3b8;
        margin-bottom: 2rem;
        line-height: 1.5;
        min-height: 48px;
    }

    .plan-features {
        list-style: none;
        padding: 0;
        margin: 0 0 2.5rem 0;
        flex-grow: 1;
    }

    .plan-features li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        color: #e2e8f0;
    }

    .plan-features li.disabled {
        color: #475569;
    }

    .btn-block {
        width: 100%;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    /* Footer */
    .footer {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding: 4rem 2rem 2rem;
        background: rgba(0, 0, 0, 0.2);
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    @media (min-width: 768px) {
        .footer-content {
            grid-template-columns: 2fr 1fr;
        }
    }

    .footer-brand p {
        color: #64748b;
        margin-top: 1rem;
        max-width: 300px;
    }

    .footer-links {
        display: flex;
        gap: 4rem;
    }

    .link-col {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .link-col h4 {
        color: #fff;
        font-weight: 600;
        margin: 0 0 0.5rem;
    }

    .link-col a {
        color: #64748b;
        text-decoration: none;
        transition: color 0.2s;
    }

    .link-col a:hover {
        color: #f8fafc;
    }

    .footer-bottom {
        max-width: 1200px;
        margin: 4rem auto 0;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        text-align: center;
        color: #64748b;
        font-size: 0.875rem;
    }
</style>
