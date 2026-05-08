<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'wikiwrangler');

</script>

<Meta 
  title="WikiWrangler"
  description="Measuring Collective Attention of Words on Wikipedia."
  
/>


<div class="page-header">
    <div class="page-header-text">
        <h1>WikiWrangler</h1>
        <p class="intro">Measuring Collective Attention of Words on Wikipedia.</p>
        {#if project?.url}
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                Visit the WikiWrangler website <ExternalLink size={18} />
            </a>
        {/if}
    </div>
    <div class="page-header-logo">
    <img src="/common/assets/logos/wikiwrangler.png" alt="Wikiwrangler thumbnail" class="page-header-image" />
</div>
</div>

<div class="content">
    <section>
        <h2>Overview</h2>
        <p>The WikiWrangler project is a platform to examine collective attention patterns using Wikipedia's articles <a href="https://dumps.wikimedia.org/other/pageview_complete/readme.html">pageview</a> counts. </p>
        {#if project?.member}
            <h3>Institute members involved</h3>
            <MemberCards memberIds={project.member} />
        {/if}
    </section>
    
    <section>
        <h2>Research Focus</h2>
        <ul>
            <li>Distant reading methodologies for large text corpora</li>
            <li>Natural language processing and text mining</li>
            <li>Computational narrative analysis</li>
            <li>Digital humanities research tools</li>
            <li>Large-scale content analysis frameworks</li>
        </ul>
    </section>
</div>

<style>
    .page-header-image {
        box-shadow: 4px 4px 0px var(--color-gray-400);
        mix-blend-mode: normal;
    }
</style>
