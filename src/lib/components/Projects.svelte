<script>
    import { base } from '$app/paths';
    
    const projects = [
        {
            id: 'ccmoe',
            name: 'The MassMutual Center of Excellence in Complex Systems and Data Science',
            description: 'Advancing a wide range of faculty and graduate Vermont student-driven research ranging from the social contagion of ideas to the future of work, exploring large language models in health care, incentivizing healthy behaviors, and eliminating bias in AI.'
        },
        {
            id: 'verso',
            name: 'The Vermont ReSearch Open Source Program (VERSO)',
            description: 'VERSO builds a university-wide open source community through educational activities, internships, research, and community collaborations.'
        },
        {
            id: 'socks',
            name: 'Science of Online Corpora Knowledge and Stories (SOCKS)',
            description: 'Building and refining instruments that can distantly read and make sense of enormous collections of texts.'
        }
    ];
</script>

<div class="projects-grid">
    {#each projects as project}
        <div class="project-card">
            <a href="{base}/projects/{project.id}" class="project-link">
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
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .project-card {
        transition: transform 200ms ease;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .project-link {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 2rem;
        height: 100%;
    }
    
    .project-info {
        text-align: left;
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