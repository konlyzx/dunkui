<script lang="ts">
    import JSXBridgeIndex from "$lib/components/JSXBridgeIndex.svelte";
    import { backgrounds } from "$lib/data/jsx-bridge-registry";
</script>

<svelte:head><title>Backgrounds — DunkUI</title></svelte:head>

<JSXBridgeIndex
    title="Backgrounds"
    description="Todos los backgrounds de @Backgrounds en rutas individuales."
    items={backgrounds}
/>
