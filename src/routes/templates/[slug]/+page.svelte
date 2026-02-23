<script lang="ts">
    import { page } from "$app/stores";
    import SaasLaunchpadTemplate from "$lib/templates/SaasLaunchpadTemplate.svelte";
    import EcommerceStorefrontTemplate from "$lib/templates/EcommerceStorefrontTemplate.svelte";
    import AiDashboardUiTemplate from "$lib/templates/AiDashboardUiTemplate.svelte";
    import CreatorPortfolioTemplate from "$lib/templates/CreatorPortfolioTemplate.svelte";

    let slug = $derived($page.params.slug);
</script>

<svelte:head>
    <title>Preview: {slug} — DunkUI</title>
</svelte:head>

<div class="fullscreen-wrapper">
    <div class="preview-banner">
        <a href="/docs/templates/{slug}" class="back-button">← Back to Docs</a>
        <div class="banner-text">DunkUI Premium Template Preview</div>
    </div>

    <div class="template-content">
        {#if slug === "saas-launchpad"}
            <SaasLaunchpadTemplate />
        {:else if slug === "ecommerce-storefront"}
            <EcommerceStorefrontTemplate />
        {:else if slug === "ai-dashboard-ui"}
            <AiDashboardUiTemplate />
        {:else if slug === "creator-portfolio"}
            <CreatorPortfolioTemplate />
        {:else}
            <div class="not-found">Template not found.</div>
        {/if}
    </div>
</div>

<style>
    /* Ensure global body has no margin for full screen effect */
    :global(body) {
        margin: 0;
        padding: 0;
    }

    .fullscreen-wrapper {
        width: 100%;
        min-height: 100vh;
        background: #000;
        display: flex;
        flex-direction: column;
    }

    .template-content {
        flex: 1;
        width: 100%;
        position: relative;
    }

    .preview-banner {
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.75rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 9999;
        position: sticky;
        top: 0;
    }

    .back-button {
        color: #a855f7;
        text-decoration: none;
        font-family: "Inter", sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: color 0.2s;
    }

    .back-button:hover {
        color: #d8b4fe;
    }

    .banner-text {
        color: rgba(255, 255, 255, 0.6);
        font-family: "JetBrains Mono", monospace;
        font-size: 0.8rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .not-found {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: #fff;
        font-family: "JetBrains Mono", monospace;
    }
</style>
