<script lang="ts">
    import { page } from "$app/stores";
    import JSXBridgeItemPage from "$lib/components/JSXBridgeItemPage.svelte";
    import { textAnimations } from "$lib/data/jsx-bridge-registry";

    const modules = import.meta.glob("/src/newbits/TextAnimations/**/*.svelte");
    let slug = $derived($page.params.slug);
    let item = $derived(textAnimations.find((x) => x.slug === slug));
</script>

<svelte:head><title>{item?.name ?? "Text Animation"} — Text Animations</title></svelte:head>

<JSXBridgeItemPage title="Text Animations" {item} {modules} backHref="/docs/text-animations" />
