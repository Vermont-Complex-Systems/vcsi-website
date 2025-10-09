<script>
    import Meta from "$lib/components/Meta.svelte";
    import { getMassMutualPapers } from '../../data.remote.js';
    import PapersGrid from '$lib/components/PapersGrid.svelte';
    import TopicsChart from '$lib/components/TopicsChart.svelte';
    import Spinner from '$lib/components/Spinner.svelte';

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
  title="MassMutual Center of Excellence in Complex Systems and Data Science"
  description="Advancing a wide range of faculty and graduate Vermont student-driven research ranging from the social contagion of ideas to the future of work."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header no-logo">
        <div class="page-header-text">
            <img src="/common/assets/logos/mass-mutual.png" alt="The MassMutual Center of Excellence in Complex Systems and Data Science" class="logo-as-h1" />
            <p class="intro">Advancing a wide range of faculty and graduate Vermont student-driven research ranging from the social contagion of ideas to the future of work, exploring large language models in health care, incentivizing healthy behaviors, and eliminating bias in AI.</p>
        </div>
    </div>

    <div class="content">
        <section>
            <h2>Overview</h2>
            <p>The MassMutual Center of Excellence in Complex Systems & Data Science supports a growing collection of talented faculty, postdocs, graduate and undergraduate students on research projects related to data visualization, computational finance, mortality modeling, algorithmic fairness, physical & mental health, and sleep. Students on the UVM team are enrolled in academic degree programs in Complex Systems & Data Science, Mathematical Sciences, and Computer Science.</p>

            <p>In 2018, the CoE was established with a gift from MassMutual to the Vermont Complex Systems Center at the University of Vermont. This gift was <a href="https://www.massmutual.com/about-us/news-and-press-releases/press-releases/2023/11/uvm-massmutual-renew-partnership-to-help-people-live">renewed</a> in 2023.</p>
        </section>
            
        <section>
            <h2>Research Areas</h2>
            <ul>
                <li><strong>Social Contagion of Ideas:</strong> Understanding how ideas spread through networks and communities</li>
                <li><strong>Future of Work:</strong> Exploring how technological advances reshape employment and workplace dynamics</li>
                <li><strong>Large Language Models in Healthcare:</strong> Investigating applications of AI and machine learning in medical settings</li>
                <li><strong>Health Behavior Incentivization:</strong> Developing systems to encourage and maintain healthy behaviors</li>
                <li><strong>AI Bias Elimination:</strong> Working to identify and eliminate bias in artificial intelligence systems</li>
            </ul>
        </section>
        
        <section>
            <h2>Impact</h2>
            <p>Our research contributes to both theoretical understanding and practical applications in complex systems, with real-world implications for healthcare, workplace dynamics, and social behavior. Through this partnership, we aim to advance knowledge while training the next generation of data scientists and complex systems researchers.</p>
        </section>
    </div>
</div>

{#await getMassMutualPapers()}
<div class="papers-wrapper">
    <Spinner text="Loading papers..." />
</div>
{:then papers}
{#if papers && papers.length > 0}
<div class="papers-wrapper">
    <section id="research-metrics">
        <h2>Center of Excellence Publications</h2>
        
        <p>You can explore the <u>{papers.length} publications</u> stemming from the MassMutual Center of Excellence by filtering topics:</p>
                <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
                <PapersGrid {papers} bind:sortBy bind:showAll {selectedTopic} />
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
    
    .logo-as-h1 {
        max-width: 100%;
        width: 100%;
        height: auto;
        max-height: 5rem;
        margin-bottom: 1rem;
        object-fit: contain;
        object-position: left;
        display: block;
        margin-left: 0;
        margin-right: auto;
        box-sizing: border-box;
    }
    
    
    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }
    
    .intro {
        margin-bottom: 3rem;
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
        margin-bottom: 1rem;
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
        
        .logo-as-h1 {
            max-height: 4rem;
            width: 100%;
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
        .papers-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
    }
</style>