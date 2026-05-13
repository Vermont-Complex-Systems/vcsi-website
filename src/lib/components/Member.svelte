<script>
  import PapersGrid from "$lib/components/PapersGrid.svelte";
  import TopicsChart from "$lib/components/TopicsChart.svelte";
  import CitationMetrics from "$lib/components/CitationMetrics.svelte";
  import ProfileLinks from "$lib/components/ProfileLinks.svelte";

  let { author } = $props();

  const { name, url, social, pronoun, openAlex, papers } = author;

  let sortBy = $state('citations');
  let selectedTopic = $state(null);
  let semanticScholar = $state(null);

  if (author.semanticScholarId) {
    fetch(`https://api.semanticscholar.org/graph/v1/author/${author.semanticScholarId}?fields=name,hIndex,citationCount,paperCount,url`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { semanticScholar = data; })
      .catch(() => {});
  }

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
      <ProfileLinks {author} semanticScholarUrl={semanticScholar?.url} />
      <p class="intro">
        <span class="sr-only">{name} </span>{@html bio}{#if author.groups && author.groups.length > 0}{' '}{pronoun === "They" ? "They" : pronoun === "He" ? "He" : "She"} also leads the {#each author.groups as group, i}<a href={group.url || `/research/group/${group.id}`}>{group.name}</a>{#if i < author.groups.length - 2}, {/if}{#if i === author.groups.length - 2} and the {/if}{/each}.{/if}
        {#if link}{@html link}{/if}
      </p>
    </div>
  </div>
</section>


{#if author.papers && author.papers.length > 0}
  <section id="research-metrics">
      <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
      <PapersGrid {papers} bind:sortBy {selectedTopic} />
      <CitationMetrics {papers} {openAlex} {semanticScholar} />
    </section>
{/if}

