<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";
    import { cn } from "$lib/utils";

    let {
        grid = 15,
        mouse = 0.1,
        strength = 0.15,
        relaxation = 0.9,
        imageSrc,
        class: className = "",
        children,
    }: {
        grid?: number;
        mouse?: number;
        strength?: number;
        relaxation?: number;
        imageSrc: string;
        class?: string;
        children?: import("svelte").Snippet;
    } = $props();

    let container: HTMLDivElement;
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;
    let renderer: THREE.WebGLRenderer;
    let plane: THREE.Mesh;
    let dataTexture: THREE.DataTexture;
    let uniforms: any;
    let animationId: number;

    const vertexShader = `
     uniform float time;
     varying vec2 vUv;
     varying vec3 vPosition;
     void main() {
       vUv = uv;
       vPosition = position;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     }
   `;

    const fragmentShader = `
     uniform sampler2D uDataTexture;
     uniform sampler2D uTexture;
     uniform vec4 resolution;
     varying vec2 vUv;
     void main() {
       vec2 uv = vUv;
       vec4 offset = texture2D(uDataTexture, vUv);
       gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
     }
   `;

    let mouseState = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };

    function handleMouseMove(e: MouseEvent) {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height;
        mouseState.vX = x - mouseState.prevX;
        mouseState.vY = y - mouseState.prevY;
        Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    }

    function handleMouseLeave() {
        if (dataTexture) dataTexture.needsUpdate = true;
        Object.assign(mouseState, {
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            vX: 0,
            vY: 0,
        });
    }

    function handleResize() {
        if (!container || !renderer || !camera) return;
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        if (width === 0 || height === 0) return;

        const containerAspect = width / height;
        renderer.setSize(width, height);
        if (plane) plane.scale.set(containerAspect, 1, 1);

        const frustumHeight = 1;
        const frustumWidth = frustumHeight * containerAspect;
        camera.left = -frustumWidth / 2;
        camera.right = frustumWidth / 2;
        camera.top = frustumHeight / 2;
        camera.bottom = -frustumHeight / 2;
        camera.updateProjectionMatrix();

        if (uniforms) uniforms.resolution.value.set(width, height, 1, 1);
    }

    onMount(() => {
        if (!container) return;

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
        camera.position.z = 2;

        uniforms = {
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            uTexture: { value: null },
            uDataTexture: { value: null },
        };

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            imageSrc,
            (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                if (uniforms) {
                    uniforms.uTexture.value = texture;
                }
                handleResize();
            },
            undefined,
            (err) => {
                console.error(
                    "GridDistortion: Failed to load image",
                    imageSrc,
                    err,
                );
            },
        );

        const size = grid;
        const data = new Float32Array(4 * size * size);
        for (let i = 0; i < size * size; i++) {
            data[i * 4] = Math.random() * 255 - 125;
            data[i * 4 + 1] = Math.random() * 255 - 125;
        }

        dataTexture = new THREE.DataTexture(
            data,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType,
        );
        dataTexture.needsUpdate = true;
        uniforms.uDataTexture.value = dataTexture;

        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
        });

        const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
        plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        handleResize();
        window.addEventListener("resize", handleResize);

        function animate() {
            animationId = requestAnimationFrame(animate);
            uniforms.time.value += 0.05;

            const data = dataTexture.image.data;
            for (let i = 0; i < size * size; i++) {
                data[i * 4] *= relaxation;
                data[i * 4 + 1] *= relaxation;
            }

            const gridMouseX = size * mouseState.x;
            const gridMouseY = size * mouseState.y;
            const maxDist = size * mouse;

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const distSq =
                        Math.pow(gridMouseX - i, 2) +
                        Math.pow(gridMouseY - j, 2);
                    if (distSq < maxDist * maxDist) {
                        const index = 4 * (i + size * j);
                        const power = Math.min(maxDist / Math.sqrt(distSq), 10);
                        data[index] += strength * 100 * mouseState.vX * power;
                        data[index + 1] -=
                            strength * 100 * mouseState.vY * power;
                    }
                }
            }
            dataTexture.needsUpdate = true;
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            if (renderer) renderer.dispose();
            if (scene) scene.clear();
            if (dataTexture) dataTexture.dispose();
            if (container && renderer.domElement)
                container.removeChild(renderer.domElement);
        };
    });
</script>

<div
    class={cn("distortion-container", className)}
    bind:this={container}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    role="img"
    aria-label="Grid distortion effect"
>
    <!-- Optional overlay content -->
    <div
        style="position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: none;"
    >
        {@render children?.()}
    </div>
</div>

<style>
    .distortion-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        min-height: 400px; /* Default height */
    }

    /* Ensure canvas takes full space */
    :global(.distortion-container canvas) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        display: block;
    }
</style>
