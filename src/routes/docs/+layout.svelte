<script lang="ts">
    import { page } from "$app/stores";
    import { onMount, onDestroy, tick } from "svelte";
    import {
        animations,
        backgrounds,
        components,
        textAnimations,
    } from "$lib/data/jsx-bridge-registry";

    let currentPath = $derived($page.url.pathname);

    let mobileMenuOpen = $state(false);
    let activeLineY = $state(-100);
    let activeLineVisible = $state(false);
    let hoverLineY = $state(-100);
    let hoverLineVisible = $state(false);

    let hoverHideTimer: ReturnType<typeof setTimeout> | null = null;

    let sidebarInnerEl: HTMLDivElement | undefined;
    let sidebarEl: HTMLElement | undefined;
    let removeSidebarScrollListener: (() => void) | null = null;

    const SIDEBAR_SCROLL_KEY = "docs:sidebar-scroll";

    let itemEls: Record<string, HTMLAnchorElement | undefined> = {};

    const mapBridgeItems = (items: { route: string; name: string }[]) =>
        items.map((item) => ({ href: item.route, label: item.name, tag: "" }));

    const categories = [
        {
            title: "Get Started",
            items: [{ href: "/docs", label: "Introduction", tag: "" }],
        },
        {
            title: "Components",
            items: [
                { href: "/docs/components", label: "Overview", tag: "" },
                ...mapBridgeItems(components),
            ],
        },
        {
            title: "Animations",
            items: [{ href: "/docs/animations", label: "Overview", tag: "" }, ...mapBridgeItems(animations)],
        },
        {
            title: "Backgrounds",
            items: [
                { href: "/docs/backgrounds", label: "Overview", tag: "" },
                ...mapBridgeItems(backgrounds),
            ],
        },
        {
            title: "Text Animations",
            items: [
                { href: "/docs/text-animations", label: "Overview", tag: "" },
                ...mapBridgeItems(textAnimations),
            ],
        },
        {
            title: "Tools",
            items: [
                { href: "/docs/tools", label: "Overview", tag: "" },
                { href: "/docs/theme-kit", label: "Theme Kit", tag: "" },
                {
                    href: "/docs/shader-forge",
                    label: "Shader Forge",
                    tag: "New",
                },
            ],
        },
    ];

    const usefulLinks = [
        { href: "https://github.com/dunkui", label: "GitHub", external: true },
        { href: "/", label: "Showcase", external: false },
    ];

    let { children } = $props();

    function getLineCenterY(el: HTMLElement) {
        if (!sidebarInnerEl) return -100;
        const container = sidebarInnerEl.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        return rect.top - container.top + rect.height / 2;
    }

    async function updateActiveLine() {
        await tick();
        const activeEl = itemEls[currentPath];
        if (!activeEl) {
            activeLineVisible = false;
            return;
        }

        activeLineY = getLineCenterY(activeEl);
        activeLineVisible = true;
    }

    function onItemEnter(el: HTMLAnchorElement) {
        if (hoverHideTimer) clearTimeout(hoverHideTimer);
        hoverLineY = getLineCenterY(el);
        hoverLineVisible = true;
    }

    function onItemLeave() {
        if (hoverHideTimer) clearTimeout(hoverHideTimer);
        hoverHideTimer = setTimeout(() => {
            hoverLineVisible = false;
        }, 120);
    }

    function closeMobileMenu() {
        mobileMenuOpen = false;
    }

    function saveSidebarScroll() {
        if (!sidebarEl || typeof sessionStorage === "undefined") return;
        sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(sidebarEl.scrollTop));
    }

    function restoreSidebarScroll() {
        if (!sidebarEl || typeof sessionStorage === "undefined") return;
        const raw = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
        if (!raw) return;
        const parsed = Number(raw);
        if (Number.isFinite(parsed)) {
            sidebarEl.scrollTop = parsed;
        }
    }

    $effect(() => {
        currentPath;
        updateActiveLine();
        mobileMenuOpen = false;
    });

    onMount(() => {
        const onResize = () => updateActiveLine();
        window.addEventListener("resize", onResize);

        restoreSidebarScroll();
        if (sidebarEl) {
            const onSidebarScroll = () => saveSidebarScroll();
            sidebarEl.addEventListener("scroll", onSidebarScroll, { passive: true });
            removeSidebarScrollListener = () => {
                sidebarEl?.removeEventListener("scroll", onSidebarScroll);
            };
        }
        updateActiveLine();

        return () => {
            window.removeEventListener("resize", onResize);
            removeSidebarScrollListener?.();
            removeSidebarScrollListener = null;
        };
    });

    onDestroy(() => {
        if (hoverHideTimer) clearTimeout(hoverHideTimer);
    });
