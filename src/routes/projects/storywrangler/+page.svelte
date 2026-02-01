<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'storywrangler');

</script>

<Meta
  title="Storywrangler"
  description="Track and compare Twitter n-grams from 2008 on in 100+ languages."
  
/>


<div class="page-header">
    <div class="page-header-text">
        <h1>Storywrangler</h1>
        <p class="intro">Track and compare Twitter n-grams from 2008 on in 100+ languages.</p>
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
        <p>Storywrangler is a platform for tracking and analyzing n-grams across Twitter's massive data stream. Explore trending words and phrases across 100+ languages from 2008 to the present.</p>
        {#if project?.member}
            <h3>Institute members involved</h3>
            <MemberCards memberIds={project.member} />
        {/if}
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

