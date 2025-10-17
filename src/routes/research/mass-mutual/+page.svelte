<script>
    import Meta from "$lib/components/Meta.svelte";
    import { getMassMutualPapers } from '../../data.remote.js';
    import PapersGrid from '$lib/components/PapersGrid.svelte';
    import TopicsChart from '$lib/components/TopicsChart.svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import Spinner from '$lib/components/Spinner.svelte';
    import miscData from '$data/misc.csv';

    const entry = miscData.find(p => p.id === 'mmcoe');

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
        <div class="page-header-logo">
                <img src="/common/assets/drawing/tardi01.png" alt="Tardigrade-drawing" class="page-header-image"/>
        </div>
    </div>

    <div class="content">
        <section>
            <h2>About</h2>
            <p>The MassMutual Center of Excellence (CoE) in Complex Systems & Data Science supports a growing collection of talented faculty, postdocs, graduate and undergraduate students on research projects related to data visualization, artificial intelligence, computational finance, algorithmic fairness, physical & mental health, and sleep. Students on the UVM team are enrolled in academic degree programs in Complex Systems & Data Science, Mathematical Sciences, Psychology, and Computer Science.</p>
            <p>In 2018, the CoE was established with a <a href="https://www.uvm.edu/uvmnews/news/massmutual-and-uvm-expand-groundbreaking-data-science-partnership">gift</a> from MassMutual to the Vermont Complex Systems Center at the University of Vermont, and the partnership was <a href="https://www.massmutual.com/about-us/news-and-press-releases/press-releases/2023/11/uvm-massmutual-renew-partnership-to-help-people-live">renewed</a> in 2023 to continue to support research to enhance human well-being.</p>
        </section>

        <section>
            <div class="section-with-image">
                <h2>Fellowship Opportunities</h2>
                <img src="/common/assets/drawing/tardi05.png" alt="Tardigrade-flying" class="section-image" />
            </div>

            <h3>Postdoctoral Fellowship</h3>
            <p>The MassMutual Center of Excellence <strong>Postdoctoral Fellowship</strong> at the University of Vermont's Complex Systems Center offers early-career scientists a unique experience to tackle open questions related to complex systems and data science that are of utmost importance in science, industry, and society. This postdoctoral fellowship provides a high level of intellectual freedom and the opportunity to work alongside leading academic researchers and industry partners.</p>
            <p>This postdoctoral fellowship is supported by our groundbreaking data science partnership with MassMutual. The MassMutual Center of Excellence for Complex Systems and Data Science engages in research projects and programs aimed at better understanding human wellness through data analytics, as well as programming to cultivate a strong pipeline of data science talent.</p>

            <h4>Eligibility Requirements</h4>
            <p>A Ph.D. (or expected Ph.D.) in a relevant field (such as Physics, Mathematics, Computer Science, Statistics, Computational Social Science, Computational Biology, Data Science)</p>
            <ul>
                <li>Exemplary knowledge of data science and computational tools</li>
                <li>Ability to work independently and lead a research project from the ground-up</li>
                <li>Intellectual curiosity and interest in working in a highly-collaborative complex systems science environment</li>
            </ul>

            <div class="section-with-image">
                <h3>Graduate Fellowship</h3>
                <img src="/common/assets/drawing/tardi03.png" alt="Tardigrade-running" class="section-image" />
            </div>
            <p>The MassMutual Center of Excellence in Complex Systems and Data Science <strong>Graduate Fellowship</strong> at University of Vermont offers annual graduate fellowships to students enrolled in the UVM Complex Systems Center's MS and PhD in Complex Systems and Data Science. These fellowships offer a unique experience for students to tackle real world health and wellness problems that matter most for science, industry, and society.</p>
            <p>This graduate fellowship is supported by our groundbreaking data science partnership with MassMutual. The MassMutual Center of Excellence for Complex Systems and Data Science engages in research projects and programs aimed at better understanding human wellness through data analytics, as well as programming to cultivate a strong pipeline of data science talent.</p>
            <p>This fellowship provides an opportunity to work alongside leading academic researchers and industry partners.</p>

            <p>Examples of research projects that will be conducted at the MassMutual Center of Excellence include study in the following areas:</p>
            <ul>
                <li>Longevity and wellness, including the link between physical and financial health and environmental impacts on wellness.</li>
                <li>Wearable devices, health incentives, and healthy behaviors</li>
                <li>Algorithmic fairness, accountability and transparency, which will encompass alternative underwriting data, methods for controlling bias and data ethics.</li>
                <li>Measurement methodologies for large scale social systems, covering such topics as macroeconomic events, mortality risk and social cohesion, among others.</li>
            </ul>

            <div class="section-with-image">
                <h4>Eligibility Requirements</h4>
                <img src="/common/assets/drawing/tardi06.png" alt="Tardigrade-subscribing" class="section-image"/>
            </div>
            <ul>
                <li>For PhD Fellowship: a completed Master's Degree</li>
                <li>For Master's Fellowship: a completed Bachelor's Degree</li>
                <li>Knowledge of data science and computational tools</li>
                <li>Ability to work independently</li>
                <li>Intellectual curiosity and interest in working in a highly-collaborative complex systems science environment</li>
            </ul>
        </section>

        <section>
            <h2>Center of Excellence Team</h2>
            <MemberCards memberIds={entry.member} />
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
    .content-wrapper,
    .papers-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }

    .papers-wrapper {
        margin-top: 2rem;
    }

    .section-image {
        width: 160px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        transform: translateX(-5rem);
    }

    .page-header {
        align-items: flex-end;
    }

    .page-header-logo {
        margin-right: 25rem;
    }

    .page-header-image {
        width: 8rem;
    }

    .logo-as-h1 {
        max-height: 5.5rem;
        margin-bottom: 1rem;
        object-fit: contain;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1.5rem;
        margin-top: 3rem;
    }

    h3 {
        font-size: 1.4rem;
        font-weight: 600;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }

    h4 {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--sans);
        margin-bottom: 0.75rem;
        margin-top: 1.5rem;
    }

    .page-header-text .intro {
        margin-bottom: 0;
        font-size: 1.1rem;
    }

    .content,
    section {
        max-width: 80%;
    }

    section {
        margin-bottom: 3rem;
    }

    p {
        line-height: 1.6;
        font-family: var(--serif);
        margin-bottom: 1rem;
    }

    a {
        color: var(--color-accent);
        text-decoration: underline;
    }

    a:hover {
        color: var(--color-accent-hover);
    }

    #research-metrics {
        padding: 1.5rem 0;
        background: var(--background-light);
        border-radius: 8px;
    }

    #research-metrics h2 {
        margin-top: 0;
    }

    #research-metrics p {
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .content-wrapper,
        .papers-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }

        .page-header-logo {
            align-self: center;
            margin-right: 0;
        }

        .page-header-image {
            width: 10rem;
        }
        

        .section-image {
            transform: none;
        }

        .logo-as-h1 {
            max-width: 100%;
            max-height: 15rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        .page-header-text .intro {
            font-size: 1.4rem;
        }
        
        .content,
        section {
            max-width: 100%;
        }
    }
</style>