</script>

<div class="docs-mobile-header">
    <a href="/" class="mobile-brand">DunkUI</a>
    <button type="button" class="mobile-menu-btn" onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
        {mobileMenuOpen ? "Close" : "Menu"}
    </button>
</div>

{#if mobileMenuOpen}
    <button type="button" class="mobile-drawer-backdrop" onclick={closeMobileMenu} aria-label="Close menu"></button>
    <div class="mobile-drawer">
        <div class="mobile-drawer-head">
            <span>Navigation</span>
            <button type="button" class="mobile-menu-btn" onclick={closeMobileMenu}>X</button>
        </div>

        {#each categories as cat}
            <div class="mobile-group">
                <p class="category-name">{cat.title}</p>
                <div class="category-items">
                    {#each cat.items as item}
                        <a
                            href={item.href}
                            class="sidebar-item"
                            class:active={currentPath === item.href}
                            onclick={closeMobileMenu}
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

        <div class="mobile-group">
            <p class="category-name">Useful Links</p>
            <div class="category-items">
                {#each usefulLinks as link}
                    <a
                        href={link.href}
                        class="sidebar-item"
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        onclick={closeMobileMenu}
                    >
                        {link.label}
                    </a>
                {/each}
            </div>
        </div>
    </div>
{/if}

<div class="docs-layout">
    <nav class="sidebar" bind:this={sidebarEl}>
        <div class="sidebar-inner" bind:this={sidebarInnerEl}>
            <div
                class="line active-line"
                style={`transform:translateY(${activeLineY - 8}px);opacity:${activeLineVisible ? 1 : 0};`}
            ></div>
            <div
                class="line hover-line"
                style={`transform:translateY(${hoverLineY - 8}px);opacity:${hoverLineVisible ? 1 : 0};`}
            ></div>

            {#each categories as cat}
                <div class="sidebar-section">
                    <p class="category-name">{cat.title}</p>
                    <div class="category-items with-line">
                        {#each cat.items as item}
                            <a
                                href={item.href}
                                class="sidebar-item"
                                class:active={currentPath === item.href}
                                bind:this={itemEls[item.href]}
                                onmouseenter={(e) => onItemEnter(e.currentTarget as HTMLAnchorElement)}
                                onmouseleave={onItemLeave}
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
                    <p class="pro-title">Get DunkUI Pro</p>
                    <p class="pro-desc">
                        55+ components, 100+ blocks & 5 templates to ship memorable products faster.
                    </p>
                    <div class="pro-cta">
                        <span>Explore Pro</span>
                    </div>
                </div>
            </a>

            <div class="right-card sponsors-card">
                <p class="sponsors-title">Our Sponsors</p>
                <p class="sponsors-desc">
                    Help us maintain and grow DunkUI, keeping it free for devs worldwide.
                </p>

                <div class="sponsor-tier">
                    <span class="tier-label">DIAMOND</span>
                    <a href="https://shadcnblocks.com" target="_blank" rel="noopener noreferrer" class="sponsor-item">
                        <span class="sponsor-logo">⬡</span>
                        <div class="sponsor-info">
                            <strong>ShadcnBlocks.com</strong><span>2100+ extra Shadcn UI blocks</span>
                        </div>
                    </a>
                    <a href="https://shadcnstudio.com" target="_blank" rel="noopener noreferrer" class="sponsor-item">
                        <span class="sponsor-logo">⬡</span>
                        <div class="sponsor-info">
                            <strong>shadcnstudio.com</strong><span>shadcn blocks & templates</span>
                        </div>
                    </a>
                </div>

                <div class="sponsor-tier">
                    <span class="tier-label">SILVER</span>
                    <div class="sponsor-logos-row">
                        <span class="sponsor-logo-small" title="NEXT.js WEEKLY">N</span>
                        <span class="sponsor-logo-small" title="shadcraft">⬡</span>
                        <span class="sponsor-logo-small" title="shadcn blocks">S</span>
                    </div>
                </div>

                <a href="mailto:sponsor@dunkui.dev" class="sponsor-cta-btn">
                    Become a Sponsor
                </a>
            </div>
        </div>
    </aside>
</div>

<style>
    .docs-layout {
        display: flex;
        min-height: 100vh;
        background: #060010;
        padding-top: 56px;
    }

    .docs-mobile-header {
        position: fixed;
        top: 56px;
        left: 0;
        right: 0;
        z-index: 90;
        display: none;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        background: #060010;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .mobile-brand {
        text-decoration: none;
        color: #fff;
        font-weight: 700;
        letter-spacing: -0.01em;
    }

    .mobile-menu-btn {
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.02);
        color: #fff;
        border-radius: 10px;
        padding: 0.35rem 0.65rem;
        font-size: 0.75rem;
    }

    .mobile-drawer-backdrop {
        position: fixed;
        inset: 56px 0 0;
        background: rgba(2, 0, 8, 0.62);
        z-index: 95;
        border: none;
        width: 100%;
    }

    .mobile-drawer {
        position: fixed;
        top: 56px;
        left: 0;
        bottom: 0;
        width: min(94vw, 420px);
        padding: 1rem;
        overflow-y: auto;
        z-index: 96;
        background: #060010;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    .mobile-drawer-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.8rem;
        color: #fff;
        font-weight: 600;
        font-size: 0.85rem;
    }

    .mobile-group {
        margin-bottom: 1rem;
    }

    .sidebar {
        position: fixed;
        top: 56px;
        left: 0;
        bottom: 0;
        width: 220px;
        overflow-y: auto;
        padding: 0.75rem 0;
        z-index: 50;
        border-right: 1px solid rgba(255, 255, 255, 0.04);
    }

    .sidebar-inner {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0.25rem 0.6rem;
    }

    .line {
        position: absolute;
        left: 0;
        width: 2px;
        height: 16px;
        border-radius: 999px;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
        pointer-events: none;
    }

    .active-line {
        background: #fff;
        z-index: 2;
    }

    .hover-line {
        background: rgba(255, 255, 255, 0.45);
        z-index: 1;
    }

    .sidebar-section {
        margin-bottom: 0.55rem;
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

    .with-line {
        margin-left: 0.5rem;
        padding-left: 0.6rem;
        border-left: 1px solid #392e4e;
    }

    .sidebar-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.45rem;
        padding: 0.3rem 0.55rem;
        border-radius: 5px;
        color: rgba(255, 255, 255, 0.55);
        font-size: 0.8rem;
        font-weight: 400;
        transition: all 0.15s;
        text-decoration: none;
    }

    .sidebar-item:hover {
        color: rgba(255, 255, 255, 0.88);
        background: rgba(255, 255, 255, 0.03);
    }

    .sidebar-item.active {
        color: #fff;
        font-weight: 500;
    }

    .new-tag,
    .updated-tag {
        font-size: 0.55rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 1px 5px;
        border-radius: 3px;
    }

    .new-tag {
        background: rgba(139, 92, 246, 0.2);
        color: #a78bfa;
    }

    .updated-tag {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
    }

    .main-content {
        flex: 1;
        margin-left: 220px;
        margin-right: 260px;
        padding: 1.5rem 2.5rem 4rem;
        min-width: 0;
    }

    .page-content {
        max-width: 100%;
    }

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
        justify-content: center;
        padding: 0.45rem 0.85rem;
        background: #7c3aed;
        border-radius: 8px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #fff;
    }

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
        margin-bottom: 0.2rem;
    }

    .sponsor-cta-btn:hover {
        background: #6d28d9;
    }

    @media (max-width: 1200px) {
        .right-panel {
            display: none;
        }

        .main-content {
            margin-right: 0;
        }
    }

    @media (max-width: 860px) {
        .docs-mobile-header {
            display: flex;
        }

        .sidebar {
            display: none;
        }

        .main-content {
            margin-left: 0;
            padding: 4.8rem 1.25rem 3rem;
        }
    }

    .sidebar::-webkit-scrollbar,
    .right-panel::-webkit-scrollbar,
    .mobile-drawer::-webkit-scrollbar {
        width: 3px;
    }

    .sidebar::-webkit-scrollbar-thumb,
    .right-panel::-webkit-scrollbar-thumb,
    .mobile-drawer::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.06);
        border-radius: 2px;
    }
</style>
