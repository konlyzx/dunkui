<script lang="ts">
    import { onMount } from "svelte";
    import type { ComponentType } from "react";
    import ReactMount from "$lib/react/ReactMount.svelte";

    let { slug, category, ...restProps } = $props();

    let reactComponent = $state<ComponentType<any> | null>(null);
    let error = $state<string | null>(null);

    // Glob all potential React components in newbits
    // We assume structure: src/newbits/{Category}/{PascalName}/{PascalName}.jsx
    const modules = import.meta.glob("/src/newbits/**/*.{jsx,tsx}");

    function toPascalCase(str: string) {
        return str
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
    }

    $effect(() => {
        if (!slug || !category) return;

        const load = async () => {
            try {
                const pascalName = toPascalCase(slug);
                let path = "";

                // Map category to folder name in newbits
                let folder = "";
                if (category === "text-animations") folder = "TextAnimations";
                else if (category === "backgrounds") folder = "Backgrounds";
                else if (category === "animations") folder = "Animations";
                else if (category === "components") folder = "Components";
                // Wait, let's verify where 'BlobCursor' is.
                // Step 1108 showed 'src/newbits/Components' has 'BlobCursor' (wait, list didn't show it explicitely but implied 'Components' has many).
                // Actually 'blob-cursor' is in 'animations' registry.
                // Let's assume 'Components' or 'Animations' folder.
                // Re-checking list: src/newbits/Components/...
                // I don't see 'Animations' folder in newbits.
                // So 'animations' category likely maps to 'Components'.

                // Try strict mapping first
                path = `/src/newbits/${folder}/${pascalName}/${pascalName}.jsx`;

                // If not found, try .tsx
                if (!modules[path]) {
                    path = `/src/newbits/${folder}/${pascalName}/${pascalName}.tsx`;
                }

                // If still not found, search in other folders?
                // Maybe 'Components' has it even if category is 'animations'.
                if (!modules[path]) {
                    // Try to find by partial match
                    const matchingPath = Object.keys(modules).find(
                        (p) =>
                            p.includes(`/${pascalName}/${pascalName}.`) ||
                            p.endsWith(`/${pascalName}.jsx`),
                    );
                    if (matchingPath) path = matchingPath;
                }

                if (!modules[path]) {
                    throw new Error(
                        `Component not found for slug: ${slug} (path: ${path})`,
                    );
                }

                const mod = await modules[path]();
                reactComponent = (mod as any).default;
                error = null;
            } catch (e) {
                console.error(e);
                error =
                    e instanceof Error ? e.message : "Failed to load component";
            }
        };
        load();
    });
</script>

{#if reactComponent}
    <div
        class="react-loader-container w-full h-full"
        style="width: 100%; height: 100%;"
    >
        <ReactMount component={reactComponent} props={restProps} />
    </div>
{:else if error}
    <div class="text-red-400 p-4 border border-red-900 bg-red-900/20 rounded">
        Error loading {slug}: {error}
    </div>
{:else}
    <div class="animate-pulse text-white/50">Loading React component...</div>
{/if}
