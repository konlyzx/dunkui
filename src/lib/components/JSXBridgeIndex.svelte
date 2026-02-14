<script lang="ts">
    import type { JSXBridgeItem } from "$lib/data/jsx-bridge-registry";

    let {
        title,
        description,
        items,
    }: {
        title: string;
        description: string;
        items: JSXBridgeItem[];
    } = $props();
</script>

<section class="index-page">
    <header class="index-head">
        <p class="eyebrow">Library</p>
        <h1>{title}</h1>
        <p>{description}</p>
    </header>

    <div class="items-grid">
        {#each items as item}
            <a href={item.route} class="item-card">
                <span class="item-name">{item.name}</span>
                <span class="item-meta">{item.slug}</span>
            </a>
        {/each}
    </div>
</section>

<style>
    .index-page {
        display: grid;
        gap: 1rem;
    }

    .eyebrow {
        margin: 0 0 0.35rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.68rem;
        color: rgba(255, 255, 255, 0.5);
    }

    .index-head h1 {
        margin: 0;
        color: #fff;
        font-size: 1.9rem;
        letter-spacing: -0.03em;
    }

    .index-head p {
        margin: 0.55rem 0 0;
        color: rgba(255, 255, 255, 0.62);
        font-size: 0.9rem;
    }

    .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.6rem;
    }

    .item-card {
        display: grid;
        gap: 0.35rem;
        padding: 0.75rem;
        border-radius: 10px;
        text-decoration: none;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
        transition: all 0.2s;
    }

    .item-card:hover {
        border-color: rgba(167, 139, 250, 0.45);
        transform: translateY(-1px);
        background: rgba(139, 92, 246, 0.08);
    }

    .item-name {
        font-size: 0.84rem;
        color: #fff;
        font-weight: 600;
    }

    .item-meta {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.5);
        font-family: "JetBrains Mono", monospace;
    }
</style>
