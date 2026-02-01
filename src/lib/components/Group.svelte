<script>
  import { base } from '$app/paths';
  import membersData from '$data/members.csv';

  let { group } = $props();

  const { name, url, PI, bio } = group[0];

  const getLinkHTML = () => {
    const u = url ? `out their <a href="${url}">website</a>` : undefined;

    if (u)
      return `check ${u}.`;

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

<div class="page-header no-logo">
  <div class="page-header-text">
    <h1>{name}</h1>
    <p class="intro">
      The <span class="sr-only">{name} </span>{@html bio} The group is led by {@html piLinks}.
      {#if link}You can {@html link}{/if}
    </p>
  </div>
</div>
