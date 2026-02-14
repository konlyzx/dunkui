<script lang="ts">
    import { onMount } from "svelte";
    import type { Component } from "svelte";
    import type { JSXBridgeItem } from "$lib/data/jsx-bridge-registry";

    type Tab = "preview" | "code";
    type RegistryFile = { path?: string; content?: string };
    type RegistryDoc = {
        title?: string;
        description?: string;
        dependencies?: string[];
        files?: RegistryFile[];
    };

    type ControlKind = "none" | "number" | "boolean" | "color" | "text";

    type PropRow = {
        name: string;
        type: string;
        defaultValue: string;
        description: string;
        control: ControlKind;
    };

    let {
        title,
        item,
        modules,
        backHref,
    }: {
        title: string;
        item: JSXBridgeItem | undefined;
        modules: Record<string, () => Promise<any>>;
        backHref: string;
    } = $props();

    const registryModules = import.meta.glob("/src/r/*.json", {
        import: "default",
    }) as Record<string, () => Promise<RegistryDoc>>;

    const GITHUB_REPO_URL = "https://github.com/dunkui";
    const FAVORITES_STORAGE_KEY = "docs:favorites";

    let SelectedComponent = $state<Component | null>(null);
    let loadError = $state<string | null>(null);
    let loading = $state(false);

    let registryDoc = $state<RegistryDoc | null>(null);
    let svelteSnippet = $state("");
    let propRows = $state<PropRow[]>([]);
    let liveProps = $state<Record<string, unknown>>({});
    let copyStatus = $state<"idle" | "copied" | "error">("idle");

    let activeTab = $state<Tab>("preview");
    let favoriteSet = $state<Set<string>>(new Set());

    const isBackground = $derived(backHref === "/docs/backgrounds");
    const pageTitle = $derived(item?.name ?? "Not Found");
    const pageDescription = $derived(
        registryDoc?.description ?? `Svelte 5 bridge for ${pageTitle}.`,
    );
    const dependencyList = $derived(registryDoc?.dependencies ?? []);
    const favoriteKey = $derived(item?.id ?? item?.slug ?? "");
    const isFavorite = $derived(favoriteKey ? favoriteSet.has(favoriteKey) : false);
    const displayCode = $derived(
        svelteSnippet || "// Svelte 5 snippet not available for this item.",
    );
    const selectedProps = $derived({
        ...liveProps,
        className: isBackground ? "bridge-fill" : "bridge-fit",
        style: isBackground ? { width: "100%", height: "100%" } : undefined,
    });

    onMount(() => {
        try {
            const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                favoriteSet = new Set(
                    parsed.filter((value): value is string => typeof value === "string"),
                );
            }
        } catch {
            // Ignore malformed localStorage payloads.
        }
    });

    function persistFavorites(next: Set<string>) {
        favoriteSet = new Set(next);
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...next]));
            window.dispatchEvent(new CustomEvent("favorites:updated"));
        } catch {
            // Ignore storage errors (private mode / quota).
        }
    }

    function toggleFavorite() {
        if (!favoriteKey) return;

        const next = new Set(favoriteSet);
        if (next.has(favoriteKey)) {
            next.delete(favoriteKey);
        } else {
            next.add(favoriteKey);
        }
        persistFavorites(next);
    }

    function toRegistryStem(name: string) {
        return name
            .replace(/[^a-zA-Z0-9]+/g, " ")
            .split(" ")
            .filter(Boolean)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("");
    }

    function buildSvelteSnippet() {
        if (!item) {
            svelteSnippet = "";
            return;
        }

        const componentName = toRegistryStem(item.name) || "ComponentPreview";
        const importPath = `/src/${item.sveltePath}`;

        svelteSnippet = `<script lang="ts">\n  import ${componentName} from "${importPath}";\n<\\/script>\n\n<${componentName} />\n`;
    }

    function getRegistryModuleKey(itemName: string) {
        const keys = Object.keys(registryModules);
        const stem = toRegistryStem(itemName);

        const preferred = [
            `${stem}-TS-TW.json`,
            `${stem}-TS-CSS.json`,
            `${stem}-JS-TW.json`,
            `${stem}-JS-CSS.json`,
        ];

        for (const fileName of preferred) {
            const exact = keys.find((key) => key.endsWith(`/src/r/${fileName}`));
            if (exact) return exact;
        }

        return (
            keys.find((key) => key.includes(`/src/r/${stem}-`)) ??
            keys.find((key) => key.includes(`/src/r/${itemName.replace(/\s+/g, "")}-`))
        );
    }

    function parseInterfaceProps(source: string) {
        const rows: Array<{ name: string; type: string }> = [];

        const match = source.match(
            /(?:export\s+)?interface\s+[A-Za-z0-9_]+Props(?:\s+extends\s+[^\{]+)?\s*\{([\s\S]*?)\n\}/m,
        );

        if (!match?.[1]) return rows;

        const block = match[1];
        const propRegex = /^\s*([A-Za-z0-9_]+)\??:\s*([^;]+);\s*$/gm;

        let m: RegExpExecArray | null = null;
        while ((m = propRegex.exec(block)) !== null) {
            rows.push({
                name: m[1],
                type: m[2].trim(),
            });
        }

        return rows;
    }

    function splitTopLevelTokens(input: string) {
        const tokens: string[] = [];
        let current = "";
        let parenDepth = 0;
        let braceDepth = 0;
        let bracketDepth = 0;
        let quote: "" | "'" | '"' | "`" = "";
        let escaped = false;

        for (const char of input) {
            if (quote) {
                current += char;
                if (escaped) {
                    escaped = false;
                    continue;
                }
                if (char === "\\") {
                    escaped = true;
                    continue;
                }
                if (char === quote) quote = "";
                continue;
            }

            if (char === "'" || char === '"' || char === "`") {
                quote = char;
                current += char;
                continue;
            }

            if (char === "(") parenDepth += 1;
            if (char === ")") parenDepth = Math.max(0, parenDepth - 1);
            if (char === "{") braceDepth += 1;
            if (char === "}") braceDepth = Math.max(0, braceDepth - 1);
            if (char === "[") bracketDepth += 1;
            if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);

            if (
                char === "," &&
                parenDepth === 0 &&
                braceDepth === 0 &&
                bracketDepth === 0
            ) {
                const token = current.trim();
                if (token) tokens.push(token);
                current = "";
                continue;
            }

            current += char;
        }

        const last = current.trim();
        if (last) tokens.push(last);

        return tokens;
    }

    function parseDefaultMap(source: string) {
        const defaults = new Map<string, string>();

        const fromConst = source.match(
            /=\s*\(\s*\{([\s\S]*?)\}\s*(?::\s*[^\)]*)?\)\s*=>/m,
        )?.[1];

        const fromFunction = source.match(
            /function\s+[A-Za-z0-9_]+\s*\(\s*\{([\s\S]*?)\}\s*(?::\s*[^\)]*)?\)/m,
        )?.[1];

        const block = fromConst ?? fromFunction;
        if (!block) return defaults;

        const tokens = splitTopLevelTokens(block);

        for (const token of tokens) {
            if (!token || token.startsWith("...")) continue;

            const eqIndex = token.indexOf("=");
            if (eqIndex < 0) continue;

            const left = token.slice(0, eqIndex).trim();
            const right = token.slice(eqIndex + 1).trim();
            if (!left || !right) continue;

            const namedLeft = left.includes(":")
                ? left.split(":").at(-1)?.trim() ?? left
                : left;

            const propName = namedLeft.replace(/\?/g, "");
            if (!propName) continue;

            defaults.set(propName, right);
        }

        return defaults;
    }

    function readStringLiteral(raw: string) {
        const value = raw.trim();
        const hasSingle = value.startsWith("'") && value.endsWith("'");
        const hasDouble = value.startsWith('"') && value.endsWith('"');

        if (!hasSingle && !hasDouble) return null;

        return value
            .slice(1, -1)
            .replace(/\\'/g, "'")
            .replace(/\\\"/g, '"')
            .replace(/\\n/g, "\n");
    }

    function parseNumberLiteral(raw: string) {
        const normalized = raw.trim().replace(/_/g, "");
        if (!/^-?\d+(\.\d+)?$/.test(normalized)) return null;

        const value = Number(normalized);
        return Number.isFinite(value) ? value : null;
    }

    function inferControl(type: string, defaultValue: string): ControlKind {
        const normalizedType = type.trim();
        const normalizedDefault = defaultValue.trim();

        if (normalizedType.includes("boolean") && /^(true|false)$/.test(normalizedDefault)) {
            return "boolean";
        }

        if (normalizedType.includes("number") && parseNumberLiteral(normalizedDefault) !== null) {
            return "number";
        }

        const str = readStringLiteral(normalizedDefault);
        if (str !== null) {
            if (/^#[0-9a-fA-F]{6}$/.test(str) || /^#[0-9a-fA-F]{3}$/.test(str)) {
                return "color";
            }
            return "text";
        }

        return "none";
    }

    function toLabel(name: string) {
        return name
            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            .replace(/[_-]/g, " ")
            .replace(/^./, (char) => char.toUpperCase());
    }

    function toDescription(name: string, type: string) {
        if (type.includes("boolean")) return `Enable or disable ${toLabel(name).toLowerCase()}.`;
        if (type.includes("number")) return `Numeric value for ${toLabel(name).toLowerCase()}.`;
        if (type.includes("[]")) return `Collection value for ${toLabel(name).toLowerCase()}.`;
        if (type.includes("string")) return `String value for ${toLabel(name).toLowerCase()}.`;
        return `Configuration value for ${toLabel(name).toLowerCase()}.`;
    }

    function buildPropRowsFromCode(source: string) {
        const skip = new Set(["children", "className", "style", "ref", "key"]);
        const parsedProps = parseInterfaceProps(source);
        const defaultMap = parseDefaultMap(source);

        const rows: PropRow[] = [];
        const seen = new Set<string>();

        for (const parsed of parsedProps) {
            if (skip.has(parsed.name)) continue;

            const defaultRaw = defaultMap.get(parsed.name) ?? "-";
            const control = inferControl(parsed.type, defaultRaw);

            rows.push({
                name: parsed.name,
                type: parsed.type,
                defaultValue: defaultRaw,
                description: toDescription(parsed.name, parsed.type),
                control,
            });
            seen.add(parsed.name);
        }

        for (const [name, value] of defaultMap.entries()) {
            if (skip.has(name) || seen.has(name)) continue;

            const control = inferControl("unknown", value);
            rows.push({
                name,
                type: "unknown",
                defaultValue: value,
                description: toDescription(name, "unknown"),
                control,
            });
        }

        return rows;
    }

    function defaultControlValue(prop: PropRow): unknown {
        if (prop.control === "boolean") return prop.defaultValue.trim() === "true";
        if (prop.control === "number") return parseNumberLiteral(prop.defaultValue) ?? 0;
        if (prop.control === "color" || prop.control === "text") {
            return readStringLiteral(prop.defaultValue) ?? "";
        }
        return prop.defaultValue;
    }

    function getControlValue(prop: PropRow): unknown {
        if (prop.name in liveProps) return liveProps[prop.name];
        return defaultControlValue(prop);
    }

    async function loadRegistryDetails() {
        if (!item) {
            registryDoc = null;
            propRows = [];
            liveProps = {};
            return;
        }

        const moduleKey = getRegistryModuleKey(item.name);
        if (!moduleKey) {
            registryDoc = null;
            propRows = [];
            liveProps = {};
            return;
        }

        try {
            const doc = await registryModules[moduleKey]();
            registryDoc = doc;

            const source = doc.files?.find((file) => !!file.content)?.content ?? "";
            propRows = buildPropRowsFromCode(source);
            liveProps = {};
        } catch {
            registryDoc = null;
            propRows = [];
            liveProps = {};
        }
    }

    async function loadComponentPreview() {
        if (!item) {
            SelectedComponent = null;
            loadError = "Component not found";
            return;
        }

        const loader = modules[item.moduleKey];
        if (!loader) {
            SelectedComponent = null;
            loadError = `No module found for ${item.moduleKey}`;
            return;
        }

        try {
            const mod = await loader();
            SelectedComponent = (mod?.default ?? null) as Component | null;
            loadError = null;
        } catch (err) {
            SelectedComponent = null;
            loadError = err instanceof Error ? err.message : "Failed to load module";
        }
    }

    async function loadItem() {
        loading = true;
        activeTab = "preview";
        copyStatus = "idle";
        buildSvelteSnippet();

        try {
            await Promise.all([loadComponentPreview(), loadRegistryDetails()]);
        } finally {
            loading = false;
        }
    }

    async function copyCode() {
        copyStatus = "idle";
        const text = displayCode;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            copyStatus = "copied";
            setTimeout(() => {
                copyStatus = "idle";
            }, 1200);
        } catch {
            try {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                copyStatus = "copied";
                setTimeout(() => {
                    copyStatus = "idle";
                }, 1200);
            } catch {
                copyStatus = "error";
            }
        }
    }

    function setLiveProp(name: string, value: unknown) {
        liveProps = { ...liveProps, [name]: value };
    }

    function handleNumberInput(name: string, value: string) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return;
        setLiveProp(name, parsed);
    }

    $effect(() => {
        item?.id;
        loadItem();
    });
