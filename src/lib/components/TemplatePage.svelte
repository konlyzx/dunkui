<script lang="ts">
    import type { RegistryItem } from "$lib/data/registry";

    let {
        title,
        item,
        backHref,
        imageSrc,
        previewUrl,
        preview,
        cliCommand,
        promptText,
    }: {
        title: string;
        item: RegistryItem | undefined;
        backHref: string;
        imageSrc: string;
        previewUrl?: string;
        preview?: import("svelte").Snippet;
        cliCommand: string;
        promptText: string;
    } = $props();

    let activeTab: "preview" | "install" | "prompt" = $state("preview");
    let copySuccess = $state("");

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
</script>

{#if item}
    <div class="component-page">
        <a href={backHref} class="back-link">← Back to {title}</a>

        <h1 class="component-title">{item.name}</h1>
        <p class="component-desc">
            {item.description ||
                `A premium ${item.name} template ready to be integrated into your project.`}
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
                    Preview Mode
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
                    Download Template
                </button>
                <button
                    class="tab-trigger"
                    class:active={activeTab === "prompt"}
                    onclick={() => (activeTab = "prompt")}
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
                        <path d="M12 20h9" /><path
                            d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                        />
                    </svg>
                    AI Prompt
                </button>
            </div>
            {#if item?.slug}
                <div class="tabs-right">
                    <a
                        href="/templates/{item.slug}"
                        target="_blank"
                        class="fullscreen-btn"
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
                                d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                            ></path>
                        </svg>
                        View Fullscreen
                    </a>
                </div>
            {/if}
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
            {#if activeTab === "preview"}
                <div class="preview-container template-preview">
                    {#if preview}
                        <div class="template-component-wrapper">
                            {@render preview()}
                        </div>
                    {:else if previewUrl}
                        <iframe
                            src={previewUrl}
                            title="{item.name} Preview"
                            class="template-iframe"
                            frameborder="0"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        ></iframe>
                    {:else}
                        <img
                            src={imageSrc}
                            alt="{item.name} Mockup"
                            class="template-image"
                        />
                    {/if}
                    <div class="preview-badge">
                        <span class="badge-dot" style="background: #38bdf8;"
                        ></span>
                        Template Mockup
                    </div>
                </div>
            {:else if activeTab === "install"}
                <div class="install-tab-content">
                    <div class="install-section">
                        <div class="install-section-header">
                            <div class="install-method">
                                <span class="method-badge npm">cli</span>
                                <span class="method-title">DunkUI CLI</span>
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
                                        copyToClipboard(cliCommand, "cli")}
                                >
                                    {#if copySuccess === "cli"}
                                        ✓
                                    {:else}
                                        Copy
                                    {/if}
                                </button>
                            </div>
                            <pre><code
                                    ><span class="prompt">$</span
                                    > {cliCommand}</code
                                ></pre>
                        </div>
                        <p class="install-note" style="margin-top: 2rem;">
                            Or download the source code wrapper as a zip
                            directly if you prefer a manual setup.
                        </p>
                        <a
                            href="https://github.com/dunkui/dunkui-templates/archive/refs/heads/main.zip"
                            target="_blank"
                            class="download-btn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                /><polyline points="7 10 12 15 17 10" /><line
                                    x1="12"
                                    y1="15"
                                    x2="12"
                                    y2="3"
                                /></svg
                            >
                            Download Full Template Source
                        </a>
                    </div>
                </div>
            {:else if activeTab === "prompt"}
                <div class="code-tab-content">
                    <div class="code-tab-header">
                        <div class="code-file-info">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path
                                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                /><polyline points="14 2 14 8 20 8" /><line
                                    x1="16"
                                    y1="13"
                                    x2="8"
                                    y2="13"
                                /><line
                                    x1="16"
                                    y1="17"
                                    x2="8"
                                    y2="17"
                                /><polyline points="10 9 9 9 8 9" /></svg
                            >
                            <span>AI Generator Prompt</span>
                            <span class="code-file-badge">prompt</span>
                        </div>
                        <button
                            class="copy-btn"
                            onclick={() =>
                                copyToClipboard(promptText, "promptText")}
                        >
                            {#if copySuccess === "promptText"}
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
                        <pre style="white-space: pre-wrap;"><code
                                >{promptText}</code
                            ></pre>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    /* Similar styles to ComponentPage.svelte with some adjustments for Templates */
    .component-page {
        max-width: 1000px;
        margin: 0 auto;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        margin-bottom: 2rem;
        color: rgba(255, 255, 255, 0.45);
        text-decoration: none;
        font-size: 0.88rem;
        transition: color 0.2s;
    }

    .back-link:hover {
        color: #fff;
    }

    .component-title {
        font-size: 2.75rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        margin-bottom: 0.75rem;
        color: #fff;
    }

    .component-desc {
        font-size: 1.15rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.55);
        margin-bottom: 3rem;
        max-width: 600px;
    }

    /* Tabs */
    .tabs-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 0.5rem;
    }

    .tabs-left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .tab-trigger {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.65rem 1rem;
        font-size: 0.88rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.45);
        background: none;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
    }

    .tab-trigger:hover {
        color: rgba(255, 255, 255, 0.88);
        background: rgba(255, 255, 255, 0.03);
    }

    .tab-trigger.active {
        color: #fff;
        background: rgba(139, 92, 246, 0.12);
    }

    .tabs-right {
        display: flex;
        align-items: center;
    }

    .fullscreen-btn {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.65rem 1rem;
        font-size: 0.88rem;
        font-weight: 500;
        color: #a855f7;
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid rgba(168, 85, 247, 0.2);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        text-decoration: none;
    }

    .fullscreen-btn:hover {
        background: rgba(168, 85, 247, 0.2);
        color: #d8b4fe;
    }

    /* Preview Container */
    .preview-container {
        position: relative;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: rgba(6, 0, 16, 0.5);
        overflow: hidden;
    }

    .template-preview {
        padding: 0;
        display: block;
        min-height: auto;
    }

    .template-image {
        width: 100%;
        display: block;
        height: auto;
    }

    .template-iframe {
        width: 100%;
        height: 600px;
        display: block;
        border: none;
        background: #fff;
    }

    .template-component-wrapper {
        width: 100%;
        height: 600px;
        overflow-y: auto;
        border: none;
        background: #000;
        position: relative;
    }

    .preview-badge {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.65rem;
        background: rgba(0, 0, 0, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 100px;
        font-size: 0.72rem;
        font-family: "JetBrains Mono", monospace;
        color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
    }

    .badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #22c55e;
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
    }

    /* Prompt/Code container */
    .code-tab-content {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
        background: rgba(6, 0, 16, 0.6);
    }

    .code-tab-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }

    .code-file-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
    }

    .code-file-badge {
        font-size: 0.6rem;
        text-transform: uppercase;
        padding: 0.15rem 0.4rem;
        background: rgba(139, 92, 246, 0.2);
        color: #a78bfa;
        border-radius: 4px;
        margin-left: 0.25rem;
    }

    .copy-btn {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.35rem 0.65rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    .code-tab-body pre {
        margin: 0;
        padding: 1.25rem;
        overflow-x: auto;
    }

    .code-tab-body code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 0.85rem;
        line-height: 1.6;
        color: #e2e8f0;
    }

    /* Install styling */
    .install-tab-content {
        padding: 1rem 0;
    }

    .install-section {
        margin-bottom: 2.5rem;
    }

    .install-section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .install-method {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .method-badge {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        text-transform: uppercase;
    }

    .method-badge.npm {
        background: #cb3837;
        color: #fff;
    }

    .method-title {
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
    }

    .method-rec {
        font-size: 0.75rem;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.1);
        padding: 0.25rem 0.65rem;
        border-radius: 100px;
        font-weight: 500;
    }

    .install-code-block {
        background: #000;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .install-code-header {
        display: flex;
        align-items: center;
        padding: 0.6rem 1rem;
        background: rgba(255, 255, 255, 0.04);
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }

    .terminal-dots {
        display: flex;
        gap: 6px;
        margin-right: 1rem;
    }

    .dot {
        width: 10px;
        height: 10px;
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
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
        flex: 1;
    }

    .install-code-block pre {
        margin: 0;
        padding: 1rem;
        overflow-x: auto;
    }

    .install-code-block code {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.85rem;
        color: #e2e8f0;
        line-height: 1.5;
    }

    .prompt {
        color: #a78bfa;
        margin-right: 0.5rem;
        user-select: none;
    }

    .install-note {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 1.5rem 0 0.5rem;
    }

    .download-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: #7c3aed;
        color: white;
        padding: 0.85rem 1.75rem;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition:
            transform 0.2s,
            background 0.2s;
        margin-top: 1rem;
        font-size: 0.95rem;
    }

    .download-btn:hover {
        background: #6d28d9;
        transform: translateY(-2px);
    }
</style>
