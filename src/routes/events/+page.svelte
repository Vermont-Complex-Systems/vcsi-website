<script>
  import { onMount } from 'svelte';

  // Define reactive state
  const state = $state({
    items: [],
    loading: true,
    error: null
  });

  // PASTE YOUR WEB APP URL HERE
  const SPREADSHEET_API_URL = 'https://script.google.com/macros/s/AKfycbzkuEUYKuC6RCbWhnBHmwuF4abtJveyDFXVIv_HWexjfwi0JrU0kKi7R3dg8eYMfjgO/exec';

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
      title: 'IC2S2 Conference 2025 in Burlington!',
      date: 'October 15, 2025',
      description: 'Our annual flagship event brings together researchers, students, and the public for a day of talks and networking.',
      image: '/common/assets/thumbnails/crow.png',
      link: '/events/symposium-2025'
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
    <div class="banner-event">
      {#if event.image}
        <img src={event.image} alt={event.title} class="banner-img" />
      {/if}
      <div class="banner-content">
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

<section class="news-list">
  <h2>Ongoing Events</h2>
  {#if state.loading}
    <p>Loading events...</p>
  {:else if state.error}
    <p>Error loading events: {state.error}</p>
  {:else}
    <ul>
      {#each state.items as event}
        <li class="news-item">
          <h3>{event.name}</h3>
          <span class="date">{event.date}</span>
          <p>{event.description}</p>
          <!-- {#if event.link}
            <a href={event.link} class="news-link">Details</a>
          {/if} -->
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
.news-banner {
  width: 100%;
  background: #f5f5f5;
  padding: 2rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.banner-event {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  margin-bottom: 2rem;
  overflow: hidden;
}
.banner-img {
  width: 320px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
}
.banner-content {
  padding: 2rem;
}
.banner-link {
  display: inline-block;
  margin-top: 1rem;
  color: #0056b3;
  text-decoration: underline;
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
}
.news-link {
  color: #0056b3;
  text-decoration: underline;
}
.date {
  color: #888;
  font-size: 0.95em;
  margin-bottom: 0.5em;
  display: block;
}
</style>
