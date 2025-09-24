<script>
    import Meta from "$lib/components/Meta.svelte";
    import Projects from '$lib/components/Projects.svelte';

    const preloadFont = [
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Projects"
  description="Research projects at the Vermont Complex Systems Institute."
  {preloadFont}
/>

<div class="projects">
    <div class="content-wrapper">
        <div class="page-header no-logo">
            <div class="page-header-text">
                <h1>Projects</h1>
                <p class="intro">Explore our current research projects in complex systems and data science.</p>
            </div>
        </div>
        
        <Projects />
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    .page-header {
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