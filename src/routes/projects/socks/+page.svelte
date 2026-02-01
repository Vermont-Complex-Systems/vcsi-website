<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'socks');

</script>

<Meta 
  title="SOCKS"
  description="SOCKS builds instruments for distant reading of enormous text collections."
  
/>


<div class="page-header">
    <div class="page-header-text">
        <h1>Science of Online Corpora Knowledge and Stories (SOCKS)</h1>
        <p class="intro">SOCKS focuses on building and refining instruments that can distantly read and make sense of enormous collections of texts.</p>
        {#if project?.url}
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                Visit the SOCKS website <ExternalLink size={18} />
            </a>
        {/if}
    </div>
    <div class="page-header-logo">
    <img src="/common/assets/logos/socks.png" alt="VERSO" class="page-header-image" />
</div>
</div>

<div class="content">
    <section>
        <h2>Overview</h2>
        <p>The Science of Online Corpora Knowledge and Stories project develops computational methods and tools for analyzing vast text collections, enabling researchers to extract insights from large-scale textual data.</p>
        {#if project?.member}
            <h3>Principal Investigators</h3>
            <MemberCards memberIds={project.PI} />
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
