<script lang="ts">
    import CategoryIndex from "$lib/components/CategoryIndex.svelte";
    import { animations } from "$lib/data/registry";
</script>

<svelte:head><title>Animations — DunkUI</title></svelte:head>

<CategoryIndex
    title="Animations"
    description="All animation components available in DunkUI."
    items={animations}
/>
