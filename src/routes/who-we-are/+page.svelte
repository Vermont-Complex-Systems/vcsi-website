<script>
    import Meta from "$lib/components/Meta.svelte";
    import WhoWeAre from '$lib/components/WhoWeAre.svelte';
    import PositionFilter from '$lib/components/PositionFilter.svelte';
    import Spinner from "$lib/components/Spinner.svelte";
    import { getMembers } from '../data.remote'

    let selectedPosition = $state('All');
    
    function handleFilterChange(position) {
        selectedPosition = position;
    }

    function filterMembers(members, position) {
        if (position === 'All') {
            return members;
        }
        return members.filter(member => member.position === position);
    }

</script>


<Meta 
  title="Who we are"
  description="Scientific data essays that uncover the challenges of computational science."
  
/>

<div class="page-header no-logo">
    <div class="page-header-text">
        <h1>Who We Are</h1>
        <p class="intro">Meet the researchers, faculty, and collaborators who make up the Vermont Complex Systems Institute.</p>
    </div>
</div>

{#await getMembers()}
    <Spinner text="Loading members..." />
{:then members}
    <PositionFilter {selectedPosition} onFilterChange={handleFilterChange} />
    <WhoWeAre members={filterMembers(members, selectedPosition)} />
{:catch error}
    <div>
        <p>Error loading members: {error.message}</p>
    </div>
{/await}

<style>
    .intro {
        max-width: 100%;
    }
</style>