<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'storywrangler');

</script>

<Meta
  title="Storywrangler"
  description="Storywrangler is a decentralized data catalog for complex system instruments and data governance."
  
/>


<div class="page-header">
    <div class="page-header-text">
        <h1>Storywrangler</h1>
        <p class="intro">Storywrangler is a decentralized data catalog for complex system instruments and data governance.</p>
        {#if project?.url}
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                Visit the Storywrangler website <ExternalLink size={18} />
            </a>
        {/if}
    </div>
    <div class="page-header-logo">
        <img src="/common/assets/logos/storywrangler.png" alt="Storywrangler" class="page-header-image" />
    </div>
</div>

<div class="content">
    <section>
        <h2>Overview</h2>
        <p>Storywrangler started out as a platform for tracking and analyzing n-grams across Twitter's massive data stream. It has evolved to become a set of tools for analyzing stories of all kinds in order to surface meaning in oceans of text. It has expanded to incorporate a variety of large-scale text corpora as ecological time series—living records of how collective attention shifts across populations and over time.  These tools can act as a computational history of what happened and why it mattered.

            </p>
        {#if project?.member}
            <h3>Institute members involved</h3>
            <MemberCards memberIds={project.member} />
        {/if}
    </section>

    <section>
    <h2>IC2S2 2026 Tutorial</h2>
    <p>This project is presented as a tutorial at the 2026 International Conference on Computational Social Science (IC2S2) in Burlington, Vermont.</p>
    <a href="https://vermont-complex-systems.github.io/ic2s2-tutorials/storywrangler" target="_blank" rel="noopener noreferrer" class="external-link">
            View the tutorial <ExternalLink size={18} />
    </a>
    </section>

    <section>
    <h2>The original Storywrangler</h2>
    <p>Explore trending words and phrases across 100+ languages from 2008 to the 2023</p>
    <a href="https://storywrangling.org/" target="_blank" rel="noopener noreferrer" class="external-link">
            Visit the original Storywrangler website <ExternalLink size={18} />
    </a>
    </section>
    
    <section>
    <h2>Wikiwrangler</h2>
    <p>Use rank-turbulence metrics and the Allotaxonometer to explore what grabs collective attention at the national level on Wikipedia. </p>
    <a href="https://wikimedia.uvm.edu/" target="_blank" rel="noopener noreferrer" class="external-link">
            Wikiwrangler <ExternalLink size={18} />
    </a>
    </section>

    <section>
        <h2>Research Focus</h2>
        <ul>
            <li>Large-scale n-gram analysis across social media</li>
            <li>Multilingual trend detection and comparison</li>
            <li>Temporal dynamics of language and narratives</li>
            <li>Cross-cultural information diffusion</li>
            <li>Data visualization for massive text corpora</li>
        </ul>
    </section>
</div>

