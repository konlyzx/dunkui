<script lang="ts">
    import { page } from "$app/stores";
    import ComponentPage from "$lib/components/ComponentPage.svelte";
    import { textAnimations } from "$lib/data/registry";

    // Import all text animation components
    import ShinyText from "$lib/components/bits/text-animations/ShinyText.svelte";
    import GradientText from "$lib/components/bits/text-animations/GradientText.svelte";
    import CircularText from "$lib/components/bits/text-animations/CircularText.svelte";
    import CurvedLoop from "$lib/components/bits/text-animations/CurvedLoop.svelte";
    import GlitchText from "$lib/components/bits/text-animations/GlitchText.svelte";
    import BlurText from "$lib/components/bits/text-animations/BlurText.svelte";
    import DecryptedText from "$lib/components/bits/text-animations/DecryptedText.svelte";
    import TrueFocus from "$lib/components/bits/text-animations/TrueFocus.svelte";
    import VariableProximity from "$lib/components/bits/text-animations/VariableProximity.svelte";
    import TextPressure from "$lib/components/bits/text-animations/TextPressure.svelte";
    import ASCIIText from "$lib/components/bits/text-animations/ASCIIText.svelte";
    import ReactLoader from "$lib/components/ReactLoader.svelte";

    let slug = $derived($page.params.slug);
    let item = $derived(textAnimations.find((x) => x.slug === slug));
</script>

<svelte:head>
    <title>{item?.name ?? "Text Animation"} — Text Animations</title>
</svelte:head>

{#snippet preview()}
    <div class="preview-wrapper">
        {#if slug === "shiny-text"}
            <ShinyText text="Just some shiny text!" speed={3} />
        {:else if slug === "gradient-text"}
            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
            >
                Add a splash of color!
            </GradientText>
        {:else if slug === "circular-text"}
            <CircularText
                text="REACT*BITS*SVELTE*NATIVE*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
            />
        {:else if slug === "curved-loop"}
            <CurvedLoop marqueeText="DUNK UI - SVELTE NATIVE - " />
        {:else if slug === "glitch-text"}
            <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={true}
                className="custom-class"
            >
                SYSTEM FAILURE
            </GlitchText>
        {:else if slug === "blur-text"}
            <BlurText text="Blurry Reveal Animation" delay={150} />
        {:else if slug === "decrypted-text"}
            <DecryptedText
                text="Hover to Decrypt"
                speed={70}
                animateOn="view"
            />
        {:else if slug === "true-focus"}
            <TrueFocus sentence="True Focus Effect" manualMode={false} />
        {:else if slug === "variable-proximity"}
            <VariableProximity
                label="Variable Proximity Effect"
                style="font-size: 3rem;"
            />
        {:else if slug === "text-pressure"}
            <TextPressure
                text="PRESSURE"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
            />
        {:else if slug === "ascii-text"}
            <ASCIIText text="ASCII" enableWaves={true} asciiFontSize={8} />
        {:else}
            <ReactLoader {slug} category="text-animations" />
        {/if}
    </div>
{/snippet}

<ComponentPage
    title="Text Animations"
    {item}
    backHref="/docs/text-animations"
    component={preview}
/>

<style>
    .preview-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        min-height: 300px;
        position: relative;
        background-color: #060010; /* Match existing dark theme */
    }
</style>
