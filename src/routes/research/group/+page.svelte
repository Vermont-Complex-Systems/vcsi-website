<script>
    import Meta from "$lib/components/Meta.svelte";
    import Groups from '$lib/components/Groups.svelte';
    import Spinner from "$lib/components/Spinner.svelte";
    import { getGroups } from '../../data.remote'

     const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

</script>


<Meta 
  title="Research"
  description="Scientific data essays that uncover the challenges of computational science."
  {preloadFont}
/>

<div class="groups">
    <div class="content-wrapper">
        <div class="page-header no-logo">
            <div class="page-header-text">
                <h1>Research groups</h1>
                <p class="intro">Meet the groups who make up the Vermont Complex Systems Institute.</p>
            </div>
        </div>
        
        {#await getGroups()}
            <Spinner text="Loading groups..." />
        {:then groups}
            {#if groups.filter(g => g.status === 'Core team').length > 0}
                <section class="groups-section">
                    <h2 class="section-header">Core teams</h2>
                    <Groups groups={groups.filter(g => g.status === 'Core team')} />
                </section>
            {/if}
            
            {#if groups.filter(g => g.status === 'UVM affiliate').length > 0}
                <section class="groups-section">
                    <h2 class="section-header">UVM affiliate teams</h2>
                    <Groups groups={groups.filter(g => g.status === 'UVM affiliate')} />
                </section>
            {/if}
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

    .groups-section {
        margin-top: 3rem;
        margin-bottom: 3rem;
    }

    .section-header {
        font-size: 1.5rem;
        font-weight: 500;
        font-family: var(--serif);
        margin-bottom: 1.5rem;
        margin-top: 0;
        color: var(--color-gray-700);
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