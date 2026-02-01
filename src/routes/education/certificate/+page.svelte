<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';

    const prerequisites = [
        "Calculus",
        "Probability and statistics",
        "Computer programming (Python, R, and Matlab will be most helpful)"
    ];

    const recommended = [
        "Linear algebra"
    ];

    const coreRequired = [
        "CSYS/MATH 6701: Principles of Complex Systems",
        "CSYS/CS 6020: Modeling Complex Systems",
        "CSYS/STAT/CS 5870: Data Science I - Experience"
    ];

    const aListCourses = [
        "CSYS 5766: Chaos, Fractals, and Dynamical Systems",
        "CSYS/MATH 6713: Complex Networks",
        "CSYS/CS 6520: Evolutionary Computation",
        "CS/STAT 3560: Neural Computation",
        "STAT 5530: Appl Time Series & Forecasting",
        "CSYS/STAT/CEE 7980: Applied Geostatistics",
        "CSYS/CEE 7920: Applied Artificial Neural Networks"
    ];

    const bListCourses = [
        "CSYS/STAT/CS 6870: Data Science II",
        "MATH 5788: Mathematical Biology & Ecology",
        "MATH 5230: Adv. Ordinary Differential Equations",
        "ME 5410: Advanced Bioengineering Systems",
        "EE 5320: Smart Grid",
        "ME 6550: Multi-Scale Modeling",
        "CSYS/EE 6990: Optimization in Engineering",
        "PA 6080: Decision Making Models",
        "PA 6170: Systems Analysis and Strategic Management",
        "PA 6060: Policy Systems",
        "PBIO 5940: Ecological Modeling",
        "PBIO 5750: Global Change Ecology",
        "PBIO 6940: Data Modeling for Envir Science",
        "BIOL 3165: Evolution",
        "CS 3060: Evolutionary Robotics",
        "CS 3540: Machine Learning",
        "CS 6540: Deep Learning",
        "ENVS 4990: Envir. Modeling and Systems Thinking",
        "CEE 6990A: Data Analytics for Water Resources"
    ];

    const pathOptions = [
        {
            name: "Option 1",
            structure: [
                "3 required core courses",
                "1-2 A-list courses",
                "0-2 B-list courses"
            ]
        },
        {
            name: "Option 2",
            structure: [
                "2 required core courses",
                "1-3 A-list courses",
                "0-2 B-list courses"
            ]
        }
    ];
</script>

<Meta
  title="Certificate of Graduate Study in Complex Systems"
  description="Five-course graduate certificate in Complex Systems and Data Science - A booster pack for your graduate degree or standalone credential."
/>

<div class="page-header">
    <div class="page-header-text">
        <h1>Certificate of Graduate Study in Complex Systems</h1>
        <p class="intro">A five-course booster pack in Complex Systems and Data Science.</p>
    </div>
    <div class="page-header-logo">
        <img src="/common/assets/logos/certificate.png" alt="Certificate" class="page-header-image" />
    </div>
</div>

