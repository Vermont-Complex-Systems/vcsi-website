<script>
  import HeroText from "$lib/components/HeroText.svelte";
  import BarChart from "$lib/components/BarChart.svelte";

  let { author } = $props();

  const { name, email, url, social, pronoun, position, openAlex } = author;
  
  // Helper function to safely parse JSON
  function safeParse(data) {
    // If it's already an object, return it
    if (typeof data === 'object' && data !== null) {
      return data;
    }
    
    // If it's a string, try to parse it
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.warn('Failed to parse JSON:', data, e);
        return null;
      }
    }
    
    // For any other type, return null
    return null;
  }
  
  // Helper function to get PDF URL from primary location
  function getPdfUrl(paper) {
    if (!paper.primary_location) return null;
    const location = safeParse(paper.primary_location);
    return location?.pdf_url || null;
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

{#if openAlex}



<section id="research-metrics">

  
  {#if openAlex.topics && openAlex.topics.length > 0}
      <BarChart {author}/>  
  {/if}

    {#if openAlex.papers && openAlex.papers.length > 0}
      <h3>Top Cited Papers</h3>
      <div class="papers-grid">
        {#each openAlex.papers.sort((a, b) => (b.cited_by_count || 0) - (a.cited_by_count || 0)).slice(0, 16) as paper}
          {@const pdfUrl = getPdfUrl(paper)}
          {#if paper.is_open_access && pdfUrl}
            <!-- Clickable card for Open Access papers with PDF -->
            <a href="{pdfUrl}" target="_blank" class="paper-card-link">
              <div class="paper-card clickable-card">
                <div class="paper-card-header">
                  <span class="citations-badge">{paper.cited_by_count || 0}</span>
                  <span class="year-badge">{paper.publication_year}</span>
                </div>
                <h4 class="paper-card-title">{paper.title}</h4>
                <div class="paper-card-meta">
                  <span class="oa-badge">📄 Open Access</span>
                  {#if paper.doi}
                    <span class="doi-text">DOI</span>
                  {/if}
                </div>
              </div>
            </a>
          {:else}
            <!-- Non-clickable card for other papers -->
            <div class="paper-card">
              <div class="paper-card-header">
                <span class="citations-badge">{paper.cited_by_count || 0}</span>
                <span class="year-badge">{paper.publication_year}</span>
              </div>
              <h4 class="paper-card-title">{paper.title}</h4>
              <div class="paper-card-meta">
                {#if paper.is_open_access}
                  <span class="oa-badge">Open Access</span>
                {/if}
                {#if paper.doi}
                  <a href="https://doi.org/{paper.doi}" target="_blank" class="doi-link">DOI</a>
                {/if}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    <h2>If you are into sort of thing...</h2>
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


  h2, h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  /* Top Cited Papers Grid */
  .papers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
  }

  .paper-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    min-height: 200px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    height: fit-content;
  }

  .paper-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  /* Clickable card styles */
  .paper-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .clickable-card {
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .clickable-card:hover {
    border-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }

  .doi-text {
    color: var(--accent-color);
    font-size: 0.8rem;
    font-weight: 500;
  }

  .paper-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .citations-badge {
    background: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .year-badge {
    background: var(--background-light);
    color: var(--text-secondary);
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .paper-card-title {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 0.75rem 0;
    color: var(--text-primary);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .paper-card-meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .oa-badge {
    background: #2ecc71;
    color: white;
    padding: 0.2rem 0.4rem;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 500;
    display: inline-block;
  }

  .doi-link {
    color: var(--accent-color);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .doi-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    #research-metrics {
      margin: 2rem var(--margin-left-mobile);
    }
    
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .papers-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
</style>