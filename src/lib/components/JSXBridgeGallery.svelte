<script lang="ts">
    import type { Component } from "svelte";
    import type { JSXBridgeItem } from "$lib/data/jsx-bridge-registry";

    let {
        title,
        description,
        items,
        modules,
    }: {
        title: string;
        description: string;
        items: JSXBridgeItem[];
        modules: Record<string, () => Promise<any>>;
    } = $props();

    let selectedId = $state("");
    let SelectedComponent = $state<Component | null>(null);
    let loadError = $state<string | null>(null);
    let loading = $state(false);

    const selectedItem = $derived(items.find((item) => item.id === selectedId));

    $effect(() => {
        if (!selectedId && items.length > 0) {
            selectedId = items[0].id;
        }
    });

    async function loadSelected() {
        const item = selectedItem;
        if (!item) {
            SelectedComponent = null;
            return;
        }

        const loader = modules[item.moduleKey];
        if (!loader) {
            SelectedComponent = null;
            loadError = `No module found for ${item.moduleKey}`;
            return;
        }

        loading = true;
        loadError = null;

        try {
            const mod = await loader();
            SelectedComponent = (mod?.default ?? null) as Component | null;
        } catch (err) {
            SelectedComponent = null;
            loadError = err instanceof Error ? err.message : "Failed to load module";
        } finally {
            loading = false;
        }
    }

    $effect(() => {
        selectedId;
        loadSelected();
    });
</script>

<section class="bridge-gallery">
    <header class="gallery-head">
        <p class="eyebrow">JSX to Svelte</p>
        <h2>{title}</h2>
        <p>{description}</p>
    </header>

    <div class="gallery-grid">
        <aside class="list-panel">
            <div class="list-head">
                <strong>{items.length} Components</strong>
            </div>
            <div class="list-scroll">
                {#each items as item}
                    <button
                        type="button"
                        class="list-item"
                        class:active={item.id === selectedId}
                        onclick={() => (selectedId = item.id)}
                    >
                        <span>{item.name}</span>
                    </button>
                {/each}
            </div>
        </aside>

        <div class="preview-panel">
            <div class="preview-head">
                <strong>{selectedItem?.name ?? "Select component"}</strong>
            </div>

            <div class="preview-stage">
                {#if loading}
                    <p class="status">Loading component...</p>
                {:else if loadError}
                    <p class="status error">{loadError}</p>
                {:else if SelectedComponent}
                    <SelectedComponent />
                {:else}
                    <p class="status">No preview available.</p>
                {/if}
            </div>

            {#if selectedItem}
                <div class="code-box">
                    <p>Source JSX: <code>{selectedItem.jsxPath}</code></p>
                    <p>Svelte wrapper: <code>{selectedItem.sveltePath}</code></p>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .bridge-gallery {
        display: grid;
        gap: 1rem;
    }

    .gallery-head h2 {
        margin: 0;
        color: #fff;
        font-size: 1.45rem;
    }

    .eyebrow {
        margin: 0 0 0.35rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.68rem;
        color: rgba(255, 255, 255, 0.5);
    }

    .gallery-head p {
        margin: 0.55rem 0 0;
        color: rgba(255, 255, 255, 0.62);
        font-size: 0.9rem;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: 260px minmax(0, 1fr);
        gap: 1rem;
    }

    .list-panel,
    .preview-panel {
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
    }

    .list-head,
    .preview-head {
        padding: 0.7rem 0.9rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        color: #fff;
        font-size: 0.8rem;
    }

    .list-scroll {
        max-height: 460px;
        overflow-y: auto;
        padding: 0.45rem;
    }

    .list-item {
        width: 100%;
        border: none;
        text-align: left;
        color: rgba(255, 255, 255, 0.72);
        background: transparent;
        border-radius: 8px;
        padding: 0.42rem 0.55rem;
        font-size: 0.78rem;
    }

    .list-item:hover {
        background: rgba(255, 255, 255, 0.04);
        color: #fff;
    }

    .list-item.active {
        background: rgba(139, 92, 246, 0.16);
        color: #fff;
    }

    .preview-stage {
        min-height: 340px;
        max-height: 520px;
        overflow: auto;
        padding: 0.8rem;
    }

    .status {
        color: rgba(255, 255, 255, 0.65);
        font-size: 0.84rem;
    }

    .status.error {
        color: #fca5a5;
    }

    .code-box {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding: 0.8rem;
        font-size: 0.74rem;
        color: rgba(255, 255, 255, 0.68);
    }

    .code-box p {
        margin: 0.15rem 0;
    }

    code {
        color: rgba(255, 255, 255, 0.9);
        font-family: "JetBrains Mono", monospace;
    }

    @media (max-width: 980px) {
        .gallery-grid {
            grid-template-columns: 1fr;
        }

        .list-scroll {
            max-height: 220px;
        }
    }
</style>
