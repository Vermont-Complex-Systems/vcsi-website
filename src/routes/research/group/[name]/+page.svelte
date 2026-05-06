<script>
  import { page } from '$app/state';
  import { getGroupWithPapers } from '../../../data.remote.js'

  import Meta from "$lib/components/Meta.svelte";
  import Group from "$lib/components/Group.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
</script>

{#await getGroupWithPapers(page.params.name)}
  <Spinner text="Loading group data..." />
{:then groupData}
    <Meta
      title={groupData.name}
      description="Group bio and published stories"
    />

    <Group group={groupData} />
{:catch error}
  <p>Error loading groups: {error.message}</p>
{/await}
