<script lang="ts">
    let speed = $state(0.5);
    let intensity = $state(1.2);
    let blur = $state(40);
    let color1 = $state("#8b5cf6");
    let color2 = $state("#38bdf8");
    let color3 = $state("#f43f5e");
    let isFavorite = $state(false);
    let activeTab: "preview" | "code" | "contribute" = $state("preview");
    const codeString = $derived(
        `<script>\n  import { Aurora } from 'dunk-ui';\n<\/script>\n\n<Aurora\n  speed={${speed}}\n  intensity={${intensity}}\n  blur={${blur}}\n  colors={["${color1}", "${color2}", "${color3}"]}\n/>`,
    );
    const props = [
        {
            name: "speed",
            type: "number",
            default: "0.5",
            desc: "Animation speed multiplier for wave motion.",
        },
        {
            name: "intensity",
            type: "number",
            default: "1.2",
            desc: "Opacity/strength of the aurora glow.",
        },
        {
            name: "colors",
            type: "string[]",
            default: '["#8b5cf6","#38bdf8","#f43f5e"]',
            desc: "Three hex colors for gradient wave layers.",
        },
        {
            name: "blur",
            type: "number",
            default: "40",
            desc: "Gaussian blur radius in pixels applied to waves.",
        },
    ];
</script>

