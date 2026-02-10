<script>
    import Meta from "$lib/components/Meta.svelte";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import studentsData from '$data/students.csv';
    import groupsData from '$data/groups.csv';

    // Create lookup map: group id -> group name
    const groupNames = Object.fromEntries(groupsData.map(g => [g.id, g.name]));
    const getGroupName = (id) => groupNames[id] || '';

    const currentStudents = studentsData.filter(s => s.status !== 'Alumni');
    const alumni = studentsData.filter(s => s.status === 'Alumni');
</script>

<Meta
  title="Students"
  description="Current students and alumni of the Vermont Complex Systems Institute."
/>

<div class="page-header no-logo">
    <div class="page-header-text">
        <h1>Students</h1>
        <p class="intro">Meet the students who make up the next generation of complex systems.</p>
    </div>
</div>

<div class="content">
    <section>
        <h2>Current Students</h2>
        <PeopleGrid
            people={currentStudents}
            assetFolder="students"
            href={(s) => s.url}
            external
        >
            {#snippet card(student)}
                <h4>{student.name}</h4>
                <p>{student.position}</p>
                <p>{getGroupName(student.primaryAffiliation)}</p>
            {/snippet}
        </PeopleGrid>
    </section>

    {#if alumni.length > 0}
        <section>
            <h2>Alumni</h2>
            <PeopleGrid
                people={alumni}
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
    {/if}
</div>

<style>
    h2 {
        margin-bottom: 1rem;
    }

    .content {
        max-width: 100%;
    }

    section {
        margin-bottom: 3rem;
    }

    @media (max-width: 768px) {
        h2 {
            font-size: 1.5rem;
        }
    }
</style>
