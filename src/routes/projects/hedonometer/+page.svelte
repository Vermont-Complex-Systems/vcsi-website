<script>
    import Meta from "$lib/components/Meta.svelte";

    const preloadFont = [
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Hedonometer"
  description="Measuring the happiness of large-scale social systems."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>Hedonometer</h1>
            <p class="intro">Measuring the happiness of large-scale social systems.</p>
        </div>
    </div>
    
    <div class="content">
        
        <section>
            <h2>Overview</h2>
            <p>The Hedonometer is an instrument that measures the happiness of large-scale social systems. It analyzes text from social media platforms to gauge collective emotional states over time.</p>
        </section>
        
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    
    h1 {
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
        margin-bottom: 1rem;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        h2 {
            font-size: 1.5rem;
        }
    }
</style>