<script>
    import { base } from '$app/paths';
    import Meta from "$lib/components/Meta.svelte";
    import PeopleGrid from '$lib/components/PeopleGrid.svelte';
    import PositionFilter from '$lib/components/PositionFilter.svelte';
    import Spinner from "$lib/components/Spinner.svelte";
    import { getMembers } from '../data.remote'

    let selectedPosition = $state('All');

    function handleFilterChange(position) {
        selectedPosition = position;
    }

    function filterMembers(members, position) {
        // Filter out vcsi and inactive members, then apply position filter
        let filtered = members.filter(m => m.id !== 'vcsi' && m.status === 'active');
        if (position !== 'All') {
            filtered = filtered.filter(m => m.position === position);
        }
        return filtered;
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
    <PeopleGrid
        people={filterMembers(members, selectedPosition)}
        assetFolder="members"
        href={(m) => `${base}/who-we-are/${m.id}`}
    >
        {#snippet card(member)}
            <h3>{member.name}</h3>
            <p>{member.position2 || member.position}</p>
        {/snippet}
    </PeopleGrid>
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