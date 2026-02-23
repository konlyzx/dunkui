<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let {
        text = "Compressa",
        fontFamily = "Compressa VF",
        fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
        width = true,
        weight = true,
        italic = true,
        alpha = false,
        flex = true,
        stroke = false,
        scale = false,
        textColor = "#FFFFFF",
        strokeColor = "#FF0000",
        className = "",
        minFontSize = 24,
    } = $props();

    let containerRef: HTMLElement;
    let titleRef: HTMLElement;
    let spansRef: (HTMLElement | null)[] = [];
    let mouse = { x: 0, y: 0 };
    let cursor = { x: 0, y: 0 };
    let fontSize = $state(minFontSize);
    let scaleY = $state(1);
    let lineHeight = $state(1);
    let chars = $derived(text.split(""));

    let rafId: number;
    let resizeId: any;

    function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function getAttr(
        distance: number,
        maxDist: number,
        minVal: number,
        maxVal: number,
    ) {
        const val = maxVal - Math.abs((maxVal * distance) / maxDist);
        return Math.max(minVal, val + minVal);
    }

    function animate() {
        mouse.x += (cursor.x - mouse.x) / 15;
        mouse.y += (cursor.y - mouse.y) / 15;

        if (titleRef && containerRef) {
            const titleRect = titleRef.getBoundingClientRect();
            const maxDist = titleRect.width / 2;

            spansRef.forEach((span) => {
                if (!span) return;
                const rect = span.getBoundingClientRect();
                const charCenter = {
                    x: rect.left + rect.width / 2, // Use left/top relative to viewport for mouse comparison
                    y: rect.top + rect.height / 2,
                };

                // Mouse coords are clientX/Y (viewport)
                const d = dist(mouse, charCenter);

                const wdth = width
                    ? Math.floor(getAttr(d, maxDist, 5, 200))
                    : 100;
                const wght = weight
                    ? Math.floor(getAttr(d, maxDist, 100, 900))
                    : 400;
                const italVal = italic
                    ? getAttr(d, maxDist, 0, 1).toFixed(2)
                    : 0;
                const alphaVal = alpha
                    ? getAttr(d, maxDist, 0, 1).toFixed(2)
                    : 1;

                const newSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

                if (span.style.fontVariationSettings !== newSettings) {
                    span.style.fontVariationSettings = newSettings;
                }
                if (alpha && span.style.opacity !== alphaVal.toString()) {
                    span.style.opacity = alphaVal.toString();
                }
            });
        }

        rafId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    }

    function setSize() {
        if (!containerRef || !titleRef) return;
        const { width: containerW, height: containerH } =
            containerRef.getBoundingClientRect();

        let newFontSize = containerW / (chars.length / 2);
        newFontSize = Math.max(newFontSize, minFontSize);

        fontSize = newFontSize;
        scaleY = 1;
        lineHeight = 1;

        if (scale && containerH > 0) {
            // Defer to allow font size update
            requestAnimationFrame(() => {
                if (!titleRef) return;
                const textRect = titleRef.getBoundingClientRect();
                if (textRect.height > 0) {
                    const yRatio = containerH / textRect.height;
                    scaleY = yRatio;
                    lineHeight = yRatio;
                }
            });
        }
    }

    function onWindowResize() {
        if (resizeId) clearTimeout(resizeId);
        resizeId = setTimeout(setSize, 100);
    }

    onMount(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", onWindowResize);
        setSize();
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", onWindowResize);
            cancelAnimationFrame(rafId);
            if (resizeId) clearTimeout(resizeId);
        };
    });
</script>

<svelte:head>
    <style>
        @font-face {
            font-family: "Compressa VF";
            src: url("https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2");
            font-style: normal;
        }
    </style>
</svelte:head>

<div
    bind:this={containerRef}
    class={`text-pressure-container ${className}`}
    style="position: relative; width: 100%; height: 100%; background: transparent;"
>
    <h1
        bind:this={titleRef}
        class={`text-pressure-title ${flex ? "flex" : ""} ${stroke ? "stroke" : ""}`}
        style="

      font-family: {fontFamily};
      text-transform: uppercase;
      font-size: {fontSize}px;
      line-height: {lineHeight};
      transform: scale(1, {scaleY});
      transform-origin: center top;
      margin: 0;
      text-align: center;
      user-select: none;
      white-space: nowrap;
      font-weight: 100;
      width: 100%;
      --text-stroke-color: {strokeColor};
    "
    >
        {#each chars as char, i}
            <span
                bind:this={spansRef[i]}
                data-char={char}
                style="
          display: inline-block;
          color: {stroke ? 'transparent' : textColor};
        "
            >
                {char}
            </span>
        {/each}
    </h1>
</div>

<style>
    .flex {
        display: flex;
        justify-content: space-between;
    }

    .stroke span {
        position: relative;
        color: transparent; /* Overridden inline if stroke false */
    }

    .stroke span::after {
        content: attr(data-char);
        position: absolute;
        left: 0;
        top: 0;
        color: transparent;
        z-index: -1;
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: var(--text-stroke-color);
    }

    /* We need dynamic stroke color. Inline style or CSS var? */
</style>
