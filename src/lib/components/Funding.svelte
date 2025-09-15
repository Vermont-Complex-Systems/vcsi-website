<script>
    import { base } from '$app/paths';
    
    const funders = [
        {
            id: 'sloan',
            name: 'Alfred P. Sloan Foundation',
            description: 'Supporting innovative research in complex systems and data science through philanthropic grantmaking.'
        },
        {
            id: 'ca-technologies',
            name: 'CA Technologies',
            description: 'Industry partnership supporting applied research in complex systems and software engineering.'
        },
        {
            id: 'doe',
            name: 'U.S. Department of Energy',
            description: 'Federal funding for energy-related complex systems research and applications.'
        },
        {
            id: 'google-open-source',
            name: 'Google Open Source',
            description: 'Supporting open source research initiatives and computational tools development.'
        },
        {
            id: 'mitre',
            name: 'MITRE',
            description: 'Collaborative research in systems engineering and complex adaptive systems.'
        },
        {
            id: 'nih',
            name: 'NIH',
            description: 'National Institutes of Health funding for health-related complex systems research.'
        },
        {
            id: 'nsf-epscor',
            name: 'NSF EPSCoR',
            description: 'NSF Established Program to Stimulate Competitive Research supporting state research capacity.'
        },
        {
            id: 'nsf',
            name: 'NSF',
            description: 'National Science Foundation support for fundamental research in complex systems.'
        }
    ];
</script>

<div class="funding-grid">
    {#each funders as funder}
        <div class="funder-card">
            <a href="{base}/funding/{funder.id}" class="funder-link">
                <div class="funder-info">
                    <h3 class="funder-name">{funder.name}</h3>
                    <p class="funder-description">{funder.description}</p>
                </div>
            </a>
        </div>
    {/each}
</div>

<style>
    .funding-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .funder-card {
        transition: transform 200ms ease;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .funder-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .funder-link {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 2rem;
        height: 100%;
    }
    
    .funder-info {
        text-align: left;
    }
    
    .funder-name {
        font-size: 1.3rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-bottom: 1rem;
        color: var(--color-fg);
        line-height: 1.3;
    }
    
    .funder-description {
        font-size: 1rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
        line-height: 1.5;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .funding-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .funder-link {
            padding: 1.5rem;
        }
        
        .funder-name {
            font-size: 1.1rem;
        }
    }
</style>