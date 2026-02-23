<script lang="ts">
    import { onMount } from "svelte";

    let {
        label = "Variable Proximity",
        fromFontVariationSettings = "'wght' 400, 'opsz' 9",
        toFontVariationSettings = "'wght' 900, 'opsz' 40",
        radius = 100,
        falloff = "linear",
        className = "",
        style = "",
    } = $props();

    let containerRef: HTMLElement;
    let letterRefs: (HTMLElement | null)[] = [];
    let mouse = { x: 0, y: 0 };
    let animationId: number;

    // Parsing settings helper
    function parseSettings(settingsStr: string) {
        return new Map(
            settingsStr
                .split(",")
                .map((s) => s.trim())
                .map((s) => {
                    const parts = s.split(" ");
                    const name = parts[0].replace(/['"]/g, ""); // axis name
                    const value = parseFloat(parts[1]);
                    return [name, value] as [string, number];
                }),
        );
    }

    let fromSettings = $derived(parseSettings(fromFontVariationSettings));
    let toSettings = $derived(parseSettings(toFontVariationSettings));

    // Prepare interpolation map
    let axes = $derived(
        Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) ?? fromValue,
        })),
    );

    function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function calculateFalloff(dist: number) {
        const norm = Math.min(Math.max(1 - dist / radius, 0), 1);
        switch (falloff) {
            case "exponential":
                return Math.pow(norm, 2);
            case "gaussian":
                return Math.exp(-Math.pow(dist / (radius / 2), 2) / 2);
            case "linear":
            default:
                return norm;
        }
    }

    function update() {
        if (!containerRef) return;
        const containerRect = containerRef.getBoundingClientRect();

        letterRefs.forEach((letterRef) => {
            if (!letterRef) return;

            const rect = letterRef.getBoundingClientRect();
            const letterCenterX =
                rect.left + rect.width / 2 - containerRect.left;
            const letterCenterY =
                rect.top + rect.height / 2 - containerRect.top;

            const dist = calculateDistance(
                mouse.x,
                mouse.y,
                letterCenterX,
                letterCenterY,
            );

            if (dist >= radius) {
                letterRef.style.fontVariationSettings =
                    fromFontVariationSettings;
                return;
            }

            const falloffValue = calculateFalloff(dist);

            const newSettings = axes
                .map(({ axis, fromValue, toValue }) => {
                    const val =
                        fromValue + (toValue - fromValue) * falloffValue;
                    return `'${axis}' ${val}`;
                })
                .join(", ");

            letterRef.style.fontVariationSettings = newSettings;
        });

        animationId = requestAnimationFrame(update);
    }

    function handleMouseMove(e: MouseEvent) {
        if (!containerRef) return;
        const rect = containerRef.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    onMount(() => {
        // Start loop
        animationId = requestAnimationFrame(update);
        window.addEventListener("mousemove", () => {}); // Global listener not needed if we rely on container hover?
        // Actually React version used window tracking mapped to container relative coordinates.
        // Let's attach to container for simplicity, or window if needed.
        // If the effect is "proximity", it implies mouse is near.
        // Let's use window tracking mapped to container relative coords.

        const onWindowMouseMove = (e: MouseEvent) => {
            if (containerRef) {
                const rect = containerRef.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }
        };

        window.addEventListener("mousemove", onWindowMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", onWindowMouseMove);
        };
    });
</script>

<span
    bind:this={containerRef}
    class={`variable-proximity ${className}`}
    style={`display: inline-block; ${style}`}
    role="presentation"
>
    {#each label.split(" ") as word, i}
        <span class="inline-block whitespace-nowrap">
            {#each word.split("") as char, j}
                <span
                    bind:this={letterRefs[i * 100 + j]}
                    style="display: inline-block; transition: font-variation-settings 0s;"
                    aria-hidden="true"
                >
                    {char}
                </span>
            {/each}
            &nbsp;
        </span>
    {/each}
    <span class="sr-only">{label}</span>
</span>

<style>
    .variable-proximity {
        /* Ensure font supports variations usually */
    }
</style>
