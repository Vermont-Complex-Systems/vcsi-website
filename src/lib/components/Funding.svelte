<script>
    import { base } from '$app/paths';
    
    const funders = [
        {
            logo: 'sloan.png',
            name: 'Alfred P. Sloan Foundation',
            url: 'https://sloan.org/',
            description: 'Supporting innovative research in complex systems and data science through philanthropic grantmaking.'
        },
        {
            logo: 'mass-mutual.png',
            name: 'MassMutual',
            url: 'https://www.massmutual.com/',
            description: 'Industry partnership supporting applied research in complex systems and data science.'
        },
        {
            logo: 'ca-technologies.png',
            name: 'CA Technologies',
            url: 'https://www.broadcom.com/',
            description: 'Industry partnership supporting applied research in complex systems and software engineering.'
        },
        {
            logo: 'us-department-energy.png',
            name: 'U.S. Department of Energy',
            url: 'https://www.energy.gov/',
            description: 'Federal funding for energy-related complex systems research and applications.'
        },
        {
            logo: 'google-ospo.png',
            name: 'Google Open Source',
            url: 'https://opensource.google/',
            description: 'Supporting open source research initiatives and computational tools development.'
        },
        {
            logo: 'mitre.png',
            name: 'MITRE',
            url: 'https://www.mitre.org/',
            description: 'Collaborative research in systems engineering and complex adaptive systems.'
        },
        {
            logo: 'nih.png',
            name: 'NIH',
            url: 'https://www.nih.gov/',
            description: 'National Institutes of Health funding for health-related complex systems research.'
        },
        {
            logo: 'nida.png',
            name: 'NIDA',
            url: 'https://nida.nih.gov/',
            description: 'National Institute on Drug Abuse supporting addiction and behavioral research.'
        },
        {
            logo: 'nsf-epscor.png',
            name: 'NSF EPSCoR',
            url: 'https://www.nsf.gov/od/oia/programs/epscor/',
            description: 'NSF Established Program to Stimulate Competitive Research supporting state research capacity.'
        },
        {
            logo: 'nsf.png',
            name: 'NSF',
            url: 'https://www.nsf.gov/',
            description: 'National Science Foundation support for fundamental research in complex systems.'
        },
        {
            logo: 'darpa.png',
            name: 'DARPA',
            url: 'https://www.darpa.mil/',
            description: 'Defense Advanced Research Projects Agency funding for cutting-edge research.'
        }
    ];
</script>

<div class="funding-grid">
    {#each funders as funder}
        <div class="funder-card">
            <a href="{funder.url}" target="_blank" rel="noopener noreferrer" class="funder-link">
                <div class="funder-logo">
                    <img 
                        src="{base}/common/assets/logos/{funder.logo}" 
                        alt="{funder.name} logo"
                        class="logo-img"
                    />
                </div>
                <div class="funder-info">
                    <p class="funder-description">{funder.description}</p>
                </div>
            </a>
        </div>
    {/each}
</div>

<style>
    .funding-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .funder-card {
        transition: transform 200ms ease;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        overflow: hidden;
        background: var(--color-bg);
    }
    
    .funder-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .funder-link {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        padding: 2rem;
        height: 100%;
        box-sizing: border-box;
    }
    
    .funder-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        margin-bottom: 1.5rem;
        background: var(--color-white);
        border-radius: var(--border-radius);
        padding: 1rem;
        box-sizing: border-box;
    }
    
    .logo-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    }
    
    .funder-info {
        text-align: center;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    
    .funder-description {
        font-size: 0.95rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
        margin: 0;
        line-height: 1.5;
        flex-grow: 1;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .funding-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
        }
        
        .funder-link {
            padding: 1.5rem;
        }
        
        .funder-logo {
            height: 100px;
            margin-bottom: 1rem;
        }
        
        .funder-description {
            font-size: 0.9rem;
        }
    }
</style>