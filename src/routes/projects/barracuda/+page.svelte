<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'barracuda');

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta
  title="Barracuda"
  description="To harness diverse current and historic data and new mechanistic models across the continental United States to help us better predict and adapt to climate change impacts on biodiversity and rural communities."
  {preloadFont}
/>


    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Barracuda</h1>
                <p class="intro">To harness diverse current and historic data and new mechanistic models across the continental United States to help us better predict and adapt to climate change impacts on biodiversity and rural communities.</p>
                {#if project?.url}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                        Visit the {project.name} website <ExternalLink size={18} />
                    </a>
                {/if}
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/{project.id}.png" alt="Hedonometer" class="page-header-image" />
            </div>
        </div>

        <div class="content">
            <section>
                <h2>Overview</h2>
                <p>Barracuda is a research project funded by a National Science Foundation EPSCoR grant, and is a collaboration between two research groups at the University of Maine (UM) and the University of Vermont (UVM).</p>

                {#if project?.member}
                    <MemberCards memberIds={project.member} />
                {/if}
            </section>

            <section>
                <h2>Research Focus</h2>
                <ul>
                    <li>Natural adaptation to climate change</li>
                    <li>Rural community adaptation to climate change</li>
                    <li>Spatiotemporal data science tool development</li>
                    <li>Improving public communication of spatiotemporal data</li>
                </ul>
            </section>
            <p>Common approaches across all themes include a deliberate emphasis on mentoring and the interdisciplinary sharing of knowledge and skills among team member regardless of discipline and career status.</p>
        </div>
    </div>

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

    a {
        color: var(--color-primary);
        text-decoration: underline;
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
    }
</style>