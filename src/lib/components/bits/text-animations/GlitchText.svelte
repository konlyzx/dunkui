<script lang="ts">
    type GlitchColors = [string, string] | [string, string, string];

    let {
        text = "DUNKUI",
        intensity = 1.5,
        speed = 2,
        colors = ["#f43f5e", "#38bdf8"] as GlitchColors,
        as = "span",
        class: className = "",
    }: {
        text?: string;
        intensity?: number;
        speed?: number;
        colors?: GlitchColors;
        as?: "span" | "h1" | "h2" | "p";
        class?: string;
    } = $props();

    const c1 = $derived(colors[0] ?? "#f43f5e");
    const c2 = $derived(colors[1] ?? "#38bdf8");
</script>

<svelte:element
    this={as}
    class={`glitch ${className}`}
    data-text={text}
    style={`--i:${intensity};--dur:${speed}s;--c1:${c1};--c2:${c2};`}
>
    {text}
</svelte:element>

<style>
    .glitch {
        position: relative;
        display: inline-block;
        color: white;
        font-weight: 700;
        letter-spacing: -0.02em;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
    }

    .glitch::before,
    .glitch::after {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        pointer-events: none;
        mix-blend-mode: screen;
    }

    .glitch::before {
        color: var(--c1);
        transform: translate(calc(var(--i) * -1px), 0);
        clip-path: polygon(0 5%, 100% 0, 100% 48%, 0 55%);
        animation: glitch-shift var(--dur) infinite linear alternate;
    }

    .glitch::after {
        color: var(--c2);
        transform: translate(calc(var(--i) * 1px), 0);
        clip-path: polygon(0 52%, 100% 46%, 100% 100%, 0 100%);
        animation: glitch-shift calc(var(--dur) * 0.7) infinite linear reverse;
    }

    @keyframes glitch-shift {
        0% {
            transform: translate(calc(var(--i) * -1px), 0);
        }
        25% {
            transform: translate(calc(var(--i) * 1px), -1px);
        }
        50% {
            transform: translate(calc(var(--i) * -0.5px), 1px);
        }
        75% {
            transform: translate(calc(var(--i) * 1.2px), -0.5px);
        }
        100% {
            transform: translate(calc(var(--i) * -1px), 0);
        }
    }
</style>
