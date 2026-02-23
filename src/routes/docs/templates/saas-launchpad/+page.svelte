<script lang="ts">
    import TemplatePage from "$lib/components/TemplatePage.svelte";
    import SaasLaunchpadTemplate from "$lib/templates/SaasLaunchpadTemplate.svelte";
    import { templates, findBySlug } from "$lib/data/registry";

    const item = findBySlug(templates, "saas-launchpad");
</script>

<svelte:head>
    <title>{item?.name} Template — DunkUI</title>
</svelte:head>

<TemplatePage
    title="Templates"
    backHref="/docs/templates"
    {item}
    imageSrc="/images/saas_launchpad.png"
    cliCommand="npx dunkui add template saas-launchpad"
    promptText={`Create a stunning, modern SaaS landing page.

Aesthetic Guidelines:
- Premium dark mode styling
- Vibrant glowing gradients (purple, magenta, cyan combinations)
- Sleek glassmorphism elements over subtle noise backgrounds
- Clean, Apple-like typography (Inter or SF Pro)
- Smooth micro-animations

Sections Required:
1. Floating glass navbar with glowing 'Get Started' button
2. Hero section: "Unleash Your Productivity. Powered by AI."
   - Large glowing title, animated subtle background mesh
3. Features: Beautiful bento grid displaying abstract features
   - Rounded corners, semi-transparent borders
4. Pricing & Testimonials carousel
5. Simple elegant footer`}
>
    {#snippet preview()}
        <SaasLaunchpadTemplate />
    {/snippet}
</TemplatePage>
