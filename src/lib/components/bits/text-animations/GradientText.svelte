<script lang="ts">
    import { onMount } from "svelte";

    let {
        children,
        className = "",
        colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
        animationSpeed = 8,
        showBorder = false,
        direction = "horizontal", // horizontal | vertical | diagonal
        pauseOnHover = false,
        yoyo = true,
    } = $props();

    let animationId: number;
    let progress = $state(0);
    let isPaused = $state(false);
    let lastTime: number | null = null;
    let elapsed = 0;

    let animationDuration = $derived(animationSpeed * 1000);

    function animate(time: number) {
        if (isPaused) {
            lastTime = null;
            animationId = requestAnimationFrame(animate);
            return;
        }

        if (lastTime === null) {
            lastTime = time;
            animationId = requestAnimationFrame(animate);
            return;
        }

        const deltaTime = time - lastTime;
        lastTime = time;
        elapsed += deltaTime;

        if (yoyo) {
            const fullCycle = animationDuration * 2;
            const cycleTime = elapsed % fullCycle;

            if (cycleTime < animationDuration) {
                progress = (cycleTime / animationDuration) * 100;
            } else {
                progress =
                    100 -
                    ((cycleTime - animationDuration) / animationDuration) * 100;
            }
        } else {
            progress = ((elapsed / animationDuration) * 100) % 100;
        }

        animationId = requestAnimationFrame(animate);
    }

    onMount(() => {
        elapsed = 0;
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    });

    let gradientAngle = $derived(
        direction === "horizontal"
            ? "to right"
            : direction === "vertical"
              ? "to bottom"
              : "to bottom right",
    );

    let gradientColors = $derived([...colors, colors[0]].join(", "));

    let backgroundSize = $derived(
        direction === "horizontal"
            ? "300% 100%"
            : direction === "vertical"
              ? "100% 300%"
              : "300% 300%",
    );

    let backgroundPosition = $derived.by(() => {
        if (direction === "horizontal") {
            return `${progress}% 50%`;
        } else if (direction === "vertical") {
            return `50% ${progress}%`;
        } else {
            return `${progress}% 50%`;
        }
    });

    // Base styles shared between overlay and text
    let gradientStyle = $derived(`
    background-image: linear-gradient(${gradientAngle}, ${gradientColors});
    background-size: ${backgroundSize};
    background-repeat: repeat;
    background-position: ${backgroundPosition};
  `);
</script>

<div
    class={`animated-gradient-text ${showBorder ? "with-border" : ""} ${className}`}
    onmouseenter={() => pauseOnHover && (isPaused = true)}
    onmouseleave={() => pauseOnHover && (isPaused = false)}
    role="presentation"
>
    {#if showBorder}
        <div class="gradient-overlay" style={gradientStyle}></div>
    {/if}
    <div class="text-content" style={gradientStyle}>
        {@render children?.()}
    </div>
</div>

<style>
    .animated-gradient-text {
        position: relative;
        margin: 0 auto;
        display: flex;
        max-width: fit-content;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 1.25rem;
        font-weight: 500;
        backdrop-filter: blur(10px);
        transition: box-shadow 0.5s ease-out;
        overflow: hidden;
        cursor: pointer;
    }

    .animated-gradient-text.with-border {
        padding: 0.35rem 0.75rem;
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        z-index: 0;
        pointer-events: none;
    }

    /* Inner mask for border effect */
    .gradient-overlay::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: inherit;
        background-color: #060010; /* Dark background matches component theme */
        z-index: -1;
    }

    .text-content {
        display: inline-block;
        position: relative;
        z-index: 2;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
</style>
