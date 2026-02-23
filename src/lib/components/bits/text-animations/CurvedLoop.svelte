<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let {
        marqueeText = "CURVED LOOP TEXT",
        speed = 2,
        className = "",
        curveAmount = 400,
        direction = "left",
        interactive = true,
    } = $props();

    let textPath: SVGTextPathElement;
    let measureText: SVGTextElement;
    let animationId: number;

    let spacing = $state(0);
    let offset = $state(0);

    // Drag state
    let isDragging = false;
    let lastX = 0;
    let dragDirection = direction;
    let velocity = 0;

    // Compute clean text without trailing spaces
    let cleanText = $derived(marqueeText.trim() + "\u00A0");

    let textLength = $derived(spacing);

    let totalText = $derived.by(() => {
        if (!textLength) return cleanText;
        const copies = Math.ceil(1800 / textLength) + 2;
        return Array(copies).fill(cleanText).join("");
    });

    let ready = $derived(spacing > 0);

    // Path definition
    let pathD = $derived(`M-100,40 Q500,${40 + curveAmount} 1540,40`);
    const pathId = "curve-path-" + Math.random().toString(36).substr(2, 9);

    onMount(() => {
        // Measure text width
        if (measureText) {
            spacing = measureText.getComputedTextLength();
            if (spacing === 0 && cleanText.length > 0) {
                spacing = cleanText.length * 40; // Fallback estimate
            }
        }

        // Set initial offset
        offset = -spacing;

        // Animation Loop
        const loop = () => {
            if (!textPath || !ready) {
                animationId = requestAnimationFrame(loop);
                return;
            }

            if (!isDragging) {
                const delta = dragDirection === "right" ? speed : -speed;
                let newOffset = offset + delta;

                const wrapPoint = spacing;
                if (newOffset <= -wrapPoint) newOffset += wrapPoint;
                if (newOffset > 0) newOffset -= wrapPoint;

                offset = newOffset;
            }

            animationId = requestAnimationFrame(loop);
        };

        animationId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationId);
    });

    function onPointerDown(e: PointerEvent) {
        if (!interactive) return;
        isDragging = true;
        lastX = e.clientX;
        velocity = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
        if (!interactive || !isDragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        velocity = dx;

        let newOffset = offset + dx;
        const wrapPoint = spacing;

        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        offset = newOffset;
    }

    function onPointerUp(e: PointerEvent) {
        if (!interactive) return;
        isDragging = false;
        dragDirection = velocity > 0 ? "right" : "left";
    }
</script>

<div
    class="curved-loop-jacket"
    style={`visibility: ${ready ? "visible" : "hidden"}; cursor: ${interactive ? (isDragging ? "grabbing" : "grab") : "auto"};`}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointerleave={onPointerUp}
>
    <svg class="curved-loop-svg" viewBox={`0 0 1440 ${curveAmount + 100}`}>
        <!-- Hidden text for measuring -->
        <text
            bind:this={measureText}
            xml:space="preserve"
            style="visibility: hidden; opacity: 0; pointer-events: none;"
        >
            {cleanText}
        </text>

        <defs>
            <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {#if ready}
            <text font-weight="bold" xml:space="preserve" class={className}>
                <textPath
                    bind:this={textPath}
                    href={`#${pathId}`}
                    startOffset={offset + "px"}
                    xml:space="preserve"
                >
                    {totalText}
                </textPath>
            </text>
        {/if}
    </svg>
</div>

<style>
    .curved-loop-jacket {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        overflow: hidden;
    }

    .curved-loop-svg {
        user-select: none;
        width: 100%;
        aspect-ratio: 100 / 12;
        overflow: visible;
        display: block;
        font-size: 6rem;
        fill: #ffffff;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 1;
    }
</style>
