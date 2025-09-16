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
  title="MassMutual Center of Excellence in Complex Systems and Data Science"
  description="Advancing a wide range of faculty and graduate Vermont student-driven research ranging from the social contagion of ideas to the future of work."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>The MassMutual Center of Excellence in Complex Systems and Data Science</h1>
            <p class="intro">Advancing a wide range of faculty and graduate Vermont student-driven research ranging from the social contagion of ideas to the future of work, exploring large language models in health care, incentivizing healthy behaviors, and eliminating bias in AI.</p>
        </div>
        <div class="page-header-logo">
            <img src="/common/assets/logos/mmcoe-circular-01.jpg" alt="VERSO" class="page-header-image" />
        </div>
    </div>

    <div class="content">
        <section>
            <h2>Overview</h2>
            <p>The MassMutual Center of Excellence represents a strategic partnership focused on advancing complex systems research and data science applications. Our center brings together interdisciplinary expertise to tackle challenging problems at the intersection of technology, human behavior, and societal impact.</p>
        </section>
            
        <section>
            <h2>Research Areas</h2>
            <ul>
                <li><strong>Social Contagion of Ideas:</strong> Understanding how ideas spread through networks and communities</li>
                <li><strong>Future of Work:</strong> Exploring how technological advances reshape employment and workplace dynamics</li>
                <li><strong>Large Language Models in Healthcare:</strong> Investigating applications of AI and machine learning in medical settings</li>
                <li><strong>Health Behavior Incentivization:</strong> Developing systems to encourage and maintain healthy behaviors</li>
                <li><strong>AI Bias Elimination:</strong> Working to identify and eliminate bias in artificial intelligence systems</li>
            </ul>
        </section>
        
        <section>
            <h2>Impact</h2>
            <p>Our research contributes to both theoretical understanding and practical applications in complex systems, with real-world implications for healthcare, workplace dynamics, and social behavior. Through this partnership, we aim to advance knowledge while training the next generation of data scientists and complex systems researchers.</p>
        </section>
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
    }
    
    .content {
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
        padding-left: 1.5rem;
        list-style-type: disc;
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
            font-size: 1.1rem;
        }
    }
</style>