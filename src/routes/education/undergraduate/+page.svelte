<script>
    import Meta from "$lib/components/Meta.svelte";
    import { base } from '$app/paths';
    import { ArrowRight } from '@lucide/svelte';
</script>

<Meta
  title="Undergraduate Degree in Data Science"
  description="BS in Data Science - Joint program between Mathematics & Statistics and Computer Science at UVM."
/>

<div class="page-header">
    <div class="page-header-text">
        <h1>Undergraduate Degree in Data Science</h1>
        <p class="intro">A joint program between the Department of Mathematics and Statistics and the Department of Computer Science, providing a broad foundation for students pursuing careers in data-rich environments.</p>
    </div>
    <div class="page-header-logo">
        <img src="/common/assets/logos/bachelors.png" alt="Bachelor's degree" class="page-header-image" />
    </div>
</div>

<div class="content">
    <section>
        <h2>Program Overview</h2>
        <p>The Undergraduate Degree in Data Science is housed in the College of Engineering and Mathematical Sciences and offers students comprehensive training in data science fundamentals. This interdisciplinary program bridges mathematics, statistics, and computer science to prepare students for the growing field of data science.</p>
    </section>

    <section>
        <h2>Learn More</h2>
        <div class="grid-2">
            <a href="https://www.uvm.edu/cems/program/bs-data-science" target="_blank" rel="noopener noreferrer" class="card card-lg card-hover learn-more-card">
                <img src="/common/assets/drawing/squirrel02.jpg" alt="Squirrel" class="card-image" style="transform: translateY(-50px);" />
                <div class="card-content" style="transform: translateY(-50px);">
                    <h3>B.S. Data Science Program</h3>
                    <p>For detailed curriculum information and admission requirements, visit the official program page.</p>
                    <ArrowRight class="external-arrow" style="transform: translateY(30px);" size={24} />
                </div>
            </a>
            <a href="{base}/education/masters" class="card card-lg card-hover learn-more-card fox-card">
                <img src="/common/assets/drawing/fox01.png" alt="Fox" class="card-image fox-image" style="transform: scaleX(-1)" />
                <div class="card-content" style="transform: translateY(-10px);">
                    <h3>Accelerated Masters Programs</h3>
                    <p>Interested in the 4+1 accelerated masters pathway? Learn more about UVM's Accelerated Masters Programs.</p>
                    <ArrowRight class="external-arrow" size={24} />
                </div>
            </a>
        </div>
    </section>
</div>

<style>
    /* Card link overrides */
    .learn-more-card {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        position: relative;
        height: 25rem;
        overflow: hidden;
    }

    .card-image {
        width: 200px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        margin-bottom: 1rem;
    }

    .fox-image {
        width: 250px;
        height: auto;
        transform: scaleX(-1) translateY(30%);
    }

    .learn-more-card h3 {
        font-size: 1.3rem;
        font-weight: 600;
        font-family: var(--serif);
        margin-bottom: 0.75rem;
        margin-top: 0;
        color: var(--color-fg);
    }

    .learn-more-card p {
        line-height: 1.5;
        margin-bottom: 0;
        color: var(--color-gray-700);
    }

    .card-content {
        position: relative;
        flex: 1;
    }

    :global(.external-arrow) {
        color: var(--color-primary, #007acc);
        transition: transform 0.2s ease, color 0.2s ease;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .learn-more-card:hover :global(.external-arrow) {
        transform: translate(4px, -4px);
        color: var(--color-primary-hover, #005fa3);
    }

    .fox-card h3 {
        margin-top: 50px;
    }

    .fox-card p {
        margin-top: 0;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .learn-more-card {
            height: 27rem;
        }

        .card-image {
            width: 200px;
        }
    }
</style>
