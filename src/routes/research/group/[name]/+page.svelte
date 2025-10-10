<script>
  import { page } from '$app/state';
  import { getGroup } from '../../../data.remote.js'
  
  import Meta from "$lib/components/Meta.svelte";
  import Group from "$lib/components/Group.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  
  const preloadFont = [
    "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
    "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
    "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
  ];

</script>

{#await getGroup(page.params.name)}
  <Spinner text="Loading group data..." />
{:then group} 
    <Meta 
      title={group[0].name}
      description="Group bio and published stories"
      {preloadFont}
    />

    <Group {group}/>
{:catch error}
  <p>Error loading groups: {error.message}</p>
{/await}
