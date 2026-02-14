<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { ComponentType } from "react";

    let {
        component,
        props = {},
        class: className = "",
    }: {
        component: ComponentType<any> | null;
        props?: Record<string, unknown>;
        class?: string;
    } = $props();

    let host: HTMLDivElement;
    let root: import("react-dom/client").Root | null = null;
    let ReactLib: typeof import("react") | null = null;
    let bridgeError = $state<string | null>(null);
    let ErrorBoundaryCtor: any = null;

    function createErrorBoundary(react: typeof import("react")) {
        return class ErrorBoundary extends react.Component {
            declare props: { children: any };
            declare state: { hasError: boolean; message: string };

            constructor(props: { children: any }) {
                super(props);
                this.state = { hasError: false, message: "" };
            }

            static getDerivedStateFromError(error: unknown) {
                return {
                    hasError: true,
                    message:
                        error instanceof Error
                            ? error.message
                            : "React component render error",
                };
            }

            componentDidCatch(error: unknown) {
                bridgeError =
                    error instanceof Error
                        ? error.message
                        : "React component render error";
            }

            render() {
                if (this.state.hasError) {
                    return react.createElement(
                        "div",
                        { className: "react-mount-error" },
                        this.state.message || "React component render error",
                    );
                }
                return this.props.children;
            }
        };
    }

    function render() {
        if (!root || !ReactLib || !component) return;
        bridgeError = null;
        if (!ErrorBoundaryCtor) ErrorBoundaryCtor = createErrorBoundary(ReactLib);

        root.render(
            ReactLib.createElement(
                ErrorBoundaryCtor,
                null,
                ReactLib.createElement(component, props),
            ),
        );
    }

    onMount(async () => {
        ReactLib = await import("react");
        const ReactDOM = await import("react-dom/client");
        root = ReactDOM.createRoot(host);
        render();
    });

    onDestroy(() => {
        root?.unmount();
        root = null;
    });

    $effect(() => {
        component;
        props;
        render();
    });
</script>

<div bind:this={host} class={`react-mount-host ${className}`}></div>
{#if bridgeError}
    <div class="react-mount-error">{bridgeError}</div>
{/if}

<style>
    .react-mount-host {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .react-mount-error {
        color: #fca5a5;
        font-size: 0.75rem;
        border: 1px solid rgba(252, 165, 165, 0.35);
        background: rgba(69, 10, 10, 0.25);
        border-radius: 10px;
        padding: 0.6rem;
        margin-top: 0.5rem;
    }
</style>
