<script lang="ts">
    import JSXBridgeIndex from "$lib/components/JSXBridgeIndex.svelte";
    import { animations } from "$lib/data/jsx-bridge-registry";
</script>

<svelte:head><title>Animations — DunkUI</title></svelte:head>

<JSXBridgeIndex
    title="Animations"
    description="Todas las animaciones de @Animations en rutas individuales."
    items={animations}
/>
