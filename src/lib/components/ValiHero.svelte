<script>
  let { eyebrow, title, tagline, description, tags = [], actions = [], image } = $props();
</script>

<div class="hero">
  <div class="wrap">
    <p class="eyebrow">{eyebrow}</p>
    <div class="hero-grid">
      <div class="hero-text">
        <h1 class="hero-title">{@html title}</h1>
        {#if tagline}
          <p class="hero-tagline">{tagline}</p>
        {/if}
        <p class="hero-desc">{description}</p>
        {#if tags.length > 0}
          <div class="tags">
            {#each tags as tag}
              <span class="tag" class:g={tag.highlight}>{tag.label}</span>
            {/each}
          </div>
        {/if}
        {#if actions.length > 0}
          <div class="actions">
            {#each actions as action}
              <a href={action.href} class={action.ghost ? 'btn-ghost' : 'btn'}>{@html action.label}</a>
            {/each}
          </div>
        {/if}
      </div>
      {#if image}
        <div class="hero-art">
          <enhanced:img src={image} alt={eyebrow} class="hero-img" />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .wrap { max-width: var(--page-max-width); margin: 0 auto; padding-inline: var(--page-padding); }
  .eyebrow {
    font-size: 0.67rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold, #c8a84b); font-weight: 500; margin-bottom: 0.7rem;
  }
  .hero {
    padding-top: calc(var(--nav-height) + 6rem); padding-bottom: 6rem;
    border-bottom: 1px solid var(--border, rgba(28,28,26,0.1));
  }
  .hero-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 3rem; align-items: center; margin-top: 1rem;
  }
  .hero-text {
    display: flex; flex-direction: column; justify-content: center;
  }
  .hero-title {
    font-family: var(--serif, Georgia, serif); font-size: clamp(2.2rem, 4vw, 3.2rem);
    line-height: 1.08; margin-bottom: 1.3rem;
  }
  .hero-title :global(em) { font-style: italic; color: var(--green, #1a4f3a); }
  .hero-tagline {
    font-family: var(--serif, Georgia, serif); font-size: clamp(1rem, 1.8vw, 1.25rem);
    color: var(--ink-2, #5a5a55); margin-bottom: 1rem; font-style: italic;
  }
  .hero-desc {
    font-size: 0.97rem; color: var(--ink-2, #5a5a55); max-width: 43ch;
    line-height: 1.85; margin-bottom: 1.8rem;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 2rem; }
  .tag {
    font-size: 0.68rem; font-weight: 500; letter-spacing: 0.04em;
    padding: 0.22rem 0.65rem; border: 1px solid var(--border, rgba(28,28,26,0.1));
    border-radius: 100px; color: var(--ink-2, #5a5a55);
  }
  .tag.g { background: var(--green-pale, #e8f2ec); color: var(--green, #1a4f3a); border-color: transparent; }
  .actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  .btn {
    background: var(--green, #1a4f3a); color: #fff; padding: 0.68rem 1.7rem;
    border-radius: 2px; text-decoration: none; font-size: 0.85rem;
    font-weight: 500; letter-spacing: 0.03em;
    transition: background 0.2s, transform 0.15s; display: inline-block;
  }
  .btn:hover { background: var(--green-mid, #2d7a5a); transform: translateY(-1px); }
  .btn-ghost {
    color: var(--green, #1a4f3a); font-size: 0.85rem; font-weight: 500;
    text-decoration: none; border-bottom: 1px solid currentColor;
    padding-bottom: 1px; transition: opacity 0.2s;
  }
  .btn-ghost:hover { opacity: 0.65; }
  .hero-art { overflow: hidden; border-radius: 3px; }
  .hero-img {
    width: 100%; height: auto; object-fit: cover; border-radius: 3px;
  }

  @media (max-width: 840px) {
    .hero-grid { grid-template-columns: 1fr; }
    .hero { padding-top: calc(var(--nav-height) + 1rem); padding-bottom: 2rem; }
    .eyebrow { margin-bottom: 0.3rem; }
    .hero-title { font-size: clamp(3.2rem, 13vw, 5rem); margin-top: 0; line-height: 1.2; }
    .hero-desc { font-size: 1.05rem; }
    .hero-tagline { font-size: 1.1rem; }
  }
</style>
