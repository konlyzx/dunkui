<script lang="ts">
    let {
        speed = 0.8,
        intensity = 1.2,
        blur = 40,
        colors = ["#8b5cf6", "#38bdf8", "#f43f5e"] as [string, string, string],
        class: className = "",
    }: {
        speed?: number;
        intensity?: number;
        blur?: number;
        colors?: [string, string, string];
        class?: string;
    } = $props();
</script>

<div
    class={`aurora ${className}`}
    style={`--speed:${speed};--intensity:${intensity};--blur:${blur}px;--c1:${colors[0]};--c2:${colors[1]};--c3:${colors[2]};`}
>
    <div class="wave one"></div>
    <div class="wave two"></div>
    <div class="wave three"></div>
</div>

<style>
    .aurora {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background: radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.08), transparent 50%),
            linear-gradient(180deg, #04020a, #0a0620 50%, #04020a);
    }

    .wave {
        position: absolute;
        width: 150%;
        height: 58%;
        left: -25%;
        border-radius: 0 0 50% 50%;
        filter: blur(var(--blur));
        opacity: calc(0.25 * var(--intensity));
        will-change: transform;
    }

    .one {
        top: -10%;
        background: linear-gradient(90deg, color-mix(in srgb, var(--c1) 30%, transparent), color-mix(in srgb, var(--c2) 45%, transparent), color-mix(in srgb, var(--c1) 30%, transparent));
        animation: float calc(10s / var(--speed)) ease-in-out infinite;
    }

    .two {
        top: 14%;
        background: linear-gradient(90deg, color-mix(in srgb, var(--c2) 30%, transparent), color-mix(in srgb, var(--c3) 45%, transparent), color-mix(in srgb, var(--c2) 30%, transparent));
        animation: float calc(12s / var(--speed)) ease-in-out infinite reverse;
    }

    .three {
        top: 34%;
        background: linear-gradient(90deg, color-mix(in srgb, var(--c3) 30%, transparent), color-mix(in srgb, var(--c1) 45%, transparent), color-mix(in srgb, var(--c3) 30%, transparent));
        animation: float calc(14s / var(--speed)) ease-in-out infinite;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-8%) rotate(2deg);
        }
    }
</style>
