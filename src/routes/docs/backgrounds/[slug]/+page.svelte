<script lang="ts">
    import { page } from "$app/stores";
    import JSXBridgeItemPage from "$lib/components/JSXBridgeItemPage.svelte";
    import { backgrounds } from "$lib/data/jsx-bridge-registry";

    const modules = import.meta.glob("/src/newbits/Backgrounds/**/*.svelte");
    let slug = $derived($page.params.slug);
    let item = $derived(backgrounds.find((x) => x.slug === slug));
</script>

<svelte:head><title>{item?.name ?? "Background"} — Backgrounds</title></svelte:head>

<JSXBridgeItemPage title="Backgrounds" {item} {modules} backHref="/docs/backgrounds" />
