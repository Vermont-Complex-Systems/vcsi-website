<script>
    import { base } from '$app/paths';
    import TopicsChart from './TopicsChart.svelte';
    import Spinner from './Spinner.svelte';
    import { ArrowRight, ExternalLink } from '@lucide/svelte';
    import * as d3 from 'd3';
    import { getRecentPapers } from '../../routes/data.remote.js';

    let selectedTopic = $state(null);

    function handleTopicClick(topic) {
        selectedTopic = selectedTopic === topic ? null : topic;
    }

    function filterByTopic(papers) {
        if (!selectedTopic) return papers;
        return papers.filter(p =>
            p.topics?.some(t => t.display_name === selectedTopic)
        );
    }

    const positionOrder = ['Core team', 'UVM affiliate', 'Postdoctoral researcher', 'External affiliate'];
    const positionLabels = {
        'Core team': 'core member',
        'UVM affiliate': 'UVM affiliate',
        'Postdoctoral researcher': 'postdoc',
        'External affiliate': 'external affiliate'
    };

    function formatAuthors(authors) {
        if (!authors || authors.length === 0) return null;

        const grouped = new Map();
        for (const author of authors) {
            const pos = author.position || 'External affiliate';
            if (!grouped.has(pos)) grouped.set(pos, []);
            grouped.get(pos).push(author);
        }

        const parts = [];
        for (const pos of positionOrder) {
            const group = grouped.get(pos);
            if (!group) continue;
            const label = group.length > 1
                ? positionLabels[pos] + 's'
                : positionLabels[pos];
            parts.push({ label, authors: group });
        }
        return parts;
    }

    function buildTopicColorMap(papers) {
        const topicCounts = {};
        for (const p of papers) {
            for (const t of (p.topics || [])) {
                topicCounts[t.display_name] = (topicCounts[t.display_name] || 0) + 1;
            }
        }
        const counts = Object.values(topicCounts);
        const scale = d3.scaleSequential()
            .domain([Math.min(...counts), Math.max(...counts)])
            .interpolator(t => {
                const color = d3.interpolatePlasma(t);
                const hsl = d3.hsl(color);
                hsl.l = Math.min(hsl.l * 0.7, 0.6);
                return hsl.toString();
            });
        const map = new Map();
        for (const [topic, count] of Object.entries(topicCounts)) {
            map.set(topic, scale(count));
        }
        return map;
    }

    function getPaperUrl(paper) {
        if (paper.is_open_access && paper.primary_location?.pdf_url) {
            return paper.primary_location.pdf_url;
        }
        if (paper.primary_location?.landing_page_url) {
            return paper.primary_location.landing_page_url;
        }
        if (paper.doi) {
            return `https://doi.org/${paper.doi}`;
        }
        return null;
    }
</script>

