<script lang="ts">
    import ThemeKitBuilder from "$lib/components/bits/ThemeKitBuilder.svelte";
    import ShaderForgeBuilder from "$lib/components/bits/ShaderForgeBuilder.svelte";

    let tab = $state<"theme" | "shader">("theme");
</script>

<svelte:head><title>Tools — DunkUI</title></svelte:head>

<div class="tools-page">
    <header class="hero">
        <p class="eyebrow">Svelte 5 Tools</p>
        <h1>Tools</h1>
        <p>
            Utilidades reales para generar tokens de diseño y presets visuales sin salir del docs.
        </p>
    </header>

    <div class="tabs">
        <button type="button" class:active={tab === "theme"} onclick={() => (tab = "theme")}>Theme Kit</button>
        <button type="button" class:active={tab === "shader"} onclick={() => (tab = "shader")}>Shader Forge</button>
    </div>

    {#if tab === "theme"}
        <ThemeKitBuilder />
    {:else}
        <ShaderForgeBuilder />
    {/if}
</div>

<style>
    .tools-page {
        display: grid;
        gap: 1rem;
    }

    .hero h1 {
        margin: 0;
        color: #fff;
        font-size: 2rem;
        letter-spacing: -0.03em;
    }

    .eyebrow {
        margin: 0 0 0.35rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.5);
    }

    .hero p {
        margin: 0.55rem 0 0;
        color: rgba(255, 255, 255, 0.65);
        line-height: 1.6;
        font-size: 0.92rem;
    }

    .tabs {
        display: flex;
        gap: 0.45rem;
    }

    .tabs button {
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.02);
        color: rgba(255, 255, 255, 0.76);
        border-radius: 999px;
        padding: 0.38rem 0.7rem;
        font-size: 0.75rem;
    }

    .tabs button.active {
        border-color: rgba(167, 139, 250, 0.5);
        color: #fff;
        background: rgba(139, 92, 246, 0.15);
    }
</style>
