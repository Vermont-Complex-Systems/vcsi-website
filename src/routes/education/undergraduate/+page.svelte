<script>
    import Meta from "$lib/components/Meta.svelte";
    import { base } from '$app/paths';
    import { ArrowRight } from '@lucide/svelte';

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Undergraduate Degree in Data Science"
  description="BS in Data Science - Joint progrxam between Mathematics & Statistics and Computer Science at UVM."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Undergraduate Degree in Data Science</h1>
                <p class="intro">A joint program between the Department of Mathematics and Statistics and the Department of Computer Science, providing a broad foundation for students pursuing careers in data-rich environments.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/bachelors.png" alt="Bachelor's degree" class="page-header-image" />
            </div>
        </div>
        
        <div class="program-content">
            <section>
                <h2>Program Overview</h2>
                <p>The Undergraduate Degree in Data Science is housed in the College of Engineering and Mathematical Sciences and offers students comprehensive training in data science fundamentals. This interdisciplinary program bridges mathematics, statistics, and computer science to prepare students for the growing field of data science.</p>
            </section>
            
            
            <section>
                <h2>Learn More</h2>
                <div class="learn-more-grid">
                    <a href="https://www.uvm.edu/cems/program/bs-data-science" target="_blank" rel="noopener noreferrer" class="learn-more-card">
                        <img src="/common/assets/drawing/squirrel02.jpg" alt="Squirrel" class="card-image" style="transform: translateY(-50px);" />
                        <div class="card-content" style="transform: translateY(-50px);">
                            <h3>B.S. Data Science Program</h3>
                            <p>For detailed curriculum information and admission requirements, visit the official program page.</p>
                            <ArrowRight class="external-arrow" style="transform: translateY(30px);" size={24} />
                        </div>
                    </a>

                    <a href="{base}/education/masters" class="learn-more-card fox-card">
                        <img src="/common/assets/drawing/fox01.png" alt="Fox" class="card-image fox-image" style="transform: scaleX(-1)" />
                        <div class="card-content" style="transform: translateY(-10px);">
                            <h3>Accelerated Masters Programs</h3>
                            <p>Interested in the 4+1 accelerated masters pathway? Learn more about UVM's Accelerated Masters Programs.</p>
                            <ArrowRight class="external-arrow" size={24} />
                        </div>
                    </a>
                </div>
            </section>
        </div>
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    
    
    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }
    
    
    .program-content {
        max-width: 800px;
    }
    
    section {
        margin-bottom: 2rem;
    }
    
    p {
        font-size: 1rem;
        line-height: 1.6;
        font-family: var(--serif);
        color: var(--color-fg);
    }
    
    
    .learn-more-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 2rem;
    }

    .learn-more-card {
        padding: 2rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        position: relative;
        height: 25rem;
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        overflow: hidden;
    }

    .learn-more-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    :global(.dark) .learn-more-card {
        background: #f5f5f5;
        border-color: #4a4a4a;
    }

    .card-image {
        width: 200px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        margin-bottom: 1rem;
    }

    .fox-image {
        width: 250px;
        height: auto;
        transform: scaleX(-1) translateY(30%);
    }

    .learn-more-card h3 {
        font-size: 1.3rem;
        font-weight: 600;
        font-family: var(--serif);
        margin-bottom: 0.75rem;
        margin-top: 0;
        color: var(--color-fg);
    }

    .learn-more-card p {
        line-height: 1.5;
        margin-bottom: 0;
        color: var(--color-gray-700);
    }

    .card-content {
        position: relative;
        flex: 1;
    }

    :global(.external-arrow) {
        color: var(--color-primary, #007acc);
        transition: transform 0.2s ease, color 0.2s ease;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .learn-more-card:hover :global(.external-arrow) {
        transform: translate(4px, -4px);
        color: var(--color-primary-hover, #005fa3);
    }

    .fox-card h3 {
        margin-top: 50px;
    }

    .fox-card p {
        margin-top: 0;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }

        .program-content {
            max-width: 100%;
        }

        p {
            font-size: 1.1rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        .learn-more-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .learn-more-card {
            height: auto;
            height: 27rem;
        }

        .card-image {
            width: 200px;
        }
    }
</style>