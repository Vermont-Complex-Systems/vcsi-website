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
  title="Masters Program"
  description="Masters program in complex systems at the Vermont Complex Systems Institute."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <h1>Masters Program</h1>
        <p class="intro">Graduate-level complex systems program leading to a Master's degree in Complex Systems and Data Science.</p>
        
        <div class="program-content">
            <section>
                <h2>Overview</h2>
                <p>Our Masters program provides advanced training in complex systems theory, computational methods, and data science. Students develop expertise in network analysis, machine learning, and interdisciplinary research methods.</p>
            </section>
            
            <section>
                <h2>Program Requirements</h2>
                <ul>
                    <li>Core coursework in complex systems and data science</li>
                    <li>Advanced topics in network science and computational methods</li>
                    <li>Master's thesis or capstone project</li>
                    <li>Research collaboration with VCSI faculty</li>
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
        max-width: 70%;
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