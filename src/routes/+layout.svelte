<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/components/Navbar.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>DunkUI — Modern Svelte Components</title>
	<meta
		name="description"
		content="A curated collection of modern, animated Svelte components built with OGL and WebGL for high-performance visuals."
	/>
</svelte:head>

<Navbar />
{@render children()}
