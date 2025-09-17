<script>
  import { page } from '$app/state';
  import { getMemberWithOpenAlex } from '../../data.remote.js'
  
  import Meta from "$lib/components/Meta.svelte";
  import Member from "$lib/components/Member.svelte";
  
  const preloadFont = [
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
  ];

</script>

{#await getMemberWithOpenAlex(page.params.name)}
  loading...
{:then author} 
    <Meta 
      title={author.name}
      description="Author bio and published stories"
      {preloadFont}
    />

    <Member {author}/>
{:catch error}
  <p>Error loading member: {error.message || 'Unknown error'}</p>
{/await}
