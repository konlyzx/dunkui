<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let {
        SIM_RESOLUTION = 128,
        DYE_RESOLUTION = 1440,
        CAPTURE_RESOLUTION = 512,
        DENSITY_DISSIPATION = 3.5,
        VELOCITY_DISSIPATION = 2,
        PRESSURE = 0.1,
        PRESSURE_ITERATIONS = 20,
        CURL = 30,
        SPLAT_RADIUS = 0.25,
        SPLAT_FORCE = 6000,
        SHADING = true,
        COLOR_UPDATE_SPEED = 10,
        BACK_COLOR = { r: 0.5, g: 0, b: 0 },
        TRANSPARENT = true,
    } = $props();

    let canvas: HTMLCanvasElement;
    let isActive = false;

    onMount(() => {
        if (!canvas) return;

        const gl = canvas.getContext("webgl2", {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false,
        }) as WebGL2RenderingContext; // Explicit cast or fallback logic

        let context: {
            gl: WebGLRenderingContext | WebGL2RenderingContext;
            ext: any;
        };

        // Helper to get Context
        function getWebGLContext(canvas: HTMLCanvasElement) {
            const params = {
                alpha: true,
                depth: false,
                stencil: false,
                antialias: false,
                preserveDrawingBuffer: false,
            };
            let gl: any = canvas.getContext("webgl2", params);
            const isWebGL2 = !!gl;
            if (!isWebGL2)
                gl =
                    canvas.getContext("webgl", params) ||
                    canvas.getContext("experimental-webgl", params);

            let halfFloat;
            let supportLinearFiltering;
            if (isWebGL2) {
                gl.getExtension("EXT_color_buffer_float");
                supportLinearFiltering = gl.getExtension(
                    "OES_texture_float_linear",
                );
            } else {
                halfFloat = gl.getExtension("OES_texture_half_float");
                supportLinearFiltering = gl.getExtension(
                    "OES_texture_half_float_linear",
                );
            }
            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            const halfFloatTexType = isWebGL2
                ? gl.HALF_FLOAT
                : halfFloat && halfFloat.HALF_FLOAT_OES;
            let formatRGBA, formatRG, formatR;

            if (isWebGL2) {
                formatRGBA = getSupportedFormat(
                    gl,
                    gl.RGBA16F,
                    gl.RGBA,
                    halfFloatTexType,
                );
                formatRG = getSupportedFormat(
                    gl,
                    gl.RG16F,
                    gl.RG,
                    halfFloatTexType,
                );
                formatR = getSupportedFormat(
                    gl,
                    gl.R16F,
                    gl.RED,
                    halfFloatTexType,
                );
            } else {
                formatRGBA = getSupportedFormat(
                    gl,
                    gl.RGBA,
                    gl.RGBA,
                    halfFloatTexType,
                );
                formatRG = getSupportedFormat(
                    gl,
                    gl.RGBA,
                    gl.RGBA,
                    halfFloatTexType,
                );
                formatR = getSupportedFormat(
                    gl,
                    gl.RGBA,
                    gl.RGBA,
                    halfFloatTexType,
                );
            }

            return {
                gl,
                ext: {
                    formatRGBA,
                    formatRG,
                    formatR,
                    halfFloatTexType,
                    supportLinearFiltering,
                },
            };
        }

        function getSupportedFormat(
            gl: any,
            internalFormat: any,
            format: any,
            type: any,
        ): any {
            if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
                switch (internalFormat) {
                    case gl.R16F:
                        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
                    case gl.RG16F:
                        return getSupportedFormat(
                            gl,
                            gl.RGBA16F,
                            gl.RGBA,
                            type,
                        );
                    default:
                        return null;
                }
            }
            return { internalFormat, format };
        }

        function supportRenderTextureFormat(
            gl: any,
            internalFormat: any,
            format: any,
            type: any,
        ) {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_S,
                gl.CLAMP_TO_EDGE,
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T,
                gl.CLAMP_TO_EDGE,
            );
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                internalFormat,
                4,
                4,
                0,
                format,
                type,
                null,
            );
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
                texture,
                0,
            );
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            return status === gl.FRAMEBUFFER_COMPLETE;
        }

        context = getWebGLContext(canvas);
        const glCtx = context.gl;
        const ext = context.ext;

        // ... Shaders ...
        // I'll inline the classes and helper functions inside onMount or outside.
        // Outside is cleaner but `gl` reference needs to be passed.
        // I'll keep them inside to close over `glCtx`.

        class Material {
            vertexShader: any;
            fragmentShaderSource: any;
            programs: any[];
            activeProgram: any;
            uniforms: any;

            constructor(vertexShader: any, fragmentShaderSource: any) {
                this.vertexShader = vertexShader;
                this.fragmentShaderSource = fragmentShaderSource;
                this.programs = [];
                this.activeProgram = null;
                this.uniforms = [];
            }
            setKeywords(keywords: any) {
                let hash = 0;
                for (let i = 0; i < keywords.length; i++)
                    hash += hashCode(keywords[i]);
                let program = this.programs[hash];
                if (program == null) {
                    let fragmentShader = compileShader(
                        glCtx.FRAGMENT_SHADER,
                        this.fragmentShaderSource,
                        keywords,
                    );
                    program = createProgram(this.vertexShader, fragmentShader);
                    this.programs[hash] = program;
                }
                if (program === this.activeProgram) return;
                this.uniforms = getUniforms(program);
                this.activeProgram = program;
            }
            bind() {
                glCtx.useProgram(this.activeProgram);
            }
        }

        class Program {
            uniforms: any = {};
            program: any;
            constructor(vertexShader: any, fragmentShader: any) {
                this.program = createProgram(vertexShader, fragmentShader);
                this.uniforms = getUniforms(this.program);
            }
            bind() {
                glCtx.useProgram(this.program);
            }
        }

        function createProgram(vertexShader: any, fragmentShader: any) {
            let program = glCtx.createProgram();
            glCtx.attachShader(program, vertexShader);
            glCtx.attachShader(program, fragmentShader);
            glCtx.linkProgram(program);
            if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS))
                console.trace(glCtx.getProgramInfoLog(program));
            return program;
        }

        function getUniforms(program: any) {
            let uniforms: any = [];
            let uniformCount = glCtx.getProgramParameter(
                program,
                glCtx.ACTIVE_UNIFORMS,
            );
            for (let i = 0; i < uniformCount; i++) {
                let uniformName = glCtx.getActiveUniform(program, i)!.name;
                uniforms[uniformName] = glCtx.getUniformLocation(
                    program,
                    uniformName,
                );
            }
            return uniforms;
        }

        function compileShader(type: any, source: any, keywords?: any) {
            source = addKeywords(source, keywords);
            const shader = glCtx.createShader(type);
            glCtx.shaderSource(shader, source);
            glCtx.compileShader(shader);
            if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS))
                console.trace(glCtx.getShaderInfoLog(shader));
            return shader;
        }

        function addKeywords(source: any, keywords: any) {
            if (!keywords) return source;
            let keywordsString = "";
            keywords.forEach((keyword: any) => {
                keywordsString += "#define " + keyword + "\n";
            });
            return keywordsString + source;
        }

        const baseVertexShader = compileShader(
            glCtx.VERTEX_SHADER,
            `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `,
        );

        const copyShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `,
        );

        const clearShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `,
        );

        const displayShaderSource = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        uniform sampler2D uDithering;
        uniform vec2 ditherScale;
        uniform vec2 texelSize;
        vec3 linearToGamma (vec3 color) {
            color = max(color, vec3(0));
            return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
        }
        void main () {
            vec3 c = texture2D(uTexture, vUv).rgb;
            #ifdef SHADING
                vec3 lc = texture2D(uTexture, vL).rgb;
                vec3 rc = texture2D(uTexture, vR).rgb;
                vec3 tc = texture2D(uTexture, vT).rgb;
                vec3 bc = texture2D(uTexture, vB).rgb;
                float dx = length(rc) - length(lc);
                float dy = length(tc) - length(bc);
                vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                vec3 l = vec3(0.0, 0.0, 1.0);
                float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                c *= diffuse;
            #endif
            float a = max(c.r, max(c.g, c.b));
            gl_FragColor = vec4(c, a);
        }
      `;

        const splatShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `,
        );

        const advectionShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }
        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
            ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"],
        );

        const divergenceShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;
            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `,
        );

        const curlShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `,
        );

        const vorticityShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `,
        );

        const pressureShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `,
        );

        const gradientSubtractShader = compileShader(
            glCtx.FRAGMENT_SHADER,
            `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `,
        );

        // Blit helper
        const blit = (() => {
            glCtx.bindBuffer(glCtx.ARRAY_BUFFER, glCtx.createBuffer());
            glCtx.bufferData(
                glCtx.ARRAY_BUFFER,
                new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
                glCtx.STATIC_DRAW,
            );
            glCtx.bindBuffer(glCtx.ELEMENT_ARRAY_BUFFER, glCtx.createBuffer());
            glCtx.bufferData(
                glCtx.ELEMENT_ARRAY_BUFFER,
                new Uint16Array([0, 1, 2, 0, 2, 3]),
                glCtx.STATIC_DRAW,
            );
            glCtx.vertexAttribPointer(0, 2, glCtx.FLOAT, false, 0, 0);
            glCtx.enableVertexAttribArray(0);
            return (target: any, clear = false) => {
                if (target == null) {
                    glCtx.viewport(
                        0,
                        0,
                        glCtx.drawingBufferWidth,
                        glCtx.drawingBufferHeight,
                    );
                    glCtx.bindFramebuffer(glCtx.FRAMEBUFFER, null);
                } else {
                    glCtx.viewport(0, 0, target.width, target.height);
                    glCtx.bindFramebuffer(glCtx.FRAMEBUFFER, target.fbo);
                }
                if (clear) {
                    glCtx.clearColor(0.0, 0.0, 0.0, 1.0);
                    glCtx.clear(glCtx.COLOR_BUFFER_BIT);
                }
                glCtx.drawElements(glCtx.TRIANGLES, 6, glCtx.UNSIGNED_SHORT, 0);
            };
        })();

        // State variables
        let dye: any, velocity: any, divergence: any, curl: any, pressure: any;

        const copyProgram = new Program(baseVertexShader, copyShader);
        const clearProgram = new Program(baseVertexShader, clearShader);
        const splatProgram = new Program(baseVertexShader, splatShader);
        const advectionProgram = new Program(baseVertexShader, advectionShader);
        const divergenceProgram = new Program(
            baseVertexShader,
            divergenceShader,
        );
        const curlProgram = new Program(baseVertexShader, curlShader);
        const vorticityProgram = new Program(baseVertexShader, vorticityShader);
        const pressureProgram = new Program(baseVertexShader, pressureShader);
        const gradienSubtractProgram = new Program(
            baseVertexShader,
            gradientSubtractShader,
        );
        const displayMaterial = new Material(
            baseVertexShader,
            displayShaderSource,
        );

        function initFramebuffers() {
            let simRes = getResolution(SIM_RESOLUTION);
            let dyeRes = getResolution(DYE_RESOLUTION);
            const texType = ext.halfFloatTexType;
            const rgba = ext.formatRGBA;
            const rg = ext.formatRG;
            const r = ext.formatR;
            const filtering = ext.supportLinearFiltering
                ? glCtx.LINEAR
                : glCtx.NEAREST;
            glCtx.disable(glCtx.BLEND);

            if (!dye)
                dye = createDoubleFBO(
                    dyeRes.width,
                    dyeRes.height,
                    rgba.internalFormat,
                    rgba.format,
                    texType,
                    filtering,
                );
            else
                dye = resizeDoubleFBO(
                    dye,
                    dyeRes.width,
                    dyeRes.height,
                    rgba.internalFormat,
                    rgba.format,
                    texType,
                    filtering,
                );

            if (!velocity)
                velocity = createDoubleFBO(
                    simRes.width,
                    simRes.height,
                    rg.internalFormat,
                    rg.format,
                    texType,
                    filtering,
                );
            else
                velocity = resizeDoubleFBO(
                    velocity,
                    simRes.width,
                    simRes.height,
                    rg.internalFormat,
                    rg.format,
                    texType,
                    filtering,
                );

            divergence = createFBO(
                simRes.width,
                simRes.height,
                r.internalFormat,
                r.format,
                texType,
                glCtx.NEAREST,
            );
            curl = createFBO(
                simRes.width,
                simRes.height,
                r.internalFormat,
                r.format,
                texType,
                glCtx.NEAREST,
            );
            pressure = createDoubleFBO(
                simRes.width,
                simRes.height,
                r.internalFormat,
                r.format,
                texType,
                glCtx.NEAREST,
            );
        }

        function createFBO(
            w: number,
            h: number,
            internalFormat: any,
            format: any,
            type: any,
            param: any,
        ) {
            glCtx.activeTexture(glCtx.TEXTURE0);
            let texture = glCtx.createTexture();
            glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
            glCtx.texParameteri(
                glCtx.TEXTURE_2D,
                glCtx.TEXTURE_MIN_FILTER,
                param,
            );
            glCtx.texParameteri(
                glCtx.TEXTURE_2D,
                glCtx.TEXTURE_MAG_FILTER,
                param,
            );
            glCtx.texParameteri(
                glCtx.TEXTURE_2D,
                glCtx.TEXTURE_WRAP_S,
                glCtx.CLAMP_TO_EDGE,
            );
            glCtx.texParameteri(
                glCtx.TEXTURE_2D,
                glCtx.TEXTURE_WRAP_T,
                glCtx.CLAMP_TO_EDGE,
            );
            glCtx.texImage2D(
                glCtx.TEXTURE_2D,
                0,
                internalFormat,
                w,
                h,
                0,
                format,
                type,
                null,
            );

            let fbo = glCtx.createFramebuffer();
            glCtx.bindFramebuffer(glCtx.FRAMEBUFFER, fbo);
            glCtx.framebufferTexture2D(
                glCtx.FRAMEBUFFER,
                glCtx.COLOR_ATTACHMENT0,
                glCtx.TEXTURE_2D,
                texture,
                0,
            );
            glCtx.viewport(0, 0, w, h);
            glCtx.clear(glCtx.COLOR_BUFFER_BIT);

            return {
                texture,
                fbo,
                width: w,
                height: h,
                texelSizeX: 1.0 / w,
                texelSizeY: 1.0 / h,
                attach(id: number) {
                    glCtx.activeTexture(glCtx.TEXTURE0 + id);
                    glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
                    return id;
                },
            };
        }

        function createDoubleFBO(
            w: number,
            h: number,
            internalFormat: any,
            format: any,
            type: any,
            param: any,
        ) {
            let fbo1 = createFBO(w, h, internalFormat, format, type, param);
            let fbo2 = createFBO(w, h, internalFormat, format, type, param);
            return {
                width: w,
                height: h,
                texelSizeX: fbo1.texelSizeX,
                texelSizeY: fbo1.texelSizeY,
                get read() {
                    return fbo1;
                },
                set read(value) {
                    fbo1 = value;
                },
                get write() {
                    return fbo2;
                },
                set write(value) {
                    fbo2 = value;
                },
                swap() {
                    let temp = fbo1;
                    fbo1 = fbo2;
                    fbo2 = temp;
                },
            };
        }

        function resizeFBO(
            target: any,
            w: number,
            h: number,
            internalFormat: any,
            format: any,
            type: any,
            param: any,
        ) {
            let newFBO = createFBO(w, h, internalFormat, format, type, param);
            copyProgram.bind();
            glCtx.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
            blit(newFBO);
            return newFBO;
        }

        function resizeDoubleFBO(
            target: any,
            w: number,
            h: number,
            internalFormat: any,
            format: any,
            type: any,
            param: any,
        ) {
            if (target.width === w && target.height === h) return target;
            target.read = resizeFBO(
                target.read,
                w,
                h,
                internalFormat,
                format,
                type,
                param,
            );
            target.write = createFBO(w, h, internalFormat, format, type, param);
            target.width = w;
            target.height = h;
            target.texelSizeX = 1.0 / w;
            target.texelSizeY = 1.0 / h;
            return target;
        }

        function updateKeywords() {
            let displayKeywords = [];
            if (SHADING) displayKeywords.push("SHADING");
            displayMaterial.setKeywords(displayKeywords);
        }

        updateKeywords();
        initFramebuffers();

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0.0;

        function updateFrame() {
            const dt = calcDeltaTime();
            if (resizeCanvas()) initFramebuffers();
            updateColors(dt);
            applyInputs();
            step(dt);
            render(null);
            requestAnimationFrame(updateFrame);
        }

        function calcDeltaTime() {
            let now = Date.now();
            let dt = (now - lastUpdateTime) / 1000;
            dt = Math.min(dt, 0.016666);
            lastUpdateTime = now;
            return dt;
        }

        function resizeCanvas() {
            let width = scaleByPixelRatio(canvas.clientWidth);
            let height = scaleByPixelRatio(canvas.clientHeight);
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
            return false;
        }

        function updateColors(dt: number) {
            colorUpdateTimer += dt * COLOR_UPDATE_SPEED;
            if (colorUpdateTimer >= 1) {
                colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
                pointers.forEach((p) => {
                    p.color = generateColor();
                });
            }
        }

        function applyInputs() {
            pointers.forEach((p) => {
                if (p.moved) {
                    p.moved = false;
                    splatPointer(p);
                }
            });
        }

        function step(dt: number) {
            glCtx.disable(glCtx.BLEND);
            curlProgram.bind();
            glCtx.uniform2f(
                curlProgram.uniforms.texelSize,
                velocity.texelSizeX,
                velocity.texelSizeY,
            );
            glCtx.uniform1i(
                curlProgram.uniforms.uVelocity,
                velocity.read.attach(0),
            );
            blit(curl);

            vorticityProgram.bind();
            glCtx.uniform2f(
                vorticityProgram.uniforms.texelSize,
                velocity.texelSizeX,
                velocity.texelSizeY,
            );
            glCtx.uniform1i(
                vorticityProgram.uniforms.uVelocity,
                velocity.read.attach(0),
            );
            glCtx.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
            glCtx.uniform1f(vorticityProgram.uniforms.curl, CURL);
            glCtx.uniform1f(vorticityProgram.uniforms.dt, dt);
            blit(velocity.write);
            velocity.swap();

            divergenceProgram.bind();
            glCtx.uniform2f(
                divergenceProgram.uniforms.texelSize,
                velocity.texelSizeX,
                velocity.texelSizeY,
            );
            glCtx.uniform1i(
                divergenceProgram.uniforms.uVelocity,
                velocity.read.attach(0),
            );
            blit(divergence);

            clearProgram.bind();
            glCtx.uniform1i(
                clearProgram.uniforms.uTexture,
                pressure.read.attach(0),
            );
            glCtx.uniform1f(clearProgram.uniforms.value, PRESSURE);
            blit(pressure.write);
            pressure.swap();

            pressureProgram.bind();
            glCtx.uniform2f(
                pressureProgram.uniforms.texelSize,
                velocity.texelSizeX,
                velocity.texelSizeY,
            );
            glCtx.uniform1i(
                pressureProgram.uniforms.uDivergence,
                divergence.attach(0),
            );
            for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
                glCtx.uniform1i(
                    pressureProgram.uniforms.uPressure,
                    pressure.read.attach(1),
                );
                blit(pressure.write);
                pressure.swap();
            }

            gradienSubtractProgram.bind();
            glCtx.uniform2f(
                gradienSubtractProgram.uniforms.texelSize,
                velocity.texelSizeX,
                velocity.texelSizeY,
            );
            glCtx.uniform1i(
                gradienSubtractProgram.uniforms.uPressure,
                pressure.read.attach(0),
            );
            glCtx.uniform1i(
                gradienSubtractProgram.uniforms.uVelocity,
                velocity.read.attach(1),
            );
            blit(velocity.write);
            velocity.swap();

            advectionProgram.bind();
            glCtx.uniform2f(
                advectionProgram.uniforms.texelSize,
                velocity.texelSizeX,
                velocity.texelSizeY,
            );
            if (!ext.supportLinearFiltering)
                glCtx.uniform2f(
                    advectionProgram.uniforms.dyeTexelSize,
                    velocity.texelSizeX,
                    velocity.texelSizeY,
                );
            let velocityId = velocity.read.attach(0);
            glCtx.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
            glCtx.uniform1i(advectionProgram.uniforms.uSource, velocityId);
            glCtx.uniform1f(advectionProgram.uniforms.dt, dt);
            glCtx.uniform1f(
                advectionProgram.uniforms.dissipation,
                VELOCITY_DISSIPATION,
            );
            blit(velocity.write);
            velocity.swap();

            if (!ext.supportLinearFiltering)
                glCtx.uniform2f(
                    advectionProgram.uniforms.dyeTexelSize,
                    dye.texelSizeX,
                    dye.texelSizeY,
                );
            glCtx.uniform1i(
                advectionProgram.uniforms.uVelocity,
                velocity.read.attach(0),
            );
            glCtx.uniform1i(
                advectionProgram.uniforms.uSource,
                dye.read.attach(1),
            );
            glCtx.uniform1f(
                advectionProgram.uniforms.dissipation,
                DENSITY_DISSIPATION,
            );
            blit(dye.write);
            dye.swap();
        }

        function render(target: any) {
            glCtx.blendFunc(glCtx.ONE, glCtx.ONE_MINUS_SRC_ALPHA);
            glCtx.enable(glCtx.BLEND);
            drawDisplay(target);
        }

        function drawDisplay(target: any) {
            let width =
                target == null ? glCtx.drawingBufferWidth : target.width;
            let height =
                target == null ? glCtx.drawingBufferHeight : target.height;
            displayMaterial.bind();
            if (SHADING)
                glCtx.uniform2f(
                    displayMaterial.uniforms.texelSize,
                    1.0 / width,
                    1.0 / height,
                );
            glCtx.uniform1i(
                displayMaterial.uniforms.uTexture,
                dye.read.attach(0),
            );
            blit(target);
        }

        // Helpers
        function splatPointer(pointer: any) {
            let dx = pointer.deltaX * SPLAT_FORCE;
            let dy = pointer.deltaY * SPLAT_FORCE;
            splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
        }

        function splat(x: any, y: any, dx: any, dy: any, color: any) {
            splatProgram.bind();
            glCtx.uniform1i(
                splatProgram.uniforms.uTarget,
                velocity.read.attach(0),
            );
            glCtx.uniform1f(
                splatProgram.uniforms.aspectRatio,
                canvas.width / canvas.height,
            );
            glCtx.uniform2f(splatProgram.uniforms.point, x, y);
            glCtx.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
            glCtx.uniform1f(
                splatProgram.uniforms.radius,
                correctRadius(SPLAT_RADIUS / 100.0),
            );
            blit(velocity.write);
            velocity.swap();

            glCtx.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
            glCtx.uniform3f(
                splatProgram.uniforms.color,
                color.r,
                color.g,
                color.b,
            );
            blit(dye.write);
            dye.swap();
        }

        function correctRadius(radius: number) {
            let aspectRatio = canvas.width / canvas.height;
            if (aspectRatio > 1) radius *= aspectRatio;
            return radius;
        }

        function hashCode(s: string) {
            if (s.length === 0) return 0;
            let hash = 0;
            for (let i = 0; i < s.length; i++) {
                hash = (hash << 5) - hash + s.charCodeAt(i);
                hash |= 0;
            }
            return hash;
        }

        function wrap(value: number, min: number, max: number) {
            const range = max - min;
            if (range === 0) return min;
            return ((value - min) % range) + min;
        }

        function getResolution(resolution: number) {
            let aspectRatio =
                glCtx.drawingBufferWidth / glCtx.drawingBufferHeight;
            if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
            const min = Math.round(resolution);
            const max = Math.round(resolution * aspectRatio);
            if (glCtx.drawingBufferWidth > glCtx.drawingBufferHeight)
                return { width: max, height: min };
            else return { width: min, height: max };
        }

        function scaleByPixelRatio(input: number) {
            const pixelRatio = window.devicePixelRatio || 1;
            return Math.floor(input * pixelRatio);
        }

        function generateColor() {
            let c = HSVtoRGB(Math.random(), 1.0, 1.0);
            c.r *= 0.15;
            c.g *= 0.15;
            c.b *= 0.15;
            return c;
        }

        function HSVtoRGB(h: any, s: any, v: any) {
            let r: any, g: any, b: any, i, f, p, q, t;
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
            }
            return { r, g, b };
        }

        // Input handling
        class Pointer {
            id = -1;
            texcoordX = 0;
            texcoordY = 0;
            prevTexcoordX = 0;
            prevTexcoordY = 0;
            deltaX = 0;
            deltaY = 0;
            down = false;
            moved = false;
            color = [30, 0, 300]; // initial color? replaced by generateColor
        }

        let pointers = [new Pointer()];

        function updatePointerDownData(
            pointer: any,
            id: any,
            posX: any,
            posY: any,
        ) {
            pointer.id = id;
            pointer.down = true;
            pointer.moved = false;
            pointer.texcoordX = posX / canvas.width;
            pointer.texcoordY = 1.0 - posY / canvas.height;
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.deltaX = 0;
            pointer.deltaY = 0;
            pointer.color = generateColor();
        }

        function updatePointerMoveData(pointer: any, posX: any, posY: any) {
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.texcoordX = posX / canvas.width;
            pointer.texcoordY = 1.0 - posY / canvas.height;
            let deltaX = pointer.texcoordX - pointer.prevTexcoordX;
            let deltaY = pointer.texcoordY - pointer.prevTexcoordY;

            // correctDeltaX/Y
            let aspectRatio = canvas.width / canvas.height;
            if (aspectRatio < 1) deltaX *= aspectRatio;
            if (aspectRatio > 1) deltaY /= aspectRatio;

            pointer.deltaX = deltaX;
            pointer.deltaY = deltaY;
            pointer.moved =
                Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
        }

        function updatePointerUpData(pointer: any) {
            pointer.down = false;
        }

        function onMouseDown(e: MouseEvent) {
            let pointer = pointers[0];
            let posX = scaleByPixelRatio(e.clientX);
            let posY = scaleByPixelRatio(e.clientY);
            updatePointerDownData(pointer, -1, posX, posY);
            splatPointer(pointer); // clickSplat in original?
        }

        function onMouseMove(e: MouseEvent) {
            let pointer = pointers[0];
            let posX = scaleByPixelRatio(e.clientX);
            let posY = scaleByPixelRatio(e.clientY);
            updatePointerMoveData(pointer, posX, posY);
        }

        function onTouchStart(e: TouchEvent) {
            // simplified for single pointer
            const touches = e.targetTouches;
            if (touches.length > 0) {
                let posX = scaleByPixelRatio(touches[0].clientX);
                let posY = scaleByPixelRatio(touches[0].clientY);
                updatePointerDownData(
                    pointers[0],
                    touches[0].identifier,
                    posX,
                    posY,
                );
            }
        }

        function onTouchMove(e: TouchEvent) {
            const touches = e.targetTouches;
            if (touches.length > 0) {
                let posX = scaleByPixelRatio(touches[0].clientX);
                let posY = scaleByPixelRatio(touches[0].clientY);
                updatePointerMoveData(pointers[0], posX, posY);
            }
        }

        function onTouchEnd(e: TouchEvent) {
            updatePointerUpData(pointers[0]);
        }

        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);

        updateFrame();
    });
</script>

<div class="splash-cursor-container">
    <canvas bind:this={canvas} class="splash-canvas"></canvas>
</div>

<style>
    .splash-cursor-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
        pointer-events: none;
        overflow: hidden;
    }

    .splash-canvas {
        width: 100vw;
        height: 100vh;
        display: block;
    }
</style>
