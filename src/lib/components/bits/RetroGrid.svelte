<script lang="ts">
    let {
        lineColor = "#8b5cf6",
        speed = 1,
        perspective = 700,
        fade = true,
        class: className = "",
    }: {
        lineColor?: string;
        speed?: number;
        perspective?: number;
        fade?: boolean;
        class?: string;
    } = $props();

    const hLines = Array.from({ length: 11 }, (_, i) => i);
    const vLines = Array.from({ length: 16 }, (_, i) => i);
</script>

<div
    class={`retro-wrap ${className}`}
    style={`--line:${lineColor};--speed:${speed};--perspective:${perspective}px;`}
>
    <div class="horizon"></div>
    <div class={`grid ${fade ? "fade" : ""}`}>
        {#each hLines as i}
            <span class="line-h" style={`--i:${i};`}></span>
        {/each}
        {#each vLines as i}
            <span class="line-v" style={`--i:${i};`}></span>
        {/each}
    </div>
    <div class="sun"></div>
</div>

<style>
    .retro-wrap {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background: linear-gradient(180deg, #080515, #120926 45%, #090312);
        perspective: var(--perspective);
    }

    .horizon {
        position: absolute;
        left: 0;
        right: 0;
        top: 42%;
        height: 1px;
        background: color-mix(in srgb, var(--line) 65%, transparent);
        box-shadow: 0 0 20px color-mix(in srgb, var(--line) 65%, transparent);
    }

    .grid {
        position: absolute;
        left: -12%;
        right: -12%;
        bottom: -42%;
        top: 42%;
        transform-style: preserve-3d;
        transform: rotateX(74deg);
        animation: move-grid calc(4.5s / var(--speed)) linear infinite;
    }

    .grid.fade::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, transparent, #120926 78%);
        pointer-events: none;
    }

    .line-h,
    .line-v {
        position: absolute;
        background: color-mix(in srgb, var(--line) 45%, transparent);
    }

    .line-h {
        left: 0;
        right: 0;
        height: 1px;
        bottom: calc(var(--i) * 9%);
    }

    .line-v {
        top: 0;
        bottom: 0;
        width: 1px;
        left: calc(var(--i) * 6.66%);
    }

    .sun {
        position: absolute;
        top: 18%;
        left: 50%;
        translate: -50% 0;
        width: 180px;
        height: 180px;
        border-radius: 999px;
        background: radial-gradient(circle at 50% 40%, #fb7185, #f97316 48%, transparent 70%);
        filter: blur(1px);
        opacity: 0.9;
    }

    @keyframes move-grid {
        from {
            transform: rotateX(74deg) translateY(0%);
        }
        to {
            transform: rotateX(74deg) translateY(9%);
        }
    }
</style>
