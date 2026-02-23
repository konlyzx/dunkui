<script lang="ts">
    import { onMount } from "svelte";

    let {
        text = "",
        delay = 200,
        className = "",
        animateBy = "words", // 'words' or 'letters'
        direction = "top",
        threshold = 0.1,
        rootMargin = "0px",
        animationFrom,
        animationTo,
        easing = "ease-out",
        onAnimationComplete,
    } = $props();

    let elements = $derived(
        animateBy === "words" ? text.split(" ") : text.split(""),
    );
    let inView = $state(false);
    let ref: HTMLParagraphElement;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    inView = true;
                    if (ref) observer.unobserve(ref);
                    onAnimationComplete?.();
                }
            },
            { threshold, rootMargin },
        );

        if (ref) observer.observe(ref);

        return () => observer.disconnect();
    });

    const defaultFrom =
        direction === "top"
            ? {
                  filter: "blur(10px)",
                  opacity: 0,
                  transform: "translate3d(0,-50px,0)",
              }
            : {
                  filter: "blur(10px)",
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
              };

    const defaultTo = {
        filter: "blur(0px)",
        opacity: 1,
        transform: "translate3d(0,0,0)",
    };

    let animationStyle = $derived.by(() => {
        const from = animationFrom || defaultFrom;
        const to = animationTo || defaultTo;

        return inView ? to : from;
    });
</script>

<p bind:this={ref} class={`blur-text ${className} flex flex-wrap`}>
    {#each elements as word, index}
        <span
            class="inline-block transition-all duration-700 ease-out"
            style="
          filter: {animationStyle.filter};
          opacity: {animationStyle.opacity};
          transform: {animationStyle.transform};
          transition-delay: {index * delay}ms;
          transition-timing-function: {easing};
       "
        >
            {word}
            {#if animateBy === "words" && index < elements.length - 1}
                &nbsp;
            {/if}
        </span>
    {/each}
</p>

<style>
    .blur-text {
        margin: 0;
    }
</style>
