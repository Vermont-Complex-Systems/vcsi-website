<script>
  import HeroText from "$lib/components/HeroText.svelte";
  
  let { group } = $props();

  const { name, url, PI } = group[0];
  
  const bio = group[0].bio || "is a contributor to The VCSI.";

  
  const getLinkHTML = () => {
    const u = url ? `out their <a href="${url}">website</a>` : undefined;

    if (u)
      return `
			check ${u}. 
		`;
    else if (u) return `Check ${u}.`;

    return undefined;
  };

  const link = getLinkHTML();
</script>

<section id="intro">
  <HeroText>
    <h1>{name}</h1>
    <h3>Led by {PI.split(" ")}</h3>

    <p>
      <span class="sr-only">{name} </span>{@html bio}
      {#if link}{@html link}{/if}
    </p>
  </HeroText>
</section>

<style>
  #intro {
    margin-left: var(--margin-left);
    margin-right: var(--margin-left);
  }
  
  @media (max-width: 768px) {
    #intro {
      margin-left: var(--margin-left-mobile);
      margin-right: var(--margin-left-mobile);
    }
  }
</style>