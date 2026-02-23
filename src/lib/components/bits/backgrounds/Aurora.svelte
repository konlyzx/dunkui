<script lang="ts">
    import { cn } from "$lib/utils";

    let {
        colorStops = ["#00d2ff", "#3a7bd5", "#00d2ff"],
        speed = 0.5,
        amplitude = 1.0,
        class: className,
        children,
    }: {
        colorStops?: string[];
        speed?: number;
        amplitude?: number;
        class?: string;
        children?: import("svelte").Snippet;
    } = $props();
</script>

<div class={cn("aurora-container", className)}>
    <div class="aurora-content">
        {#each Array.from({ length: 3 }) as _, i}
            <div
                class="aurora-beam"
                style="
                    --beam-index: {i};
                    --beam-color: {colorStops[i % colorStops.length]};
                    --beam-speed: {speed};
                    --beam-amplitude: {amplitude};
                "
            ></div>
        {/each}
        <div class="aurora-overlay"></div>
    </div>
    <!-- Slot for content to sit on top of background -->
    <div class="relative z-10 w-full h-full">
        {@render children?.()}
    </div>
</div>

<style>
    .aurora-container {
        position: relative;
        width: 100%;
        height: 100%;
        background: #000;
        overflow: hidden;
    }

    .aurora-content {
        position: absolute;
        inset: 0;
        filter: blur(60px);
        opacity: 0.5;
        z-index: 0;
    }

    .aurora-beam {
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: radial-gradient(
            ellipse at center,
            var(--beam-color) 0%,
            transparent 70%
        );
        mix-blend-mode: screen;
        animation: drift calc(10s / var(--beam-speed)) infinite alternate
            ease-in-out;
        transform-origin: center;
    }

    .aurora-beam:nth-child(1) {
        animation-delay: -5s;
    }
    .aurora-beam:nth-child(2) {
        animation-delay: -2s;
        animation-direction: alternate-reverse;
    }
    .aurora-beam:nth-child(3) {
        animation-delay: 0s;
    }

    @keyframes drift {
        0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
        }
        100% {
            transform: rotate(10deg) scale(1.2);
            opacity: 0.8;
        }
    }

    .aurora-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, transparent 0%, #000 90%);
        pointer-events: none;
    }
</style>
