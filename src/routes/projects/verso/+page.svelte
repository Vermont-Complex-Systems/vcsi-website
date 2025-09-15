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
  title="Vermont ReSearch Open Source Program"
  description="VERSO builds a university-wide open source community at the University of Vermont."
  {preloadFont}
/>

<div class="project">
    <div class="content-wrapper">
        <h1>The Vermont ReSearch Open Source Program (VERSO)</h1>
        <p class="intro">VERSO builds a university-wide open source community through educational activities, internships, research, and community collaborations.</p>
        
        <div class="project-content">
            <section>
                <h2>Mission</h2>
                <p>VERSO aims to foster an open source culture at the University of Vermont by connecting students, faculty, and community partners through collaborative software development and research initiatives.</p>
            </section>
            
            <section>
                <h2>Activities</h2>
                <ul>
                    <li>Educational workshops and training programs</li>
                    <li>Student internships with open source organizations</li>
                    <li>Collaborative research projects</li>
                    <li>Community partnerships and outreach</li>
                    <li>Open source software development</li>
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