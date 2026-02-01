<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import MemberCards from "$lib/components/MemberCards.svelte";
    import projectsData from '$data/projects.csv';

    const project = projectsData.find(p => p.id === 'hedonometer');

</script>

<Meta
  title="Hedonometer"
  description="Measuring the happiness (and sadness) of all kinds of texts."
  
/>


<div class="page-header">
    <div class="page-header-text">
        <h1>Hedonometer</h1>
        <p class="intro">Measuring the happiness (and sadness) of all kinds of texts.</p>
        {#if project?.url}
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="external-link">
                Visit the Hedonometer website <ExternalLink size={18} />
            </a>
        {/if}
    </div>
    <div class="page-header-logo">
        <img src="/common/assets/logos/hedonometer.png" alt="Hedonometer" class="page-header-image" />
    </div>
</div>

<div class="content">
    <section>
        <h2>Overview</h2>
        <p>The Hedonometer measures the happiness of large-scale texts including Twitter, books, news articles, and more.</p>
        {#if project?.member}
            <h3>Institute members involved</h3>
            <MemberCards memberIds={project.member} />
        {/if}
    </section>
    <section>
        <h2>Research Focus</h2>
        <ul>
            <li>Sentiment analysis of large-scale text data</li>
            <li>Temporal patterns in collective emotional states</li>
            <li>Language and happiness across different corpora</li>
            <li>Real-time emotion tracking on social media</li>
        </ul>
    </section>
</div>