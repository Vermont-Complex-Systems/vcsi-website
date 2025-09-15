<script>
  import { page } from '$app/state';
  import { getGroup } from '../../../data.remote.js'
  
  import Meta from "$lib/components/Meta.svelte";
  import Group from "$lib/components/Group.svelte";
  
  const preloadFont = [
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
  ];

</script>

{#await getGroup(page.params.name)}
  loading...
{:then group} 
    <Meta 
      title={group.name}
      description="Group bio and published stories"
      {preloadFont}
    />

    <Group {group}/>
{:catch error}
  <p>Error loading groups: {error.message}</p>
{/await}
