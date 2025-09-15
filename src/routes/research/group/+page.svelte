<script>
    import Meta from "$lib/components/Meta.svelte";
    import Groups from '$lib/components/Groups.svelte';
    import { getGroups } from '../../data.remote'

     const preloadFont = [
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

</script>


<Meta 
  title="Research"
  description="Scientific data essays that uncover the challenges of computational science."
  {preloadFont}
/>

<div class="groups">
    <div class="content-wrapper">
        <h1>Research groups</h1>
        <p class="intro">Meet the groups who make up the Vermont Complex Systems Institute.</p>
        
        {#await getGroups()}
            <p>Loading groups...</p>
        {:then groups}
            <Groups {groups} />
        {:catch error} 
            <div>
                <p>Error loading groups: {error.message}</p>
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