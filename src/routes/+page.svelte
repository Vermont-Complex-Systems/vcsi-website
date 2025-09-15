<script>
  import Meta from "$lib/components/Meta.svelte";
  import Home from "$lib/components/Home.svelte";

  // To change when we can, it is pudding property
  const preloadFont = [
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
    "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
  ];

</script>

<Meta 
  title="VCSI website"
  description="Scientific data essays that uncover the challenges of computational science."
  {preloadFont}
/>

<Home />