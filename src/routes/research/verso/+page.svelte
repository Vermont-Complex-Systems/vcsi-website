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
  title="The Vermont ReSearch Open Source Program Office (VERSO)"
  description="Building a university-wide open source community through educational activities, internships, research and community collaborations."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>The Vermont ReSearch Open Source Program Office (VERSO)</h1>
            <p class="intro">Building a university-wide open source community through educational activities, internships, research and community collaborations.</p>
        </div>
        <div class="page-header-logo">
            <img src="/common/assets/logos/verso-circular-01.png" alt="VERSO" class="page-header-image" />
        </div>
    </div>
    
    <div class="content">
        
        <section>
            <h2>Mission</h2>
            <p>VERSO builds a university-wide open source community through educational activities, internships, research and community collaborations. Through the development of several open-source software initiatives, we train, engage, and empower students and researchers to learn how to contribute to an open-source project.</p>
        </section>
        
        <section>
            <h2>Core Activities</h2>
            <ul>
                <li><strong>Educational Activities:</strong> Workshops, seminars, and training programs focused on open source development practices and methodologies</li>
                <li><strong>Internship Programs:</strong> Hands-on experience opportunities for students to contribute to real-world open source projects</li>
                <li><strong>Research Initiatives:</strong> Supporting academic research through open source software development and collaboration</li>
                <li><strong>Community Collaborations:</strong> Building partnerships with external organizations and the broader open source community</li>
            </ul>
        </section>
        
        <section>
            <h2>Impact</h2>
            <p>Through our comprehensive approach to open source education and development, VERSO empowers the next generation of researchers and technologists with the skills and experience needed to contribute meaningfully to the global open source ecosystem. Our programs foster innovation, collaboration, and knowledge sharing across the university and beyond.</p>
        </section>
        
        <section>
            <h2>Open Source Software Initiatives</h2>
            <p>VERSO develops and maintains several open-source software projects that serve as training grounds for students and researchers. These initiatives provide practical experience in collaborative software development while contributing valuable tools to the broader research community.</p>
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
            margin-bottom: 0;
        }
    }
</style>