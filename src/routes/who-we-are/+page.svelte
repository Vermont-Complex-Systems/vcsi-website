<script>
    import Meta from "$lib/components/Meta.svelte";
    import WhoWeAre from '$lib/components/WhoWeAre.svelte';
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
        <h1>Who We Are</h1>
        <p class="intro">Meet the researchers, faculty, and collaborators who make up the Vermont Complex Systems Institute.</p>
        
        {#await getMembers()}
            <p>Loading members...</p>
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
    
    h1 {
        font-size: 3rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
    }
    
    .intro {
        font-size: 1.25rem;
        font-family: var(--serif);
        color: var(--color-gray-600);
        margin-bottom: 3rem;
        max-width: 60%;
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
        
        .intro {
            max-width: 100%;
            font-size: 1.1rem;
        }
    }
</style>