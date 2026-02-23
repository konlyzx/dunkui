<script lang="ts">
    import CategoryIndex from "$lib/components/CategoryIndex.svelte";
    import { textAnimations } from "$lib/data/registry";
</script>

<svelte:head><title>Text Animations — DunkUI</title></svelte:head>

<CategoryIndex
    title="Text Animations"
    description="All text animation components available in DunkUI."
    items={textAnimations}
/>
