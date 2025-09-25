<script>
  import { base } from '$app/paths';
  import HeroText from "$lib/components/HeroText.svelte";
  import membersData from '$data/members.csv';
  
  let { group } = $props();

  const { name, url, PI, bio } = group[0];

  console.log(bio)
  
  const getLinkHTML = () => {
    const u = url ? `out their <a href="${url}">website</a>` : undefined;

    if (u)
      return `
			check ${u}. 
		`;
    else if (u) return `Check ${u}.`;

    return undefined;
  };

  const getPILinks = () => {
    const piIds = PI.split(' ');
    return piIds.map(id => {
      const member = membersData.find(m => m.id === id);
      const displayName = member ? member.name : id;
      return `<a href="${base}/who-we-are/${id}">${displayName}</a>`;
    }).join(' and ');
  };

  const link = getLinkHTML();
  const piLinks = getPILinks();
</script>

<section id="intro">
  <HeroText>
    <h1>{name}</h1>

    <p>
      The <span class="sr-only">{name} </span>{@html bio} The group is led by {@html piLinks}.
      {#if link}You can {@html link}{/if}
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