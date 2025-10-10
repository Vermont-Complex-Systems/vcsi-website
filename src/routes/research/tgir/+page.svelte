<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';
    import { getTgirPapers } from '../../data.remote.js';
    import PapersGrid from '$lib/components/PapersGrid.svelte';
    import TopicsChart from '$lib/components/TopicsChart.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import CitationMetrics from '$lib/components/CitationMetrics.svelte';

    const project = projectsData.find(p => p.id === 'tgir');

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

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
  {preloadFont}
/>


    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Translational Global Infectious Diseases Research Center (TGIR)</h1>
                <p class="intro">The TGIR develops outstanding junior faculty Research Project Leaders (RPLs), Pilot Project Leaders (PPLs), and Faculty Recruits via funding, mentorship, and access to Core research capabilities. These scientists bridge the gap between biological and quantitative research in the study of infectious disease.</p>
                {#if project?.url}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                        Visit the TGIR website <ExternalLink size={18} />
                    </a>
                {/if}
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/tgir.png" alt="TGIR" class="page-header-image" />
            </div>
        </div>

        <div class="content">
            <section>
                <h2>Overview</h2>
                <p>The TGIR research cores are the Mathematical and Computational Predictive Modeling Core (MCP) and the Human Population Research Core (HPR).</p>

                {#if project?.member}
                    <MemberCards memberIds={project.member} />
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

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }

    h1 {
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }

    .content {
        max-width: 800px;
    }

    section {
        margin-bottom: 2rem;
    }

    p {
        font-size: 1rem;
        line-height: 1.6;
        font-family: var(--serif);
        color: var(--color-fg);
    }

    ul {
        font-family: var(--serif);
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: disc;
    }

    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }

    .papers-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
        margin-top: 2rem;
    }

    #research-metrics {
        padding: 1.5rem 0;
        background: var(--background-light);
        border-radius: 8px;
    }

    #research-metrics h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 0;
    }

    #research-metrics p {
        margin-bottom: 1.5rem;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }


        h2 {
            font-size: 1.5rem;
        }

        .intro {
            max-width: 100%;
        }

        .papers-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
    }
</style>