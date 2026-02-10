<script>
    import { base } from '$app/paths';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';

    /**
     * @type {{
     *   people: any[],
     *   assetFolder: string,
     *   card: (person: any) => void,
     *   href?: (person: any) => string | undefined,
     *   external?: boolean
     * }}
     */
    let { people, assetFolder, card, href, external = false } = $props();
</script>

<div class="people-grid">
    {#each people as person (person.id)}
        <div
            class="person-card"
            animate:flip={{ duration: 400 }}
            in:fade={{ duration: 300 }}
            out:fade={{ duration: 200 }}
        >
            {#if href?.(person)}
                <a
                    href={href(person)}
                    class="person-link"
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                >
                    <div class="person-photo">
                        <img
                            src="{base}/common/assets/{assetFolder}/{person.id}.jpg"
                            alt={person.name}
                        />
                    </div>
                    <div class="person-info">
                        {@render card(person)}
                    </div>
                </a>
            {:else}
                <div class="person-photo">
                    <img
                        src="{base}/common/assets/{assetFolder}/{person.id}.jpg"
                        alt={person.name}
                    />
                </div>
                <div class="person-info">
                    {@render card(person)}
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .people-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
    }

    .person-card {
        transition: transform 200ms ease;
    }

    .person-card:hover {
        transform: translateY(-2px);
    }

    .person-link {
        display: block;
        text-decoration: none;
        color: inherit;
    }

    .person-photo {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: var(--border-radius, 8px);
        margin-bottom: 1rem;
        background: var(--color-gray-100);
    }

    .person-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .person-info {
        text-align: center;
    }

    .person-info :global(h3),
    .person-info :global(h4) {
        font-size: 1.1rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-bottom: 0.25rem;
        color: var(--color-fg);
    }

    .person-info :global(p) {
        font-size: 0.9rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
    }

    @media (max-width: 768px) {
        .people-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1.5rem;
        }
    }
</style>
