<script lang="ts">
    import JSXBridgeIndex from "$lib/components/JSXBridgeIndex.svelte";
    import { textAnimations } from "$lib/data/jsx-bridge-registry";
</script>

<svelte:head><title>Text Animations — DunkUI</title></svelte:head>

<JSXBridgeIndex
    title="Text Animations"
    description="Todas las animaciones de texto de @TextAnimations en rutas individuales."
    items={textAnimations}
/>
