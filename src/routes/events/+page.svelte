<script>
    import Meta from "$lib/components/Meta.svelte";

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid date';
        const date = new Date(dateString);
        if (isNaN(date)) return 'Invalid date';
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    };

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
            name: 'Complexitea',
            recurring: true,
            recurring_frequency: 'Weekly',
            day: 'Thursday',
            time: '12-1pm',
            description: 'A casual lunch at the VCSI offices. All welcome!',
            link: '/events/seminar'
        }
    ];

    const specialEvents = [
        { event: 'VCSI Fall Speaker Series', date: '2025-10-20', name: 'Matt Devost - UVM trustee', location: 'Innovation E100' },
        { event: 'VCSI Fall Speaker Series', date: '2025-10-20', name: 'Brennan Dell', location: 'Innovation E100' },
        { event: 'VCSI Fall Speaker Series', date: '2025-11-03', name: 'Hunter Priniski', location: 'Innovation E100' },
        { event: 'VCSI Fall Speaker Series', date: '2025-11-10', name: 'Joe Near', location: 'Innovation E100' },
        { event: 'VCSI Fall Speaker Series', date: '2025-11-17', name: 'Phil Chodrow', location: 'Innovation E100' },
        { event: 'VCSI Fall Speaker Series', date: '2025-12-01', name: 'Ellen Kozelka', location: 'Innovation E100' },
        { event: 'VCSI Fall Speaker Series', date: '2025-12-08', name: 'Ben Cooley', location: 'Innovation E100' }
    ];
</script>

<Meta
    title="Events"
    description="Upcoming events, seminars, and conferences at the Vermont Complex Systems Institute."
/>

<section class="banner">
    {#each bigEvents as event}
        <div class="banner-event" style="background-image: url('{event.image}');">
            <div class="banner-overlay">
                <h1>{event.title}</h1>
                <p class="banner-date">{event.date}</p>
                <p>{event.description}</p>
                {#if event.link}
                    <a href={event.link} class="banner-link">Learn more</a>
                {/if}
            </div>
        </div>
    {/each}
</section>

<div class="grid-2 events-grid">
        <section>
            <h2>Ongoing Events</h2>
            <ul class="event-list">
                {#each ongoingEvents as event}
                    <li class="card event-card">
                        <h3>{event.name}</h3>
                        {#if event.recurring}
                            <span class="badge badge-dark">{event.recurring_frequency}</span>
                            <p class="event-date">{event.day} from {event.time}</p>
                        {:else}
                            <p class="event-date">{formatDate(event.date)}</p>
                        {/if}
                        <p>{event.description}</p>
                    </li>
                {/each}
            </ul>
        </section>

        <section>
            <h2>Special Events</h2>
            <ul class="event-list">
                {#each specialEvents as event}
                    <li class="card event-card">
                        <h3>{event.event}</h3>
                        <h4>{event.name}</h4>
                        <p class="event-date">{formatDate(event.date)} in {event.location}</p>
                    </li>
                {/each}
            </ul>
        </section>
</div>

<style>
    /* Banner - full width */
    .banner {
        width: 100vw;
        margin-left: calc(50% - 50vw);
    }

    .banner-event {
        width: 100%;
        height: 300px;
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .banner-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
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
        margin: 0 0 0.5rem;
        color: white;
    }

    .banner-overlay p {
        color: #f7f7f7;
        margin-bottom: 1rem;
    }

    .banner-date {
        font-size: 1.2rem;
    }

    .banner-link {
        color: white;
        text-decoration: underline;
        font-weight: 600;
    }

    /* Events grid spacing */
    .events-grid {
        margin-top: 2rem;
    }

    .event-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .event-card {
        margin-bottom: 1.5rem;
        position: relative;
    }

    .event-card h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .event-card h4 {
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: var(--color-gray-700);
    }

    .event-card p {
        margin-bottom: 0.5rem;
    }

    .event-card p:last-child {
        margin-bottom: 0;
    }

    .event-date {
        font-size: 0.9rem;
        color: var(--color-gray-700);
    }

    /* Mobile */
    @media (max-width: 768px) {
        .banner-overlay h1 {
            font-size: 1.5rem;
        }
    }
</style>
