<script lang="ts">
    import JSXBridgeIndex from "$lib/components/JSXBridgeIndex.svelte";
    import { components } from "$lib/data/jsx-bridge-registry";
</script>

<svelte:head><title>Components — DunkUI</title></svelte:head>

<JSXBridgeIndex
    title="Components"
    description="Todos los componentes de @Components en rutas individuales."
    items={components}
/>