<svelte:head><title>Aurora Borealis — DunkUI</title></svelte:head>
<div class="comp-page">
    <h2 class="sub-category">Aurora Borealis</h2>
    <div class="tabs-bar">
        <div class="tabs-left">
            <button
                class="tab-trigger"
                class:active={activeTab === "preview"}
                onclick={() => (activeTab = "preview")}
                ><svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    ><path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    /><circle cx="12" cy="12" r="3" /></svg
                > Preview</button
            >
            <button
                class="tab-trigger"
                class:active={activeTab === "code"}
                onclick={() => (activeTab = "code")}
                ><svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    ><polyline points="16 18 22 12 16 6" /><polyline
                        points="8 6 2 12 8 18"
                    /></svg
                > Code</button
            >
        </div>
        <div class="tabs-right">
            <button
                class="fav-btn"
                aria-label="Toggle favorite"
                class:favorited={isFavorite}
                onclick={() => (isFavorite = !isFavorite)}
                ><svg
                    stroke="currentColor"
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    ><path
                        d="M12 4.53C14.35 2.42 17.98 2.49 20.24 4.76c2.26 2.27 2.34 5.88.23 8.23L12 21.49 3.52 12.99C1.42 10.64 1.5 7.02 3.76 4.76 6.02 2.49 9.65 2.42 12 4.53z"
                    /></svg
                ></button
            >
            <button
                class="tab-trigger contribute-tab"
                class:active={activeTab === "contribute"}
                onclick={() => (activeTab = "contribute")}
                ><svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    ><path
                        d="M9.97 18H11V13h2v5h1.03c.13-1.2.77-2.19 1.77-3.28.11-.12.83-.86.92-.97A7.94 7.94 0 0 0 18 10c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 1.38.47 2.69 1.31 3.75.09.11.81.85.92.97 1 1.08 1.61 2.07 1.74 3.28zM10 20v1h4v-1h-4zM5.75 15C4.66 13.63 4 11.89 4 10c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.89-.66 3.63-1.76 5-.62.77-2.24 2-2.24 3.5V21c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-2.5c0-1.5-1.63-2.73-2.25-3.5z"
                    /></svg
                > Contribute</button
            >
        </div>
    </div>
    {#if activeTab === "preview"}
        <div class="demo-container">
            <div class="preview-box">
                <div class="aurora-demo">
                    <div
                        class="aurora-wave one"
                        style="filter:blur({blur}px);background:linear-gradient(90deg,{color1}33,{color2}33,{color1}33)"
                    ></div>
                    <div
                        class="aurora-wave two"
                        style="filter:blur({blur}px);background:linear-gradient(90deg,{color2}33,{color3}33,{color2}33)"
                    ></div>
                    <div
                        class="aurora-wave three"
                        style="filter:blur({blur}px);background:linear-gradient(90deg,{color3}33,{color1}33,{color3}33)"
                    ></div>
                </div>
            </div>
            <div class="preview-options">
                <h2 class="section-title">Customize</h2>
                <div class="colors-row">
                    <span class="opt-label">Colors</span><input
                        type="color"
                        bind:value={color1}
                        class="color-input"
                    /><input
                        type="color"
                        bind:value={color2}
                        class="color-input"
                    /><input
                        type="color"
                        bind:value={color3}
                        class="color-input"
                    />
                </div>
                <div class="opt-row">
                    <span class="opt-label">Speed</span><input
                        type="range"
                        bind:value={speed}
                        min={0.1}
                        max={2}
                        step={0.1}
                    /><span class="opt-val">{speed}</span>
                </div>
                <div class="opt-row">
                    <span class="opt-label">Intensity</span><input
                        type="range"
                        bind:value={intensity}
                        min={0.1}
                        max={3}
                        step={0.1}
                    /><span class="opt-val">{intensity}</span>
                </div>
                <div class="opt-row">
                    <span class="opt-label">Blur</span><input
                        type="range"
                        bind:value={blur}
                        min={0}
                        max={100}
                        step={5}
                    /><span class="opt-val">{blur}</span>
                </div>
            </div>
        </div>
    {/if}
    {#if activeTab === "code"}<div class="code-container">
            <pre><code>{codeString}</code></pre>
        </div>{/if}
    {#if activeTab === "contribute"}<div class="contribute-container">
            <p>Want to improve this component? We welcome contributions!</p>
            <a
                href="https://github.com"
                class="contribute-link"
                target="_blank"
                rel="noopener noreferrer"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C3.62.65 2.42 1 2.42 1a5.07 5.07 0 0 0-.57 3.77 5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    /></svg
                >View on GitHub</a
            >
        </div>{/if}
    <div class="section-block">
        <h2 class="section-title">Props</h2>
        <div class="table-wrap">
            <table class="props-table">
                <thead
                    ><tr
                        ><th>Property</th><th>Type</th><th>Default</th><th
                            >Description</th
                        ></tr
                    ></thead
                ><tbody
                    >{#each props as p, i}<tr
                            class:last-row={i === props.length - 1}
                            ><td><code class="prop-name">{p.name}</code></td><td
                                ><span class="type-badge">{p.type}</span></td
                            ><td
                                ><code class="default-val">{p.default}</code
                                ></td
                            ><td class="desc-cell">{p.desc}</td></tr
                        >{/each}</tbody
                >
            </table>
        </div>
    </div>
    <div class="preview-footer">
        <p class="footer-desc">
            Created with <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                class="footer-heart"
                height="1em"
                width="1em"
                ><path
                    d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"
                /></svg
            >
            by
            <a
                href="https://github.com/dunkui"
                target="_blank"
                class="footer-link">dunkui team</a
            >
        </p>
    </div>
</div>

<style>
    .comp-page {
        max-width: 100%;
    }
    .sub-category {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: #fff;
        margin-bottom: 1.25rem;
    }
    .tabs-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-bottom: none;
        border-radius: 12px 12px 0 0;
        background: rgba(255, 255, 255, 0.02);
        overflow: hidden;
    }
    .tabs-left,
    .tabs-right {
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
        color: rgba(255, 255, 255, 0.45);
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
    }
    .tab-trigger:hover {
        color: rgba(255, 255, 255, 0.8);
    }
    .tab-trigger.active {
        color: #fff;
        background: rgba(139, 92, 246, 0.08);
    }
    .contribute-tab {
        border-right: none;
        border-left: 1px solid rgba(255, 255, 255, 0.05);
    }
    .fav-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        padding: 0.7rem 0;
        background: none;
        border: none;
        border-left: 1px solid rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
    }
    .fav-btn:hover {
        color: rgba(255, 255, 255, 0.6);
    }
    .fav-btn.favorited {
        color: #ef4444;
    }
    .demo-container {
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-top: none;
        border-radius: 0 0 12px 12px;
        overflow: hidden;
        background: rgba(6, 0, 16, 0.5);
        margin-bottom: 2rem;
    }
    .preview-box {
        position: relative;
        height: 350px;
        background: #05000e;
        overflow: hidden;
    }
    .aurora-demo {
        position: absolute;
        inset: 0;
    }
    .aurora-wave {
        position: absolute;
        bottom: 0;
        left: -20%;
        width: 140%;
        border-radius: 50% 50% 0 0;
    }
    .aurora-wave.one {
        height: 50%;
        animation: af 5s ease-in-out infinite;
    }
    .aurora-wave.two {
        height: 40%;
        animation: af 7s ease-in-out infinite reverse;
    }
    .aurora-wave.three {
        height: 35%;
        animation: af 4s ease-in-out infinite;
    }
    @keyframes af {
        0%,
        100% {
            transform: translateX(0) scaleY(1);
        }
        50% {
            transform: translateX(5%) scaleY(1.15);
        }
    }
    .preview-options {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding: 1.5rem;
    }
    .section-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 1.25rem;
        letter-spacing: -0.02em;
    }
    .colors-row {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .opt-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.55rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.025);
    }
    .opt-row:last-child {
        border-bottom: none;
    }
    .opt-label {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.45);
        font-weight: 500;
        min-width: 150px;
        flex-shrink: 0;
    }
    .opt-val {
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.45);
        font-family: "JetBrains Mono", monospace;
        min-width: 40px;
        text-align: right;
    }
    .color-input {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        background: transparent;
        padding: 0;
        appearance: none;
    }
    .color-input::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    .color-input::-webkit-color-swatch {
        border: 2px solid rgba(255, 255, 255, 0.15);
        border-radius: 50%;
    }
    input[type="range"] {
        flex: 1;
        appearance: none;
        height: 4px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 2px;
        outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    }
    .code-container {
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-top: none;
        border-radius: 0 0 12px 12px;
        background: rgba(5, 0, 14, 0.8);
        margin-bottom: 2rem;
    }
    .code-container pre {
        padding: 1.5rem;
        overflow-x: auto;
        margin: 0;
    }
    .code-container code {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.82rem;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.6);
    }
    .contribute-container {
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-top: none;
        border-radius: 0 0 12px 12px;
        padding: 2rem;
        margin-bottom: 2rem;
        text-align: center;
    }
    .contribute-container p {
        color: rgba(255, 255, 255, 0.45);
        margin: 0 0 1rem;
    }
    .contribute-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1.2rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #fff;
        font-size: 0.85rem;
        font-weight: 600;
        transition: all 0.2s;
        text-decoration: none;
    }
    .contribute-link:hover {
        border-color: #7c3aed;
        background: rgba(139, 92, 246, 0.08);
    }
    .section-block {
        margin-bottom: 2rem;
    }
    .table-wrap {
        overflow-x: auto;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
    }
    .props-table {
        width: 100%;
        border-collapse: collapse;
    }
    .props-table th {
        text-align: left;
        padding: 0.7rem 1rem;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        font-weight: 600;
    }
    .props-table td {
        padding: 0.65rem 1rem;
        font-size: 0.82rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        vertical-align: top;
    }
    .props-table tr.last-row td {
        border-bottom: none;
    }
    .prop-name {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.78rem;
        color: #a78bfa;
        background: rgba(139, 92, 246, 0.08);
        padding: 2px 6px;
        border-radius: 4px;
    }
    .type-badge {
        font-size: 0.72rem;
        font-family: "JetBrains Mono", monospace;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.08);
        padding: 2px 6px;
        border-radius: 4px;
    }
    .default-val {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.55);
        background: rgba(255, 255, 255, 0.03);
        padding: 2px 6px;
        border-radius: 4px;
    }
    .desc-cell {
        color: rgba(255, 255, 255, 0.4);
        line-height: 1.5;
    }
    .preview-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.04);
        padding: 2rem 0;
        text-align: center;
    }
    .footer-desc {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        margin: 0;
    }
    .footer-heart {
        color: #ef4444;
        margin: 0 0.15rem;
    }
    .footer-link {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
    }
    .footer-link:hover {
        color: #fff;
        text-decoration: underline;
    }
</style>
