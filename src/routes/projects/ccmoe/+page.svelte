<script>
    import Meta from "$lib/components/Meta.svelte";

    const preloadFont = [
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="MassMutual Center of Excellence"
  description="The MassMutual Center of Excellence in Complex Systems and Data Science at VCSI."
  {preloadFont}
/>

<div class="project">
    <div class="content-wrapper">
        <h1>The MassMutual Center of Excellence in Complex Systems and Data Science</h1>
        <p class="intro">Advancing a wide range of faculty and graduate Vermont student-driven research ranging from the social contagion of ideas to the future of work, exploring large language models in health care, incentivizing healthy behaviors, and eliminating bias in AI.</p>
        
        <div class="project-content">
            <section>
                <h2>Overview</h2>
                <p>The MassMutual Center of Excellence in Complex Systems and Data Science represents a collaborative effort between the University of Vermont and MassMutual to advance cutting-edge research in complex systems, data science, and artificial intelligence.</p>
            </section>
            
            <section>
                <h2>Research Areas</h2>
                <ul>
                    <li>Social contagion of ideas and information spread</li>
                    <li>The future of work and labor market dynamics</li>
                    <li>Large language models in healthcare applications</li>
                    <li>Behavioral incentives for health outcomes</li>
                    <li>Bias detection and elimination in AI systems</li>
                </ul>
            </section>
        </div>
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    h1 {
        font-size: 3rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        line-height: 1.2;
    }
    
    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }
    
    .intro {
        font-size: 1.25rem;
        font-family: var(--serif);
        color: var(--color-gray-600);
        margin-bottom: 3rem;
        max-width: 80%;
        line-height: 1.5;
    }
    
    .project-content {
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
    
    ul {
        font-family: var(--serif);
        color: var(--color-fg);
    }
    
    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        h1 {
            font-size: 2rem;
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
        .intro {
            max-width: 100%;
            font-size: 1.1rem;
        }
    }
</style>