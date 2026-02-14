<script lang="ts">
    import { onMount } from "svelte";

    let {
        count = 120,
        speed = 0.8,
        connectDistance = 120,
        mouseReact = true,
        color = "#8b5cf6",
        class: className = "",
    }: {
        count?: number;
        speed?: number;
        connectDistance?: number;
        mouseReact?: boolean;
        color?: string;
        class?: string;
    } = $props();

    type Particle = { x: number; y: number; vx: number; vy: number; size: number };

    let wrapper: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };

    function makeParticle(): Particle {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: 1 + Math.random() * 2,
        };
    }

    function initParticles() {
        particles = Array.from({ length: count }, () => makeParticle());
    }

    function resize() {
        if (!wrapper || !canvas) return;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = wrapper.clientWidth;
        height = wrapper.clientHeight;
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles();
    }

    function update() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        const rgbaLine = `${color}55`;
        const rgbaDot = `${color}cc`;

        for (let i = 0; i < particles.length; i += 1) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x <= 0 || p.x >= width) p.vx *= -1;
            if (p.y <= 0 || p.y >= height) p.vy *= -1;

            if (mouseReact) {
                const mx = p.x - mouse.x;
                const my = p.y - mouse.y;
                const dist = Math.hypot(mx, my);
                if (dist < 110 && dist > 0) {
                    p.x += (mx / dist) * 0.7;
                    p.y += (my / dist) * 0.7;
                }
            }
        }

        for (let i = 0; i < particles.length; i += 1) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j += 1) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist <= connectDistance) {
                    ctx.strokeStyle = rgbaLine;
                    ctx.lineWidth = 0.6;
                    ctx.globalAlpha = 1 - dist / connectDistance;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1;
        for (const p of particles) {
            ctx.fillStyle = rgbaDot;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        raf = requestAnimationFrame(update);
    }

    onMount(() => {
        resize();
        update();

        const ro = new ResizeObserver(() => resize());
        ro.observe(wrapper);

        const onMove = (ev: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            mouse = {
                x: ev.clientX - rect.left,
                y: ev.clientY - rect.top,
            };
        };

        const onLeave = () => {
            mouse = { x: -9999, y: -9999 };
        };

        wrapper.addEventListener("mousemove", onMove);
        wrapper.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            wrapper.removeEventListener("mousemove", onMove);
            wrapper.removeEventListener("mouseleave", onLeave);
        };
    });

    $effect(() => {
        if (width && height) {
            initParticles();
        }
    });
</script>

<div bind:this={wrapper} class={`particle-field ${className}`}>
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .particle-field {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.12), transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.1), transparent 35%),
            #05020f;
    }

    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
