<script>
    import Meta from "$lib/components/Meta.svelte";
    import studentsData from '$data/students.csv';

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

    const currentStudents = studentsData.filter(s => s.status !== 'Alumni');
    const alumni = studentsData.filter(s => s.status === 'Alumni');
</script>

<Meta
  title="Students"
  description="Current students and alumni of the Vermont Complex Systems Institute."
  {preloadFont}
/>

<div class="who-we-are">
    <div class="content-wrapper">
        <div class="page-header no-logo">
            <div class="page-header-text">
                <h1>Students</h1>
                <p class="intro">Meet the students who make up the next generation of complex systems.</p>
            </div>
        </div>

    <div class="content">
        <section>
            <h2>Current Students</h2>
            <div class="students-grid">
                {#each currentStudents as student}
                    <div class="student-card">
                        {#if student.url}
                            <a href={student.url} target="_blank" rel="noopener noreferrer">
                                <div class="student-photo">
                                    <img src="/common/assets/students/{student.id}.jpg" alt="{student.name}" />
                                </div>
                                <div class="student-info">
                                    <h4>{student.name}</h4>
                                    <p>{student.position}</p>
                                </div>
                            </a>
                        {:else}
                            <div class="student-photo">
                                <img src="/common/assets/students/{student.id}.jpg" alt="{student.name}" />
                            </div>
                            <div class="student-info">
                                <h4>{student.name}</h4>
                                <p>{student.position}</p>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>

        {#if alumni.length > 0}
            <section>
                <h2>Alumni</h2>
                <div class="students-grid">
                    {#each alumni as student}
                        <div class="student-card">
                            {#if student.url}
                                <a href={student.url} target="_blank" rel="noopener noreferrer">
                                    <div class="student-photo">
                                        <img src="/common/assets/students/{student.id}.jpg" alt="{student.name}" />
                                    </div>
                                    <div class="student-info">
                                        <h4>{student.name}</h4>
                                        <p>{student.position}</p>
                                    </div>
                                </a>
                            {:else}
                                <div class="student-photo">
                                    <img src="/common/assets/students/{student.id}.jpg" alt="{student.name}" />
                                </div>
                                <div class="student-info">
                                    <h4>{student.name}</h4>
                                    <p>{student.position}</p>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </section>
        {/if}
    </div>
</div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }

    .page-header {
        margin-bottom: 3rem;
    }
    
    h2 {
        margin-bottom: 1rem;
    }

    .content {
        max-width: 100%;
    }

    section {
        margin-bottom: 3rem;
    }

    .students-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
    }

    .student-card {
        transition: transform 0.2s ease;
    }

    .student-card:hover {
        transform: translateY(-4px);
    }

    .student-card a {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .student-photo {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .student-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .student-info h4 {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--sans);
        margin-bottom: 0.25rem;
        color: var(--color-fg);
    }

    .student-info p {
        font-size: 0.9rem;
        font-family: var(--sans);
        color: var(--color-fg-muted);
        margin: 0;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }

        .students-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1.5rem;
        }

        h2 {
            font-size: 1.5rem;
        }
    }
</style>
