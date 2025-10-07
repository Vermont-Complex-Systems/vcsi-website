<script>
    let { papers, openAlex } = $props();

    const totalCitations = papers.reduce((sum, p) => sum + (p.cited_by_count || 0), 0);
    const maxCitations = Math.max(...papers.map(p => p.cited_by_count || 0));
    const avgCitations = Math.round(totalCitations / papers.length);
</script>

<h2>If you are into that kind of stuff...</h2>
<div class="metrics-grid">
    <div class="metric">
        <span class="metric-value">{papers.length}</span>
        <span class="metric-label">Publications</span>
    </div>
    <div class="metric">
        <span class="metric-value">{totalCitations}</span>
        <span class="metric-label">Total Citations</span>
    </div>
    <div class="metric">
        <span class="metric-value">{maxCitations}</span>
        <span class="metric-label">Most Cited Paper</span>
    </div>
    <div class="metric">
        <span class="metric-value">{avgCitations}</span>
        <span class="metric-label">Avg Citations</span>
    </div>
</div>

{#if openAlex}
<div class="additional-metrics">
    <div class="metrics-grid">
        <div class="metric tooltip-container">
            <span class="metric-value">{openAlex.h_index || 0}</span>
            <span class="metric-label">H-Index</span>
            <span class="tooltip">The number h where the researcher has published h papers that have each been cited at least h times</span>
        </div>
        <div class="metric tooltip-container">
            <span class="metric-value">{openAlex.i10_index || 0}</span>
            <span class="metric-label">i10-Index</span>
            <span class="tooltip">The number of publications with at least 10 citations</span>
        </div>
    </div>
</div>
{/if}

<style>
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }

    .metric {
        text-align: center;
        padding: 1rem;
        background: white;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .metric-value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .metric-label {
        display: block;
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-top: 0.25rem;
    }

    h2 {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    .additional-metrics {
        margin-top: 1rem;
    }

    .additional-metrics .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }

    .additional-metrics .metric {
        text-align: center;
        padding: 1rem;
        background: white;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        cursor: help;
        position: relative;
    }

    .tooltip-container .tooltip {
        visibility: hidden;
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 0.5rem;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: normal;
        width: 200px;
        text-align: center;
        z-index: 1000;
        line-height: 1.3;
    }

    .tooltip-container .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
    }

    .tooltip-container:hover .tooltip {
        visibility: visible;
    }

    .additional-metrics .metric-value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .additional-metrics .metric-label {
        display: block;
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-top: 0.25rem;
    }

    @media (max-width: 768px) {
        .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .additional-metrics .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>