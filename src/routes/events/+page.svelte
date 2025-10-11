<script>
  import { onMount } from 'svelte';

  // Define reactive state
  const state = $state({
    items: [],
    loading: true,
    error: null
  });

  // PASTE YOUR WEB APP URL HERE
  const SPREADSHEET_API_URL = 'https://script.google.com/macros/s/AKfycbw2E8MsrBcguVM_SM2tqaSFn1tX31lpRJlO1XMp7rzqd1Ag7e_FI0RMzzNM3n0ZR7yy/exec';

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid date'; // Handle empty or undefined dates
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date'; // Handle invalid date strings

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  onMount(async () => {
    try {
      const response = await fetch(SPREADSHEET_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched events:', data);
      state.items = data;
    } catch (e) {
      state.error = e.message;
    } finally {
      state.loading = false;
    }
  });
  // Svelte 5 MCP route for /news
  // You can fetch news data from an API or use static data for now
  // Replace the example events with your real data or a fetch call
  const bigEvents = [
    {
      title: 'IC²S² is coming to Burlington!',
      date: 'July 28-31, 2026',
      description: 'University of Vermont is hosting the International Conference on Computational Social Science (IC2S2) in 2026.',
      image: '/common/assets/events/green-mountains.png'
    }
  ];
  const ongoingEvents = [
    {
      title: 'Complexitea',
      date: 'Every Thursday',
      description: 'Join us for weekly research presentations and discussions.',
      link: '/events/seminar'
    },
    {
      title: 'VCSI Speaker Series',
      date: 'Fall 2025',
      description: 'A semester-long program for students to work on impactful data projects.',
      link: '/events/dssg'
    }
  ];


</script>

<section class="news-banner">
  {#each bigEvents as event}
    <div class="banner-event" style="background-image: url('{event.image}');">
      <div class="banner-overlay">
        <h1>{event.title}</h1>
        <p class="date">{event.date}</p>
        <p>{event.description}</p>
        {#if event.link}
          <a href={event.link} class="banner-link">Learn more</a>
        {/if}
      </div>
    </div>
  {/each}
</section>

<section class="events-layout">
  <div class="column ongoing-events">
    <h2 style="margin-bottom: 20px">Ongoing Events</h2>
    {#if state.loading}
      <img src="/common/assets/thumbnails/platypus.png" alt="Loading..." class="spinner" />
      <br>
      <p>Consulting the diary...</p>
    {:else if state.error}
      <p>Error loading events: {state.error}</p>
    {:else}
      <ul>
        {#each state.items as event}
          {#if event.date}
            <li class="news-item" style="position: relative;">
              <h3>{event.name}</h3>
              {#if event.recurring}
                <div class="recurring-pill">{event.recurring_frequency}</div>
                <div class="card-date">{event.day}</div>
              {:else}
                <div class="card-date">{formatDate(event.date)}</div>
              {/if}
              
              
              <p>{event.description}</p>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>

  <div class="column special-events">
    <h2 style="margin-bottom: 20px">Special Events</h2>
    {#if state.loading}
      <img src="/common/assets/thumbnails/squirrel.png" alt="Loading..." class="spinner" />
      <br>
      <p>Plumbing the depths...</p>
    {:else if state.error}
      <p>Error loading events: {state.error}</p>
      {:else if state.items.filter(event => !event.recurring && event.date).length === 0}
      <p>Nothing to see here!</p>
    {:else}
      {#each state.items.filter(event => !event.recurring && event.date) as event}
        <div class="banner-event" style="background-image: url('{event.image}'); position: relative;">
          {#if event.recurring}
            <div class="recurring-pill">{event.recurring}</div>
          {/if}
          <div class="banner-overlay">
            <h3>{event.name}</h3>
            <p class="card-date">{formatDate(event.date)}</p>
            <p>{event.description}</p>
            {#if event.link}
              <a href={event.link} class="banner-link">Learn more</a>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>

<style>
.events-layout {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.column {
  flex: 1;
}
.ongoing-events {
  
  padding: 1rem;
}
.special-events {
  
  padding: 1rem;
  
}
.news-banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.banner-event {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 2rem;
}
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Semi-transparent black overlay */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
}
.banner-overlay h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.banner-overlay .date {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.banner-overlay p {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.banner-link {
  color: white;
  text-decoration: underline;
  font-weight: bold;
}
.news-list {
  max-width: 900px;
  margin: 0 auto 3rem auto;
  padding: 0 1rem;
}
.news-list h2 {
  margin-bottom: 1rem;
}
.news-item {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  list-style-type: none; /* Remove bullet points */
}
.news-link {
  color: #0056b3;
  text-decoration: underline;
}
.date {
  color: #e1e1e1;
  font-size: 0.95em;
  margin-bottom: 0.5em;
  display: block;
}

.card-date {
  color: #3b3b3b;
  font-size: 0.9em;
  margin-bottom: 0.5em;
  display: block;
}

.spinner {
  width: 50px;
  height: 50px;
  margin-left: 50px;
  margin-top: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.recurring-pill {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #164734;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .events-layout {
    flex-direction: column;
  }
}
</style>
