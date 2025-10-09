<script>
    import { base } from '$app/paths';
    
    let { groups } = $props()
</script>

<div class="groups-grid">
    {#each groups as group}
            <div class="group-card">
                <a href="{base}/research/group/{group.id}" class="group-link">
                    <div class="group-photo">
                        <img
                            src="{base}/common/assets/groups/{group.id}.jpg"
                            alt="{group.name}"
                            onerror={(e) => e.target.src = `${base}/common/assets/groups/${group.id}.png`}
                        />
                    </div>
                    <div class="group-info">
                        <h3 class="group-name">{group.name}</h3>
                        <p class="group-position">{group.position}</p>
                    </div>
                </a>
            </div>
    {/each}
</div>

<style>
    .groups-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .group-card {
        transition: transform 200ms ease;
    }
    
    .group-card:hover {
        transform: translateY(-2px);
    }
    
    .group-link {
        display: block;
        text-decoration: none;
        color: inherit;
    }
    
    .group-photo {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        background: var(--color-gray-100);
    }
    
    .group-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .group-info {
        text-align: center;
    }
    
    .group-name {
        font-size: 1.1rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-bottom: 0.25rem;
        color: var(--color-fg);
    }
    
    .group-position {
        font-size: 0.9rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .groups-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1.5rem;
        }
    }
</style>