<div class="content">
    <!-- Overview -->
    <section>
        <h2>Overview</h2>
        <div class="grid-2">
            <div class="card card-lg">
                <h3>What It Is</h3>
                <p class="mb-0">The Graduate Certificate is a five (5) course booster pack in Complex Systems and Data Science.</p>
            </div>
            <div class="card card-lg">
                <h3>Who It's For</h3>
                <p class="mb-0">The graduate certificate can be earned by students as a complement for their graduate degrees across the University of Vermont, or as a stand-alone post-baccalaureate Graduate Certificate (online or in person).</p>
            </div>
        </div>
    </section>

    <!-- Prerequisites -->
    <section>
        <div class="section-header-with-image">
            <h2><span class="step-number">Step 1</span> The Academic Background You'll Need</h2>
            <img src="/common/assets/drawing/platypus.png" alt="Platypus" class="section-image" />
        </div>
        <div class="prerequisites-section">
            <h3>Prerequisites</h3>
            <p>A bachelor's degree and demonstrated proficiency in:</p>
            <ul class="prerequisite-list">
                {#each prerequisites as prereq}
                    <li>{prereq}</li>
                {/each}
            </ul>
            <h3>Highly Recommended (but not required)</h3>
            <ul class="prerequisite-list">
                {#each recommended as rec}
                    <li>{rec}</li>
                {/each}
            </ul>
            <p class="note"><em>Note: Specific electives may have additional prerequisites</em></p>
        </div>
    </section>

    <!-- Certificate Requirements -->
    <section>
        <h2><span class="step-number">Step 2</span> Get With the Program</h2>
        <div class="card card-lg requirements-card">
            <h3>Certificate Requirement</h3>
            <p><strong>5 courses (15 credits)</strong> with a <strong>minimum GPA of 3.0</strong> in all 5 courses.</p>
        </div>
        <h3>Structure Options</h3>
        <div class="grid-2">
            {#each pathOptions as option, i}
                <div class="card card-lg card-hover path-card">
                    <div class="path-number">{i + 1}</div>
                    <h4>{option.name}</h4>
                    <ul>
                        {#each option.structure as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </section>

    <!-- Required Core Courses -->
    <section>
        <h2><span class="step-number">Step 3</span> Required Core Courses</h2>
        <div class="card card-lg">
            {#each coreRequired as course}
                <div class="course-item-simple">
                    <span class="bullet">•</span>
                    <span class="course-text">{course}</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- A-List Courses -->
    <section>
        <h2><span class="step-number">Step 4</span> A-List Courses</h2>
        <details class="accordion">
            <summary>View A-List Courses</summary>
            <div class="accordion-content courses-list">
                <ul>
                    {#each aListCourses as course}
                        <li>{course}</li>
                    {/each}
                </ul>
            </div>
        </details>
    </section>

    <!-- B-List Courses -->
    <section>
        <h2><span class="step-number">Step 5</span> B-List Courses</h2>
        <details class="accordion">
            <summary>View B-List Courses</summary>
            <div class="accordion-content courses-list">
                <ul>
                    {#each bListCourses as course}
                        <li>{course}</li>
                    {/each}
                </ul>
            </div>
        </details>
    </section>

    <!-- Contact Information -->
    <section>
        <h2>Questions?</h2>
        <div class="card card-lg">
            <h3>Vermont Complex Systems Institute</h3>
            <p class="tagline">Describe, Explain, Create, Share.</p>
            <div class="contact-links">
                <a href="mailto:vcsi@uvm.edu">Main Institute Contact</a>
                <a href="https://list.uvm.edu/cgi-bin/wa?SUBED1=CSYS-L&A=1" target="_blank" rel="noopener noreferrer">
                    Join Listserv
                    <ExternalLink size={14} />
                </a>
                <a href="https://www.linkedin.com/school/uvm-vcsc/" target="_blank" rel="noopener noreferrer">
                    Follow Us on LinkedIn
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    </section>
</div>

<style>
    /* Utility */
    .mb-0 {
        margin-bottom: 0;
    }

    /* Page-specific image styling */
    .section-image {
        width: 250px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        transform: translateY(10rem) translateX(-15rem);
    }

    .tagline {
        font-style: italic;
        color: var(--color-gray-600);
        margin-top: 0.5rem;
    }

    /* List styles */
    ul.prerequisite-list {
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: disc;
        margin-bottom: 2rem;
    }

    ul.prerequisite-list li {
        margin-bottom: 0.5rem;
        line-height: 1.2;
    }

    /* Requirements card overrides */
    .requirements-card h3 {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    .requirements-card p {
        margin: 0;
        font-size: 1.1rem;
    }

    /* Path card with number */
    .path-card {
        position: relative;
    }

    .path-number {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
        background: var(--color-fg);
        color: var(--color-bg);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.2rem;
    }

    .path-card ul {
        font-family: var(--serif);
        padding-left: 1.5rem;
        margin: 0;
        list-style-type: disc;
    }

    .path-card li {
        margin-bottom: 0.5rem;
        line-height: 1.2;
    }

    /* Course list items */
    .course-item-simple {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        font-family: var(--serif);
        line-height: 1.2;
    }

    .course-item-simple:last-child {
        margin-bottom: 0;
    }

    .bullet {
        font-size: 1.5rem;
        color: var(--color-fg);
        flex-shrink: 0;
    }

    .course-text {
        color: var(--color-fg);
    }

    /* Course list columns */
    .courses-list ul {
        column-count: 2;
        column-gap: 2rem;
        font-family: var(--serif);
        padding-left: 1.5rem;
    }

    .courses-list li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
        break-inside: avoid;
    }

    /* Contact links */
    .contact-links {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .contact-links a {
        color: var(--color-accent);
        text-decoration: none;
        font-family: var(--serif);
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.2s ease;
    }

    .contact-links a:hover {
        text-decoration: underline;
        transform: translateX(0.25rem);
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .section-image {
            width: 120px;
            transform: none;
        }

        .path-number {
            top: 0.75rem;
            right: 0.75rem;
            width: 2rem;
            height: 2rem;
            font-size: 1rem;
        }

        .courses-list ul {
            column-count: 1;
        }
    }
</style>
