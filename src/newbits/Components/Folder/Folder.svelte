<script lang="ts">
    import { onMount } from "svelte";
    import type { ComponentType } from "react";
    import ReactMount from "$lib/react/ReactMount.svelte";

    const modulePath = "./Folder.jsx";

    let reactComponent = $state<ComponentType<any> | null>(null);
    let loadError = $state<string | null>(null);

    let { ...restProps } = $props();

    onMount(async () => {
        try {
            const mod = await import(/* @vite-ignore */ modulePath);
            reactComponent = (mod?.default ?? null) as ComponentType<any> | null;
        } catch (err) {
            loadError = err instanceof Error ? err.message : "Failed to load component";
        }
    });
</script>

{#if reactComponent}
    <ReactMount component={reactComponent} props={restProps} />
{:else if loadError}
    <div class="react-bridge-error">{loadError}</div>
{/if}

<style>
    .react-bridge-error {
        color: #fca5a5;
        font-size: 0.75rem;
        border: 1px solid rgba(252, 165, 165, 0.35);
        background: rgba(69, 10, 10, 0.25);
        border-radius: 10px;
        padding: 0.6rem;
    }
</style>
