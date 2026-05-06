<script>
    import Meta from "$lib/components/Meta.svelte";
    import ExpandableText from "$lib/components/ExpandableText.svelte";
    import Countdown from "$lib/components/Countdown.svelte";
    import events from "$data/events.csv";
    import { formatDate, formatDateObj, getDaysUntil, groupEventsByName, excelToDate } from "../../utils/excel.js";

    const bigEvents = [
        {
            title: 'IC²S² is coming to Burlington!',
            date: 'July 28-31, 2026',
            description: 'University of Vermont is hosting the International Conference on Computational Social Science (IC2S2) in 2026.',
            image: '/common/assets/events/green-mountains.png'
        }
    ];

    // Sort by date (soonest first)
    const sortByDate = (a, b) => (a.date || 0) - (b.date || 0);

    // Sort ongoing events: weekly first, then by next upcoming date
    const sortOngoing = (a, b) => {
        if (a.recurring_frequency === 'weekly' && b.recurring_frequency !== 'weekly') return -1;
        if (b.recurring_frequency === 'weekly' && a.recurring_frequency !== 'weekly') return 1;
        const aDate = a.nextDate?.date?.getTime() || Infinity;
        const bDate = b.nextDate?.date?.getTime() || Infinity;
        return aDate - bDate;
    };

    // Filter, sort, and process events by type
    const ongoingEvents = groupEventsByName(events.filter(e => e.event_type === 'ongoing')).sort(sortOngoing);
    const specialEvents = events.filter(e => e.event_type === 'special').sort(sortByDate);
    const deadlineEvents = events.filter(e => e.event_type === 'deadline').sort(sortByDate);
</script>

<Meta
    title="Events"
    description="Upcoming events, seminars, and conferences at the Vermont Complex Systems Institute."
/>

<section class="banner">
    {#each bigEvents as event (event.title)}
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

{#if deadlineEvents.length > 0}
<section class="deadlines-section">
    <h2>Upcoming Deadlines</h2>
    <ul class="event-list deadline-list">
        {#each deadlineEvents as event (event.name)}
            <li class="card event-card deadline-card">
                <div class="deadline-header">
                    <h3>{event.name}</h3>
                    <Countdown days={getDaysUntil(event.date)} />
                </div>
                <p class="event-date">{formatDate(event.date)}</p>
                {#if event.description}
                    <div class="description">
                        <ExpandableText text={event.description} />
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</section>
{/if}

<div class="grid-2 events-grid">
    <section>
        <h2>Ongoing Events</h2>
        <ul class="event-list">
            {#each ongoingEvents as event (event.name)}
                <li class="card event-card">
                    <h3>{event.name}</h3>
                    {#if event.recurring_frequency === 'weekly'}
                        <span class="badge badge-dark">{event.recurring_frequency}</span>
                        <p class="event-date">{event.day}s from {event.time}</p>
                    {:else if event.nextDate}
                        <div class="next-date-info">
                            <p class="event-date">
                                <strong>Next:</strong> {formatDateObj(event.nextDate.date)}
                                {#if event.nextDate.time} at {event.nextDate.time}{/if}
                            </p>
                            {#if event.upcomingCount > 1}
                                <span class="badge badge-light">+{event.upcomingCount - 1} more</span>
                            {/if}
                        </div>
                    {:else if event.dates.length > 0}
                        <p class="event-date muted">No upcoming dates</p>
                    {/if}
                    {#if event.location}
                        <p class="event-location">{event.location}</p>
                    {/if}
                    {#if event.teams}
                        <a href={event.teams} target="_blank" rel="noopener" class="teams-link">Join via Teams</a>
                    {/if}
                    {#if event.description}
                        <div class="description">
                            <ExpandableText text={event.description} />
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </section>

    <section>
        <h2>Special Events</h2>
        <ul class="event-list">
            {#each specialEvents as event (event.name)}
                <li class="card event-card">
                    <h3>{event.name}</h3>
                    <p class="event-date">{formatDate(event.date)} {#if event.location} in {event.location}{/if}</p>
                    {#if event.time}<p class="event-time">{event.time}</p>{/if}
                    {#if event.teams}
                        <a href={event.teams} target="_blank" rel="noopener" class="teams-link">Join via Teams</a>
                    {/if}
                    {#if event.description}
                        <div class="description">
                            <ExpandableText text={event.description} />
                        </div>
                    {/if}
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

    .event-time {
        font-size: 0.9rem;
        color: var(--color-gray-600);
        margin: 0;
    }

    .event-location {
        font-size: 0.85rem;
        color: var(--color-gray-600);
        margin: 0.25rem 0;
    }

    /* Deadlines section */
    .deadlines-section {
        margin: 2rem 0;
    }

    .deadline-list {
        display: grid;
        gap: 1rem;
    }

    .deadline-card {
        border-left: 4px solid var(--color-primary, #2c5282);
    }

    .deadline-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .deadline-header h3 {
        flex: 1;
        min-width: 200px;
    }

    /* Next date info */
    .next-date-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .badge-light {
        background: var(--color-gray-100, #f7fafc);
        color: var(--color-gray-700);
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
    }

    .muted {
        color: var(--color-gray-500);
        font-style: italic;
    }

    .teams-link {
        display: inline-block;
        font-size: 0.85rem;
        margin: 0.25rem 0;
    }

    /* Mobile */
    @media (max-width: 768px) {
        .banner-overlay h1 {
            font-size: 1.5rem;
        }

        .deadline-header {
            flex-direction: column;
        }
    }
</style>
