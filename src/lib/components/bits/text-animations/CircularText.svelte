<script lang="ts">
    import { onMount } from "svelte";

    let {
        text = "CIRCULAR TEXT",
        spinDuration = 20,
        onHover = "speedUp", // speedUp, slowDown, pause, goBonkers
        className = "",
    } = $props();

    let letters = $derived(Array.from(text));
    let currentSpeed = $state(spinDuration);
    let scale = $state(1);

    $effect(() => {
        currentSpeed = spinDuration;
    });

    function handleMouseEnter() {
        if (!onHover) return;

        switch (onHover) {
            case "slowDown":
                currentSpeed = spinDuration * 2;
                break;
            case "speedUp":
                currentSpeed = spinDuration / 4;
                break;
            case "pause":
                currentSpeed = 0; // effectively pause by massive duration or distinct logic, here we just stop
                break;
            case "goBonkers":
                currentSpeed = spinDuration / 20;
                scale = 0.8;
                break;
            default:
                currentSpeed = spinDuration;
        }
    }

    function handleMouseLeave() {
        currentSpeed = spinDuration;
        scale = 1;
    }
</script>

<div
    class={`circular-text ${className}`}
    style={`
    --spin-duration: ${currentSpeed}s; 
    --scale: ${scale};
    animation-play-state: ${onHover === "pause" && currentSpeed === 0 ? "paused" : "running"};
  `}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    role="presentation"
>
    <div class="spinner">
        {#each letters as letter, i}
            {@const rotation = (360 / letters.length) * i}
            <span
                style={`transform: rotate(${rotation}deg) translate(80px) rotate(-90deg);`}
            >
                {letter}
            </span>
        {/each}
    </div>
</div>

<style>
    .circular-text {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        border-radius: 50%;

        font-weight: 900;
        color: #fff;
        cursor: pointer;
        transition: transform 0.5s cubic-bezier(0, 0, 0, 1);
        transform: scale(var(--scale, 1));
    }

    .spinner {
        position: absolute;
        inset: 0;
        animation: spin var(--spin-duration) linear infinite;
    }

    .circular-text span {
        position: absolute;
        top: 50%;
        left: 50%;
        /* Initialize at center */
        display: inline-block;
        transform-origin: 0 0;
        /* The translation pushes it out to radius. We handle the math in style prop. 
       Note: The React version calculated x/y explicitly. 
       Here we use rotate + translate for simpler CSS.
       Wait, React version used: rotateZ(deg) translate3d(x, y, 0).
       Let's stick to the React logic's visual result but simpler CSS if possible.
       Actually, rotating from center then translating out is cleaner.
    */
        width: 20px; /* approx char width to center */
        text-align: center;
        font-size: 24px;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
