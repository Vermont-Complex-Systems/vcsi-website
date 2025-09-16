<script>
  import HeroText from "$lib/components/HeroText.svelte";
  
  let { author } = $props();

  const { name, email, url, social, pronoun, position } = author[0];
  
  const bio = author.bio || "is a contributor to The VCSI.";

  const pronounA = pronoun === "They" ? "them" : pronoun === "He" ? "him" : "her";
  const pronounB = pronoun === "They" ? "their" : pronoun === "He" ? "his" : "her";
  const getLinkHTML = () => {
    const t = social
      ? `You can follow ${pronounA} on <a href="${social}">the socials</a>`
      : undefined;
    const u = url ? `out ${pronounB} <a href="${url}">website</a>` : undefined;

    if (t && u)
      return `
			${t} or check ${u}. 
		`;
    else if (t) return `${t}.`;
    else if (u) return `Check ${u}.`;

    return undefined;
  };

  const link = getLinkHTML();
  const has = pronoun === "They" ? "have" : "has";
  const first = name.split(" ")[0].toLowerCase();
</script>

<section id="intro">
  <HeroText>
    <h1>{name}</h1>

    <p>
      <span class="sr-only">{name} </span>{@html bio}
      {#if link}{@html link}{/if}
    </p>

    {#if position === "Staff" && email}
      <p>Get in touch: <a href="mailto:{email}">{first}@uvm.edu</a></p>
    {/if}
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