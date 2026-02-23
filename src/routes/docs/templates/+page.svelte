<script lang="ts">
    import CategoryIndex from "$lib/components/CategoryIndex.svelte";
    import { templates } from "$lib/data/registry";
</script>

<svelte:head>
    <title>Templates — DunkUI</title>
</svelte:head>

<CategoryIndex
    title="Templates"
    description="Ship faster with production-ready, highly-animated complete landing and web application layouts."
    items={templates}
/>
