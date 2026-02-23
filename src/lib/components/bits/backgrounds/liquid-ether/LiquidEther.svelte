<script lang="ts">
    import { onMount } from "svelte";
    import { createLiquidEther } from "./utils";
    import { cn } from "$lib/utils";

    let {
        mouseForce = 20,
        cursorSize = 100,
        isViscous = false,
        viscous = 30,
        iterationsViscous = 32,
        iterationsPoisson = 32,
        dt = 0.014,
        BFECC = true,
        resolution = 0.5,
        isBounce = false,
        colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
        autoDemo = true,
        autoSpeed = 0.5,
        autoIntensity = 2.2,
        takeoverDuration = 0.25,
        autoResumeDelay = 1000,
        autoRampDuration = 0.6,
        class: className,
        ...restProps
    } = $props();

    let container = $state<HTMLElement>();
    let webgl = $state<any>(null); // Type 'any' for now, could be improved

    $effect(() => {
        if (!webgl) return;
        const sim = webgl.output?.simulation;
        if (!sim) return;

        const prevRes = sim.options.resolution;
        Object.assign(sim.options, {
            mouse_force: mouseForce,
            cursor_size: cursorSize,
            isViscous,
            viscous,
            iterations_viscous: iterationsViscous,
            iterations_poisson: iterationsPoisson,
            dt,
            BFECC,
            resolution,
            isBounce,
        });

        if (webgl.autoDriver) {
            webgl.autoDriver.enabled = autoDemo;
            webgl.autoDriver.speed = autoSpeed;
            webgl.autoDriver.resumeDelay = autoResumeDelay;
            webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;
            if (webgl.autoDriver.mouse) {
                webgl.autoDriver.mouse.autoIntensity = autoIntensity;
                webgl.autoDriver.mouse.takeoverDuration = takeoverDuration;
            }
        }

        if (resolution !== prevRes) {
            sim.resize();
        }
    });

    onMount(() => {
        if (!container) return;

        webgl = createLiquidEther(container, {
            autoDemo,
            autoSpeed,
            autoIntensity,
            takeoverDuration,
            autoResumeDelay,
            autoRampDuration,
            colors, // Passed but only initial colors used in utils currently
        });

        // Initial Update
        const sim = webgl.output?.simulation;
        if (sim) {
            Object.assign(sim.options, {
                mouse_force: mouseForce,
                cursor_size: cursorSize,
                isViscous,
                viscous,
                iterations_viscous: iterationsViscous,
                iterations_poisson: iterationsPoisson,
                dt,
                BFECC,
                resolution,
                isBounce,
            });
        }

        webgl.start();

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    if (!document.hidden) webgl.start();
                } else {
                    webgl.pause();
                }
            },
            { threshold: [0, 0.01, 0.1] },
        );
        io.observe(container);

        // ResizeObserver is handled internally in utils via window resize,
        // but container resize might need explicit handling or the utils relies on 'resize' event.
        // The original code used ResizeObserver on container.
        // The utils.ts I verified uses `window.addEventListener('resize')`.
        // But container size might change without window resize.
        // It's safer to add ResizeObserver here.

        let resizeRaf: number;
        const ro = new ResizeObserver(() => {
            cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(() => {
                webgl.resize();
            });
        });
        ro.observe(container);

        return () => {
            io.disconnect();
            ro.disconnect();
            cancelAnimationFrame(resizeRaf);
            if (webgl) webgl.dispose();
            webgl = null;
        };
    });
</script>

<div
    bind:this={container}
    class={cn("liquid-ether-container", className)}
    {...restProps}
></div>

<style>
    .liquid-ether-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        touch-action: none;
    }
</style>
