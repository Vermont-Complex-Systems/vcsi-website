<script>
  /** @type {{ date: string, title: string, description: string, status: 'done' | 'upcoming' }[]} */
  let { events = [], color = '#1a4f3a', colorPale = '#e8f2ec', colorGold = '#c8a84b' } = $props();
</script>

<div class="timeline" style:--tl-color={color} style:--tl-color-pale={colorPale} style:--tl-color-gold={colorGold}>
  {#each events as event, i}
    <div class="timeline-item" class:last={i === events.length - 1}>
      <div class="timeline-dot" class:filled={event.status === 'done'} class:outline={event.status === 'upcoming'}></div>
      <div>
        <p class="timeline-date">{event.date}</p>
        <p class="timeline-title">{event.title}</p>
        <p class="timeline-desc">{event.description}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .timeline { margin-top: 2.5rem; position: relative; }
  .timeline::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 1px; background: rgba(28,28,26,0.1); margin-left: 7px;
  }
  .timeline-item { display: flex; gap: 1.5rem; align-items: flex-start; padding-bottom: 2rem; }
  .timeline-item.last { padding-bottom: 0; }
  .timeline-dot {
    width: 15px; height: 15px; border-radius: 50%;
    flex-shrink: 0; margin-top: 3px; position: relative; z-index: 1;
  }
  .timeline-dot.filled { background: var(--tl-color); }
  .timeline-dot.outline { background: var(--tl-color-pale); border: 1.5px solid var(--tl-color); }
  .timeline-date {
    font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--tl-color-gold); font-weight: 500; margin-bottom: 0.3rem;
  }
  .timeline-title { font-weight: 500; font-size: 0.92rem; margin-bottom: 0.3rem; }
  .timeline-desc { font-size: 0.82rem; color: #5a5a55; line-height: 1.7; }
</style>
