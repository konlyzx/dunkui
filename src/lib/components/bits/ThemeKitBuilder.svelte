<script lang="ts">
    let accent = $state("#8b5cf6");
    let accent2 = $state("#38bdf8");
    let background = $state("#05000e");
    let surface = $state("#0f0920");
    let text = $state("#ffffff");
    let radius = $state(12);
    let spacing = $state(16);
    let darkMode = $state(true);
    let copied = $state(false);

    const jsonOutput = $derived(
        JSON.stringify(
            {
                theme: {
                    colors: { accent, accent2, background, surface, text },
                    radius: { md: `${radius}px` },
                    spacing: { md: `${spacing}px` },
                    darkMode,
                },
            },
            null,
            2,
        ),
    );

    const cssVars = $derived(`:root {\n  --dui-accent: ${accent};\n  --dui-accent-2: ${accent2};\n  --dui-background: ${background};\n  --dui-surface: ${surface};\n  --dui-text: ${text};\n  --dui-radius-md: ${radius}px;\n  --dui-space-md: ${spacing}px;\n}`);

    async function copyConfig() {
        await navigator.clipboard.writeText(jsonOutput);
        copied = true;
        setTimeout(() => (copied = false), 1200);
    }
</script>

<div class="tool-grid">
    <div class="controls">
        <h3>Theme Kit</h3>
        <div class="row"><span>Accent</span><input type="color" bind:value={accent} /></div>
        <div class="row"><span>Accent 2</span><input type="color" bind:value={accent2} /></div>
        <div class="row"><span>Background</span><input type="color" bind:value={background} /></div>
        <div class="row"><span>Surface</span><input type="color" bind:value={surface} /></div>
        <div class="row"><span>Text</span><input type="color" bind:value={text} /></div>
        <div class="row"><span>Radius</span><input type="range" min="4" max="24" bind:value={radius} /><span>{radius}px</span></div>
        <div class="row"><span>Spacing</span><input type="range" min="8" max="32" bind:value={spacing} /><span>{spacing}px</span></div>
        <div class="row"><span>Dark mode</span><input type="checkbox" bind:checked={darkMode} /></div>
    </div>

    <div class="preview" style={`--accent:${accent};--accent2:${accent2};--bg:${background};--surface:${surface};--text:${text};--radius:${radius}px;--space:${spacing}px;`}>
        <div class="panel">
            <p class="kicker">Live Preview</p>
            <h4>DunkUI Card</h4>
            <p>Este bloque usa tus tokens actuales.</p>
            <button type="button">Primary Action</button>
        </div>
    </div>

    <div class="outputs">
        <div class="output-head">
            <h4>dunkui.config.json</h4>
            <button type="button" onclick={copyConfig}>{copied ? "Copiado" : "Copiar"}</button>
        </div>
        <pre>{jsonOutput}</pre>
        <h4>CSS Variables</h4>
        <pre>{cssVars}</pre>
    </div>
</div>

<style>
    .tool-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: 260px minmax(280px, 1fr);
    }

    .controls,
    .outputs,
    .preview {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 1rem;
    }

    .controls h3,
    .outputs h4 {
        margin: 0 0 0.9rem;
        color: #fff;
        font-size: 0.95rem;
    }

    .row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 0.6rem;
        align-items: center;
        margin-bottom: 0.65rem;
        color: rgba(255, 255, 255, 0.75);
        font-size: 0.82rem;
    }

    .preview {
        min-height: 220px;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 35%, transparent), transparent 55%), var(--bg);
    }

    .panel {
        width: min(360px, 100%);
        background: var(--surface);
        color: var(--text);
        border-radius: var(--radius);
        padding: var(--space);
        border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
        box-shadow: 0 18px 45px color-mix(in srgb, var(--accent2) 25%, transparent);
    }

    .kicker {
        margin: 0;
        color: color-mix(in srgb, var(--text) 60%, transparent);
        font-size: 0.75rem;
    }

    .panel h4 {
        margin: 0.25rem 0 0.35rem;
    }

    .panel p {
        margin: 0 0 0.9rem;
        font-size: 0.85rem;
        color: color-mix(in srgb, var(--text) 75%, transparent);
    }

    .panel button {
        border: none;
        border-radius: calc(var(--radius) - 4px);
        padding: 0.55rem 0.85rem;
        font-weight: 600;
        color: #fff;
        background: linear-gradient(90deg, var(--accent), var(--accent2));
    }

    .outputs {
        grid-column: 1 / -1;
    }

    .output-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .output-head button {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        color: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        padding: 0.35rem 0.65rem;
        font-size: 0.78rem;
    }

    pre {
        margin: 0 0 1rem;
        font-size: 0.78rem;
        line-height: 1.6;
        overflow: auto;
        color: rgba(255, 255, 255, 0.82);
        background: rgba(0, 0, 0, 0.26);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        padding: 0.8rem;
    }

    @media (max-width: 900px) {
        .tool-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
