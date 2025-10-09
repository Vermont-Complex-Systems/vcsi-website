<!-- src/lib/components/Meta.svelte -->
<script>
  import { page } from "$app/state"; // Updated for Svelte 5
  import { base } from "$app/paths";
  
  let { 
    title, 
    description, 
    keywords = "",
    image = "/default-og-image.jpg",
    preloadFont = [],
    author = "Vermont Complex Systems Institute"
  } = $props();
  
  const baseUrl = "https://vermontcomplexsystems.org"; // Your actual domain
  // Normalize pathname to remove base and ensure clean path
  const pathname = page.url.pathname.replace(base, '').replace(/^\/+/, '/');
  const url = `${baseUrl}${pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content={author} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="VCSI website" />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content={fullImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="628" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={fullImageUrl} />

  <link rel="canonical" href={url} />
  <meta name="robots" content="index, follow, max-image-preview:large" />

  {#each preloadFont as href}
    <link rel="preload" {href} as="font" type="font/woff2" crossorigin />
  {/each}
  
</svelte:head>