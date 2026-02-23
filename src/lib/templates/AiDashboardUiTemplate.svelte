<script lang="ts">
    // AI Dashboard UI Template
</script>

<div class="dashboard-template">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="brand">
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    style="color: #06b6d4;"
                    ><path
                        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    /></svg
                >
                <span>NuralMetrics</span>
            </div>
            <div class="env-switcher">
                Prod-A1 <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"><path d="m6 9 6 6 6-6" /></svg
                >
            </div>
        </div>

        <nav class="nav-menu">
            <div class="nav-section">MAIN</div>
            <a href="#overview" class="nav-item active">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg
                >
                Overview
            </a>
            <a href="#models" class="nav-item">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><path
                        d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
                    /><path d="M7 7h.01" /></svg
                >
                Models
            </a>
            <a href="#datasets" class="nav-item">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><ellipse cx="12" cy="5" rx="9" ry="3" /><path
                        d="M3 5V19A9 3 0 0 0 21 19V5"
                    /><path d="M3 12A9 3 0 0 0 21 12" /></svg
                >
                Datasets
            </a>

            <div class="nav-section" style="margin-top: 2rem;">SETTINGS</div>
            <a href="#api" class="nav-item">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><path d="M8 3 4 7l4 4" /><path d="m16 21 4-4-4-4" /><path
                        d="M20 7h-2M4 17h2"
                    /><path d="M14 3v2M10 21v-2" /></svg
                >
                API Keys
            </a>
            <a href="#usage" class="nav-item">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><path
                        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    /></svg
                >
                Billing & Usage
            </a>
        </nav>

        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="avatar">OM</div>
                <div class="user-info">
                    <div class="user-name">Olivia Mitchell</div>
                    <div class="user-role">Admin</div>
                </div>
            </div>
        </div>
    </aside>

    <div class="main-wrapper">
        <!-- Topbar -->
        <header class="topbar">
            <div class="search-bar">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><circle cx="11" cy="11" r="8" /><path
                        d="m21 21-4.3-4.3"
                    /></svg
                >
                <input
                    type="text"
                    placeholder="Search logs, metrics, or type 'ask'..."
                />
                <div class="shortcut">⌘K</div>
            </div>

            <div class="topbar-actions">
                <button class="icon-btn">
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        ><path
                            d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
                        /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg
                    >
                    <span class="badge"></span>
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="content">
            <div class="page-header">
                <h1>Overview</h1>
                <div class="date-picker">
                    Last 24 Hours <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"><path d="m6 9 6 6 6-6" /></svg
                    >
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-title">Total API Calls</div>
                    <div class="stat-value">
                        1.42M <span class="trend up">↗ 12%</span>
                    </div>
                    <div class="mini-chart chart-cyan"></div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">Avg Latency</div>
                    <div class="stat-value">
                        42ms <span class="trend down">↘ 4ms</span>
                    </div>
                    <div class="mini-chart chart-purple"></div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">Token Usage</div>
                    <div class="stat-value">
                        840K <span class="trend up">↗ 8%</span>
                    </div>
                    <div class="mini-chart chart-pink"></div>
                </div>
            </div>

            <div class="bento-layout">
                <div class="chart-panel main-chart">
                    <div class="panel-header">
                        <h2>Model Performance vs Latency</h2>
                        <button class="panel-opt"
                            ><svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                ><circle cx="12" cy="12" r="1" /><circle
                                    cx="12"
                                    cy="5"
                                    r="1"
                                /><circle cx="12" cy="19" r="1" /></svg
                            ></button
                        >
                    </div>
                    <div class="chart-area dummy-chart">
                        <!-- lines for background -->
                        <div class="grid-line" style="bottom: 20%"></div>
                        <div class="grid-line" style="bottom: 40%"></div>
                        <div class="grid-line" style="bottom: 60%"></div>
                        <div class="grid-line" style="bottom: 80%"></div>
                        <svg
                            class="line-svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,80 Q10,70 20,80 T40,60 T60,40 T80,50 T100,20"
                                fill="none"
                                stroke="#06b6d4"
                                stroke-width="2"
                            />
                            <path
                                d="M0,90 Q10,85 20,95 T40,70 T60,80 T80,60 T100,40"
                                fill="none"
                                stroke="#a855f7"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                </div>

                <div class="chart-panel side-panel">
                    <div class="panel-header">
                        <h2>Error Distribution</h2>
                    </div>
                    <div class="chart-area heatmap">
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.8)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.4)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.2)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.6)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.1)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.9)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.3)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.5)"
                        ></div>
                        <div
                            class="heat-cell"
                            style="background-color: rgba(236,72,153,0.7)"
                        ></div>
                    </div>
                    <div class="legend">
                        Most errors cluster at peak traffic (14:00 GMT).
                    </div>
                </div>
            </div>

            <!-- AI Prompter Sticky -->
            <div class="ai-prompter">
                <div class="prompt-box">
                    <svg
                        class="sparkle"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        ><path
                            d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
                        /></svg
                    >
                    <input
                        type="text"
                        placeholder="Ask AI: Why did latency spike at 14:00?"
                    />
                    <button class="send-btn">
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            ><path d="M5 12h14M12 5l7 7-7 7" /></svg
                        >
                    </button>
                </div>
            </div>
        </main>
    </div>
