<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as React from "react";
    import ReactDOM from "react-dom/client";
    import type { Root } from "react-dom/client";

    let { component, props = {}, class: className } = $props();

    let container = $state<HTMLElement>();
    let root = $state<Root | null>(null);

    $effect(() => {
        if (!container || !component) return;

        if (!root) {
            root = ReactDOM.createRoot(container);
        }

        // Render the component
        root.render(React.createElement(component, { ...props, className }));
    });

    onDestroy(() => {
        if (root) {
            root.unmount();
        }
    });
</script>

<div
    bind:this={container}
    style="display: block; width: 100%; height: 100%;"
></div>
