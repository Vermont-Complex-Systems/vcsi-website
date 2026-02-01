<script>
  import { page } from '$app/state';
  import { getMemberWithOpenAlex } from '../../data.remote.js'
  
  import Meta from "$lib/components/Meta.svelte";
  import Member from "$lib/components/Member.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  

</script>

{#await getMemberWithOpenAlex(page.params.name)}
  <Spinner text="Loading member data..." />
{:then author} 
    <Meta 
      title={author.name}
      description="Author bio and published stories"
      
    />

    <Member {author}/>
{:catch error}
  <p>Error loading member: {error.message || 'Unknown error'}</p>
{/await}
