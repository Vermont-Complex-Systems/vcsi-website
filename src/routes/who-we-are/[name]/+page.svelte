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
  <div class="loading-container">
    <div class="spinner"></div>
    <span class="loading-text">Loading member data...</span>
  </div>
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

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    gap: 1rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--color-primary, #007acc);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    font-family: var(--serif);
    font-size: 1.1rem;
    color: var(--color-gray-600);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