</script>

<section class="component-page">
    <header class="page-header">
        <a href={backHref} class="back-link">← Back to {title}</a>
        <h1>{pageTitle}</h1>
        <p>{pageDescription}</p>
    </header>

    <div class="tabs-bar">
        <div class="tabs-left">
            <button
                type="button"
                class="tab-trigger"
                class:active={activeTab === "preview"}
                onclick={() => (activeTab = "preview")}
            >
                Preview
            </button>
            <button
                type="button"
                class="tab-trigger"
                class:active={activeTab === "code"}
                onclick={() => (activeTab = "code")}
            >
                Code
            </button>
        </div>

        <div class="tabs-right">
            <button
                type="button"
                class="fav-btn"
                class:favorited={isFavorite}
                aria-label="Toggle favorite"
                onclick={toggleFavorite}
            >
                {isFavorite ? "♥" : "♡"}
            </button>
            <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                class="contribute-link"
            >
                Contribute
            </a>
        </div>
    </div>

    {#if activeTab === "preview"}
        <div class="preview-shell">
            <div class="preview-stage" class:background-stage={isBackground}>
                <div class="preview-topbar">
                    <span>React Bits</span>
                    <div class="preview-links"><span>Home</span><span>Docs</span></div>
                </div>

                <div class="preview-host" class:fill-mode={isBackground}>
                    {#if loading}
                        <p class="status">Loading component...</p>
                    {:else if loadError}
                        <p class="status error">{loadError}</p>
                    {:else if SelectedComponent}
                        <div class="preview-inner" class:fill-mode={isBackground}>
                            <SelectedComponent {...selectedProps} />
                        </div>
                    {:else}
                        <p class="status">No preview available.</p>
                    {/if}
                </div>
            </div>
        </div>

        <section class="section-block controls-block">
            <div class="controls-head">
                <h2>Customize</h2>
                {#if isBackground}
                    <a href="/docs/tools" class="studio-btn">Open in BG Studio</a>
                {/if}
            </div>

            {#if propRows.length === 0}
                <p class="empty-note">No runtime controls found for this component.</p>
            {:else}
                <div class="controls-grid">
                    {#each propRows as prop}
                        <div class="control-row">
                            <span class="control-label">{toLabel(prop.name)}</span>

                            {#if prop.control === "boolean"}
                                <input
                                    type="checkbox"
                                    checked={Boolean(getControlValue(prop))}
                                    onchange={(event) =>
                                        setLiveProp(
                                            prop.name,
                                            (event.currentTarget as HTMLInputElement).checked,
                                        )}
                                />
                            {:else if prop.control === "number"}
                                <input
                                    type="number"
                                    value={String(getControlValue(prop))}
                                    oninput={(event) =>
                                        handleNumberInput(
                                            prop.name,
                                            (event.currentTarget as HTMLInputElement).value,
                                        )}
                                />
                            {:else if prop.control === "color"}
                                <input
                                    type="color"
                                    value={String(getControlValue(prop) || "#ffffff")}
                                    onchange={(event) =>
                                        setLiveProp(
                                            prop.name,
                                            (event.currentTarget as HTMLInputElement).value,
                                        )}
                                />
                            {:else if prop.control === "text"}
                                <input
                                    type="text"
                                    value={String(getControlValue(prop) ?? "")}
                                    oninput={(event) =>
                                        setLiveProp(
                                            prop.name,
                                            (event.currentTarget as HTMLInputElement).value,
                                        )}
                                />
                            {:else}
                                <code class="control-readonly">{prop.defaultValue}</code>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </section>
    {:else}
        <section class="section-block code-block">
            <div class="code-toolbar">
                <span class="code-label">Svelte 5</span>
                <button type="button" class="copy-btn" onclick={copyCode}>
                    {copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Error" : "Copy"}
                </button>
            </div>
            <pre><code>{displayCode}</code></pre>
        </section>
    {/if}

    <section class="section-block">
        <h2>Props</h2>

        {#if propRows.length === 0}
            <p class="empty-note">No props metadata found.</p>
        {:else}
            <div class="table-wrap">
                <table class="props-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each propRows as prop}
                            <tr>
                                <td><code class="prop-name">{prop.name}</code></td>
                                <td><span class="type-badge">{prop.type}</span></td>
                                <td><code class="default-val">{prop.defaultValue}</code></td>
                                <td>{prop.description}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </section>

    <section class="section-block">
        <h2>Dependencies</h2>
        {#if dependencyList.length === 0}
            <p class="empty-note">This item does not declare external dependencies.</p>
        {:else}
            <div class="deps-list">
                {#each dependencyList as dep}
                    <code class="dep-pill">{dep}</code>
                {/each}
            </div>
        {/if}
    </section>

    <section class="section-block source-block">
        <p>Svelte source: <code>{item?.sveltePath ?? "-"}</code></p>
    </section>
</section>

<style>
    .component-page {
        display: grid;
        gap: 1rem;
        max-width: 100%;
    }

    .page-header h1 {
        margin: 0.3rem 0 0;
        color: #fff;
        font-size: clamp(1.9rem, 3.2vw, 2.5rem);
        line-height: 1.1;
        letter-spacing: -0.03em;
    }

    .page-header p {
        margin: 0.55rem 0 0;
        color: rgba(255, 255, 255, 0.62);
        font-size: 0.88rem;
    }

    .back-link {
        color: #a78bfa;
        text-decoration: none;
        font-size: 0.8rem;
    }

    .back-link:hover {
        text-decoration: underline;
    }

    .tabs-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.015);
        padding: 0.3rem;
    }

    .tabs-left,
    .tabs-right {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }

    .tab-trigger,
    .contribute-link {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.01);
        color: rgba(255, 255, 255, 0.64);
        font-size: 0.72rem;
        line-height: 1;
        padding: 0.5rem 0.75rem;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .tab-trigger.active {
        border-color: rgba(167, 139, 250, 0.45);
        background: rgba(124, 58, 237, 0.16);
        color: #fff;
    }

    .fav-btn {
        width: 32px;
        height: 32px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.01);
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .fav-btn.favorited {
        color: #f472b6;
        border-color: rgba(244, 114, 182, 0.45);
        background: rgba(244, 114, 182, 0.12);
    }

    .preview-shell {
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.01);
        padding: 0.75rem;
    }

    .preview-stage {
        width: 100%;
        height: clamp(430px, 62vh, 560px);
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
            radial-gradient(circle at 50% 12%, rgba(129, 75, 255, 0.2), transparent 38%),
            #04010f;
        overflow: hidden;
        position: relative;
        contain: layout paint;
    }

    .preview-stage.background-stage {
        background: #03010b;
    }

    .preview-topbar {
        position: absolute;
        top: 0.85rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: min(92%, 460px);
        border: 1px solid rgba(255, 255, 255, 0.11);
        border-radius: 999px;
        background: rgba(5, 1, 17, 0.78);
        padding: 0.38rem 0.75rem;
        color: rgba(255, 255, 255, 0.75);
        font-size: 0.63rem;
    }

    .preview-links {
        display: flex;
        gap: 0.8rem;
    }

    .preview-host {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 3.1rem 1rem 1rem;
        overflow: hidden;
    }

    .preview-host.fill-mode {
        padding: 0;
        place-items: stretch;
    }

    .preview-inner {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        overflow: hidden;
        position: relative;
    }

    .preview-inner.fill-mode {
        place-items: stretch;
    }

    .status {
        margin: 0;
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.84rem;
    }

    .status.error {
        color: #fca5a5;
    }

    .section-block {
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.015);
        padding: 0.9rem;
    }

    .section-block h2 {
        margin: 0 0 0.7rem;
        font-size: 0.88rem;
        color: #fff;
        letter-spacing: -0.01em;
    }

    .controls-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.7rem;
        margin-bottom: 0.65rem;
    }

    .controls-head h2 {
        margin: 0;
    }

    .studio-btn {
        border-radius: 999px;
        border: 1px solid rgba(167, 139, 250, 0.35);
        background: rgba(124, 58, 237, 0.18);
        color: #d8b4fe;
        text-decoration: none;
        font-size: 0.7rem;
        padding: 0.35rem 0.65rem;
    }

    .controls-grid {
        display: grid;
        gap: 0.55rem;
    }

    .control-row {
        display: grid;
        grid-template-columns: minmax(130px, 1fr) minmax(160px, 1fr);
        align-items: center;
        gap: 0.7rem;
    }

    .control-label {
        color: rgba(255, 255, 255, 0.74);
        font-size: 0.74rem;
    }

    .control-row input[type="text"],
    .control-row input[type="number"] {
        height: 30px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.02);
        color: #fff;
        padding: 0 0.55rem;
        min-width: 0;
    }

    .control-row input[type="color"] {
        width: 38px;
        height: 28px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 7px;
        background: transparent;
        padding: 0;
    }

    .control-row input[type="checkbox"] {
        width: 16px;
        height: 16px;
    }

    .control-readonly {
        color: rgba(255, 255, 255, 0.65);
        font-size: 0.72rem;
        font-family: "JetBrains Mono", monospace;
    }

    .table-wrap {
        overflow-x: auto;
    }

    .props-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 620px;
    }

    .props-table th,
    .props-table td {
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-align: left;
        padding: 0.6rem 0.55rem;
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.7);
        vertical-align: top;
    }

    .props-table th {
        color: rgba(255, 255, 255, 0.92);
        font-weight: 600;
    }

    .prop-name,
    .default-val,
    .dep-pill,
    .source-block code,
    .code-block code {
        font-family: "JetBrains Mono", monospace;
    }

    .prop-name {
        color: #fff;
    }

    .type-badge {
        display: inline-flex;
        border: 1px solid rgba(167, 139, 250, 0.3);
        border-radius: 999px;
        padding: 0.1rem 0.45rem;
        color: #c4b5fd;
        font-size: 0.66rem;
    }

    .default-val {
        color: rgba(255, 255, 255, 0.85);
    }

    .deps-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
    }

    .dep-pill {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
        padding: 0.26rem 0.56rem;
        color: rgba(255, 255, 255, 0.78);
        background: rgba(255, 255, 255, 0.02);
        font-size: 0.68rem;
    }

    .code-block {
        max-height: min(70vh, 760px);
        overflow: auto;
    }

    .code-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.6rem;
        margin-bottom: 0.6rem;
    }

    .code-label {
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.72rem;
        font-weight: 600;
    }

    .copy-btn {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.02);
        color: rgba(255, 255, 255, 0.86);
        font-size: 0.68rem;
        padding: 0.3rem 0.65rem;
        cursor: pointer;
    }

    .copy-btn:hover {
        border-color: rgba(167, 139, 250, 0.45);
        background: rgba(124, 58, 237, 0.15);
    }

    .code-block pre {
        margin: 0;
        color: rgba(255, 255, 255, 0.88);
        font-size: 0.72rem;
        line-height: 1.5;
    }

    .source-block p {
        margin: 0.2rem 0;
        color: rgba(255, 255, 255, 0.68);
        font-size: 0.74rem;
    }

    .empty-note {
        margin: 0;
        color: rgba(255, 255, 255, 0.62);
        font-size: 0.78rem;
    }

    .preview-inner :global(*) {
        box-sizing: border-box;
        max-width: 100%;
        max-height: 100%;
    }

    .preview-inner :global(canvas),
    .preview-inner :global(svg),
    .preview-inner :global(video),
    .preview-inner :global(img) {
        max-width: 100%;
        max-height: 100%;
    }

    .preview-inner :global([style*="position: fixed"]),
    .preview-inner :global(.fixed) {
        position: absolute !important;
    }

    @media (max-width: 820px) {
        .preview-stage {
            height: clamp(360px, 56vh, 500px);
        }

        .preview-topbar {
            width: min(94%, 360px);
        }

        .control-row {
            grid-template-columns: 1fr;
            gap: 0.3rem;
        }
    }
</style>
