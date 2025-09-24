<script>
    import Meta from "$lib/components/Meta.svelte";
    import Funding from '$lib/components/Funding.svelte';

    const preloadFont = [
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Funding"
  description="Funding sources supporting research at the Vermont Complex Systems Institute."
  {preloadFont}
/>

<div class="funding">
    <div class="content-wrapper">
        <div class="page-header no-logo">
            <div class="page-header-text">
                <h1>Funding</h1>
                <p class="intro">Our research is supported by leading foundations, government agencies, and industry partners.</p>
            </div>
        </div>
        
        <Funding />
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    .intro {
        margin-bottom: 3rem;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        .intro {
            max-width: 100%;
        }
    }
</style>