<script>
  import { base } from '$app/paths';
  import membersData from '$data/members.csv';
  import studentsData from '$lib/students.js';
  import PapersGrid from "$lib/components/PapersGrid.svelte";
  import PeopleGrid from './PeopleGrid.svelte';
  import TopicsChart from './TopicsChart.svelte';
  import { belongsTo, isAlumni, isShown, uniqueById } from '$lib/people.js';

  let { group } = $props();

  const { id, name, url, PI, bio, papers } = group;
  
  let sortBy = $state('citations');
  let selectedTopic = $state(null);

  // Our Team: the PIs first, then everyone listed in the group (students and
  // postdocs). People in the members sheet get their member photo and link
  // to their profile; students link to their own page.
  const memberIds = new Set(membersData.map(m => m.id));
  const pis = (PI || '').split(' ').filter(Boolean)
    .map(pid => membersData.find(m => m.id === pid))
    .filter(Boolean)
    .map(m => ({ ...m, isPI: true }));
  const groupStudents = uniqueById(studentsData.filter(s =>
    isShown(s) && belongsTo(s, id) && !isAlumni(s) && !pis.some(p => p.id === s.id)
  ));
  const team = [...pis, ...groupStudents];
  const isMember = (person) => memberIds.has(person.id);

  const getLinkHTML = () => {
    const u = url ? `out their <a href="${url}">website</a>` : undefined;

    if (u)
      return `check ${u}.`;

    return undefined;
  };

  const getPILinks = () => {
    const piIds = (PI || '').split(' ').filter(Boolean);
    return piIds.map(id => {
      const member = membersData.find(m => m.id === id);
      const displayName = member ? member.name : id;
      return `<a href="${base}/who-we-are/${id}">${displayName}</a>`;
    }).join(' and ');
  };

  const link = getLinkHTML();
  const piLinks = getPILinks();

  function handleTopicClick(topic) {
    selectedTopic = selectedTopic === topic ? null : topic;
  }
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

{#if team.length > 0}
  <div class="content">
    <section>
      <h2>Our Team</h2>
      <PeopleGrid
        people={team}
        assetFolder={(p) => (isMember(p) ? 'members' : 'students')}
        href={(p) => (isMember(p) ? `${base}/who-we-are/${p.id}` : p.url)}
        external={(p) => !isMember(p)}
      >
        {#snippet card(person)}
          <h4>{person.name}</h4>
          <p>{person.isPI ? 'Principal investigator' : person.position}</p>
        {/snippet}
      </PeopleGrid>
    </section>
  </div>
{/if}

{#if papers && papers.length > 0}
<section class="research">
  <h2>Publications by topics</h2>
  <p>click to filter</p>
    <TopicsChart {papers} {selectedTopic} onTopicClick={handleTopicClick} />
    <PapersGrid {papers} bind:sortBy {selectedTopic} />
  </section>
{/if}


<style>
  h2 {
    margin-bottom: 1rem;
  }

  section {
    margin-top: 2rem;
  }
</style>
