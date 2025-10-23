<script>
    import membersData from '$data/members.csv';
    import studentData from '$data/students.csv';

    let { memberIds } = $props();

    const allPeople = [...membersData, ...studentData];

    const members = memberIds
        .split(' ')
        .map(id => allPeople.find(m => m.id === id.trim()))
        .filter(member => member !== undefined);
</script>

{#if members.length > 0}
    <div class="members-section">
        <div class="members-grid">
            {#each members as member}
                <div class="member-card">
                    <a href="/who-we-are/{member.id}">
                        <div class="member-photo">
                            <img src="/common/assets/members/{member.id}.jpg" alt="{member.name}" />
                        </div>
                        <div class="member-info">
                            <h4>{member.name}</h4>
                            <p>{member.position}</p>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .members-section {
        margin-top: 2rem;
    }


    .members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .member-card {
        transition: transform 0.2s ease;
    }

    .member-card:hover {
        transform: translateY(-4px);
    }

    .member-card a {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .member-photo {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .member-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .member-info h4 {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--sans);
        margin-bottom: 0.25rem;
        color: var(--color-fg);
    }

    .member-info p {
        font-size: 0.9rem;
        font-family: var(--sans);
        color: var(--color-fg-muted);
        margin: 0;
    }

    @media (max-width: 768px) {
        .members-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1.5rem;
        }
    }
</style>