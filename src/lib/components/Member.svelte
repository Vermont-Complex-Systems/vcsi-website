<script>
  import HeroText from "$lib/components/HeroText.svelte";
	import { sort } from "svelteplot";
  import BarChart from "./BarChart.svelte";
  import { flip } from 'svelte/animate';
  
  let { author } = $props();

  const { name, email, url, social, pronoun, position, openAlex, papers } = author;
  
  let sortBy = $state('citations'); // 'citations', 'year', 'title'
  let showAll = $state(false);
  
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
  
  // Function to sort papers based on selected criteria
  function getSortedPapers() {
    if (!papers || papers.length === 0) return [];
    
    let sorted = [...papers];
    
    switch (sortBy) {
      case 'citations':
        return sorted.sort((a, b) => (b.cited_by_count || 0) - (a.cited_by_count || 0));
      case 'year':
        return sorted.sort((a, b) => (b.publication_year || 0) - (a.publication_year || 0));
      case 'title':
        return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      default:
        return sorted;
    }
  }
  
  // Helper function to get the best URL for a paper
  function getPaperUrl(paper) {
    // Priority 1: If open access and has PDF URL
    if (paper.is_open_access && paper.primary_location?.pdf_url) {
      return paper.primary_location.pdf_url;
    }
    
    // Priority 2: Landing page URL
    if (paper.primary_location?.landing_page_url) {
      return paper.primary_location.landing_page_url;
    }
    
    // Priority 3: DOI URL
    if (paper.doi) {
      return `https://doi.org/${paper.doi}`;
    }
    
    // No URL available
    return null;
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
    <BarChart papers={author.papers}/>
  
    <div class="papers-header">
      <h2>Expore the papers by {sortBy}</h2>
      <div class="sort-controls">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" bind:value={sortBy}>
          <option value="citations">Citations</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
    
    <div class="papers-grid">
    {#each getSortedPapers().slice(0, showAll ? undefined : 16) as paper (paper.openalex_id)}
      {@const paperUrl = getPaperUrl(paper)}
      
      <div animate:flip={{ duration: 400 }}>
        {#if paperUrl}
          <a href={paperUrl} target="_blank" rel="noopener" class="paper-card-link">
            <div class="paper-card clickable-card">
            <div class="paper-card-header">
              <span class="citations-badge">{paper.cited_by_count || 0} citations</span>
              <span class="year-badge">{paper.publication_year}</span>
            </div>
            <h4 class="paper-card-title">{@html paper.title}</h4>
            <div class="paper-card-meta">
              <div class="badges-row">
                {#if paper.is_open_access}
                  {#if paper.primary_location?.pdf_url}
                    <span class="oa-badge">📥 PDF Download</span>
                  {:else}
                    <span class="oa-badge">📄 Open Access</span>
                  {/if}
                {/if}
                {#if paper.doi}
                  <span class="doi-text">{@html paper.doi}</span>
                {/if}
              </div>
              {#if paper.topics && paper.topics.length > 0}
                <div class="topics-container">
                  {#each paper.topics.slice(0, 3) as topic}
                    <span class="topic-badge">{topic.display_name}</span>
                  {/each}
                  {#if paper.topics.length > 3}
                    <span class="topic-badge more-topics">+{paper.topics.length - 3}</span>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
          </a>
        {:else}
          <div class="paper-card">
          <div class="paper-card-header">
            <span class="citations-badge">{paper.cited_by_count || 0} citations</span>
            <span class="year-badge">{paper.publication_year}</span>
          </div>
          <h4 class="paper-card-title">{paper.title}</h4>
          <div class="paper-card-meta">
            <div class="badges-row">
              {#if paper.is_open_access}
                {#if paper.primary_location?.pdf_url}
                  <span class="oa-badge">📥 PDF Download</span>
                {:else}
                  <span class="oa-badge">📄 Open Access</span>
                {/if}
              {/if}
              {#if paper.doi}
                <span class="doi-text">DOI</span>
              {/if}
            </div>
            {#if paper.topics && paper.topics.length > 0}
              <div class="topics-container">
                {#each paper.topics.slice(0, 3) as topic}
                  <span class="topic-badge">{topic.display_name}</span>
                {/each}
                {#if paper.topics.length > 3}
                  <span class="topic-badge more-topics">+{paper.topics.length - 3}</span>
                {/if}
              </div>
            {/if}
          </div>
          </div>
        {/if}
      </div>
    {/each}
    </div>
    
    {#if papers && papers.length > 16}
      <div class="show-more-container">
        <button 
          class="show-more-btn" 
          onclick={() => showAll = !showAll}
        >
          {showAll ? `Show Less` : `Show All ${papers.length} Papers`}
        </button>
      </div>
    {/if}

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


  h2 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .papers-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .sort-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .sort-controls label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .sort-controls select {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: white;
    font-size: 0.9rem;
    color: var(--text-primary);
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .sort-controls select:hover {
    border-color: var(--primary-color);
  }

  .sort-controls select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }

  /* Top Cited author.papers Grid */
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
    min-height: 220px;
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
    color: var(--text-secondary);
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
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .badges-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .topics-container {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
  }

  .topic-badge {
    background: #f1f5f9;
    color: #475569;
    border: none;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    display: inline-block;
    line-height: 1;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }

  .topic-badge::before {
    content: '#';
    opacity: 0.6;
    margin-right: 0.1rem;
  }

  .topic-badge.more-topics {
    background: #64748b;
    color: white;
    font-weight: 700;
  }

  .topic-badge.more-topics::before {
    content: '';
    margin-right: 0;
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

  .show-more-container {
    text-align: center;
    margin: 2rem 0;
  }

  .show-more-btn {
    background: var(--primary-color);
    color: var(--text-secondary);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .show-more-btn:hover {
    background: var(--primary-color-dark, var(--primary-color));
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .show-more-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    
    .papers-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .papers-header h2 {
      margin-bottom: 0;
    }
  }
</style>