<script lang="ts">
    import ShaderForgeBuilder from "$lib/components/bits/ShaderForgeBuilder.svelte";
</script>

<svelte:head><title>Shader Forge — DunkUI</title></svelte:head>

<div class="tool-page">
    <header>
        <p class="eyebrow">Tool</p>
        <h1>Shader Forge</h1>
        <p>Constructor funcional de presets visuales para shaders/backgrounds en Svelte 5.</p>
    </header>

    <ShaderForgeBuilder />
</div>

<style>
    .tool-page {
        display: grid;
        gap: 1rem;
    }

    .eyebrow {
        margin: 0 0 0.35rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.5);
    }

    h1 {
        margin: 0;
        color: #fff;
        font-size: 2rem;
        letter-spacing: -0.03em;
    }

    p {
        margin: 0.55rem 0 0;
        color: rgba(255, 255, 255, 0.65);
        line-height: 1.6;
        font-size: 0.92rem;
    }
</style>
