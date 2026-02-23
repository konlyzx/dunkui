<script lang="ts">
    import TemplatePage from "$lib/components/TemplatePage.svelte";
    import CreatorPortfolioTemplate from "$lib/templates/CreatorPortfolioTemplate.svelte";
    import { templates, findBySlug } from "$lib/data/registry";

    const item = findBySlug(templates, "creator-portfolio");
</script>

<svelte:head>
    <title>{item?.name} Template — DunkUI</title>
</svelte:head>

<TemplatePage
    title="Templates"
    backHref="/docs/templates"
    {item}
    imageSrc="/images/creator_portfolio.png"
    cliCommand="npx dunkui add template creator-portfolio"
    promptText={`Create a stunning, highly creative personal portfolio website for a developer or designer.

Aesthetic Guidelines:
- Avant-garde, dark theme minimalism
- Giant interactive elegant typography (No more than 3-4 sections per scroll)
- 3D WebGL fluid backgrounds or particle emitters.
- Extreme whitespace. Let the work breathe.
- High contrast, monochromatic elements except for the work itself.

Sections Required:
1. Animated intro loader (e.g. counting up)
2. Hero section: Massive name, scrolling marquees, fluid background animation that reacts to mouse.
3. Selected Work: Hover-revealing images, huge typography titles, distorting meshes.
4. About / Philosophy. Dark and quiet layout.
5. Large "Let's connect / Contact" footer area with big email link.`}
>
    {#snippet preview()}
        <CreatorPortfolioTemplate />
    {/snippet}
</TemplatePage>
