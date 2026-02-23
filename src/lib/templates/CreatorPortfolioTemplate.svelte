<script lang="ts">
    // Creator Portfolio Template
</script>

<div class="portfolio-template">
    <div class="loader-concept">
        <span>0</span><span>%</span>
    </div>

    <nav class="portfolio-nav">
        <div>j.doe</div>
        <div class="links">
            <a href="#work">Index</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>

    <header class="hero">
        <div class="noise-overlay"></div>
        <div class="hero-content">
            <h1 class="giant-text">
                <span class="word" style="transform: translateY(0%);"
                    >DIGITAL</span
                ><br />
                <span
                    class="word"
                    style="transform: translateY(0%); opacity: 0.5;"
                    >CRAFTSMAN</span
                >
            </h1>
        </div>
        <div class="marquee-container">
            <div class="marquee">
                FRONTEND &middot; DESIGN &middot; WEBGL &middot; MOTION &middot;
                FRONTEND &middot; DESIGN &middot; WEBGL &middot; MOTION
            </div>
        </div>
    </header>

    <section class="work-section" id="work">
        <div class="work-header">
            <h2>Selected Works</h2>
            <span>(2024—2026)</span>
        </div>

        <div class="work-list">
            <div class="work-item">
                <h3 class="work-title">Astral UI</h3>
                <span class="work-type">Design System</span>
                <div class="work-img"></div>
            </div>

            <div class="work-item">
                <h3 class="work-title">Void Engine</h3>
                <span class="work-type">WebGL Experience</span>
                <div
                    class="work-img"
                    style="background: linear-gradient(45deg, #111, #333);"
                ></div>
            </div>

            <div class="work-item">
                <h3 class="work-title">Nexus</h3>
                <span class="work-type">SaaS Platform</span>
                <div
                    class="work-img"
                    style="background: linear-gradient(135deg, #100, #300);"
                ></div>
            </div>
        </div>
    </section>

    <section class="about-section" id="about">
        <div class="about-content">
            <p>
                I build digital experiences that push the boundaries of what's
                possible on the web. Combining deep technical expertise with a
                refined aesthetic sensibility.
            </p>
        </div>
    </section>

    <footer class="contact-section" id="contact">
        <div class="contact-header">Let's talk</div>
        <a href="mailto:hello@example.com" class="huge-link">hello@j.doe</a>
        <div class="footer-bottom">
            <span>&copy; {new Date().getFullYear()}</span>
            <div class="socials">
                <a href="#x">𝕏</a>
                <a href="#gh">GH</a>
                <a href="#in">IN</a>
            </div>
        </div>
    </footer>
</div>

<style>
    .portfolio-template {
        background-color: #000;
        color: #fff;
        font-family: "Inter", sans-serif;
        min-height: 100vh;
        overflow-x: hidden;
        cursor: crosshair;
    }

    .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 999;
        opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .loader-concept {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        font-family: "JetBrains Mono", monospace;
        font-size: 1.5rem;
        font-weight: 300;
        z-index: 50;
    }

    .portfolio-nav {
        position: fixed;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        mix-blend-mode: difference;
        z-index: 100;
        font-weight: 500;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .portfolio-nav .links {
        display: flex;
        gap: 2rem;
    }

    .portfolio-nav a {
        color: #fff;
        text-decoration: none;
    }

    .hero {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        padding: 0 2rem;
    }

    .giant-text {
        font-size: clamp(4rem, 15vw, 12rem);
        line-height: 0.85;
        font-weight: 400;
        letter-spacing: -0.05em;
        margin: 0;
        text-transform: uppercase;
    }

    .giant-text .word {
        display: inline-block;
    }

    .marquee-container {
        position: absolute;
        bottom: 5rem;
        width: 100%;
        left: 0;
        overflow: hidden;
    }

    .marquee {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        white-space: nowrap;
        animation: scroll 20s linear infinite;
        opacity: 0.3;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .work-section {
        padding: 10rem 2rem;
    }

    .work-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 1rem;
    }

    .work-header h2 {
        font-size: 1.5rem;
        font-weight: 400;
        margin: 0;
    }

    .work-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        cursor: pointer;
    }

    .work-title {
        font-size: clamp(2rem, 6vw, 5rem);
        font-weight: 400;
        margin: 0;
        letter-spacing: -0.02em;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        z-index: 10;
        mix-blend-mode: difference;
    }

    .work-type {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.85rem;
        opacity: 0.5;
        z-index: 10;
        transition: opacity 0.3s;
    }

    .work-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8) rotate(-5deg);
        width: 400px;
        height: 250px;
        background: linear-gradient(45deg, #222, #444);
        border-radius: 4px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
    }

    .work-item:hover .work-title {
        transform: translateX(20px);
        color: #fff;
    }
    .work-item:hover .work-type {
        opacity: 0;
    }
    .work-item:hover .work-img {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }

    .about-section {
        padding: 15rem 2rem;
        display: flex;
        justify-content: flex-end;
    }

    .about-content {
        max-width: 600px;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        line-height: 1.4;
        font-weight: 400;
    }

    .contact-section {
        padding: 10rem 2rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .contact-header {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 2rem;
        opacity: 0.5;
    }

    .huge-link {
        font-size: clamp(3rem, 10vw, 8rem);
        font-weight: 400;
        color: #fff;
        text-decoration: none;
        line-height: 1;
        letter-spacing: -0.05em;
        margin-bottom: 10rem;
        position: relative;
        display: inline-block;
    }

    .huge-link::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .huge-link:hover::after {
        transform: scaleX(1);
        transform-origin: left;
    }

    .footer-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        opacity: 0.5;
    }

    .socials {
        display: flex;
        gap: 1rem;
    }
    .socials a {
        color: #fff;
        text-decoration: none;
    }
</style>
