<svelte:head><title>Shader Forge — DunkUI</title></svelte:head>
<div class="comp-page">
    <h2 class="sub-category">Shader Forge</h2>
    <p class="page-desc">
        Visual node editor to create custom WebGL shaders without writing GLSL
        code manually. Connect nodes, tweak params, export ready-to-use
        components.
    </p>
    <div class="tag-row">
        <span class="tag purple">WebGL</span><span class="tag">Tool</span><span
            class="tag">Editor</span
        >
    </div>

    <div class="preview-container">
        <div class="preview-box">
            <div class="forge-demo">
                <div class="node node-input">
                    <span class="node-title">Time</span>
                    <div class="node-port out"></div>
                </div>
                <div class="node node-math">
                    <span class="node-title">Sin</span>
                    <div class="node-port in"></div>
                    <div class="node-port out"></div>
                </div>
                <div class="node node-output">
                    <span class="node-title">Color</span>
                    <div class="node-port in"></div>
                </div>
                <svg class="node-connections" width="100%" height="100%">
                    <path
                        d="M 180 110 C 230 110, 230 160, 280 160"
                        stroke="rgba(139,92,246,0.4)"
                        stroke-width="2"
                        fill="none"
                    />
                    <path
                        d="M 370 160 C 420 160, 420 210, 470 210"
                        stroke="rgba(56,189,248,0.4)"
                        stroke-width="2"
                        fill="none"
                    />
                </svg>
            </div>
        </div>
    </div>

    <div class="coming-soon">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            ><path d="M12 2l1 3h-2l1-3z" /><path
                d="M4.93 4.93l2.12 2.12-1.42 1.42-2.12-2.12z"
            /><path d="M2 12h3v0H2z" /><rect
                x="5"
                y="13"
                width="14"
                height="8"
                rx="1"
            /><path d="M9 13v-2a3 3 0 016 0v2" /></svg
        >
        <p>Shader Forge is under active development. Stay tuned!</p>
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
        margin-bottom: 0.6rem;
    }
    .page-desc {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.45);
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    .tag-row {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
    }
    .tag {
        font-size: 0.68rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 3px 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .tag.purple {
        background: rgba(139, 92, 246, 0.12);
        color: #a78bfa;
        border-color: rgba(139, 92, 246, 0.2);
    }
    .preview-container {
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 2rem;
    }
    .preview-box {
        height: 320px;
        position: relative;
        background: #05000e;
        overflow: hidden;
    }
    .forge-demo {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 2rem;
    }
    .node {
        position: absolute;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 0.75rem 1.25rem;
        min-width: 100px;
        text-align: center;
    }
    .node-input {
        top: 80px;
        left: 80px;
        border-color: rgba(139, 92, 246, 0.3);
    }
    .node-math {
        top: 130px;
        left: 250px;
        border-color: rgba(56, 189, 248, 0.3);
    }
    .node-output {
        top: 180px;
        left: 420px;
        border-color: rgba(74, 222, 128, 0.3);
    }
    .node-title {
        font-size: 0.82rem;
        font-weight: 600;
        color: #fff;
    }
    .node-port {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .node-port.in {
        left: -5px;
        background: #8b5cf6;
    }
    .node-port.out {
        right: -5px;
        background: #38bdf8;
    }
    .node-connections {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }
    .coming-soon {
        text-align: center;
        padding: 3rem 2rem;
        color: rgba(255, 255, 255, 0.35);
    }
    .coming-soon p {
        margin-top: 0.75rem;
        font-size: 0.95rem;
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
