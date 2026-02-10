<script>
  import { base } from '$app/paths';
  import membersData from '$data/members.csv';
  import studentsData from '$data/students.csv';
  import PeopleGrid from './PeopleGrid.svelte';

  let { group } = $props();

  const { id, name, url, PI, bio } = group[0];

  // Get students belonging to this group
  const groupStudents = studentsData.filter(s => s.primaryAffiliation === id && s.status !== 'Alumni');

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

{#if groupStudents.length > 0}
  <div class="content">
    <section>
      <h2>Students</h2>
      <PeopleGrid
        people={groupStudents}
        assetFolder="students"
        href={(s) => s.url}
        external
      >
        {#snippet card(student)}
          <h4>{student.name}</h4>
          <p>{student.position}</p>
        {/snippet}
      </PeopleGrid>
    </section>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 1rem;
  }

  section {
    margin-top: 2rem;
  }
</style>
