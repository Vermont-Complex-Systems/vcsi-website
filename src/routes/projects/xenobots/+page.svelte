<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'xenobots');

</script>

<Meta
  title="Xenobots"
  description="Artificial, intelligent, yet fully biological constructs."
  
/>


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
