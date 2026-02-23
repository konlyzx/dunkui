<script lang="ts">
    import type { RegistryItem } from "$lib/data/registry";

    let {
        title,
        description,
        items,
    }: {
        title: string;
        description: string;
        items: RegistryItem[];
    } = $props();
</script>

<div class="category-index">
    <h1 class="page-title">{title}</h1>
    <p class="page-desc">{description}</p>

    <div class="items-grid">
        {#each items as item}
            <a href={item.route} class="item-card">
                <div class="item-preview">
                    <span class="item-icon">✦</span>
                </div>
                <span class="item-name">{item.name}</span>
            </a>
        {/each}
    </div>
</div>

<style>
    .category-index {
        padding: 0.5rem 0;
    }

    .page-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 0.5rem;
    }

    .page-desc {
        color: rgba(255, 255, 255, 0.45);
        font-size: 0.9rem;
        margin: 0 0 2rem;
        line-height: 1.6;
    }

    .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.75rem;
    }

    .item-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-decoration: none;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        overflow: hidden;
        transition:
            border-color 0.2s,
            transform 0.2s;
    }

    .item-card:hover {
        border-color: rgba(139, 92, 246, 0.3);
        transform: translateY(-2px);
    }

    .item-preview {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(139, 92, 246, 0.04);
    }

    .item-icon {
        font-size: 1.5rem;
        color: rgba(139, 92, 246, 0.5);
    }

    .item-name {
        font-size: 0.8rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.75);
        padding: 0 0.75rem 0.75rem;
    }
</style>
