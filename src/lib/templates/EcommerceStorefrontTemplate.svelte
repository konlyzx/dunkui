<script lang="ts">
    // E-commerce Storefront Template
    // A premium dark theme e-commerce layout
</script>

<div class="ecommerce-template">
    <nav class="top-nav">
        <div class="brand">NEURAL_DECK</div>
        <div class="nav-links">
            <a href="#new">New Arrivals</a>
            <a href="#tech">Tech</a>
            <a href="#apparel">Apparel</a>
        </div>
        <div class="cart">
            <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                ><circle cx="9" cy="21" r="1" /><circle
                    cx="20"
                    cy="21"
                    r="1"
                /><path
                    d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                /></svg
            >
            <span class="cart-count">3</span>
        </div>
    </nav>

    <div class="main-layout">
        <div class="product-showcase">
            <div class="product-badge">NEW RELEASE // 2026</div>
            <h1 class="product-title">QUANTUM VISOR v4</h1>
            <p class="product-desc">
                Next-generation AR headset featuring neural-link compatibility
                and infinite FOV displays.
            </p>

            <div class="product-visual">
                <img
                    src="/images/nano_banana.png"
                    alt="Cybernetic Nano Banana v4"
                    class="product-img"
                />
                <div class="hologram-effect"></div>
            </div>

            <div class="product-specs">
                <div class="spec"><span>FOV</span> Infinite</div>
                <div class="spec"><span>Latency</span> &lt;1ms</div>
                <div class="spec"><span>Weight</span> 142g</div>
            </div>
        </div>

        <aside class="checkout-panel">
            <div class="panel-header">
                <h2>Configuration</h2>
                <div class="price">$1,299</div>
            </div>

            <div class="config-section">
                <h3>Colorway</h3>
                <div class="color-options">
                    <div
                        class="color-dot active"
                        style="background: #111; border: 1px solid #333;"
                    ></div>
                    <div class="color-dot" style="background: #e2e8f0;"></div>
                    <div class="color-dot" style="background: #a855f7;"></div>
                </div>
            </div>

            <div class="config-section">
                <h3>Lens Type</h3>
                <div class="lens-options">
                    <button class="lens-btn active">Standard</button>
                    <button class="lens-btn">Photochromic (+$100)</button>
                </div>
            </div>

            <div class="checkout-actions">
                <button class="btn btn-primary btn-block"> Add to Cart </button>
                <button class="btn btn-apple btn-block">
                    <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="currentColor"
                        ><path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                        /></svg
                    >
                    Pay via Biometrics
                </button>
            </div>

            <div class="shipping-info">
                Ships in 2-3 business days. Free express delivery globally.
            </div>
        </aside>
    </div>
</div>

<style>
    .ecommerce-template {
        background-color: #050505;
        color: #e2e8f0;
        font-family: "Inter", monospace;
        min-height: 100vh;
    }

    .top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .brand {
        font-family: "JetBrains Mono", monospace;
        font-weight: 800;
        letter-spacing: 0.1em;
        font-size: 1.25rem;
    }

    .nav-links {
        display: none;
        gap: 2rem;
    }

    @media (min-width: 768px) {
        .nav-links {
            display: flex;
        }
    }

    .nav-links a {
        color: #94a3b8;
        text-decoration: none;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .nav-links a:hover {
        color: #fff;
    }

    .cart {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .cart-count {
        background: #e2e8f0;
        color: #000;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 700;
    }

    .main-layout {
        display: grid;
        grid-template-columns: 1fr;
        min-height: calc(100vh - 80px);
    }

    @media (min-width: 1024px) {
        .main-layout {
            grid-template-columns: 2fr 1fr;
        }
    }

    .product-showcase {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    .product-badge {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.75rem;
        color: #10b981;
        margin-bottom: 1rem;
    }

    .product-title {
        font-size: 4rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        line-height: 1;
        margin: 0 0 1rem;
        background: linear-gradient(180deg, #fff, #94a3b8);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .product-desc {
        color: #94a3b8;
        font-size: 1.125rem;
        max-width: 500px;
        margin-bottom: 3rem;
    }

    .product-visual {
        flex: 1;
        min-height: 400px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .product-img {
        max-width: 80%;
        max-height: 400px;
        object-fit: contain;
        position: relative;
        z-index: 10;
        filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.4));
        animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-15px) rotate(2deg);
        }
        100% {
            transform: translateY(0px) rotate(0deg);
        }
    }

    .hologram-effect {
        width: 300px;
        height: 300px;
        background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.2) 0%,
            transparent 70%
        );
        border: 1px solid rgba(168, 85, 247, 0.3);
        border-radius: 50%;
        box-shadow: 0 0 60px rgba(168, 85, 247, 0.2);
        animation: pulse 4s infinite alternate;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    .product-specs {
        display: flex;
        gap: 2rem;
        margin-top: auto;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        font-family: "JetBrains Mono", monospace;
        font-size: 0.85rem;
    }

    .spec span {
        color: #64748b;
        margin-right: 0.5rem;
        text-transform: uppercase;
    }

    .checkout-panel {
        padding: 3rem;
        background: rgba(255, 255, 255, 0.02);
    }

    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 3rem;
    }

    .panel-header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }
    .price {
        font-size: 1.5rem;
        font-weight: 300;
        font-family: "JetBrains Mono", monospace;
    }

    .config-section {
        margin-bottom: 2.5rem;
    }

    .config-section h3 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #94a3b8;
        margin-bottom: 1rem;
    }

    .color-options {
        display: flex;
        gap: 1rem;
    }

    .color-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .color-dot:hover {
        transform: scale(1.1);
    }
    .color-dot.active {
        box-shadow:
            0 0 0 2px #050505,
            0 0 0 4px #fff;
    }

    .lens-options {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .lens-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
    }

    .lens-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    .lens-btn.active {
        border-color: #a855f7;
        background: rgba(168, 85, 247, 0.1);
    }

    .checkout-actions {
        display: grid;
        gap: 1rem;
        margin-top: 4rem;
    }

    .btn {
        padding: 1rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: none;
        transition: transform 0.2s;
    }

    .btn:hover {
        transform: translateY(-2px);
    }

    .btn-primary {
        background: #fff;
        color: #000;
    }
    .btn-apple {
        background: #222;
        color: #fff;
        border: 1px solid #333;
    }

    .shipping-info {
        margin-top: 1.5rem;
        font-size: 0.85rem;
        color: #64748b;
        text-align: center;
    }
</style>
