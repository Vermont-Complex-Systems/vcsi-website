<script>
    import { base } from '$app/paths';
    
    let { members } = $props()
</script>

<div class="members-grid">
    {#each members as member}
        {#if member.id !== 'vcsi' & member.status == 'active'}
            <div class="member-card">
                <a href="{base}/who-we-are/{member.id}" class="member-link">
                    <div class="member-photo">
                        <img 
                            src="{base}/common/assets/members/{member.id}.jpg" 
                            alt="{member.name}"
                            onerror={() => this.src = `${base}/common/assets/members/${member.id}.png`}
                        />
                    </div>
                    <div class="member-info">
                        <h3 class="member-name">{member.name}</h3>
                        <p class="member-position">{member.position}</p>
                    </div>
                </a>
            </div>
        {/if}
    {/each}
</div>

<style>
    .members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .member-card {
        transition: transform 200ms ease;
    }
    
    .member-card:hover {
        transform: translateY(-2px);
    }
    
    .member-link {
        display: block;
        text-decoration: none;
        color: inherit;
    }
    
    .member-photo {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        background: var(--color-gray-100);
    }
    
    .member-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .member-info {
        text-align: center;
    }
    
    .member-name {
        font-size: 1.1rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-bottom: 0.25rem;
        color: var(--color-fg);
    }
    
    .member-position {
        font-size: 0.9rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .members-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1.5rem;
        }
    }
</style>