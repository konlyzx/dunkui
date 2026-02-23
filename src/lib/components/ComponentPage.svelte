<script lang="ts">
    import type { RegistryItem } from "$lib/data/registry";

    let {
        title,
        item,
        backHref,
        categoryFolder,
        component,
    }: {
        title: string;
        item: RegistryItem | undefined;
        backHref: string;
        categoryFolder?: string;
        component?: import("svelte").Snippet;
    } = $props();

    let activeTab: "preview" | "code" | "install" = $state("preview");
    let copySuccess = $state("");
    let canvasEl: HTMLCanvasElement | undefined = $state();
    let animFrameId: number = 0;
    let mouseX = $state(0.5);
    let mouseY = $state(0.5);

    function toPascalCase(str: string) {
        return str.replace(/\s+/g, "");
    }

    function getCategory(): string {
        if (!item) return "components";
        if (item.route.includes("/animations/")) return "animations";
        if (item.route.includes("/backgrounds/")) return "backgrounds";
        if (item.route.includes("/text-animations/")) return "text-animations";
        return "components";
    }

    function getCodeString(): string {
        if (!item) return "";
        const name = toPascalCase(item.name);
        const cat = getCategory();
        const sc = "<" + "script>";
        const sce = "<" + "/script>";

        if (cat === "backgrounds") {
            return (
                sc +
                "\n  import { " +
                name +
                " } from '@konlyzx/dunkui';\n" +
                sce +
                "\n\n<" +
                name +
                '\n  class="background"\n  speed={1}\n  intensity={0.8}\n/>'
            );
        }

        if (cat === "animations") {
            return (
                sc +
                "\n  import { " +
                name +
                " } from '@konlyzx/dunkui';\n" +
                sce +
                "\n\n<" +
                name +
                '\n  duration={0.6}\n  easing="ease-out"\n>\n  <div>Your animated content here</div>\n</' +
                name +
                ">"
            );
        }

        if (cat === "text-animations") {
            return (
                sc +
                "\n  import { " +
                name +
                " } from '@konlyzx/dunkui';\n" +
                sce +
                "\n\n<" +
                name +
                '\n  text="Hello World"\n  speed={1}\n  delay={0}\n/>'
            );
        }

        return (
            sc +
            "\n  import { " +
            name +
            " } from '@konlyzx/dunkui';\n" +
            sce +
            "\n\n<" +
            name +
            " />"
        );
    }

    function getManualInstallCode(): string {
        if (!item) return "";
        const name = toPascalCase(item.name);
        return (
            "// " +
            item.name +
            " Component\n// Save as: src/lib/components/" +
            name +
            ".svelte\n\n// Full source code available at:\n// https://github.com/konlyzx/dunkui/tree/main/src/lib/components/bits/" +
            name +
            ".svelte"
        );
    }

    async function copyToClipboard(text: string, label: string) {
        try {
            await navigator.clipboard.writeText(text);
            copySuccess = label;
            setTimeout(() => {
                copySuccess = "";
            }, 2000);
        } catch {
            copySuccess = "";
        }
    }

    // Interactive Canvas Preview
    function startPreview() {
        if (!canvasEl) return;
        const ctx = canvasEl.getContext("2d");
        if (!ctx) return;

        const cat = getCategory();
        const componentName = item?.slug ?? "";
        let startTime = performance.now();

        function draw(now: number) {
            if (!ctx || !canvasEl) return;
            const w = (canvasEl.width =
                canvasEl.offsetWidth * window.devicePixelRatio);
            const h = (canvasEl.height =
                canvasEl.offsetHeight * window.devicePixelRatio);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            const rw = canvasEl.offsetWidth;
            const rh = canvasEl.offsetHeight;
            const t = (now - startTime) / 1000;

            ctx.clearRect(0, 0, rw, rh);

            if (cat === "backgrounds") {
                drawBackgroundPreview(ctx, rw, rh, t, componentName);
            } else if (cat === "animations") {
                drawAnimationPreview(ctx, rw, rh, t, componentName);
            } else if (cat === "text-animations") {
                drawTextAnimationPreview(ctx, rw, rh, t, componentName);
            } else {
                drawComponentPreview(ctx, rw, rh, t, componentName);
            }

            animFrameId = requestAnimationFrame(draw);
        }

        animFrameId = requestAnimationFrame(draw);
    }

    function drawBackgroundPreview(
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        t: number,
        name: string,
    ) {
        // Animated gradient background
        const hue1 = (t * 30) % 360;
        const hue2 = (hue1 + 60) % 360;
        const hue3 = (hue1 + 120) % 360;

        const grd = ctx.createLinearGradient(
            w * 0.5 + Math.cos(t * 0.5) * w * 0.3,
            0,
            w * 0.5 + Math.sin(t * 0.7) * w * 0.3,
            h,
        );
        grd.addColorStop(0, `hsla(${hue1}, 70%, 15%, 1)`);
        grd.addColorStop(0.5, `hsla(${hue2}, 60%, 10%, 1)`);
        grd.addColorStop(1, `hsla(${hue3}, 70%, 12%, 1)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);

        // Floating particles
        for (let i = 0; i < 40; i++) {
            const px = ((Math.sin(t * 0.3 + i * 1.7) + 1) / 2) * w;
            const py = ((Math.cos(t * 0.2 + i * 2.3) + 1) / 2) * h;
            const size = 1.5 + Math.sin(t + i) * 1;
            const alpha = 0.2 + Math.sin(t * 0.5 + i * 0.8) * 0.15;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue1 + i * 5}, 80%, 70%, ${alpha})`;
            ctx.fill();
        }

        // Mouse-responsive glow
        const glowX = mouseX * w;
        const glowY = mouseY * h;
        const glowGrd = ctx.createRadialGradient(
            glowX,
            glowY,
            0,
            glowX,
            glowY,
            120,
        );
        glowGrd.addColorStop(0, `hsla(${hue1}, 80%, 60%, 0.15)`);
        glowGrd.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrd;
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = `hsla(${hue2}, 50%, 50%, 0.06)`;
        ctx.lineWidth = 0.5;
        const gridSize = 30;
        for (let x = 0; x < w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Component name label
        drawLabel(ctx, w, h, name, `hsla(${hue1}, 80%, 70%, 0.7)`);
    }

    function drawAnimationPreview(
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        t: number,
        name: string,
    ) {
        ctx.fillStyle = "rgba(6, 0, 16, 0.95)";
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        // Orbiting shapes
        for (let i = 0; i < 6; i++) {
            const angle = t * (0.5 + i * 0.1) + (i * Math.PI) / 3;
            const radius = 50 + i * 15 + Math.sin(t * 2 + i) * 10;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const size = 12 + Math.sin(t * 3 + i * 2) * 4;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle * 2);

            const hue = 270 + i * 20;
            ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${0.5 + Math.sin(t + i) * 0.2})`;
            ctx.shadowColor = `hsla(${hue}, 80%, 65%, 0.4)`;
            ctx.shadowBlur = 15;

            if (i % 3 === 0) {
                ctx.fillRect(-size / 2, -size / 2, size, size);
            } else if (i % 3 === 1) {
                ctx.beginPath();
                ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(0, -size / 2);
                ctx.lineTo(size / 2, size / 2);
                ctx.lineTo(-size / 2, size / 2);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }

        // Central pulsing element
        const pulse = 1 + Math.sin(t * 3) * 0.15;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(pulse, pulse);
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139, 92, 246, 0.3)";
        ctx.shadowColor = "rgba(139, 92, 246, 0.6)";
        ctx.shadowBlur = 25;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
        ctx.fill();
        ctx.restore();

        // Connecting lines
        ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 6; i++) {
            const angle = t * (0.5 + i * 0.1) + (i * Math.PI) / 3;
            const radius = 50 + i * 15 + Math.sin(t * 2 + i) * 10;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        drawLabel(ctx, w, h, name, "rgba(139, 92, 246, 0.7)");
    }

    function drawTextAnimationPreview(
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        t: number,
        name: string,
    ) {
        ctx.fillStyle = "rgba(6, 0, 16, 0.95)";
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const displayName = (item?.name ?? "Text").toUpperCase();

        ctx.save();
        ctx.font = 'bold 32px "Inter", "SF Pro Display", system-ui, sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Character-by-character animation
        const chars = displayName.split("");
        const totalWidth = ctx.measureText(displayName).width;
        let xOffset = cx - totalWidth / 2;

        for (let i = 0; i < chars.length; i++) {
            const charWidth = ctx.measureText(chars[i]).width;
            const delay = i * 0.15;
            const phase = (t - delay) % 3;

            // Wave offset
            const yOff = Math.sin(t * 2 + i * 0.5) * 5;

            // Glitch effect
            const glitchX =
                Math.random() > 0.97 ? (Math.random() - 0.5) * 4 : 0;
            const glitchY =
                Math.random() > 0.97 ? (Math.random() - 0.5) * 4 : 0;

            // Color cycling
            const hue = 270 + i * 12 + t * 20;
            const alpha = 0.6 + Math.sin(t * 1.5 + i * 0.3) * 0.3;

            ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha})`;
            ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
            ctx.shadowBlur = 10;

            ctx.fillText(
                chars[i],
                xOffset + charWidth / 2 + glitchX,
                cy + yOff + glitchY,
            );
            xOffset += charWidth;
        }
        ctx.restore();

        // Underline animation
        const lineProgress = (t * 0.5) % 1;
        const lineWidth = totalWidth * 0.8;
        const lineStart = cx - lineWidth / 2;
        ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lineStart, cy + 25);
        ctx.lineTo(lineStart + lineWidth * lineProgress, cy + 25);
        ctx.stroke();

        // Decorative dots
        for (let i = 0; i < 20; i++) {
            const dx = cx + Math.cos(t * 0.5 + i * 1.2) * (80 + i * 5);
            const dy = cy + Math.sin(t * 0.7 + i * 1.5) * (40 + i * 3);
            ctx.beginPath();
            ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + Math.sin(t + i) * 0.05})`;
            ctx.fill();
        }

        drawLabel(ctx, w, h, name, "rgba(167, 139, 250, 0.6)");
    }

    function drawComponentPreview(
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        t: number,
        name: string,
    ) {
        ctx.fillStyle = "rgba(6, 0, 16, 0.95)";
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        // Interactive card mockup
        const cardW = 180;
        const cardH = 120;
        const cardX = cx - cardW / 2 + Math.sin(t * 0.5) * 3;
        const cardY = cy - cardH / 2 + Math.cos(t * 0.7) * 2;

        // Card shadow
        ctx.shadowColor = "rgba(139, 92, 246, 0.2)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 8;

        // Card body with glass effect
        const cardGrd = ctx.createLinearGradient(
            cardX,
            cardY,
            cardX + cardW,
            cardY + cardH,
        );
        cardGrd.addColorStop(0, "rgba(139, 92, 246, 0.12)");
        cardGrd.addColorStop(1, "rgba(56, 189, 248, 0.08)");
        ctx.fillStyle = cardGrd;
        roundRect(ctx, cardX, cardY, cardW, cardH, 12);
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Card border
        ctx.strokeStyle = "rgba(139, 92, 246, 0.2)";
        ctx.lineWidth = 1;
        roundRect(ctx, cardX, cardY, cardW, cardH, 12);
        ctx.stroke();

        // Card inner content bars
        const barY = cardY + 20;
        for (let i = 0; i < 3; i++) {
            const barWidth = (cardW - 40) * (0.9 - i * 0.2);
            const barAlpha = 0.15 - i * 0.03;
            const animWidth =
                barWidth * (0.5 + Math.sin(t * 1.5 + i * 0.8) * 0.3 + 0.2);
            ctx.fillStyle = `rgba(139, 92, 246, ${barAlpha})`;
            roundRect(ctx, cardX + 20, barY + i * 22, animWidth, 10, 4);
            ctx.fill();
        }

        // Floating accent dots around the card
        for (let i = 0; i < 8; i++) {
            const angle = t * 0.3 + (i * Math.PI) / 4;
            const dist = 80 + Math.sin(t + i) * 15;
            const dx = cx + Math.cos(angle) * dist;
            const dy = cy + Math.sin(angle) * dist;
            const dotSize = 3 + Math.sin(t * 2 + i) * 1.5;
            ctx.beginPath();
            ctx.arc(dx, dy, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${0.15 + Math.sin(t + i * 1.3) * 0.1})`;
            ctx.fill();
        }

        // Mouse glow
        const gx = mouseX * w;
        const gy = mouseY * h;
        const mgrd = ctx.createRadialGradient(gx, gy, 0, gx, gy, 80);
        mgrd.addColorStop(0, "rgba(139, 92, 246, 0.08)");
        mgrd.addColorStop(1, "transparent");
        ctx.fillStyle = mgrd;
        ctx.fillRect(0, 0, w, h);

        drawLabel(ctx, w, h, name, "rgba(139, 92, 246, 0.6)");
    }

    function roundRect(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
    ) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function drawLabel(
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        name: string,
        color: string,
    ) {
        ctx.save();
        ctx.font = '10px "JetBrains Mono", "Fira Code", monospace';
        ctx.textAlign = "right";
        ctx.fillStyle = color;
        ctx.fillText(`<${toPascalCase(item?.name ?? name)} />`, w - 16, h - 12);
        ctx.restore();
    }

    function handleMouseMove(e: MouseEvent) {
        if (!canvasEl) return;
        const rect = canvasEl.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
    }

    $effect(() => {
        if (activeTab === "preview" && canvasEl) {
            startPreview();
        }
        return () => {
            if (animFrameId) cancelAnimationFrame(animFrameId);
        };
    });
