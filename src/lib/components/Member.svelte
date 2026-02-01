<script>
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

<section id="content">
  <div class="page-header no-logo">
    <div class="page-header-text">
      <h1>{name}</h1>
      <p class="intro">
        <span class="sr-only">{name} </span>{@html bio}
        {#if link}{@html link}{/if}
      </p>
    </div>
  </div>
</section>

{#if author.papers && author.papers.length > 0}
  <section id="research-metrics">
      <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
      <PapersGrid {papers} bind:sortBy bind:showAll {selectedTopic} />
      <CitationMetrics {papers} {openAlex} />
    </section>
{/if}
