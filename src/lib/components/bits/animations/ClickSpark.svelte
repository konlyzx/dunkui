<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let {
        sparkColor = "#fff",
        sparkSize = 10,
        sparkRadius = 15,
        sparkCount = 8,
        duration = 400,
        easing = "ease-out",
        extraScale = 1.0,
        children,
    }: {
        sparkColor?: string;
        sparkSize?: number;
        sparkRadius?: number;
        sparkCount?: number;
        duration?: number;
        easing?: string;
        extraScale?: number;
        children?: import("svelte").Snippet;
    } = $props();

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let sparks: { x: number; y: number; angle: number; startTime: number }[] =
        [];
    let startTime: number | null = null;
    let animationId: number;

    function easeFunc(t: number) {
        switch (easing) {
            case "linear":
                return t;
            case "ease-in":
                return t * t;
            case "ease-in-out":
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default:
                return t * (2 - t); // ease-out
        }
    }

    function draw(timestamp: number) {
        if (!startTime) startTime = timestamp;

        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparks = sparks.filter((spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) return false;

                const progress = elapsed / duration;
                const eased = easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 =
                    spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 =
                    spark.y + (distance + lineLength) * Math.sin(spark.angle);

                if (ctx) {
                    ctx.strokeStyle = sparkColor;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }

                return true;
            });
        }

        animationId = requestAnimationFrame(draw);
    }

    function handleClick(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const now = performance.now();

        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now,
        }));

        sparks.push(...newSparks);
    }

    function handleResize() {
        if (canvas && canvas.parentElement) {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
        handleResize();
        window.addEventListener("resize", handleResize);
        animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    });
</script>

<div class="click-spark-container" onclick={handleClick} aria-hidden="true">
    <!-- Canvas overlay -->
    <canvas bind:this={canvas} class="click-spark-canvas"></canvas>

    <!-- Slot for children content -->
    {@render children?.()}
</div>

<style>
    .click-spark-container {
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer; /* Indicate interaction */
    }

    .click-spark-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; /* Let clicks pass through to container */
        user-select: none;
        z-index: 9999; /* On top of children? Or interact with them? React put it absolute top/left pointer-events-none. */
    }
</style>
