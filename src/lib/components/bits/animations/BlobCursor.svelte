<script lang="ts">
    import { onMount } from "svelte";

    let {
        blobType = "circle",
        fillColor = "#32e0ff",
        trailCount = 3,
        sizes = [60, 100, 70],
        innerSizes = [20, 40, 30],
        innerColor = "#ffffff",
        opacities = [0.6, 0.5, 0.4],
        shadowColor = "#00c6ff",
        shadowBlur = 15,
        shadowOffsetX = 5,
        shadowOffsetY = 5,
        filterId = "blob-filter",
        filterStdDeviation = 20,
        filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -10",
        useFilter = true,
        fastSpeed = 0.2,
        slowSpeed = 0.05,
        zIndex = 9999, // default top
    }: {
        blobType?: "circle" | "square";
        fillColor?: string;
        trailCount?: number;
        sizes?: number[];
        innerSizes?: number[];
        innerColor?: string;
        opacities?: number[];
        shadowColor?: string;
        shadowBlur?: number;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
        filterId?: string;
        filterStdDeviation?: number;
        filterColorMatrixValues?: string;
        useFilter?: boolean;
        fastSpeed?: number;
        slowSpeed?: number;
        zIndex?: number;
    } = $props();

    let containerRef: HTMLElement;
    let mouse = { x: 0, y: 0 };
    let blobs = $state(
        Array.from({ length: trailCount }).map(() => ({ x: 0, y: 0 })),
    );

    let animationId: number;

    function update() {
        // Simple lerp for trail effect
        blobs.forEach((blob, i) => {
            // Lead blob follows mouse, others follow?
            // Original code: all blobs follow MOUSE but with different speeds.
            // "isLead ? fastDuration : slowDuration"

            const speed = i === 0 ? fastSpeed : slowSpeed;
            blob.x += (mouse.x - blob.x) * speed;
            blob.y += (mouse.y - blob.y) * speed;
        });
        // Trigger reactivity? Svelte 5 state is granular.
        // Mutating properties of objects in an array might need care if the array itself isn't reassigned?
        // "blobs" is $state. Mutating its elements works.

        animationId = requestAnimationFrame(update);
    }

    function handleMouseMove(e: MouseEvent) {
        // Global or relative?
        // If component is fullscreen overlay, relative is same as global.
        // But let's assume global mouse for cursor.
        // Wait, original component had `onMouseMove` on the container.
        // So it only works when hovering the container.
        // If we want a global cursor, we should listen to window.
        // But let's stick to container to be safe as a component.

        if (!containerRef) return;
        const rect = containerRef.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    onMount(() => {
        // Start loop
        animationId = requestAnimationFrame(update);
        window.addEventListener("mousemove", () => {}); // Just to ensuring event flow?

        // Actually we need to capture mouse position even if not hovering container?
        // If it's a "Cursor" component, it usually implies replacing the cursor.
        // But the React implementation put `onMouseMove` on the div.
        // So it only worked inside the div.

        containerRef.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            containerRef?.removeEventListener("mousemove", handleMouseMove);
        };
    });
</script>

<div
    bind:this={containerRef}
    class="blob-cursor-container"
    style="z-index: {zIndex};"
>
    {#if useFilter}
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;">
            <filter id={filterId}>
                <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation={filterStdDeviation}
                />
                <feColorMatrix in="blur" values={filterColorMatrixValues} />
            </filter>
        </svg>
    {/if}

    <div
        class="blob-main"
        style="filter: {useFilter ? `url(#${filterId})` : 'none'};"
    >
        {#each blobs as blob, i}
            <div
                class="blob"
                style="
                    width: {sizes[i] ?? sizes[0]}px;
                    height: {sizes[i] ?? sizes[0]}px;
                    border-radius: {blobType === 'circle' ? '50%' : '0%'};
                    background-color: {fillColor};
                    opacity: {opacities[i] ?? opacities[0]};
                    box-shadow: {shadowOffsetX}px {shadowOffsetY}px {shadowBlur}px 0 {shadowColor};
                    transform: translate({blob.x -
                    (sizes[i] ?? sizes[0]) / 2}px, {blob.y -
                    (sizes[i] ?? sizes[0]) / 2}px);
                "
            >
                <div
                    class="inner-dot"
                    style="
                        width: {innerSizes[i] ?? innerSizes[0]}px;
                        height: {innerSizes[i] ?? innerSizes[0]}px;
                        top: {(sizes[i] ?? sizes[0]) / 2 -
                        (innerSizes[i] ?? innerSizes[0]) / 2}px;
                        left: {(sizes[i] ?? sizes[0]) / 2 -
                        (innerSizes[i] ?? innerSizes[0]) / 2}px;
                        background-color: {innerColor};
                        border-radius: {blobType === 'circle' ? '50%' : '0%'};
                    "
                ></div>
            </div>
        {/each}
    </div>
</div>

<style>
    .blob-cursor-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: none; /* Hide default cursor */
    }

    .blob-main {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; /* Let clicks pass through */
    }

    .blob {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        will-change: transform;
    }

    .inner-dot {
        position: absolute;
        pointer-events: none;
    }
</style>
