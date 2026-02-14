<script lang="ts">
    let speed = $state(1);
    let grain = $state(0.25);
    let distortion = $state(0.35);
    let hue = $state(245);
    let mode = $state<"nebula" | "plasma" | "waves">("nebula");

    const bg = $derived.by(() => {
        if (mode === "plasma") {
            return `conic-gradient(from ${hue}deg at 50% 50%, hsl(${hue} 90% 62%), hsl(${hue + 45} 90% 60%), hsl(${hue - 35} 90% 55%), hsl(${hue} 90% 62%))`;
        }
        if (mode === "waves") {
            return `radial-gradient(circle at 20% 20%, hsl(${hue + 35} 90% 65% / 0.8), transparent 42%), radial-gradient(circle at 70% 70%, hsl(${hue - 35} 90% 58% / 0.75), transparent 46%), linear-gradient(120deg, #04030d, #0d0930)`;
        }
        return `radial-gradient(circle at 25% 30%, hsl(${hue} 92% 62% / 0.75), transparent 45%), radial-gradient(circle at 75% 65%, hsl(${hue + 55} 88% 60% / 0.7), transparent 40%), linear-gradient(140deg, #05020f, #130a2e)`;
    });

    const snippet = $derived(`export const shaderPreset = {
  mode: "${mode}",
  speed: ${speed},
  grain: ${grain},
  distortion: ${distortion},
  hue: ${hue}
};`);
</script>

<div class="forge">
    <div class="controls">
        <h3>Shader Forge</h3>
        <div class="row">
            <span>Preset</span>
            <select bind:value={mode}>
                <option value="nebula">Nebula</option>
                <option value="plasma">Plasma</option>
                <option value="waves">Waves</option>
            </select>
        </div>
        <div class="row"><span>Speed</span><input type="range" min="0.2" max="2.5" step="0.1" bind:value={speed} /><span>{speed}</span></div>
        <div class="row"><span>Grain</span><input type="range" min="0" max="0.8" step="0.05" bind:value={grain} /><span>{grain}</span></div>
        <div class="row"><span>Distortion</span><input type="range" min="0" max="1" step="0.05" bind:value={distortion} /><span>{distortion}</span></div>
        <div class="row"><span>Hue</span><input type="range" min="0" max="360" step="1" bind:value={hue} /><span>{hue}deg</span></div>
    </div>

    <div class="stage">
        <div
            class="shader"
            style={`--bg:${bg};--dur:${Math.max(2, 8 / speed)}s;--grain:${grain};--dist:${distortion};`}
        >
            <div class="noise"></div>
            <div class="caption">{mode} • live preset</div>
        </div>
    </div>

    <div class="code">
        <h4>Generated preset</h4>
        <pre>{snippet}</pre>
    </div>
</div>

<style>
    .forge {
        display: grid;
        gap: 1rem;
        grid-template-columns: 260px minmax(280px, 1fr);
    }

    .controls,
    .stage,
    .code {
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
        padding: 1rem;
    }

    .controls h3,
    .code h4 {
        margin: 0 0 0.8rem;
        color: #fff;
        font-size: 0.95rem;
    }

    .row {
        display: grid;
        grid-template-columns: 84px 1fr auto;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.65rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.82rem;
    }

    select {
        background: #110b23;
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #fff;
        border-radius: 8px;
        padding: 0.35rem;
    }

    .stage {
        min-height: 260px;
    }

    .shader {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        height: 100%;
        min-height: 220px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: var(--bg);
        background-size: 120% 120%;
        filter: saturate(calc(1 + var(--dist)));
        animation: pulse var(--dur) ease-in-out infinite alternate;
    }

    .noise {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0.5px, transparent 0.5px);
        background-size: 2px 2px;
        opacity: calc(var(--grain) * 0.45);
        mix-blend-mode: soft-light;
        animation: drift calc(var(--dur) * 0.7) linear infinite;
    }

    .caption {
        position: absolute;
        left: 0.75rem;
        bottom: 0.75rem;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.82);
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .code {
        grid-column: 1 / -1;
    }

    pre {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.85);
        background: rgba(0, 0, 0, 0.26);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        padding: 0.8rem;
        overflow: auto;
    }

    @keyframes pulse {
        from {
            background-position: 10% 20%;
            transform: scale(1);
        }
        to {
            background-position: 90% 70%;
            transform: scale(1.02);
        }
    }

    @keyframes drift {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-2%, -2%, 0);
        }
    }

    @media (max-width: 900px) {
        .forge {
            grid-template-columns: 1fr;
        }
    }
</style>
