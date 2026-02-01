<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import { getTgirPapers } from '../../data.remote.js';
    import PapersGrid from '$lib/components/PapersGrid.svelte';
    import TopicsChart from '$lib/components/TopicsChart.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import CitationMetrics from '$lib/components/CitationMetrics.svelte';

    import miscData from '$data/misc.csv';

    const entry = miscData.find(p => p.id === 'tgir');

    let sortBy = $state('citations');
    let showAll = $state(false);
    let selectedTopic = $state(null);

    function handleTopicClick(topic) {
        selectedTopic = selectedTopic === topic ? null : topic;
    }
</script>

<Meta
  title="TGIR"
  description="TGIR project description."
/>

<div class="page-header">
    <div class="page-header-text">
        <h1>Translational Global Infectious Diseases Research Center (TGIR)</h1>
        <p class="intro">The TGIR develops outstanding junior faculty Research Project Leader, Pilot Project Leaders, and Faculty Recruits via funding, mentorship, and access to Core research capabilities. These scientists bridge the gap between biological and quantitative research in the study of infectious disease.</p>
        <a href={entry.url} target="_blank" rel="noopener noreferrer" class="external-link">
            Visit the TGIR website <ExternalLink size={18} />
        </a>
    </div>
    <div class="page-header-logo">
        <img src="/common/assets/logos/tgir.png" alt="TGIR" class="page-header-image" />
    </div>
</div>
<div class="content">
    <section>
        <h2>Overview</h2>
        <p>The TGIR research cores are the Mathematical and Computational Predictive Modeling Core (MCP) and the Human Population Research Core (HPR).</p>
        {#if entry?.member}
            <h3>Institute members involved</h3>
            <MemberCards memberIds={entry.member} />
        {/if}
    </section>
    <section>
        <h2>Research Focus</h2>
        <ul>
            <li>Mathematical and computational modeling of infectious diseases</li>
            <li>Human population research and epidemiological studies</li>
            <li>Translational research bridging basic science and clinical applications</li>
            <li>Global health and infectious disease surveillance</li>
        </ul>
    </section>
</div>

{#await getTgirPapers()}
<div class="papers-wrapper">
    <Spinner text="Loading papers..." />
</div>
{:then papers}
{#if papers && papers.length > 0}
<div class="papers-wrapper">
    <section id="research-metrics">
        <h2>TGIR Publications</h2>
        <p>Explore the <u>{papers.length} publications</u> from the TGIR involving institute members by filtering topics:</p>
        <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
        <PapersGrid {papers} bind:sortBy bind:showAll {selectedTopic} />
        <CitationMetrics {papers} />
    </section>
</div>
{/if}
{:catch error}
<div class="papers-wrapper">
    <p>Error loading papers: {error.message || 'Unknown error'}</p>
</div>
{/await}

