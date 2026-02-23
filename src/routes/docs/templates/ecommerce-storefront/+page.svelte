<script lang="ts">
    import TemplatePage from "$lib/components/TemplatePage.svelte";
    import EcommerceStorefrontTemplate from "$lib/templates/EcommerceStorefrontTemplate.svelte";
    import { templates, findBySlug } from "$lib/data/registry";

    const item = findBySlug(templates, "ecommerce-storefront");
</script>

<svelte:head>
    <title>{item?.name} Template — DunkUI</title>
</svelte:head>

<TemplatePage
    title="Templates"
    backHref="/docs/templates"
    {item}
    imageSrc="/images/ecommerce_store.png"
    cliCommand="npx dunkui add template ecommerce-storefront"
    promptText={`Design an ultra-modern, high-end e-commerce storefront layout.

Aesthetic Guidelines:
- Industrial, sharp dark aesthetic (almost monochrome UI).
- Emphasize high-resolution imagery and 3D product renders.
- Thin borders, tiny monospaced product specs, precise layout.
- Sophisticated hover states (blur reveals, cursor follow elements).

Sections Required:
1. Minimal top nav: Title on left, Cart (3 items) on right with sliding drawer toggle.
2. Large immersive product showcase area featuring a hovering/3D object.
3. Bottom gallery/grid for related futuristic items (shoes, tech, sci-fi props).
4. Right-side checkout panel: Step breakdown (Info > Shipping > Payment) with glowing 'Pay via Biometrics' conceptual button.
5. Overall structure must feel like a concept store display.`}
>
    {#snippet preview()}
        <EcommerceStorefrontTemplate />
    {/snippet}
</TemplatePage>
