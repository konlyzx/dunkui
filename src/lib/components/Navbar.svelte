<script lang="ts">
    import { page } from "$app/stores";

    let currentPath = $derived($page.url.pathname);
    let mobileOpen = $state(false);

    function toggleMobile() {
        mobileOpen = !mobileOpen;
    }
    function closeMobile() {
        mobileOpen = false;
    }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && closeMobile()} />

<nav class="navbar">
    <div class="nav-inner">
        <!-- Brand -->
        <a href="/" class="nav-brand" onclick={closeMobile}>
            <span
                class="material-symbols-rounded"
                style="font-size: 1.2rem; color: var(--accent-light);"
                >category</span
            >
            <span class="brand-text">DunkUI</span>
        </a>

        <!-- Center links -->
        <div class="nav-links">
            <a href="/" class="nav-link" class:active={currentPath === "/"}
                >Home</a
            >
            <a
                href="/docs"
                class="nav-link"
                class:active={currentPath.startsWith("/docs")}>Components</a
            >
            <a href="#performance" class="nav-link">Performance</a>
            <a href="#showcase" class="nav-link">Showcase</a>
            <a href="#faq" class="nav-link">FAQ</a>
        </div>

        <!-- Right CTA -->
        <div class="nav-actions">
            <a
                href="https://github.com/dunkui"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-icon-btn"
                title="GitHub"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                </svg>
            </a>
            <a href="/docs" class="btn-cta">Start Building</a>
        </div>

        <!-- Mobile hamburger -->
        <button
            class="mobile-toggle"
            onclick={toggleMobile}
            aria-label="Toggle menu"
        >
            <span class="hamburger-line" class:open={mobileOpen}></span>
            <span class="hamburger-line" class:open={mobileOpen}></span>
            <span class="hamburger-line" class:open={mobileOpen}></span>
        </button>
    </div>
</nav>

<!-- Mobile Drawer -->
{#if mobileOpen}
    <div
        class="mobile-backdrop"
        onclick={closeMobile}
        role="presentation"
    ></div>
    <div class="mobile-drawer">
        <div class="mobile-nav-links">
            <a href="/" class="mobile-link" onclick={closeMobile}>Home</a>
            <a href="/docs" class="mobile-link" onclick={closeMobile}
                >Components</a
            >
            <a href="#performance" class="mobile-link" onclick={closeMobile}
                >Performance</a
            >
            <a href="#showcase" class="mobile-link" onclick={closeMobile}
                >Showcase</a
            >
            <a href="#faq" class="mobile-link" onclick={closeMobile}>FAQ</a>
        </div>
        <div class="mobile-nav-actions">
            <a href="/docs" class="btn-mobile primary" onclick={closeMobile}>
                Start Building
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M5 12h14M12 5l7 7-7 7" /></svg
                >
            </a>
            <div class="mobile-socials">
                <a
                    href="https://github.com/dunkui"
                    target="_blank"
                    rel="noopener noreferrer">GitHub</a
                >
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer">Twitter</a
                >
            </div>
        </div>
    </div>
{/if}

<style>
    .navbar {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 1000px;
        height: 54px;
        background: rgba(10, 5, 24, 0.5);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--stroke);
        border-radius: 99px;
        display: flex;
        align-items: center;
        padding: 0 24px;
        z-index: 2000;
    }

    .nav-inner {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Brand */
    .nav-brand {
        font-weight: 800;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 8px;
        letter-spacing: -0.5px;
        color: #fff;
        text-decoration: none;
        flex-shrink: 0;
    }

    /* Center links */
    .nav-links {
        display: flex;
        gap: 24px;
    }

    .nav-link {
        font-size: 0.85rem;
        color: var(--muted);
        text-decoration: none;
        transition: color 0.2s;
        font-weight: 500;
    }

    .nav-link:hover {
        color: white;
    }

    .nav-link.active {
        color: white;
    }

    /* Right actions */
    .nav-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }

    .nav-icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.5);
        transition: all 0.2s;
        text-decoration: none;
    }

    .nav-icon-btn:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.06);
    }

    .btn-cta {
        background: white;
        color: black;
        padding: 6px 14px;
        border-radius: 99px;
        font-weight: 700;
        font-size: 0.75rem;
        text-decoration: none;
        transition: all 0.3s var(--ease-apple);
    }

    .btn-cta:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
    }

    /* Mobile toggle */
    .mobile-toggle {
        display: none;
        flex-direction: column;
        gap: 5px;
        padding: 8px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 210;
    }

    .hamburger-line {
        display: block;
        width: 18px;
        height: 2px;
        background: #fff;
        border-radius: 2px;
        transition: all 0.3s;
    }

    .hamburger-line.open:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    .hamburger-line.open:nth-child(2) {
        opacity: 0;
    }
    .hamburger-line.open:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }

    /* Mobile drawer */
    .mobile-backdrop {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 190;
        backdrop-filter: blur(4px);
    }

    .mobile-drawer {
        display: none;
        position: fixed;
        top: 80px;
        left: 5%;
        right: 5%;
        background: rgba(10, 5, 24, 0.97);
        backdrop-filter: blur(20px);
        z-index: 1999;
        padding: 2rem;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 24px;
        border: 1px solid var(--stroke);
        animation: slideDown 0.3s var(--ease-apple);
        gap: 2rem;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .mobile-link {
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        border-radius: 10px;
        transition: background 0.2s;
        text-decoration: none;
    }

    .mobile-link:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .mobile-nav-actions {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .btn-mobile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        font-family: inherit;
        text-decoration: none;
    }

    .btn-mobile.primary {
        background: white;
        color: black;
    }

    .mobile-socials {
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    .mobile-socials a {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
        font-weight: 500;
        text-decoration: none;
    }

    @media (max-width: 860px) {
        .nav-links,
        .nav-actions {
            display: none;
        }
        .mobile-toggle {
            display: flex;
        }
        .mobile-backdrop {
            display: block;
        }
        .mobile-drawer {
            display: flex;
        }
    }
</style>
