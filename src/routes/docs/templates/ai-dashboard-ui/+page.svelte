<script lang="ts">
    import TemplatePage from "$lib/components/TemplatePage.svelte";
    import AiDashboardUiTemplate from "$lib/templates/AiDashboardUiTemplate.svelte";
    import { templates, findBySlug } from "$lib/data/registry";

    const item = findBySlug(templates, "ai-dashboard-ui");
</script>

<svelte:head>
    <title>{item?.name} Template — DunkUI</title>
</svelte:head>

<TemplatePage
    title="Templates"
    backHref="/docs/templates"
    {item}
    imageSrc="/images/ai_dashboard.png"
    cliCommand="npx dunkui add template ai-dashboard-ui"
    promptText={`Develop a Next-Gen AI application dashboard interface.

Aesthetic Guidelines:
- Technical dark mode (deep blues and dark slate grays)
- Sleek and professional typography.
- Neon cyan, chartreuse, and amethyst accents for data points.
- Complex layout with high data density but breathable spacing.

Sections Required:
1. Left vertical sidebar for navigation, multi-level dropdowns, profile.
2. Top bar with global search, notifications, environment switcher.
3. Main data visualization area displaying real-time graphs (Network nodes, heatmaps, scatter plot variants).
4. A sticky "Ask the AI" glowing prompt box at the bottom containing natural language input with 'sparkle' icons.
5. Secondary floating right panel for context-aware settings.`}
>
    {#snippet preview()}
        <AiDashboardUiTemplate />
    {/snippet}
</TemplatePage>
