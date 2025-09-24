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
  title="Xenobots"
  description="Living robots made from frog cells."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>Xenobots</h1>
            <p class="intro">Living robots made from frog cells.</p>
        </div>
    </div>
    
    <div class="content">
        
        <section>
            <h2>Overview</h2>
            <p>Xenobots are novel living machines designed from frog cells. They represent a new class of artifact: neither a traditional robot nor a known species of animal, but a new category of life.</p>
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