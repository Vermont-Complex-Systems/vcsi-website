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
  title="Alfred P. Sloan Foundation"
  description="Research funding from the Alfred P. Sloan Foundation at VCSI."
  {preloadFont}
/>

<div class="funding">
    <div class="content-wrapper">
        <h1>Alfred P. Sloan Foundation</h1>
        <p class="intro">Supporting innovative research in complex systems and data science through the Alfred P. Sloan Foundation.</p>
        
        <div class="funding-content">
            <section>
                <h2>About the Foundation</h2>
                <p>The Alfred P. Sloan Foundation is a philanthropic, not-for-profit grantmaking institution that supports original research and education in science, technology, engineering, mathematics, and economics.</p>
            </section>
            
            <section>
                <h2>Supported Research Areas</h2>
                <ul>
                    <li>Complex systems modeling and analysis</li>
                    <li>Data science methodologies</li>
                    <li>Network science applications</li>
                    <li>Computational social science</li>
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
    
    .funding-content {
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