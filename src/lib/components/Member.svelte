<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import PapersGrid from "$lib/components/PapersGrid.svelte";
  import TopicsChart from "$lib/components/TopicsChart.svelte";
  
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

    {#if openAlex}
      <h2>If you are into that kind of stuff</h2>
      <div class="metrics-grid">
        <div class="metric">
          <span class="metric-value">{openAlex.works_count || 0}</span>
          <span class="metric-label">Publications</span>
        </div>
        <div class="metric">
          <span class="metric-value">{openAlex.cited_by_count || 0}</span>
          <span class="metric-label">Citations</span>
        </div>
        <div class="metric">
          <span class="metric-value">{openAlex.h_index || 0}</span>
          <span class="metric-label">H-Index</span>
        </div>
        <div class="metric">
          <span class="metric-value">{openAlex.i10_index || 0}</span>
          <span class="metric-label">i10-Index</span>
        </div>
      </div>
    {/if}
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

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
  }

  .metric {
    text-align: center;
    padding: 1rem;
    background: white;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
  }

  .metric-label {
    display: block;
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }


  h2 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }


  @media (max-width: 768px) {
    #research-metrics {
      margin: 2rem var(--margin-left-mobile);
    }
    
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>