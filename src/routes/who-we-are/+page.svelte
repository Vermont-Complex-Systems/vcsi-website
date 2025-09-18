<script>
    import Meta from "$lib/components/Meta.svelte";
    import WhoWeAre from '$lib/components/WhoWeAre.svelte';
    import Spinner from "$lib/components/Spinner.svelte";
    import { getMembers } from '../data.remote'

     const preloadFont = [
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

</script>


<Meta 
  title="Who we are"
  description="Scientific data essays that uncover the challenges of computational science."
  {preloadFont}
/>

<div class="who-we-are">
    <div class="content-wrapper">
        <div class="page-header no-logo">
            <div class="page-header-text">
                <h1>Who We Are</h1>
                <p class="intro">Meet the researchers, faculty, and collaborators who make up the Vermont Complex Systems Institute.</p>
            </div>
        </div>
        
        {#await getMembers()}
            <Spinner text="Loading members..." />
        {:then members}
            <WhoWeAre {members} />
        {:catch error} 
            <div>
                <p>Error loading members: {error.message}</p>
            </div>
        {/await}
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    
    .intro {
        margin-bottom: 3rem;
        max-width: 60%;
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