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
</style>