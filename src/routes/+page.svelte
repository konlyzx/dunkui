<script lang="ts">
	import FaultyTerminal from "$lib/components/FaultyTerminal.svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
	import StatsSection from "$lib/components/StatsSection.svelte";
	import TemplatesSection from "$lib/components/TemplatesSection.svelte";
	import TestimonialsSection from "$lib/components/TestimonialsSection.svelte";
	import FooterSection from "$lib/components/FooterSection.svelte";
	import { onMount, tick } from "svelte";

	onMount(() => {
		let observer: IntersectionObserver;

		const init = async () => {
			await tick();

			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add("visible");
						}
					});
				},
				{ threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
			);

			requestAnimationFrame(() => {
				document
					.querySelectorAll(".fade-in")
					.forEach((el) => observer.observe(el));
			});
		};

		init();

		return () => {
			if (observer) observer.disconnect();
		};
	});
</script>

<!-- ==================== AMBIENT BACKGROUND ==================== -->
<div class="ambient-light"></div>

<!-- ==================== FIXED BACKGROUND ==================== -->
<div class="background-wrapper">
	<FaultyTerminal
		scale={1.5}
		gridMul={[2, 1]}
		digitSize={1.2}
		timeScale={0.5}
		pause={false}
		scanlineIntensity={0.5}
		glitchAmount={1}
		flickerAmount={1}
		noiseAmp={1}
		chromaticAberration={0}
		dither={0}
		curvature={0.1}
		tint="#ffffff"
		mouseReact={true}
		mouseStrength={0.5}
		pageLoadAnimation={true}
		brightness={0.6}
	/>
	<div class="bg-overlay"></div>
</div>

<!-- ==================== SCROLLABLE CONTENT ==================== -->
<div class="page-content">
	<HeroSection />
	<StatsSection />
	<TemplatesSection />
	<TestimonialsSection />
	<FooterSection />
</div>

<style>
	.ambient-light {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: radial-gradient(
			circle at 50% -10%,
			rgba(255, 62, 0, 0.08) 0%,
			transparent 60%
		);
		z-index: -1;
		pointer-events: none;
	}

	.background-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 0;
	}

	.bg-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(5, 0, 12, 0.25) 0%,
			rgba(5, 0, 12, 0.55) 35%,
			rgba(5, 0, 12, 0.82) 65%,
			rgba(5, 0, 12, 0.95) 100%
		);
		pointer-events: none;
	}

	.page-content {
		position: relative;
		z-index: 10;
		padding-top: 56px;
	}
</style>
