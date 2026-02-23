<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Matter from "matter-js";
    import { cn } from "$lib/utils";

    let {
        text = "",
        highlightWords = [],
        highlightClass = "highlighted",
        trigger = "auto",
        backgroundColor = "transparent",
        wireframes = false,
        gravity = 1,
        mouseConstraintStiffness = 0.2,
        fontSize = "1rem",
        class: className,
        ...restProps
    } = $props();

    let container = $state<HTMLElement>();
    let textRef = $state<HTMLElement>();
    let canvasContainer = $state<HTMLElement>();
    let effectStarted = $state(false);

    let engine: Matter.Engine;
    let render: Matter.Render;
    let runner: Matter.Runner;
    let animationFrameId: number;

    // Computed words array for template
    const words = $derived(text.split(" "));

    function handleTrigger() {
        if (!effectStarted && (trigger === "click" || trigger === "hover")) {
            effectStarted = true;
        }
    }

    $effect(() => {
        if (effectStarted || !trigger) return;

        if (trigger === "auto") {
            effectStarted = true;
        } else if (trigger === "scroll" && container) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        effectStarted = true;
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 },
            );
            observer.observe(container);
            return () => observer.disconnect();
        }
    });

    $effect(() => {
        if (!effectStarted || !container || !textRef || !canvasContainer)
            return;

        const {
            Engine,
            Render,
            World,
            Bodies,
            Runner,
            Mouse,
            MouseConstraint,
        } = Matter;

        // Get dimensions
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (width <= 0 || height <= 0) return;

        engine = Engine.create();
        engine.world.gravity.y = gravity;

        render = Render.create({
            element: canvasContainer,
            engine: engine,
            options: {
                width,
                height,
                background: backgroundColor,
                wireframes,
                pixelRatio: window.devicePixelRatio,
            },
        });

        // Boundaries
        const boundaries = [
            Bodies.rectangle(width / 2, height + 10, width, 20, {
                isStatic: true,
                render: { visible: false },
            }),
            Bodies.rectangle(-10, height / 2, 20, height, {
                isStatic: true,
                render: { visible: false },
            }),
            Bodies.rectangle(width + 10, height / 2, 20, height, {
                isStatic: true,
                render: { visible: false },
            }),
            Bodies.rectangle(width / 2, -10, width, 20, {
                isStatic: true,
                render: { visible: false },
            }),
        ];

        // Measure words and create bodies
        const wordSpans = Array.from(textRef.children) as HTMLElement[];
        const bodies = wordSpans.map((elem) => {
            const r = elem.getBoundingClientRect();
            // Calculate absolute position relative to container
            const x = r.left - rect.left + r.width / 2;
            const y = r.top - rect.top + r.height / 2;

            const body = Bodies.rectangle(x, y, r.width, r.height, {
                render: { fillStyle: "transparent" },
                restitution: 0.8,
                frictionAir: 0.01,
                friction: 0.2,
            });

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 5,
                y: 0,
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { elem, body };
        });

        World.add(engine.world, [...boundaries, ...bodies.map((b) => b.body)]);

        // Mouse Constraint
        const mouse = Mouse.create(container);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false },
            },
        });
        render.mouse = mouse;
        World.add(engine.world, mouseConstraint);

        // Run
        runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        // Animation Loop
        const loop = () => {
            bodies.forEach(({ elem, body }) => {
                const { x, y } = body.position;
                const angle = body.angle;

                elem.style.position = "absolute";
                elem.style.left = `${x}px`;
                elem.style.top = `${y}px`;
                elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
            });

            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            World.clear(engine.world);
            Engine.clear(engine);
        };
    });
</script>

<div
    bind:this={container}
    class={cn(
        "falling-text-container relative z-10 w-full h-full text-center overflow-hidden cursor-pointer pt-8",
        className,
    )}
    onclick={trigger === "click" ? handleTrigger : undefined}
    onmouseenter={trigger === "hover" ? handleTrigger : undefined}
    role="button"
    tabindex="0"
    onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleTrigger();
    }}
    {...restProps}
>
    <!-- Text Source -->
    <div
        bind:this={textRef}
        class="falling-text-target inline-block select-none"
        style="font-size: {fontSize}; line-height: 1.4;"
    >
        {#each words as word, i}
            {@const isHighlighted = highlightWords.some((hw) =>
                word.startsWith(hw),
            )}
            <span
                class={cn(
                    "word inline-block mx-[2px] select-none",
                    isHighlighted && highlightClass,
                )}
            >
                {word}{" "}<!-- Spacer for initial layout -->
            </span>
        {/each}
    </div>

    <!-- Canvas Container -->
    <div
        bind:this={canvasContainer}
        class="falling-text-canvas absolute top-0 left-0 z-0 pointer-events-none"
    ></div>
</div>

<style>
    .highlighted {
        color: cyan;
        font-weight: bold;
    }
</style>
