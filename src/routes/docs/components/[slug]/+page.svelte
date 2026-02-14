<script lang="ts">
    import { page } from "$app/stores";
    import JSXBridgeItemPage from "$lib/components/JSXBridgeItemPage.svelte";
    import { components } from "$lib/data/jsx-bridge-registry";

    const modules = import.meta.glob("/src/newbits/Components/**/*.svelte");
    let slug = $derived($page.params.slug);
    let item = $derived(components.find((x) => x.slug === slug));
</script>

<svelte:head><title>{item?.name ?? "Component"} — Components</title></svelte:head>

<JSXBridgeItemPage title="Components" {item} {modules} backHref="/docs/components" />