<section class="recent-section">
    <div class="recent-header">
        <h2>Fresh off the press</h2>
        <p>Papers published by our members in the last month <span class="disclaimer">— author attribution relies on <a href="https://openalex.org" target="_blank" rel="noopener">OpenAlex</a> and may not list all institute co-authors</span></p>
    </div>

    {#await getRecentPapers()}
        <Spinner text="Loading recent papers..." />
    {:then { papers, highlighted }}
        {#if papers.length > 0}
            {@const topicColors = buildTopicColorMap(papers)}
            <div class="recent-two-col">
                <div class="recent-col-chart">
                    <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
                    <p class="chart-hint">(click a topic to filter papers)</p>
                </div>
                {#if highlighted}
                    {@const url = getPaperUrl(highlighted)}
                    <div class="spotlight">
                        <span class="spotlight-label">Spotlight</span>
                        <h3>{@html highlighted.title}</h3>
                        {#if highlighted.authors?.length > 0}
                            {@const groups = formatAuthors(highlighted.authors)}
                            <p class="featuring">featuring {#each groups as group, gi}{#if gi > 0}&nbsp;and&nbsp;{/if}{group.label} {#each group.authors as author, i}{#if i > 0}{#if i === group.authors.length - 1}&nbsp;&amp;&nbsp;{:else},&nbsp;{/if}{/if}<a href="{base}/who-we-are/{author.slug}">{author.name}</a>{/each}{/each}</p>
                        {/if}
                        <div class="spotlight-meta">
                            <span class="spotlight-date">{highlighted.publication_date}</span>
                            {#if highlighted.cited_by_count > 0}
                                <span class="spotlight-citations">{highlighted.cited_by_count} citations</span>
                            {/if}
                            {#if highlighted.topics?.length > 0}
                                {#each highlighted.topics.slice(0, 3) as topic}
                                    <span class="spotlight-topic" style="background: {topicColors.get(topic.display_name) || '#475569'}; color: white;">{topic.display_name}</span>
                                {/each}
                            {/if}
                        </div>
                        {#if url}
                            <a href={url} target="_blank" rel="noopener" class="spotlight-link">
                                Read paper <ExternalLink size="16" />
                            </a>
                        {/if}
                    </div>
                {/if}
            </div>

            {#if selectedTopic}
                <div class="active-filter">
                    Filtering by: <strong>{selectedTopic}</strong>
                    <button onclick={() => selectedTopic = null}>Clear</button>
                </div>
            {/if}

            <div class="recent-grid">
                {#each filterByTopic(papers.filter(p => p !== highlighted)).slice(0, 8) as paper}
                    {@const url = getPaperUrl(paper)}
                    <div class="recent-card">
                        <span class="recent-date">{paper.publication_date}</span>
                        {#if url}
                            <a href={url} target="_blank" rel="noopener" class="recent-card-title">
                                <h4>{@html paper.title}</h4>
                            </a>
                        {:else}
                            <h4>{@html paper.title}</h4>
                        {/if}
                        {#if paper.authors?.length > 0}
                            {@const groups = formatAuthors(paper.authors)}
                            <p class="featuring">featuring {#each groups as group, gi}{#if gi > 0}&nbsp;and&nbsp;{/if}{group.label} {#each group.authors as author, i}{#if i > 0}{#if i === group.authors.length - 1}&nbsp;&amp;&nbsp;{:else},&nbsp;{/if}{/if}<a href="{base}/who-we-are/{author.slug}">{author.name}</a>{/each}{/each}</p>
                        {/if}
                        {#if paper.topics?.length > 0}
                            <span class="recent-topic" style="background: {topicColors.get(paper.topics[0].display_name) || '#475569'}; color: white;">{paper.topics[0].display_name}</span>
                        {/if}
                    </div>
                {/each}
            </div>

            <div class="explore-link-wrapper">
                <a href="{base}/explore" class="explore-link">
                    Explore our work <ArrowRight size="18" />
                </a>
            </div>
        {:else}
            <p class="no-recent">No papers published in the last month.</p>
        {/if}
    {:catch error}
        <p>Could not load recent papers.</p>
    {/await}
</section>

<style>
    .recent-section {
        background: #fff;
        border-top: 1px solid var(--color-gray-300);
        margin-top: 8rem;
        width: 100vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        padding: 4rem max(calc((100vw - var(--page-max-width)) / 2 + var(--page-padding, 2rem)), var(--page-padding, 2rem)) 3rem;
    }

    .recent-header {
        text-align: left;
        margin-bottom: 2rem;
    }

    .recent-header h2 {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 400;
        font-family: var(--serif);
        margin: 0 0 0.5rem 0;
        color: var(--color-fg);
    }

    .recent-header p {
        font-family: var(--serif);
        color: var(--color-gray-700);
        margin: 0;
        font-size: 1.1rem;
    }

    .disclaimer {
        font-size: 0.85rem;
        color: var(--color-gray-400);
    }

    .disclaimer a {
        color: var(--color-gray-400);
        text-decoration: underline;
    }

    .spotlight {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        margin: 2rem 0;
        position: relative;
    }

    .spotlight-label {
        font-family: var(--mono);
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-gray-500);
        margin-bottom: 0.5rem;
        display: block;
    }

    .spotlight h3 {
        font-family: var(--serif);
        font-size: clamp(1.2rem, 2.5vw, 1.6rem);
        font-weight: 400;
        margin: 0.5rem 0 1rem 0;
        line-height: 1.4;
    }

    .spotlight-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 1rem;
    }

    .spotlight-date {
        font-family: var(--mono);
        font-size: 0.85rem;
        color: var(--color-gray-600);
    }

    .spotlight-citations {
        font-family: var(--mono);
        font-size: 0.8rem;
        color: var(--color-gray-600);
        background: var(--color-gray-100, #f1f5f9);
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
    }

    .spotlight-topic {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
    }

    .spotlight-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--sans);
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--color-primary, #007acc);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .spotlight-link:hover {
        color: var(--color-primary-hover, #005fa3);
    }

    .recent-two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }

    .recent-col-chart {
        min-height: 300px;
    }

    .chart-hint {
        font-family: var(--mono);
        font-size: 0.75rem;
        color: var(--color-gray-400);
        text-align: center;
        margin: 3rem 0 0;
    }

    .active-filter {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: var(--sans);
        font-size: 0.9rem;
        color: var(--color-gray-700);
        margin-top: 1.5rem;
    }

    .active-filter button {
        background: none;
        border: 1px solid var(--color-gray-400);
        border-radius: 4px;
        padding: 0.2rem 0.6rem;
        font-size: 0.8rem;
        cursor: pointer;
        color: var(--color-gray-600);
        transition: background 0.15s ease;
    }

    .active-filter button:hover {
        background: var(--color-gray-100, #f1f5f9);
    }

    .recent-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .recent-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.25rem;
        border: 1px solid var(--color-gray-300);
        border-radius: var(--border-radius);
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .recent-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .recent-date {
        font-family: var(--mono);
        font-size: 0.75rem;
        color: var(--color-gray-500);
    }

    .recent-card h4 {
        font-family: var(--serif);
        font-size: 0.95rem;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .featuring {
        font-family: var(--serif);
        font-size: 0.9rem;
        font-style: italic;
        color: var(--color-gray-600);
        margin: 0.25rem 0 0.5rem;
    }

    .featuring a {
        color: var(--color-primary, #007acc);
        text-decoration: none;
        font-style: normal;
        font-weight: 500;
    }

    .featuring a:hover {
        text-decoration: underline;
    }

    .recent-card-title {
        text-decoration: none;
        color: inherit;
    }

    .recent-card-title:hover h4 {
        color: var(--color-primary, #007acc);
    }

    .recent-topic {
        font-size: 0.65rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        padding: 0.15rem 0.4rem;
        border-radius: 3px;
        align-self: flex-start;
    }

    .explore-link-wrapper {
        text-align: center;
        margin-top: 1.5rem;
    }

    .explore-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--sans);
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-primary, #007acc);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .explore-link:hover {
        color: var(--color-primary-hover, #005fa3);
    }

    .no-recent {
        font-family: var(--serif);
        color: var(--color-gray-500);
        text-align: center;
        padding: 2rem;
    }

    @media (max-width: 1200px) {
        .recent-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .recent-two-col {
            grid-template-columns: 1fr;
        }

        .recent-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .spotlight {
            padding: 1.5rem;
        }
    }
</style>
