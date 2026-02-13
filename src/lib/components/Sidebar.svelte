<div class="sidebar">
    <div class="brand">
        <a href="/">DunkUI</a>
    </div>
    <nav class="nav">
        <div class="section">
            <h3>Backgrounds</h3>
            <ul>
                <li>
                    <a href="/faulty-terminal" class:active={true}
                        >Faulty Terminal</a
                    >
                </li>
                <!-- Add more links here later -->
            </ul>
        </div>
        <div class="section">
            <h3>Animations</h3>
            <ul>
                <li><a href="/text-glitch">Text Glitch</a></li>
            </ul>
        </div>
    </nav>
</div>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 260px;
        height: 100vh;
        background: rgba(6, 0, 16, 0.95);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 100;
        display: flex;
        flex-direction: column;
        padding: 2rem 1.5rem;
    }

    .brand {
        font-family: "Figtree", sans-serif;
        font-weight: 800;
        font-size: 1.5rem;
        color: var(--text);
        margin-bottom: 3rem;
    }

    .brand a {
        text-decoration: none;
        color: inherit;
    }

    .section {
        margin-bottom: 2.5rem;
    }

    .section h3 {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--muted);
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
        font-family: "JetBrains Mono", monospace;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 0.5rem;
    }

    a {
        display: block;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        color: var(--text);
        text-decoration: none;
        font-size: 0.9rem;
        transition: all 0.2s ease;
        opacity: 0.7;
        position: relative;
    }

    a:hover {
        background: rgba(255, 255, 255, 0.05);
        opacity: 1;
    }

    a.active {
        background: rgba(125, 77, 255, 0.15);
        color: var(--accent);
        opacity: 1;
        font-weight: 600;
    }

    a.active::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 60%;
        background: var(--accent);
        border-radius: 0 4px 4px 0;
    }
</style>
