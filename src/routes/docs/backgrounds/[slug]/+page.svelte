<script lang="ts">
    import { page } from "$app/stores";
    import ComponentPage from "$lib/components/ComponentPage.svelte";
    import { backgrounds } from "$lib/data/registry";
    import ReactLoader from "$lib/components/ReactLoader.svelte";

    let slug = $derived($page.params.slug);
    let item = $derived(backgrounds.find((x) => x.slug === slug));
</script>

<svelte:head>
    <title>{item?.name ?? "Background"} — Backgrounds</title>
</svelte:head>

{#snippet preview()}
    <div class="preview-wrapper">
        <ReactLoader {slug} category="backgrounds" />
    </div>
{/snippet}

<ComponentPage
    title="Backgrounds"
    {item}
    backHref="/docs/backgrounds"
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
        background-color: #000;
        overflow: hidden;
    }
</style>