</div>

<style>
    .dashboard-template {
        display: flex;
        height: 100vh;
        background: #09090b;
        color: #fafafa;
        font-family:
            "Inter",
            -apple-system,
            sans-serif;
        overflow: hidden;
    }

    /* Sidebar */
    .sidebar {
        width: 250px;
        background: #09090b;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
    }

    .sidebar-header {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        font-size: 0.95rem;
    }

    .env-switcher {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: #a1a1aa;
        background: rgba(255, 255, 255, 0.05);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
    }

    .nav-menu {
        flex: 1;
        padding: 1.5rem 1rem;
        overflow-y: auto;
    }

    .nav-section {
        font-size: 0.7rem;
        font-weight: 600;
        color: #71717a;
        margin-bottom: 0.75rem;
        padding-left: 0.5rem;
        letter-spacing: 0.05em;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 6px;
        color: #a1a1aa;
        text-decoration: none;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
        transition: all 0.2s;
    }

    .nav-item:hover {
        background: rgba(255, 255, 255, 0.05);
        color: #e4e4e7;
    }

    .nav-item.active {
        background: rgba(6, 182, 212, 0.1);
        color: #22d3ee;
    }

    .sidebar-footer {
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .user-profile {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
    }

    .user-profile:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #a855f7, #6366f1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .user-name {
        font-size: 0.85rem;
        font-weight: 500;
    }
    .user-role {
        font-size: 0.75rem;
        color: #71717a;
    }

    /* Main Area */
    .main-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #000;
    }

    .topbar {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: #09090b;
    }

    .search-bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 0.4rem 0.75rem;
        border-radius: 8px;
        width: 300px;
        color: #71717a;
    }

    .search-bar input {
        background: none;
        border: none;
        color: #fafafa;
        outline: none;
        flex: 1;
        font-size: 0.85rem;
    }

    .search-bar .shortcut {
        font-size: 0.7rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.1rem 0.3rem;
        border-radius: 4px;
    }

    .icon-btn {
        background: none;
        border: none;
        color: #a1a1aa;
        cursor: pointer;
        position: relative;
    }

    .icon-btn:hover {
        color: #fafafa;
    }
    .badge {
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        background: #ef4444;
        border-radius: 50%;
        border: 2px solid #09090b;
    }

    .content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
        position: relative;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .page-header h1 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }

    .date-picker {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        padding: 0.5rem 0.75rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 6px;
        cursor: pointer;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 1.5rem;
        position: relative;
    }

    .stat-title {
        color: #a1a1aa;
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
    }

    .stat-value {
        font-size: 2rem;
        font-weight: 600;
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
    }

    .trend {
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
    }

    .trend.up {
        background: rgba(34, 197, 94, 0.1);
        color: #4ade80;
    }
    .trend.down {
        background: rgba(239, 68, 68, 0.1);
        color: #f87171;
    }

    .mini-chart {
        height: 40px;
        margin-top: 1rem;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        position: relative;
    }

    .mini-chart::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
    }

    .chart-cyan::after {
        background: #22d3ee;
        width: 80%;
    }
    .chart-purple::after {
        background: #a855f7;
        width: 40%;
    }
    .chart-pink::after {
        background: #ec4899;
        width: 90%;
    }

    .bento-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.5rem;
        margin-bottom: 6rem; /* space for sticky bar */
    }

    .chart-panel {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 1.5rem;
    }

    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .panel-header h2 {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
    }

    .panel-opt {
        background: none;
        border: none;
        color: #71717a;
        cursor: pointer;
    }

    .chart-area {
        height: 300px;
        position: relative;
    }

    .dummy-chart .grid-line {
        position: absolute;
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 255, 0.05);
    }

    .line-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .heatmap {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        height: 250px;
    }

    .heat-cell {
        border-radius: 4px;
    }

    .legend {
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #a1a1aa;
    }

    /* AI Prompter */
    .ai-prompter {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1.5rem;
        background: linear-gradient(0deg, #09090b 80%, transparent);
        display: flex;
        justify-content: center;
        pointer-events: none;
    }

    .prompt-box {
        pointer-events: auto;
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(139, 92, 246, 0.3);
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.1);
        backdrop-filter: blur(10px);
        padding: 0.75rem 1rem;
        border-radius: 12px;
        width: 100%;
        max-width: 600px;
    }

    .sparkle {
        color: #a855f7;
    }

    .prompt-box input {
        flex: 1;
        background: none;
        border: none;
        color: #fff;
        outline: none;
        font-size: 0.95rem;
    }

    .send-btn {
        background: #fafafa;
        color: #09090b;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
</style>
