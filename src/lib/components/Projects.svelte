<script>
    import { base } from '$app/paths';
    import projectsData from '$data/projects.csv';
    
    const projects = projectsData;
</script>

<div class="projects-grid">
    {#each projects as project}
        <div class="project-card">
            <a href="{base}/projects/{project.id}" class="project-link">
                <div class="project-image">
                    <img src="/common/assets/logos/{project.id}.png" alt={project.name} />
                </div>
                <div class="project-info">
                    <h3 class="project-name">{project.name}</h3>
                    <p class="project-description">{project.description}</p>
                </div>
            </a>
        </div>
    {/each}
</div>

<style>
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .project-card {
        transition: transform 200ms ease;
    }
    
    .project-card:hover {
        transform: scale(1.02);
    }
    
    .project-link {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        height: 100%;
    }
    
    .project-image {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .project-image img {
        width: 80%;
        height: 80%;
        object-fit: contain;
        mix-blend-mode: multiply;
    }
    
    .project-info {
        text-align: center;
    }
    
    .project-name {
        font-size: 1.3rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-bottom: 1rem;
        color: var(--color-fg);
        line-height: 1.3;
    }
    
    .project-description {
        font-size: 1rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
        line-height: 1.5;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .project-link {
            padding: 1.5rem;
        }
        
        .project-name {
            font-size: 1.1rem;
        }
    }
</style>