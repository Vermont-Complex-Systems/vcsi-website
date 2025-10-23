<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'xenobots');

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta
  title="Xenobots"
  description="Artificial, intelligent, yet fully biological constructs."
  {preloadFont}
/>


    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Xenobots</h1>
                <p class="intro">Artificial, intelligent, yet fully biological constructs.</p>
                {#if project?.url}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                        Visit the Xenobots website <ExternalLink size={18} />
                    </a>
                {/if}
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/xenobots.png" alt="Xenobots" class="page-header-image" />
            </div>
        </div>

        <div class="content">
            <section>
                <h2>Overview</h2>
                <p>Xenobots are living, programmable organisms created from frog cells. This groundbreaking research explores the intersection of biology, robotics, and artificial intelligence.</p>

                {#if project?.member}
                    <h3>Institute members involved</h3>
                    <MemberCards memberIds={project.member} />
                {/if}
            </section>

            <section>
                <h2>Research Focus</h2>
                <ul>
                    <li>Living programmable organisms</li>
                    <li>Evolutionary design of biological systems</li>
                    <li>Self-assembly and collective behavior</li>
                    <li>Bioengineering and synthetic biology</li>
                    <li>Applications in medicine and environmental remediation</li>
                </ul>
            </section>
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