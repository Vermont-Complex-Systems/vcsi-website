<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'barracuda');

</script>

<Meta
  title="Barracuda"
  description="To harness diverse current and historic data and new mechanistic models across the continental United States to help us better predict and adapt to climate change impacts on biodiversity and rural communities."
  
/>

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
            <h3>Institute members involved</h3>
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
    
    <section>
        <p>Common approaches across all themes include a deliberate emphasis on mentoring and the interdisciplinary sharing of knowledge and skills among team member regardless of discipline and career status.</p>
    </section>
</div>