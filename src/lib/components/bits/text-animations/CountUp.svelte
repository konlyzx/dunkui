<script lang="ts">
    import { spring } from "svelte/motion";
    import { cn } from "$lib/utils";

    let {
        to,
        from = 0,
        direction = "up",
        delay = 0,
        duration = 2,
        class: className,
        startWhen = true,
        separator = "",
        onStart,
        onEnd,
        ...restProps
    } = $props();

    let element = $state<HTMLElement>();
    let hasStarted = $state(false);

    // Initial value based on direction
    let startVal = direction === "down" ? to : from;
    let endVal = direction === "down" ? from : to;

    // Svelte spring parameters
    // We adjust stiffness/damping to approximate the duration control
    // precision is important for number clamping
    const displayedValue = spring(startVal, {
        stiffness: 0.05 * (1 / Math.max(0.1, duration)), // Lower stiffness for longer duration
        damping: 0.5,
        precision: 0.0001, // High precision for floats
    });

    // Formatting logic
    function getDecimalPlaces(num: number) {
        const str = num.toString();
        if (str.includes(".")) {
            const decimals = str.split(".")[1];
            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }
        return 0;
    }

    let maxDecimals = $derived(
        Math.max(getDecimalPlaces(from), getDecimalPlaces(to)),
    );

    function format(num: number) {
        const hasDecimals = maxDecimals > 0;
        const options = {
            useGrouping: !!separator,
            minimumFractionDigits: hasDecimals ? maxDecimals : 0,
            maximumFractionDigits: hasDecimals ? maxDecimals : 0,
        };
        const formatted = new Intl.NumberFormat("en-US", options).format(num);
        return separator ? formatted.replace(/,/g, separator) : formatted;
    }

    $effect(() => {
        if (!element || hasStarted || !startWhen) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                hasStarted = true;
                if (onStart) onStart();

                setTimeout(() => {
                    displayedValue.set(endVal);
                }, delay * 1000);

                // Approximate end callback since spring relies on physics
                setTimeout(
                    () => {
                        if (onEnd) onEnd();
                    },
                    (delay + duration) * 1000,
                ); // Rough estimate

                observer.disconnect();
            }
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    });
</script>

<span bind:this={element} class={cn("", className)} {...restProps}>
    {format($displayedValue)}
</span>
