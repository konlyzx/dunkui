<script lang="ts">
    import { page } from "$app/stores";
    import JSXBridgeItemPage from "$lib/components/JSXBridgeItemPage.svelte";
    import { animations } from "$lib/data/jsx-bridge-registry";

    const modules = import.meta.glob("/src/newbits/Animations/**/*.svelte");
    let slug = $derived($page.params.slug);
    let item = $derived(animations.find((x) => x.slug === slug));
</script>

<svelte:head><title>{item?.name ?? "Animation"} — Animations</title></svelte:head>

<JSXBridgeItemPage title="Animations" {item} {modules} backHref="/docs/animations" />
