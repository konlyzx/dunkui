<script lang="ts">
    import { page } from "$app/stores";

    let currentPath = $derived($page.url.pathname);
    let mobileMenuOpen = $state(false);

    const categories = [
        {
            title: "Get Started",
            items: [{ href: "/docs", label: "Introduction", tag: "" }],
        },
        {
            title: "Components",
            items: [
                { href: "/docs/glitch-text", label: "Glitch Text", tag: "" },
            ],
        },
        {
            title: "Backgrounds",
            items: [
                {
                    href: "/docs/faulty-terminal",
                    label: "Faulty Terminal",
                    tag: "",
                },
                {
                    href: "/docs/particle-field",
                    label: "Particle Field",
                    tag: "",
                },
                { href: "/docs/aurora", label: "Aurora Borealis", tag: "" },
                { href: "/docs/retro-grid", label: "Retro Grid", tag: "New" },
            ],
        },
        {
            title: "Tools",
            items: [
                { href: "/docs/theme-kit", label: "Theme Kit", tag: "" },
                {
                    href: "/docs/shader-forge",
                    label: "Shader Forge",
                    tag: "New",
                },
            ],
        },
    ];

    let { children } = $props();
</script>

<!-- ===== DOCS 3-COL LAYOUT ===== -->
<div class="docs-layout">
    <nav class="sidebar">
        <div class="sidebar-inner">
            {#each categories as cat}
                <div class="sidebar-section">
                    <p class="category-name">{cat.title}</p>
                    <div class="category-items">
                        {#each cat.items as item}
                            <a
                                href={item.href}
                                class="sidebar-item"
                                class:active={currentPath === item.href}
                            >
                                {item.label}
                                {#if item.tag === "New"}
                                    <span class="new-tag">New</span>
                                {:else if item.tag === "Updated"}
                                    <span class="updated-tag">Updated</span>
                                {/if}
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </nav>

    <div class="main-content">
        <div class="page-content">
            {@render children()}
        </div>
    </div>

    <aside class="right-panel">
        <div class="right-panel-inner">
            <a
                href="https://github.com/dunkui"
                target="_blank"
                rel="noopener noreferrer"
                class="pro-card-link"
            >
                <div class="right-card pro-card">
                    <p class="pro-title">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path
                                d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
                            /><path
                                d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
                            /><path
                                d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
                            /><path
                                d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
                            /></svg
                        >
                        Get DunkUI Pro
                    </p>
                    <p class="pro-desc">
                        55+ components, 100+ blocks & 5 templates to ship
                        memorable products faster.
                    </p>
                    <div class="pro-cta">
                        <span>Explore Pro</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            ><path d="M5 12h14" /><path
                                d="m12 5 7 7-7 7"
                            /></svg
                        >
                    </div>
                </div>
            </a>

            <div class="right-card sponsors-card">
                <p class="sponsors-title">Our Sponsors</p>
                <p class="sponsors-desc">
                    Help us maintain and grow DunkUI, keeping it free for devs
                    worldwide.
                </p>

                <div class="sponsor-tier">
                    <span class="tier-label">DIAMOND</span>
                    <a href="#" class="sponsor-item">
                        <span class="sponsor-logo">⬡</span>
                        <div class="sponsor-info">
                            <strong>ShadcnBlocks.com</strong><span
                                >2100+ extra Shadcn UI blocks</span
                            >
                        </div>
                    </a>
                    <a href="#" class="sponsor-item">
                        <span class="sponsor-logo">⬡</span>
                        <div class="sponsor-info">
                            <strong>shadcnstudio.com</strong><span
                                >shadcn blocks & templates</span
                            >
                        </div>
                    </a>
                </div>

                <div class="sponsor-tier">
                    <span class="tier-label">SILVER</span>
                    <div class="sponsor-logos-row">
                        <a
                            href="#"
                            class="sponsor-logo-small"
                            title="NEXT.js WEEKLY">N</a
                        >
                        <a href="#" class="sponsor-logo-small" title="shadcraft"
                            >⬡</a
                        >
                        <a
                            href="#"
                            class="sponsor-logo-small"
                            title="shadcn blocks">S</a
                        >
                    </div>
                </div>

                <div class="sponsor-extra-logo">
                    <span class="extra-name">✦efferd</span>
                </div>

                <a href="mailto:sponsor@dunkui.dev" class="sponsor-cta-btn">
                    Become a Sponsor
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        ><path
                            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        /><polyline points="15 3 21 3 21 9" /><line
                            x1="10"
                            y1="14"
                            x2="21"
                            y2="3"
                        /></svg
                    >
                </a>
                <p class="sponsor-footnote">
                    Get your brand in front of 500k+ devs monthly.<br /><span
                        >Limited Spots. Secure yours.</span
                    >
                </p>
            </div>
        </div>
    </aside>
</div>

<style>
    /* ===== DOCS 3-COL LAYOUT ===== */
    .docs-layout {
        display: flex;
        min-height: 100vh;
        background: #060010;
        padding-top: 56px;
    }

    /* ===== SIDEBAR ===== */
    .sidebar {
        position: fixed;
        top: 56px;
        left: 0;
        bottom: 0;
        width: 200px;
        overflow-y: auto;
        padding: 0.75rem 0;
        z-index: 50;
        border-right: 1px solid rgba(255, 255, 255, 0.04);
    }
    .sidebar-inner {
        display: flex;
        flex-direction: column;
        padding: 0.25rem 0.6rem;
    }
    .sidebar-section {
        margin-bottom: 0.5rem;
    }
    .category-name {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.3);
        padding: 0.4rem 0.6rem 0.25rem;
        margin: 0;
    }
    .category-items {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }
    .sidebar-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0.6rem;
        border-radius: 5px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.8rem;
        font-weight: 400;
        transition: all 0.15s;
        text-decoration: none;
    }
    .sidebar-item:hover {
        color: rgba(255, 255, 255, 0.85);
        background: rgba(255, 255, 255, 0.03);
    }
    .sidebar-item.active {
        color: #fff;
        font-weight: 500;
    }
    .new-tag {
        font-size: 0.55rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        background: rgba(139, 92, 246, 0.2);
        color: #a78bfa;
        padding: 1px 5px;
        border-radius: 3px;
    }
    .updated-tag {
        font-size: 0.55rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        padding: 1px 5px;
        border-radius: 3px;
    }

    /* ===== MAIN CONTENT ===== */
    .main-content {
        flex: 1;
        margin-left: 200px;
        margin-right: 260px;
        padding: 1.5rem 2.5rem 4rem;
        min-width: 0;
    }
    .page-content {
        max-width: 100%;
    }

    /* ===== RIGHT PANEL ===== */
    .right-panel {
        position: fixed;
        top: 56px;
        right: 0;
        bottom: 0;
        width: 260px;
        overflow-y: auto;
        padding: 1rem;
        z-index: 50;
        border-left: 1px solid rgba(255, 255, 255, 0.04);
    }
    .right-panel-inner {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .pro-card-link {
        text-decoration: none;
    }
    .right-card {
        border-radius: 12px;
        border: 1px solid rgba(139, 92, 246, 0.15);
        padding: 1rem;
        background: rgba(139, 92, 246, 0.04);
    }
    .pro-card {
        transition: border-color 0.2s;
    }
    .pro-card:hover {
        border-color: rgba(139, 92, 246, 0.3);
    }
    .pro-title {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.85rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 0.35rem;
    }
    .pro-desc {
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.45);
        line-height: 1.5;
        margin: 0 0 0.75rem;
    }
    .pro-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        padding: 0.45rem 0.85rem;
        background: #7c3aed;
        border-radius: 8px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #fff;
        transition: background 0.2s;
    }
    .pro-cta:hover {
        background: #6d28d9;
    }

    /* Sponsors */
    .sponsors-card {
        background: rgba(255, 255, 255, 0.015);
        border-color: rgba(255, 255, 255, 0.06);
    }
    .sponsors-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 0.3rem;
    }
    .sponsors-desc {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.35);
        line-height: 1.45;
        margin: 0 0 0.75rem;
    }
    .sponsor-tier {
        margin-bottom: 0.75rem;
    }
    .tier-label {
        font-size: 0.55rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: rgba(255, 255, 255, 0.25);
        text-transform: uppercase;
        display: block;
        margin-bottom: 0.4rem;
    }
    .sponsor-item {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.5rem 0.65rem;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        margin-bottom: 0.4rem;
        text-decoration: none;
        transition: border-color 0.2s;
    }
    .sponsor-item:hover {
        border-color: rgba(255, 255, 255, 0.12);
    }
    .sponsor-logo {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: #fff;
        font-size: 0.75rem;
        flex-shrink: 0;
    }
    .sponsor-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
    }
    .sponsor-info strong {
        font-size: 0.72rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .sponsor-info span {
        font-size: 0.62rem;
        color: rgba(255, 255, 255, 0.35);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .sponsor-logos-row {
        display: flex;
        gap: 0.5rem;
    }
    .sponsor-logo-small {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.8rem;
        font-weight: 700;
        text-decoration: none;
        transition: border-color 0.2s;
    }
    .sponsor-logo-small:hover {
        border-color: rgba(255, 255, 255, 0.12);
    }

    .sponsor-extra-logo {
        margin-bottom: 0.75rem;
    }
    .extra-name {
        font-size: 0.95rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
        letter-spacing: 0.02em;
    }

    .sponsor-cta-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        padding: 0.5rem 0.85rem;
        background: #7c3aed;
        border: none;
        border-radius: 8px;
        font-size: 0.72rem;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        transition: background 0.2s;
        margin-bottom: 0.5rem;
    }
    .sponsor-cta-btn:hover {
        background: #6d28d9;
    }
    .sponsor-footnote {
        font-size: 0.6rem;
        color: rgba(255, 255, 255, 0.25);
        text-align: center;
        margin: 0;
        line-height: 1.4;
    }
    .sponsor-footnote span {
        text-decoration: underline;
        cursor: pointer;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1200px) {
        .right-panel {
            display: none;
        }
        .main-content {
            margin-right: 0;
        }
    }
    @media (max-width: 860px) {
        .sidebar {
            display: none;
        }
        .main-content {
            margin-left: 0;
            padding: 1.5rem 1.25rem 3rem;
        }
    }

    /* Scrollbar */
    .sidebar::-webkit-scrollbar,
    .right-panel::-webkit-scrollbar {
        width: 3px;
    }
    .sidebar::-webkit-scrollbar-thumb,
    .right-panel::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.06);
        border-radius: 2px;
    }
</style>
