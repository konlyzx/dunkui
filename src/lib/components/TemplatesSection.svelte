<script lang="ts">
    const templates = [
        {
            title: "SaaS Launchpad",
            description:
                "Waitlist, Pricing, Testimonials, and Bento Grid. Complete boilerplate for your next software business.",
            tag: "New",
            comingSoon: false,
            image: "/images/saas_launchpad.png",
        },
        {
            title: "Creator Portfolio",
            description:
                "Sleek, heavily animated portfolio for modern creators. Interactive WebGL background included.",
            tag: "Pro",
            comingSoon: false,
            image: "/images/creator_portfolio.png",
        },
        {
            title: "AI Dashboard UI",
            description:
                "Complex application layout with sidebar, data visualization components, and generative AI input fields.",
            tag: "Popular",
            comingSoon: false,
            image: "/images/ai_dashboard.png",
        },
        {
            title: "E-Commerce Storefront",
            description:
                "High-performance headless commerce template with cart, product showcase, and checkout flow.",
            tag: "Coming Soon",
            comingSoon: true,
            image: "/images/ecommerce_store.png",
        },
    ];
</script>

<section class="templates-section" id="templates">
    <div class="header fade-in">
        <span class="section-badge">Templates</span>
        <h2>Ship faster with complete landing pages</h2>
        <p>
            Production-ready, customizable templates designed to convert. Save
            weeks of development time and get straight to building your product.
        </p>
    </div>

    <div class="templates-grid">
        {#each templates as template, i}
            <a
                href={template.comingSoon
                    ? "#"
                    : `/docs/templates/${template.title
                          .toLowerCase()
                          .replace(/ \s*|\s+/g, "-")
                          .replace("ui", "ui")}`}
                class="template-card fade-in"
                style="transition-delay: {i * 0.15}s; text-decoration: none;"
            >
                <div class="preview-area">
                    {#if template.tag}
                        <div class="tag" class:dimmed={template.comingSoon}>
                            {template.tag}
                        </div>
                    {/if}
                    <!-- Actual mockup screenshot of a landing page -->
                    <img
                        src={template.image}
                        alt={template.title}
                        class="mockup-img"
                    />
                </div>
                <div class="content-area">
                    <h3>{template.title}</h3>
                    <p>{template.description}</p>

                    {#if template.comingSoon}
                        <button class="btn disabled" disabled
                            >Coming Soon</button
                        >
                    {:else}
                        <span class="btn">View Template Details</span>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</section>

<style>
    .templates-section {
        padding: 120px 20px;
        max-width: 1400px;
        margin: 0 auto;
        position: relative;
    }

    .header {
        text-align: center;
        margin-bottom: 64px;
        max-width: 600px;
        margin-inline: auto;
    }

    .section-badge {
        display: inline-block;
        font-size: 0.85rem;
        color: var(--accent-light);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 24px;
        background: rgba(255, 62, 0, 0.1);
        padding: 6px 14px;
        border-radius: 100px;
        border: 1px solid rgba(255, 62, 0, 0.2);
    }

    .header h2 {
        font-size: 3.5rem;
        font-weight: 800;
        letter-spacing: -1.5px;
        margin-bottom: 24px;
        line-height: 1.1;
    }

    .header p {
        color: var(--muted);
        font-size: 1.25rem;
        line-height: 1.6;
    }

    .templates-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
    }

    .template-card {
        background: var(--surface);
        border: 1px solid var(--stroke);
        border-radius: var(--radius-2xl);
        overflow: hidden;
        transition: all 0.4s var(--ease-apple);
        display: flex;
        flex-direction: column;
    }

    .template-card:hover {
        border-color: var(--stroke-hover);
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .preview-area {
        height: 320px;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid var(--stroke);
    }

    .tag {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 0.8rem;
        font-weight: 600;
        color: #fff;
        z-index: 10;
    }

    .tag.dimmed {
        background: rgba(255, 255, 255, 0.05);
        color: var(--muted);
    }

    .mockup-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s var(--ease-apple);
    }

    .template-card:hover .mockup-img {
        transform: scale(1.05);
    }

    .content-area {
        padding: 32px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 12px;
        color: var(--text);
    }

    .content-area p {
        color: var(--muted);
        line-height: 1.6;
        margin-bottom: 24px;
        font-size: 1.05rem;
        flex: 1;
    }

    .btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text);
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        font-size: 0.95rem;
        width: fit-content;
    }

    .btn:hover:not(.disabled) {
        background: var(--text);
        color: var(--bg);
    }

    .btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Fade-in animation from index.css */
    .fade-in {
        opacity: 0;
        transform: translateY(40px);
        transition:
            opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .fade-in:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 1024px) {
        .templates-grid {
            grid-template-columns: 1fr;
        }
        .header h2 {
            font-size: 2.5rem;
        }
    }
</style>
