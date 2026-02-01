<script>
  import { page } from '$app/state';
  import { getGroup } from '../../../data.remote.js'
  
  import Meta from "$lib/components/Meta.svelte";
  import Group from "$lib/components/Group.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  

</script>

{#await getGroup(page.params.name)}
  <Spinner text="Loading group data..." />
{:then group} 
    <Meta 
      title={group[0].name}
      description="Group bio and published stories"
      
    />

    <Group {group}/>
{:catch error}
  <p>Error loading groups: {error.message}</p>
{/await}
