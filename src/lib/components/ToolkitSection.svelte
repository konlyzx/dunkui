<section class="sandbox-section">
    <span class="section-label fade-in">Realtime Customization</span>
    <div class="sandbox fade-in">
        <div class="editor-side">
            <div class="editor-header">
                <span class="editor-dot red"></span>
                <span class="editor-dot yellow"></span>
                <span class="editor-dot green"></span>
                <span class="editor-filename">Canvas.svelte</span>
            </div>
            <div class="editor-code">
                <pre><code
                        ><span class="code-tag">&lt;Canvas&gt;</span>
  <span class="code-comp">&lt;GlitchText</span>
    <span class="code-attr">strength</span>={"{"}1.5{"}"}
    <span class="code-attr">colors</span>={"{"}[<span class="code-str"
                            >"#f0f"</span
                        >, <span class="code-str">"#0ff"</span>]{"}"}
    <span class="code-attr">speed</span>={"{"}0.8{"}"}
  <span class="code-comp">/&gt;</span>
<span class="code-tag">&lt;/Canvas&gt;</span>

<span class="code-comment">{"// Live preview ──────►"}</span></code
                    ></pre>
            </div>
        </div>
        <div class="preview-side">
            <div class="preview-content">
                <div class="preview-text" data-text="DUNK UI">DUNK UI</div>
            </div>
        </div>
    </div>
</section>

<style>
    .sandbox-section {
        padding: 80px 20px;
        position: relative;
    }

    .section-label {
        font-size: 0.85rem;
        color: var(--accent-light);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 24px;
        display: block;
        text-align: center;
    }

    .sandbox {
        max-width: 1000px;
        margin: 0 auto;
        background: #000;
        border: 1px solid var(--stroke);
        border-radius: var(--radius-xl);
        display: flex;
        height: 500px;
        overflow: hidden;
        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.8);
    }

    .editor-side {
        width: 50%;
        border-right: 1px solid var(--stroke);
        display: flex;
        flex-direction: column;
    }

    .editor-header {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 14px 20px;
        border-bottom: 1px solid var(--stroke);
        background: rgba(255, 255, 255, 0.02);
    }

    .editor-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .editor-dot.red {
        background: #ff5f57;
    }
    .editor-dot.yellow {
        background: #febc2e;
    }
    .editor-dot.green {
        background: #28c840;
    }

    .editor-filename {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        color: var(--muted);
        margin-left: 10px;
    }

    .editor-code {
        padding: 30px;
        flex: 1;
        display: flex;
        align-items: flex-start;
    }

    .editor-code pre {
        margin: 0;
    }

    .editor-code code {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.9rem;
        line-height: 1.9;
        color: var(--muted);
    }

    .code-tag {
        color: #6366f1;
    }
    .code-comp {
        color: var(--accent-light);
    }
    .code-attr {
        color: #a78bfa;
    }
    .code-str {
        color: #4ade80;
    }
    .code-comment {
        color: #4b4275;
    }

    .preview-side {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at center, #110022 0%, #000 100%);
        position: relative;
    }

    .preview-content {
        position: relative;
    }

    .preview-text {
        font-weight: 800;
        font-size: 2.5rem;
        letter-spacing: -2px;
        border: 1px dashed rgba(255, 255, 255, 0.15);
        padding: 20px 32px;
        border-radius: 12px;
        position: relative;
        user-select: none;
        transition: all 0.3s var(--ease-apple);
    }

    .preview-text:hover {
        border-color: var(--accent);
        box-shadow: 0 0 30px rgba(255, 62, 0, 0.15);
    }

    /* Glitch on hover */
    .preview-text::before,
    .preview-text::after {
        content: attr(data-text);
        position: absolute;
        left: 32px;
        top: 20px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .preview-text:hover::before {
        color: #ff0055;
        opacity: 0.6;
        animation: glitchPrev 0.3s steps(2) infinite;
        clip-path: inset(0 0 60% 0);
    }

    .preview-text:hover::after {
        color: #00ffff;
        opacity: 0.6;
        animation: glitchPrev 0.3s 0.1s steps(2) infinite reverse;
        clip-path: inset(60% 0 0 0);
    }

    @keyframes glitchPrev {
        0% {
            transform: translate(0);
        }
        50% {
            transform: translate(-2px, 1px);
        }
        100% {
            transform: translate(2px, -1px);
        }
    }

    /* Fade-in */
    .fade-in {
        opacity: 0;
        transform: translateY(60px);
        transition:
            opacity 1.2s var(--ease-apple),
            transform 1.2s var(--ease-apple);
    }

    .fade-in:global(.visible) {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        .sandbox {
            flex-direction: column;
            height: auto;
        }
        .editor-side,
        .preview-side {
            width: 100%;
        }
        .preview-side {
            min-height: 250px;
            border-top: 1px solid var(--stroke);
        }
        .editor-side {
            border-right: none;
        }
    }
</style>
