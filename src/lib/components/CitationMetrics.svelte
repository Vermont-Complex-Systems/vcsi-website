<script>
    let { papers, openAlex, semanticScholar } = $props();

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
            <span class="metric-value">{openAlex.h_index || 0}{#if semanticScholar} <span class="s2-value"> ({semanticScholar.hIndex || 0})</span>{/if}</span>
            <span class="metric-label">H-Index</span>
            <span class="tooltip">The number h where the researcher has published h papers that have each been cited at least h times</span>
        </div>
        <div class="metric tooltip-container">
            <span class="metric-value">{openAlex.cited_by_count || 0}{#if semanticScholar} <span class="s2-value"> ({semanticScholar.citationCount || 0})</span>{/if}</span>
            <span class="metric-label">Total Citations</span>
            <span class="tooltip">Total citation count as reported by each source{#if semanticScholar}. Semantic Scholar count in parentheses{/if}</span>
        </div>
        <div class="metric tooltip-container">
            <span class="metric-value">{openAlex.i10_index || 0}</span>
            <span class="metric-label">i10-Index</span>
            <span class="tooltip">The number of publications with at least 10 citations</span>
        </div>
    </div>
</div>
{/if}

{#if openAlex && semanticScholar}
<details class="citation-explainer">
    <summary>Why do citation counts differ across sources?</summary>
    <div class="explainer-content">
        <p>We use <strong>OpenAlex</strong> as our primary source for paper-level data because it is fully open and provides a free API. OpenAlex builds its citation counts by matching references found in source records (Crossref, PubMed, etc.) and open access PDFs to existing works. If a reference can't be matched, it isn't counted — so OpenAlex tends to undercount relative to other sources. <a href="https://help.openalex.org/hc/en-us/articles/31459794276759-Where-does-your-citation-information-come-from" target="_blank" rel="noopener">Learn more</a>.</p>
        <p><strong>Semantic Scholar</strong> (in parentheses) supplements this with its own citation graph of over two billion citations, using enhanced PDF extraction and publisher partnerships. It focuses on published articles and preprints, with limited book coverage and no patents. <a href="https://www.semanticscholar.org/faq/estimated-citations" target="_blank" rel="noopener">Learn more</a>.</p>
        <p><strong>Google Scholar</strong> typically reports the highest counts because it aggressively crawls the web for any document that looks like a citation, including theses, slides, and preprints. It has no public API, so we link to profiles where available.</p>
    </div>
</details>
{/if}

<style>
    .citation-explainer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: var(--color-gray-700);
    }

    .citation-explainer summary {
        cursor: pointer;
        font-weight: 600;
        user-select: none;
    }

    .citation-explainer summary:hover {
        color: var(--color-fg);
    }

    .explainer-content {
        margin-top: 0.75rem;
        line-height: 1.6;
    }

    .explainer-content p {
        margin-bottom: 0.5rem;
    }

    .explainer-content p:last-child {
        margin-bottom: 0;
    }
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

    .s2-value {
        color: var(--color-gray-400);
        font-size: 1.1rem;
        font-weight: normal;
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