<script lang="ts">
    import CategoryIndex from "$lib/components/CategoryIndex.svelte";
    import { backgrounds } from "$lib/data/registry";
</script>

<svelte:head><title>Backgrounds — DunkUI</title></svelte:head>

<CategoryIndex
    title="Backgrounds"
    description="All background effect components available in DunkUI."
    items={backgrounds}
/>
