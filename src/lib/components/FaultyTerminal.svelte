<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

    // Props
    export let scale = 1;
    export let gridMul = [2, 1];
    export let digitSize = 1.5;
    export let timeScale = 0.3;
    export let pause = false;
    export let scanlineIntensity = 0.3;
    export let glitchAmount = 1;
    export let flickerAmount = 1;
    export let noiseAmp = 0;
    export let chromaticAberration = 0;
    export let dither: number | boolean = 0;
    export let curvature = 0.2;
    export let tint = "#ffffff";
    export let mouseReact = true;
    export let mouseStrength = 0.2;
    export let dpr =
        typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio || 1, 2)
            : 1;
    export let pageLoadAnimation = true;
    export let brightness = 1;

    let container: HTMLDivElement;
    let rafId: number;
    let resizeObserver: ResizeObserver;
    let gl: any;
    let program: any;
    let renderer: Renderer;

    let mouse = { x: 0.5, y: 0.5 }; // raw mouse
    let smoothMouse = { x: 0.5, y: 0.5 }; // smoothed
    let frozenTime = 0;
    let loadAnimationStart = 0;
    let timeOffset = Math.random() * 100;

    const vertexShader = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

    const fragmentShader = `
    precision mediump float;

    varying vec2 vUv;

    uniform float iTime;
    uniform vec3  iResolution;
    uniform float uScale;

    uniform vec2  uGridMul;
    uniform float uDigitSize;
    uniform float uScanlineIntensity;
    uniform float uGlitchAmount;
    uniform float uFlickerAmount;
    uniform float uNoiseAmp;
    uniform float uChromaticAberration;
    uniform float uDither;
    uniform float uCurvature;
    uniform vec3  uTint;
    uniform vec2  uMouse;
    uniform float uMouseStrength;
    uniform float uUseMouse;
    uniform float uPageLoadProgress;
    uniform float uUsePageLoadAnimation;
    uniform float uBrightness;

    float time;

    float hash21(vec2 p){
      p = fract(p * 234.56);
      p += dot(p, p + 34.56);
      return fract(p.x * p.y);
    }

    float noise(vec2 p)
    {
      return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
    }

    mat2 rotate(float angle)
    {
      float c = cos(angle);
      float s = sin(angle);
      return mat2(c, -s, s, c);
    }

    float fbm(vec2 p)
    {
      p *= 1.1;
      float f = 0.0;
      float amp = 0.5 * uNoiseAmp;
      
      mat2 modify0 = rotate(time * 0.02);
      f += amp * noise(p);
      p = modify0 * p * 2.0;
      amp *= 0.454545;
      
      mat2 modify1 = rotate(time * 0.02);
      f += amp * noise(p);
      p = modify1 * p * 2.0;
      amp *= 0.454545;
      
      mat2 modify2 = rotate(time * 0.08);
      f += amp * noise(p);
      
      return f;
    }

    float pattern(vec2 p, out vec2 q, out vec2 r) {
      vec2 offset1 = vec2(1.0);
      vec2 offset0 = vec2(0.0);
      mat2 rot01 = rotate(0.1 * time);
      mat2 rot1 = rotate(0.1);
      
      q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
      r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
      return fbm(p + r);
    }

    float digit(vec2 p){
        vec2 grid = uGridMul * 15.0;
        vec2 s = floor(p * grid) / grid;
        p = p * grid;
        vec2 q, r;
        float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
        
        if(uUseMouse > 0.5){
            vec2 mouseWorld = uMouse * uScale;
            float distToMouse = distance(s, mouseWorld);
            float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
            intensity += mouseInfluence;
            
            float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
            intensity += ripple;
        }
        
        if(uUsePageLoadAnimation > 0.5){
            float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
            float cellDelay = cellRandom * 0.8;
            float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
            
            float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
            intensity *= fadeAlpha;
        }
        
        p = fract(p);
        p *= uDigitSize;
        
        float px5 = p.x * 5.0;
        float py5 = (1.0 - p.y) * 5.0;
        float x = fract(px5);
        float y = fract(py5);
        
        float i = floor(py5) - 2.0;
        float j = floor(px5) - 2.0;
        float n = i * i + j * j;
        float f = n * 0.0625;
        
        float isOn = step(0.1, intensity - f);
        float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
        
        return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
    }

    float onOff(float a, float b, float c)
    {
      return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
    }

    float displace(vec2 look)
    {
        float y = look.y - mod(iTime * 0.25, 1.0);
        float window = 1.0 / (1.0 + 50.0 * y * y);
        return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
    }

    vec3 getColor(vec2 p){
        
        float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
        bar *= uScanlineIntensity;
        
        float displacement = displace(p);
        p.x += displacement;

        if (uGlitchAmount != 1.0) {
          float extra = displacement * (uGlitchAmount - 1.0);
          p.x += extra;
        }

        float middle = digit(p);
        
        const float off = 0.002;
        float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                    digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                    digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
        
        vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
        return baseColor;
    }

    vec2 barrel(vec2 uv){
      vec2 c = uv * 2.0 - 1.0;
      float r2 = dot(c, c);
      c *= 1.0 + uCurvature * r2;
      return c * 0.5 + 0.5;
    }

    void main() {
        time = iTime * 0.333333;
        vec2 uv = vUv;

        if(uCurvature != 0.0){
          uv = barrel(uv);
        }
        
        vec2 p = uv * uScale;
        vec3 col = getColor(p);

        if(uChromaticAberration != 0.0){
          // simple chromatic aberration
          // using resolution for pixel size estimation or just fixed offset
          vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
          col.r = getColor(p + ca).r;
          col.b = getColor(p - ca).b;
        }

        col *= uTint;
        col *= uBrightness;

        if(uDither > 0.0){
          float rnd = hash21(gl_FragCoord.xy);
          col += (rnd - 0.5) * (uDither * 0.003922);
        }

        gl_FragColor = vec4(col, 1.0);
    }
  `;

    function hexToRgb(hex: string) {
        let h = hex.replace("#", "").trim();
        if (h.length === 3)
            h = h
                .split("")
                .map((c) => c + c)
                .join("");
        const num = parseInt(h, 16);
        return [
            ((num >> 16) & 255) / 255,
            ((num >> 8) & 255) / 255,
            (num & 255) / 255,
        ];
    }

    // Reactive updates to uniforms
    $: if (program) {
        const tintVec = hexToRgb(tint);
        const ditherValue =
            typeof dither === "boolean" ? (dither ? 1 : 0) : dither;

        program.uniforms.uScale.value = scale;
        program.uniforms.uGridMul.value = new Float32Array(gridMul);
        program.uniforms.uDigitSize.value = digitSize;
        program.uniforms.uScanlineIntensity.value = scanlineIntensity;
        program.uniforms.uGlitchAmount.value = glitchAmount;
        program.uniforms.uFlickerAmount.value = flickerAmount;
        program.uniforms.uNoiseAmp.value = noiseAmp;
        program.uniforms.uChromaticAberration.value = chromaticAberration;
        program.uniforms.uDither.value = ditherValue;
        program.uniforms.uCurvature.value = curvature;
        program.uniforms.uTint.value = new Color(
            tintVec[0],
            tintVec[1],
            tintVec[2],
        );
        program.uniforms.uMouseStrength.value = mouseStrength;
        program.uniforms.uUseMouse.value = mouseReact ? 1 : 0;
        program.uniforms.uUsePageLoadAnimation.value = pageLoadAnimation
            ? 1
            : 0;
        program.uniforms.uBrightness.value = brightness;
        // iResolution, iTime, uPageLoadProgress, uMouse are updated in loop
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height;
        mouse = { x, y };
    };

    onMount(() => {
        if (!container) return;

        renderer = new Renderer({ dpr });
        gl = renderer.gl;
        gl.clearColor(0, 0, 0, 1);

        const geometry = new Triangle(gl);

        const tintVec = hexToRgb(tint);
        const ditherValue =
            typeof dither === "boolean" ? (dither ? 1 : 0) : dither;

        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: {
                    value: new Color(
                        gl.canvas.width,
                        gl.canvas.height,
                        gl.canvas.width / gl.canvas.height,
                    ),
                },
                uScale: { value: scale },

                uGridMul: { value: new Float32Array(gridMul) },
                uDigitSize: { value: digitSize },
                uScanlineIntensity: { value: scanlineIntensity },
                uGlitchAmount: { value: glitchAmount },
                uFlickerAmount: { value: flickerAmount },
                uNoiseAmp: { value: noiseAmp },
                uChromaticAberration: { value: chromaticAberration },
                uDither: { value: ditherValue },
                uCurvature: { value: curvature },
                uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },
                uMouse: {
                    value: new Float32Array([smoothMouse.x, smoothMouse.y]),
                },
                uMouseStrength: { value: mouseStrength },
                uUseMouse: { value: mouseReact ? 1 : 0 },
                uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },
                uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },
                uBrightness: { value: brightness },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            if (!container || !renderer) return;
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            if (program) {
                program.uniforms.iResolution.value = new Color(
                    gl.canvas.width,
                    gl.canvas.height,
                    gl.canvas.width / gl.canvas.height,
                );
            }
        }

        resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(container);
        resize();

        const update = (t: number) => {
            rafId = requestAnimationFrame(update);

            if (pageLoadAnimation && loadAnimationStart === 0) {
                loadAnimationStart = t;
            }

            if (!pause && program) {
                const elapsed = (t * 0.001 + timeOffset) * timeScale;
                program.uniforms.iTime.value = elapsed;
                frozenTime = elapsed;
            } else if (program) {
                program.uniforms.iTime.value = frozenTime;
            }

            if (program && pageLoadAnimation && loadAnimationStart > 0) {
                const animationDuration = 2000;
                const animationElapsed = t - loadAnimationStart;
                const progress = Math.min(
                    animationElapsed / animationDuration,
                    1,
                );
                program.uniforms.uPageLoadProgress.value = progress;
            }

            if (mouseReact && program) {
                const dampingFactor = 0.08;
                smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;
                smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;

                (program.uniforms.uMouse.value as Float32Array)[0] =
                    smoothMouse.x;
                (program.uniforms.uMouse.value as Float32Array)[1] =
                    smoothMouse.y;
            }

            renderer.render({ scene: mesh });
        };

        rafId = requestAnimationFrame(update);
        if (gl.canvas instanceof HTMLCanvasElement) {
            container.appendChild(gl.canvas);
        }

        return () => {
            // Cleanup handled by onDestroy
        };
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            if (rafId) cancelAnimationFrame(rafId);
            if (resizeObserver) resizeObserver.disconnect();

            // Handle context loss
            if (renderer && renderer.gl) {
                const gl = renderer.gl;
                gl.getExtension("WEBGL_lose_context")?.loseContext();
            }

            // Remove canvas
            if (
                container &&
                renderer &&
                renderer.gl &&
                renderer.gl.canvas instanceof HTMLCanvasElement
            ) {
                try {
                    if (container.contains(renderer.gl.canvas)) {
                        container.removeChild(renderer.gl.canvas);
                    }
                } catch (e) {
                    /* ignore */
                }
            }
        }
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    bind:this={container}
    class="faulty-terminal-container {$$props.class || ''}"
    style={$$props.style}
    on:mousemove={mouseReact ? handleMouseMove : null}
></div>

<style>
    .faulty-terminal-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
</style>
