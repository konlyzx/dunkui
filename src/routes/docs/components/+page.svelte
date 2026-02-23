<script lang="ts">
    import CategoryIndex from "$lib/components/CategoryIndex.svelte";
    import { components } from "$lib/data/registry";
</script>

<svelte:head><title>Components — DunkUI</title></svelte:head>

<CategoryIndex
    title="Components"
    description="All UI components available in DunkUI."
    items={components}
/>
