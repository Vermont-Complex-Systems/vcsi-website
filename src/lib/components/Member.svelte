<script>
  import HeroText from "$lib/components/HeroText.svelte";
  
  let { author } = $props();

  const { name, email, url, social, pronoun, position, openAlex } = author;
  console.log(openAlex)
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
  const has = pronoun === "They" ? "have" : "has";
  const first = name.split(" ")[0].toLowerCase();
</script>

<section id="intro">
  <HeroText>
    <h1>{name}</h1>

    <p>
      <span class="sr-only">{name} </span>{@html bio}
      {#if link}{@html link}{/if}
    </p>

    {#if position === "Staff" && email}
      <p>Get in touch: <a href="mailto:{email}">{first}@uvm.edu</a></p>
    {/if}
  </HeroText>
</section>

{#if openAlex}
  <section id="research-metrics">
    {#if openAlex.topics && openAlex.topics.length > 0}
      <h3>Research Topics</h3>
      <div class="topics">
        {#each openAlex.topics.slice(0, 5) as topic}
          <span class="topic-tag">{topic.display_name}</span>
        {/each}
      </div>
    {/if}

    {#if openAlex.affiliations && openAlex.affiliations.length > 0}
      <h3>Affiliations</h3>
      <ul class="affiliations">
        {#each openAlex.affiliations.slice(0, 3) as affiliation}
          <li>{affiliation.institution_display_name}</li>
        {/each}
      </ul>
    {/if}

    {#if openAlex.papers && openAlex.papers.length > 0}
      <h3>Recent Publications</h3>
      <div class="papers">
        {#each openAlex.papers.slice(0, 5) as paper}
          <div class="paper">
            <h4 class="paper-title">{paper.title}</h4>
            <div class="paper-meta">
              <span class="paper-year">{paper.publication_year}</span>
              {#if paper.cited_by_count > 0}
                <span class="paper-citations">{paper.cited_by_count} citations</span>
              {/if}
              {#if paper.is_open_access}
                <span class="open-access">Open Access</span>
              {/if}
              {#if paper.doi}
                <a href="https://doi.org/{paper.doi}" target="_blank" class="paper-link">DOI</a>
              {/if}
            </div>
            {#if paper.abstract}
              <p class="paper-abstract">{paper.abstract}</p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    <h2>Research Metrics</h2>
    <div class="metrics-grid">
      <div class="metric">
        <span class="metric-value">{openAlex.works_count}</span>
        <span class="metric-label">Publications</span>
      </div>
      <div class="metric">
        <span class="metric-value">{openAlex.cited_by_count?.toLocaleString()}</span>
        <span class="metric-label">Citations</span>
      </div>
      <div class="metric">
        <span class="metric-value">{openAlex.h_index}</span>
        <span class="metric-label">H-Index</span>
      </div>
      <div class="metric">
        <span class="metric-value">{openAlex.i10_index}</span>
        <span class="metric-label">i10-Index</span>
      </div>
    </div>
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
    margin: 2rem var(--margin-left);
    padding: 1.5rem;
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

  .topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .topic-tag {
    background: var(--accent-color);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
  }

  .affiliations {
    list-style: none;
    padding: 0;
  }

  .affiliations li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .affiliations li:last-child {
    border-bottom: none;
  }

  .papers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
  }

  .paper {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.25rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .paper-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
    color: var(--text-primary);
  }

  .paper-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }

  .paper-year {
    font-weight: 600;
    color: var(--primary-color);
  }

  .paper-citations {
    color: var(--text-secondary);
  }

  .open-access {
    background: #2ecc71;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .paper-link {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
  }

  .paper-link:hover {
    text-decoration: underline;
  }

  .paper-abstract {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
    font-style: italic;
  }

  h2, h3 {
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