</script>

{#if item}
    <div class="component-page">
        <a href={backHref} class="back-link">← Back to {title}</a>

        <h1 class="component-title">{item.name}</h1>
        <p class="component-desc">
            {item.description ||
                `A premium ${getCategory().replace("-", " ")} component for your Svelte project.`}
        </p>

        <!-- Tabs bar -->
        <div class="tabs-bar">
            <div class="tabs-left">
                <button
                    class="tab-trigger"
                    class:active={activeTab === "preview"}
                    onclick={() => (activeTab = "preview")}
                >
                    <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                    >
                        <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        /><circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview
                </button>
                <button
                    class="tab-trigger"
                    class:active={activeTab === "code"}
                    onclick={() => (activeTab = "code")}
                >
                    <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                    >
                        <polyline points="16 18 22 12 16 6" /><polyline
                            points="8 6 2 12 8 18"
                        />
                    </svg>
                    Code
                </button>
                <button
                    class="tab-trigger"
                    class:active={activeTab === "install"}
                    onclick={() => (activeTab = "install")}
                >
                    <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                    >
                        <path
                            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                        /><polyline points="7 10 12 15 17 10" /><line
                            x1="12"
                            y1="15"
                            x2="12"
                            y2="3"
                        />
                    </svg>
                    Install
                </button>
            </div>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
            {#if activeTab === "preview"}
                <div class="preview-container" role="presentation">
                    {#if component}
                        <div class="real-component-preview">
                            {@render component()}
                        </div>
                    {:else}
                        <canvas
                            bind:this={canvasEl}
                            class="preview-canvas"
                            onmousemove={handleMouseMove}
                        ></canvas>
                        <div class="preview-badge">
                            <span class="badge-dot"></span>
                            Live Preview
                        </div>
                    {/if}
                </div>
            {:else if activeTab === "code"}
                <div class="code-tab-content">
                    <div class="code-tab-header">
                        <div class="code-file-info">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                height="14"
                                width="14"
                            >
                                <path
                                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span>Usage Example</span>
                            <span class="code-file-badge">svelte</span>
                        </div>
                        <button
                            class="copy-btn"
                            onclick={() =>
                                copyToClipboard(getCodeString(), "code")}
                        >
                            {#if copySuccess === "code"}
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    height="14"
                                    width="14"
                                    ><polyline points="20 6 9 17 4 12" /></svg
                                >
                                Copied!
                            {:else}
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    height="14"
                                    width="14"
                                    ><rect
                                        x="9"
                                        y="9"
                                        width="13"
                                        height="13"
                                        rx="2"
                                        ry="2"
                                    /><path
                                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                    /></svg
                                >
                                Copy
                            {/if}
                        </button>
                    </div>
                    <div class="code-tab-body">
                        <pre><code>{getCodeString()}</code></pre>
                    </div>
                </div>
            {:else if activeTab === "install"}
                <div class="install-tab-content">
                    <!-- NPM Install -->
                    <div class="install-section">
                        <div class="install-section-header">
                            <div class="install-method">
                                <span class="method-badge npm">npm</span>
                                <span class="method-title">Package Manager</span
                                >
                            </div>
                            <span class="method-rec">Recommended</span>
                        </div>
                        <div class="install-code-block">
                            <div class="install-code-header">
                                <span class="terminal-dots">
                                    <span class="dot red"></span>
                                    <span class="dot yellow"></span>
                                    <span class="dot green"></span>
                                </span>
                                <span class="terminal-title">Terminal</span>
                                <button
                                    class="copy-btn small"
                                    onclick={() =>
                                        copyToClipboard(
                                            "npm install @konlyzx/dunkui",
                                            "npm",
                                        )}
                                >
                                    {#if copySuccess === "npm"}
                                        ✓
                                    {:else}
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            height="12"
                                            width="12"
                                            ><rect
                                                x="9"
                                                y="9"
                                                width="13"
                                                height="13"
                                                rx="2"
                                                ry="2"
                                            /><path
                                                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                            /></svg
                                        >
                                    {/if}
                                </button>
                            </div>
                            <pre><code
                                    ><span class="prompt">$</span
                                    > npm install @konlyzx/dunkui</code
                                ></pre>
                        </div>

                        <div class="install-code-block">
                            <div class="install-code-header">
                                <span class="terminal-dots">
                                    <span class="dot red"></span>
                                    <span class="dot yellow"></span>
                                    <span class="dot green"></span>
                                </span>
                                <span class="terminal-title">Alternative</span>
                            </div>
                            <pre><code
                                    ><span class="prompt">$</span
                                    > pnpm add @konlyzx/dunkui
<span class="prompt">$</span> yarn add @konlyzx/dunkui
<span class="prompt">$</span> bun add @konlyzx/dunkui</code
                                ></pre>
                        </div>

                        <p class="install-note">
                            Then import the component in your Svelte file:
                        </p>
                        <div class="install-code-block">
                            <div class="install-code-header">
                                <span class="terminal-dots">
                                    <span class="dot red"></span>
                                    <span class="dot yellow"></span>
                                    <span class="dot green"></span>
                                </span>
                                <span class="terminal-title"
                                    >{toPascalCase(item.name)}.svelte</span
                                >
                                <button
                                    class="copy-btn small"
                                    onclick={() =>
                                        copyToClipboard(
                                            `import { ${toPascalCase(item?.name ?? "")} } from '@konlyzx/dunkui';`,
                                            "import",
                                        )}
                                >
                                    {#if copySuccess === "import"}
                                        ✓
                                    {:else}
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            height="12"
                                            width="12"
                                            ><rect
                                                x="9"
                                                y="9"
                                                width="13"
                                                height="13"
                                                rx="2"
                                                ry="2"
                                            /><path
                                                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                            /></svg
                                        >
                                    {/if}
                                </button>
                            </div>
                            <pre><code
                                    ><span class="kw">import</span
                                    > {"{"} {toPascalCase(
                                        item.name,
                                    )} {"}"} <span class="kw">from</span> <span
                                        class="str">'@konlyzx/dunkui'</span
                                    >;</code
                                ></pre>
                        </div>
                    </div>

                    <!-- Manual Install -->
                    <div class="install-section">
                        <div class="install-section-header">
                            <div class="install-method">
                                <span class="method-badge manual">src</span>
                                <span class="method-title"
                                    >Manual Installation</span
                                >
                            </div>
                        </div>
                        <p class="install-note">
                            Copy the component source code directly into your
                            project:
                        </p>
                        <div class="install-steps">
                            <div class="step">
                                <span class="step-num">1</span>
                                <div class="step-content">
                                    <strong>Clone or download</strong> the
                                    component source from the repository:
                                    <div class="install-code-block">
                                        <div class="install-code-header">
                                            <span class="terminal-dots">
                                                <span class="dot red"></span>
                                                <span class="dot yellow"></span>
                                                <span class="dot green"></span>
                                            </span>
                                            <span class="terminal-title"
                                                >Terminal</span
                                            >
                                            <button
                                                class="copy-btn small"
                                                onclick={() =>
                                                    copyToClipboard(
                                                        `curl -o src/lib/components/${toPascalCase(item?.name ?? "")}.svelte https://raw.githubusercontent.com/konlyzx/dunkui/main/src/lib/components/bits/${toPascalCase(item?.name ?? "")}.svelte`,
                                                        "curl",
                                                    )}
                                            >
                                                {#if copySuccess === "curl"}
                                                    ✓
                                                {:else}
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        stroke-width="2"
                                                        viewBox="0 0 24 24"
                                                        height="12"
                                                        width="12"
                                                        ><rect
                                                            x="9"
                                                            y="9"
                                                            width="13"
                                                            height="13"
                                                            rx="2"
                                                            ry="2"
                                                        /><path
                                                            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                                        /></svg
                                                    >
                                                {/if}
                                            </button>
                                        </div>
                                        <pre><code
                                                ><span class="prompt">$</span
                                                > curl -o src/lib/components/{toPascalCase(
                                                    item.name,
                                                )}.svelte \
  https://raw.githubusercontent.com/konlyzx/dunkui/main/src/lib/components/bits/{toPascalCase(
                                                    item.name,
                                                )}.svelte</code
                                            ></pre>
                                    </div>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-num">2</span>
                                <div class="step-content">
                                    <strong>Import locally</strong> from your
                                    project path:
                                    <div class="install-code-block">
                                        <div class="install-code-header">
                                            <span class="terminal-dots">
                                                <span class="dot red"></span>
                                                <span class="dot yellow"></span>
                                                <span class="dot green"></span>
                                            </span>
                                            <span class="terminal-title"
                                                >YourPage.svelte</span
                                            >
                                        </div>
                                        <pre><code
                                                ><span class="kw">import</span
                                                > {toPascalCase(
                                                    item.name,
                                                )} <span class="kw">from</span
                                                > <span class="str"
                                                    >'$lib/components/{toPascalCase(
                                                        item.name,
                                                    )}.svelte'</span
                                                >;</code
                                            ></pre>
                                    </div>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-num">3</span>
                                <div class="step-content">
                                    <strong>Use it</strong> in your template:
                                    <div class="install-code-block">
                                        <div class="install-code-header">
                                            <span class="terminal-dots">
                                                <span class="dot red"></span>
                                                <span class="dot yellow"></span>
                                                <span class="dot green"></span>
                                            </span>
                                            <span class="terminal-title"
                                                >Template</span
                                            >
                                        </div>
                                        <pre><code
                                                >&lt;{toPascalCase(
                                                    item.name,
                                                )} /&gt;</code
                                            ></pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://github.com/konlyzx/dunkui/tree/main/src/lib/components/bits"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="source-link"
                        >
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                height="16"
                                width="16"
                            >
                                <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                />
                            </svg>
                            View full source on GitHub
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                height="14"
                                width="14"
                            >
                                <line x1="7" y1="17" x2="17" y2="7" /><polyline
                                    points="7 7 17 7 17 17"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Props section -->
        <div class="component-info">
            <h2>Props</h2>
            <div class="props-empty">
                <p>
                    See the <a
                        href="https://github.com/konlyzx/dunkui"
                        target="_blank"
                        rel="noopener noreferrer">documentation</a
                    > for available props.
                </p>
            </div>
        </div>
    </div>
{:else}
    <div class="not-found">
        <h1>Component not found</h1>
        <a href={backHref}>← Back to {title}</a>
    </div>
{/if}

<style>
    .component-page {
        padding: 0.5rem 0;
    }

    .back-link {
        color: rgba(139, 92, 246, 0.8);
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 500;
        transition: color 0.2s;
    }

    .back-link:hover {
        color: #a78bfa;
    }

    .component-title {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        margin: 1rem 0 0.4rem;
    }

    .component-desc {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.85rem;
        margin: 0 0 1.25rem;
        line-height: 1.5;
    }

    /* ── Tabs ── */
    .tabs-bar {
        display: flex;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-bottom: none;
        border-radius: 12px 12px 0 0;
        background: rgba(255, 255, 255, 0.02);
        overflow: hidden;
    }

    .tabs-left {
        display: flex;
        align-items: center;
    }

    .tab-trigger {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.7rem 1.1rem;
        font-size: 0.82rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.4);
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        position: relative;
    }

    .tab-trigger:hover {
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.02);
    }

    .tab-trigger.active {
        color: #fff;
        background: rgba(139, 92, 246, 0.08);
    }

    .tab-trigger.active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, #8b5cf6, #a78bfa);
    }

    /* ── Tab Content ── */
    .tab-content {
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-top: none;
        border-radius: 0 0 14px 14px;
        overflow: hidden;
        margin-bottom: 2rem;
    }

    /* ── Preview Tab ── */
    .preview-container {
        position: relative;
        height: 340px;
        background: rgba(6, 0, 16, 0.6);
        overflow: hidden;
    }

    .real-component-preview {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .preview-canvas {
        width: 100%;
        height: 100%;
        display: block;
        cursor: crosshair;
    }

    .preview-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 500;
        pointer-events: none;
    }

    .badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #4ade80;
        animation: pulse-dot 2s ease-in-out infinite;
    }

    @keyframes pulse-dot {
        0%,
        100% {
            opacity: 0.6;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.3);
        }
    }

    /* ── Code Tab ── */
    .code-tab-content {
        background: rgba(6, 0, 16, 0.5);
    }

    .code-tab-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(255, 255, 255, 0.02);
    }

    .code-file-info {
        display: flex;
        align-items: center;
        gap: 8px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.78rem;
    }

    .code-file-badge {
        font-size: 0.65rem;
        padding: 2px 6px;
        border-radius: 4px;
        background: rgba(139, 92, 246, 0.15);
        color: #a78bfa;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    .copy-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.72rem;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
    }

    .copy-btn:hover {
        background: rgba(139, 92, 246, 0.15);
        border-color: rgba(139, 92, 246, 0.3);
        color: #a78bfa;
    }

    .copy-btn.small {
        padding: 3px 8px;
        font-size: 0.68rem;
    }

    .code-tab-body {
        padding: 1.25rem;
        overflow-x: auto;
    }

    .code-tab-body pre {
        margin: 0;
    }

    .code-tab-body code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 0.8rem;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.8);
        white-space: pre;
    }

    /* ── Install Tab ── */
    .install-tab-content {
        padding: 1.5rem;
        background: rgba(6, 0, 16, 0.4);
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .install-section {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .install-section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .install-method {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .method-badge {
        font-size: 0.65rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 5px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .method-badge.npm {
        background: rgba(203, 56, 55, 0.15);
        color: #f87171;
        border: 1px solid rgba(203, 56, 55, 0.25);
    }

    .method-badge.manual {
        background: rgba(56, 189, 248, 0.12);
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.25);
    }

    .method-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #fff;
    }

    .method-rec {
        font-size: 0.68rem;
        padding: 3px 8px;
        border-radius: 20px;
        background: rgba(74, 222, 128, 0.1);
        color: #4ade80;
        border: 1px solid rgba(74, 222, 128, 0.2);
        font-weight: 500;
    }

    .install-code-block {
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);
    }

    .install-code-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        background: rgba(255, 255, 255, 0.02);
    }

    .terminal-dots {
        display: flex;
        gap: 5px;
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .dot.red {
        background: #ff5f56;
    }
    .dot.yellow {
        background: #ffbd2e;
    }
    .dot.green {
        background: #27c93f;
    }

    .terminal-title {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.3);
        font-family: "JetBrains Mono", "Fira Code", monospace;
        flex: 1;
    }

    .install-code-block pre {
        margin: 0;
        padding: 0.8rem 1rem;
        overflow-x: auto;
    }

    .install-code-block code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 0.78rem;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.75);
    }

    .prompt {
        color: #4ade80;
    }
    .kw {
        color: #c084fc;
    }
    .str {
        color: #4ade80;
    }

    .install-note {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.35);
        margin: 0.4rem 0 0;
    }

    /* Steps */
    .install-steps {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .step {
        display: flex;
        gap: 12px;
        align-items: flex-start;
    }

    .step-num {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(139, 92, 246, 0.15);
        border: 1px solid rgba(139, 92, 246, 0.3);
        color: #a78bfa;
        font-size: 0.72rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
    }

    .step-content {
        flex: 1;
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.5);
        line-height: 1.6;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .step-content strong {
        color: rgba(255, 255, 255, 0.8);
    }

    .source-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.82rem;
        text-decoration: none;
        transition: all 0.2s;
        font-weight: 500;
        margin-top: 0.5rem;
    }

    .source-link:hover {
        background: rgba(139, 92, 246, 0.1);
        border-color: rgba(139, 92, 246, 0.25);
        color: #a78bfa;
    }

    /* ── Info sections ── */
    .component-info h2 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        margin: 1.5rem 0 0.75rem;
    }

    .props-empty {
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.02);
    }

    .props-empty p {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.85rem;
        margin: 0;
    }

    .props-empty a {
        color: #a78bfa;
        text-decoration: none;
    }

    .props-empty a:hover {
        text-decoration: underline;
    }

    .not-found {
        text-align: center;
        padding: 4rem 0;
    }

    .not-found h1 {
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 1rem;
    }

    .not-found a {
        color: #a78bfa;
        text-decoration: none;
    }

    @media (max-width: 640px) {
        .preview-container {
            height: 260px;
        }
        .install-tab-content {
            padding: 1rem;
        }
        .tab-trigger {
            padding: 0.6rem 0.8rem;
            font-size: 0.75rem;
        }
    }
</style>
