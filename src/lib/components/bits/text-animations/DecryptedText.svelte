<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let {
        text = "Decrypted Text",
        speed = 50,
        maxIterations = 10,
        sequential = false,
        revealDirection = "start",
        useOriginalCharsOnly = false,
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
        className = "",
        parentClassName = "",
        encryptedClassName = "",
        animateOn = "hover", // hover, view, both
    } = $props();

    let scrambledText = $state("");
    let isHovering = $state(false);
    let isScrambling = $state(false);
    let revealedIndices = $state(new Set<number>());
    let hasAnimated = $state(false);
    let containerRef: HTMLElement;
    let interval: any;

    let displayText = $derived(isScrambling || interval ? scrambledText : text);

    // Cleanup on destroy
    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    // Intersection Observer for 'view' animation
    onMount(() => {
        if (animateOn !== "view" && animateOn !== "both") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        isHovering = true;
                        hasAnimated = true;
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (containerRef) observer.observe(containerRef);
        return () => observer.disconnect();
    });

    // Helper: Get next index to reveal
    function getNextIndex(revealedSet: Set<number>) {
        const textLength = text.length;
        switch (revealDirection) {
            case "start":
                return revealedSet.size;
            case "end":
                return textLength - 1 - revealedSet.size;
            case "center": {
                const middle = Math.floor(textLength / 2);
                const offset = Math.floor(revealedSet.size / 2);
                const nextIndex =
                    revealedSet.size % 2 === 0
                        ? middle + offset
                        : middle - offset - 1;

                if (
                    nextIndex >= 0 &&
                    nextIndex < textLength &&
                    !revealedSet.has(nextIndex)
                ) {
                    return nextIndex;
                }

                for (let i = 0; i < textLength; i++) {
                    if (!revealedSet.has(i)) return i;
                }
                return 0;
            }
            default:
                return revealedSet.size;
        }
    }

    // Helper: Shuffle Text
    function shuffleText(originalText: string, currentRevealed: Set<number>) {
        if (useOriginalCharsOnly) {
            const positions = originalText.split("").map((char, i) => ({
                char,
                isSpace: char === " ",
                index: i,
                isRevealed: currentRevealed.has(i),
            }));

            const nonSpaceChars = positions
                .filter((p) => !p.isSpace && !p.isRevealed)
                .map((p) => p.char);

            for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [nonSpaceChars[i], nonSpaceChars[j]] = [
                    nonSpaceChars[j],
                    nonSpaceChars[i],
                ];
            }

            let charIndex = 0;
            return positions
                .map((p) => {
                    if (p.isSpace) return " ";
                    if (p.isRevealed) return originalText[p.index];
                    return nonSpaceChars[charIndex++];
                })
                .join("");
        } else {
            const available = characters.split("");
            return originalText
                .split("")
                .map((char, i) => {
                    if (char === " ") return " ";
                    if (currentRevealed.has(i)) return originalText[i];
                    return available[
                        Math.floor(Math.random() * available.length)
                    ];
                })
                .join("");
        }
    }

    // Scrambling Effect
    $effect(() => {
        if (isHovering) {
            setIsScrambling(true);
            let currentIteration = 0;

            if (interval) clearInterval(interval);

            interval = setInterval(() => {
                let nextRevealed = new Set(revealedIndices);

                if (sequential) {
                    if (nextRevealed.size < text.length) {
                        const nextIndex = getNextIndex(nextRevealed);
                        nextRevealed.add(nextIndex);
                        revealedIndices = nextRevealed; // Update state
                        scrambledText = shuffleText(text, nextRevealed);
                    } else {
                        clearInterval(interval);
                        interval = null;
                        setIsScrambling(false);
                    }
                } else {
                    scrambledText = shuffleText(text, nextRevealed);
                    currentIteration++;
                    if (currentIteration >= maxIterations) {
                        clearInterval(interval);
                        interval = null;
                        setIsScrambling(false);
                    }
                }
            }, speed);
        } else {
            // Reset when not hovering
            revealedIndices = new Set();
            setIsScrambling(false);
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
    });

    function setIsScrambling(val: boolean) {
        isScrambling = val;
    }

    function handleMouseEnter() {
        if (animateOn === "hover" || animateOn === "both") isHovering = true;
    }
    function handleMouseLeave() {
        if (animateOn === "hover" || animateOn === "both") isHovering = false;
    }
</script>

<span
    bind:this={containerRef}
    class={`decrypted-text inline-block whitespace-pre-wrap ${parentClassName}`}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    role="presentation"
>
    <span class="sr-only">{displayText}</span>
    <span aria-hidden="true">
        {#each displayText.split("") as char, index}
            <span
                class={revealedIndices.has(index) ||
                !isScrambling ||
                !isHovering
                    ? className
                    : encryptedClassName}
            >
                {char}
            </span>
        {/each}
    </span>
</span>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>
