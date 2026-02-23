<script lang="ts">
    import { onMount } from "svelte";

    let {
        text = "",
        disabled = false,
        speed = 2,
        className = "",
        color = "#b5b5b5",
        shineColor = "#ffffff",
        spread = 120,
        yoyo = false,
        pauseOnHover = false,
        direction = "left",
        delay = 0,
    } = $props();

    let element: HTMLElement;
    let animationId: number;
    let progress = $state(0);
    let isPaused = $state(false);
    let lastTime: number | null = null;
    let elapsed = 0;

    // Convert speed to ms
    let animationDuration = $derived(speed * 1000);
    let delayDuration = $derived(delay * 1000);

    // Direction state to handle reversing in yoyo mode logic easier or just use math
    // Original logic used a ref to track direction for yoyo.
    let animationDirection = 1; // 1 for forward, -1 for backward

    function animate(time: number) {
        if (disabled || isPaused) {
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

        // Logic from React component
        if (yoyo) {
            const cycleDuration = animationDuration + delayDuration;
            const fullCycle = cycleDuration * 2;
            const cycleTime = elapsed % fullCycle;

            if (cycleTime < animationDuration) {
                // Forward: 0 -> 100
                const p = (cycleTime / animationDuration) * 100;
                progress = animationDirection === 1 ? p : 100 - p;
            } else if (cycleTime < cycleDuration) {
                // Delay at end
                progress = animationDirection === 1 ? 100 : 0;
            } else if (cycleTime < cycleDuration + animationDuration) {
                // Reverse: 100 -> 0 (technically forward in time, but mapping back)
                const reverseTime = cycleTime - cycleDuration;
                const p = 100 - (reverseTime / animationDuration) * 100;
                progress = animationDirection === 1 ? p : 100 - p;
            } else {
                // Delay at start
                progress = animationDirection === 1 ? 0 : 100;
            }
        } else {
            const cycleDuration = animationDuration + delayDuration;
            const cycleTime = elapsed % cycleDuration;

            if (cycleTime < animationDuration) {
                const p = (cycleTime / animationDuration) * 100;
                progress = animationDirection === 1 ? p : 100 - p;
            } else {
                progress = animationDirection === 1 ? 100 : 0;
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    onMount(() => {
        // Reset direction based on prop
        animationDirection = direction === "left" ? 1 : -1;
        elapsed = 0;

        animationId = requestAnimationFrame(animate);

        return () => {
            if (typeof cancelAnimationFrame !== "undefined") {
                cancelAnimationFrame(animationId);
            }
        };
    });

    $effect(() => {
        // If direction prop changes
        animationDirection = direction === "left" ? 1 : -1;
        // simple reset logic could go here if needed, but the loop handles it
    });

    // Calculate background position
    let backgroundPosition = $derived(`${150 - progress * 2}% center`);

    function handleMouseEnter() {
        if (pauseOnHover) isPaused = true;
    }

    function handleMouseLeave() {
        if (pauseOnHover) isPaused = false;
    }
</script>

<div
    bind:this={element}
    class={`shiny-text ${className}`}
    style={`
    background-image: linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: ${backgroundPosition};
  `}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    role="banner"
>
    {text}
</div>

<style>
    .shiny-text {
        display: inline-block;
    }
</style>
