<script>
    import { base } from '$app/paths';
    import projectsData from '$data/projects.csv';

    const imageModules = import.meta.glob(
        '$lib/assets/logos/*.png',
        { eager: true, query: { enhanced: true } }
    );

    function getLogo(id) {
        for (const [path, mod] of Object.entries(imageModules)) {
            if (path.includes(`/${id}.png`)) return mod.default;
        }
        return null;
    }

    const projects = projectsData;
</script>

<div class="projects-grid">
    {#each projects as project}
        <a href={`${base}/projects/${project.id}`} class="project-card">
            <div class="project-image">
                {#if getLogo(project.id)}
                    <enhanced:img src={getLogo(project.id)} alt={project.name} />
                {:else}
                    <img src="/common/assets/logos/{project.id}.png" alt={project.name} />
                {/if}
            </div>
            <div class="project-info">
                <h3 class="project-name">{project.name}</h3>
                <p class="project-description">{project.description}</p>
            </div>
        </a>
    {/each}
</div>

<style>
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
        margin-bottom: 3rem;
    }

    .project-card {
        border: 0.5px solid var(--color-gray-300);
        padding: 6px;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: box-shadow 0.2s, border 0.2s;
    }

    .project-card:hover {
        box-shadow: 4px 4px 0px var(--color-gray-400);
        border-color: var(--color-gray-600);
    }

    .project-image {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        margin-bottom: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .project-image img, .project-image :global(picture) {
        width: 80%;
        height: 80%;
        object-fit: contain;
    }

    .project-image :global(picture img) {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .project-info {
        text-align: center;
        padding-bottom: 1rem;
    }

    .project-name {
        font-size: 1.3rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: var(--color-fg);
        line-height: 1.3;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .project-description {
        font-size: 1rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .project-card {
            padding: 1.5rem;
        }

        .project-name {
            font-size: 1.1rem;
        }
    }
</style>
