<script lang="ts">
    import { page } from "$app/stores";
    import ComponentPage from "$lib/components/ComponentPage.svelte";
    import { animations } from "$lib/data/registry";

    // Batch 2.1 Animations
    import ReactLoader from "$lib/components/ReactLoader.svelte";

    let slug = $derived($page.params.slug);
    let item = $derived(animations.find((x) => x.slug === slug));
</script>

<svelte:head>
    <title>{item?.name ?? "Animation"} — Animations</title>
</svelte:head>

{#snippet preview()}
    <div class="preview-wrapper">
        {#if slug === "blob-cursor"}
            <div class="cursor-container">
                <ReactLoader {slug} category="animations" />
                <p class="instruction">Move your mouse around!</p>
            </div>
        {:else if slug === "splash-cursor"}
            <div class="splash-container">
                <ReactLoader {slug} category="animations" />
                <p class="instruction">Move/Click to splash!</p>
            </div>
        {:else}
            <ReactLoader {slug} category="animations" />
        {/if}
    </div>
{/snippet}

<ComponentPage
    title="Animations"
    {item}
    backHref="/docs/animations"
    component={preview}
/>

<style>
    .preview-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #060010;
        overflow: hidden;
    }

    .cursor-container,
    .splash-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .instruction {
        color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        z-index: 10;
    }

    :global(.spark-btn) {
        padding: 1rem 2rem;
        background: #222;
        border: 1px solid #444;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.2s;
    }

    :global(.spark-btn:active) {
        transform: scale(0.95);
    }
</style>
