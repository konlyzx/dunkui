<script lang="ts">
    import { onMount } from "svelte";
    import { App, DEFAULT_EFFECT_OPTIONS, distortions } from "./utils";

    let { effectOptions = {}, class: className = "" } = $props();

    let container: HTMLDivElement;
    let app: App;

    onMount(() => {
        if (!container) return;

        const options = {
            ...DEFAULT_EFFECT_OPTIONS,
            ...effectOptions,
            colors: {
                ...DEFAULT_EFFECT_OPTIONS.colors,
                ...effectOptions.colors,
            },
        };

        if (typeof options.distortion === "string") {
            options.distortion =
                distortions[options.distortion] ||
                distortions.turbulentDistortion;
        }

        app = new App(container, options);
        app.loadAssets().then(app.init);

        return () => {
            if (app) app.dispose();
        };
    });
</script>

<div
    id="lights"
    bind:this={container}
    class={className}
    style="width: 100%; height: 100%; overflow: hidden; position: absolute;"
></div>

<style>
    :global(#lights canvas) {
        width: 100%;
        height: 100%;
        display: block;
        outline: none;
    }
</style>
