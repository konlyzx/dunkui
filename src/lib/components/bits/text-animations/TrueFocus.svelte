<script lang="ts">
    import { onMount } from "svelte";
    import { spring } from "svelte/motion";

    let {
        sentence = "True Focus",
        manualMode = false,
        blurAmount = 5,
        borderColor = "green",
        glowColor = "rgba(0, 255, 0, 0.6)",
        animationDuration = 0.5,
        pauseBetweenAnimations = 1,
    } = $props();

    let words = $derived(sentence.split(" "));
    let currentIndex = $state(0);
    let lastActiveIndex = $state(0);
    let containerRef: HTMLElement;
    let wordRefs: (HTMLElement | null)[] = [];

    // Spring animation for the focus frame
    let focusRect = spring(
        { x: 0, y: 0, width: 0, height: 0 },
        {
            stiffness: 0.1, // approximates the ease transition
            damping: 0.25,
        },
    );

    // Auto-switch effect (non-manual mode)
    $effect(() => {
        if (!manualMode) {
            const interval = setInterval(
                () => {
                    currentIndex = (currentIndex + 1) % words.length;
                },
                (animationDuration + pauseBetweenAnimations) * 1000,
            );
            return () => clearInterval(interval);
        }
    });

    // Calculate focus rect when currentIndex changes
    $effect(() => {
        if (currentIndex === null || currentIndex === -1 || !containerRef)
            return;

        const activeWord = wordRefs[currentIndex];
        if (activeWord) {
            const parentRect = containerRef.getBoundingClientRect();
            const activeRect = activeWord.getBoundingClientRect();

            focusRect.set({
                x: activeRect.left - parentRect.left,
                y: activeRect.top - parentRect.top,
                width: activeRect.width,
                height: activeRect.height,
            });
        }
    });

    function handleMouseEnter(index: number) {
        if (manualMode) {
            lastActiveIndex = index;
            currentIndex = index;
        }
    }

    function handleMouseLeave() {
        if (manualMode) {
            currentIndex = lastActiveIndex;
        }
    }
</script>

<div bind:this={containerRef} class="focus-container">
    {#each words as word, index}
        <span
            bind:this={wordRefs[index]}
            class={`focus-word ${manualMode ? "manual" : ""} ${index === currentIndex && !manualMode ? "active" : ""}`}
            style="
        filter: {currentIndex === index
                ? 'blur(0px)'
                : `blur(${blurAmount}px)`};
        --border-color: {borderColor};
        --glow-color: {glowColor};
        transition: filter {animationDuration}s ease;
      "
            onmouseenter={() => handleMouseEnter(index)}
            onmouseleave={handleMouseLeave}
            role="button"
            tabindex="0"
        >
            {word}
        </span>
    {/each}

    <div
        class="focus-frame"
        style="
      transform: translate({$focusRect.x}px, {$focusRect.y}px);
      width: {$focusRect.width}px;
      height: {$focusRect.height}px;
      opacity: {currentIndex >= 0 ? 1 : 0};
      --border-color: {borderColor};
      --glow-color: {glowColor};
    "
    >
        <span class="corner top-left"></span>
        <span class="corner top-right"></span>
        <span class="corner bottom-left"></span>
        <span class="corner bottom-right"></span>
    </div>
</div>

<style>
    .focus-container {
        position: relative;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 2rem;
    }

    .focus-word {
        position: relative;
        font-size: 2rem;
        font-weight: 800;
        color: #fff;
        cursor: pointer;
        z-index: 1;
    }

    .focus-frame {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 0;
        transition:
            width 0.3s ease,
            height 0.3s ease,
            opacity 0.3s ease;
        /* The transform is spring-driven, but width/height we can allow spring or css. 
       Use spring for all for smoothness, but I bound width/height to spring too.
    */
    }

    .corner {
        position: absolute;
        width: 10px;
        height: 10px;
        border: 2px solid var(--border-color, green);
        box-shadow: 0 0 10px var(--glow-color, rgba(0, 255, 0, 0.6));
    }

    .top-left {
        top: -5px;
        left: -5px;
        border-right: 0;
        border-bottom: 0;
    }
    .top-right {
        top: -5px;
        right: -5px;
        border-left: 0;
        border-bottom: 0;
    }
    .bottom-left {
        bottom: -5px;
        left: -5px;
        border-right: 0;
        border-top: 0;
    }
    .bottom-right {
        bottom: -5px;
        right: -5px;
        border-left: 0;
        border-top: 0;
    }
</style>
