<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import PapersGrid from "$lib/components/PapersGrid.svelte";
  import TopicsChart from "$lib/components/TopicsChart.svelte";
  import CitationMetrics from "$lib/components/CitationMetrics.svelte";
  
  let { author } = $props();

  const { name, url, social, pronoun, openAlex, papers } = author;
  
  let sortBy = $state('citations');
  let showAll = $state(false);
  let selectedTopic = $state(null);
  
  const bio = author.bio || "is a contributor to The VCSI.";

  const pronounA = pronoun === "They" ? "them" : pronoun === "He" ? "him" : "her";
  const pronounB = pronoun === "They" ? "their" : pronoun === "He" ? "his" : "her";
  
  const getLinkHTML = () => {
    const t = social
      ? `You can follow ${pronounA} on <a href="${social}">the socials</a>`
      : undefined;
    const u = url ? `out ${pronounB} <a href="${url}">website</a>` : undefined;

    if (t && u)
      return `
			${t} or check ${u}. 
		`;
    else if (t) return `${t}.`;
    else if (u) return `Check ${u}.`;

    return undefined;
  };

  const link = getLinkHTML();
  
  function handleTopicClick(topic) {
    selectedTopic = selectedTopic === topic ? null : topic;
  }

</script>

<section id="intro">
  <HeroText>
    <h1>{name}</h1>

    <p>
      <span class="sr-only">{name} </span>{@html bio}
      {#if link}{@html link}{/if}
    </p>

  </HeroText>
</section>

{#if author.papers && author.papers.length > 0}
  <section id="research-metrics">
      <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
      <PapersGrid {papers} bind:sortBy bind:showAll {selectedTopic} />
      <CitationMetrics {papers} {openAlex} />
    </section>
{/if}

<style>
  #intro {
    margin-left: var(--margin-left);
    margin-right: var(--margin-left);
  }
  

  @media (max-width: 768px) {
    #intro {
      margin-left: var(--margin-left-mobile);
      margin-right: var(--margin-left-mobile);
    }
  }

  #research-metrics {
    margin: 1rem var(--margin-left);
    padding: 1.5rem 0;
    background: var(--background-light);
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    #research-metrics {
      margin: 2rem var(--margin-left-mobile);
    }
  }

  #all-authors {
    margin: 3rem var(--margin-left);
  }

  #all-authors h2 {
    font-size: 2rem;
    font-family: var(--serif);
    margin-bottom: 2rem;
  }

  .authors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .author-card {
    padding: 1.5rem;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--border-radius);
    background: var(--color-bg);
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .author-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .author-card h3 {
    font-size: 1.2rem;
    font-family: var(--serif);
    margin-bottom: 0.5rem;
    color: var(--color-fg);
  }

  .author-meta {
    font-size: 0.9rem;
    color: var(--color-gray-600);
    margin-bottom: 0.5rem;
  }

  .author-institution {
    font-size: 0.85rem;
    color: var(--color-gray-500);
    font-style: italic;
    margin: 0;
  }

  @media (max-width: 768px) {
    #all-authors {
      margin: 3rem var(--margin-left-mobile);
    }

    .authors-grid {
      grid-template-columns: 1fr;
    }
  }
</style>