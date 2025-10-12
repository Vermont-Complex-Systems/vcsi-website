<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

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
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Certificate of Graduate Study in Complex Systems</h1>
                <p class="intro">A five-course booster pack in Complex Systems and Data Science.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/certificate.png" alt="Certificate" class="page-header-image" />
            </div>
        </div>

        <div class="program-content">
            <!-- Overview -->
            <section>
                <h2>Overview</h2>
                <div class="overview-cards">
                    <div class="overview-card">
                        <h3>What It Is</h3>
                        <p>The Graduate Certificate is a five (5) course booster pack in Complex Systems and Data Science.</p>
                    </div>
                    <div class="overview-card">
                        <h3>Who It's For</h3>
                        <p>The graduate certificate can be earned by students as a complement for their graduate degrees across the University of Vermont, or as a stand-alone post-baccalaureate Graduate Certificate (online or in person).</p>
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

                <div class="requirements-card">
                    <h3>Certificate Requirement</h3>
                    <p><strong>5 courses (15 credits)</strong> with a <strong>minimum GPA of 3.0</strong> in all 5 courses.</p>
                </div>

                <h3>Structure Options</h3>
                <div class="path-cards">
                    {#each pathOptions as option, i}
                        <div class="path-card">
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
                <div class="core-courses-list">
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

                <details class="courses-details">
                    <summary>View A-List Courses</summary>
                    <div class="courses-list">
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

                <details class="courses-details">
                    <summary>View B-List Courses</summary>
                    <div class="courses-list">
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
                <div class="contact-card">
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
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1.5rem;
        margin-top: 3rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .section-header-with-image {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .section-image {
        width: 250px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        transform: translateY(10rem) translateX(-15rem);
    }

    h3 {
        font-size: 1.3rem;
        font-weight: 600;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2rem;
        color: var(--color-fg);
    }

    h4 {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--serif);
        margin-bottom: 0.75rem;
        margin-top: 0;
        color: var(--color-fg);
    }

    .step-number {
        background: var(--color-fg);
        color: var(--color-bg);
        padding: 0.25rem 0.75rem;
        border-radius: var(--border-radius);
        font-size: 1rem;
        font-family: var(--mono);
        font-weight: 600;
    }

    .program-content {
        max-width: 80%;
    }

    section {
        margin-bottom: 3rem;
    }

    p {
        font-size: 1rem;
        line-height: 1.6;
        font-family: var(--serif);
        color: var(--color-fg);
        margin-bottom: 1rem;
    }

    .note {
        font-size: 0.9rem;
        font-style: italic;
        color: var(--color-gray-700);
        margin-top: 1rem;
    }

    .tagline {
        font-style: italic;
        color: var(--color-gray-600);
        margin-top: 0.5rem;
    }

    ul.prerequisite-list {
        font-family: var(--serif);
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: disc;
        margin-bottom: 2rem;
    }

    ul.prerequisite-list li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    /* Overview Cards */
    .overview-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 1.5rem;
    }

    .overview-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
    }

    .overview-card h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .overview-card p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.6;
    }

    :global(.dark) .overview-card {
        background: #f5f5f5;
    }

    /* Requirements Card */
    .requirements-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        margin-bottom: 2rem;
        text-align: center;
    }

    .requirements-card h3 {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    .requirements-card p {
        margin: 0;
        font-size: 1.1rem;
    }

    :global(.dark) .requirements-card {
        background: #f5f5f5;
    }

    /* Path Cards */
    .path-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 1.5rem;
    }

    .path-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        position: relative;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .path-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    :global(.dark) .path-card {
        background: #f5f5f5;
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
        line-height: 1.6;
    }

    /* Core Courses List */
    .core-courses-list {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        margin-top: 1.5rem;
    }

    :global(.dark) .core-courses-list {
        background: #f5f5f5;
    }

    .course-item-simple {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        font-family: var(--serif);
        font-size: 1rem;
        line-height: 1.6;
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

    /* Details/Summary for Courses */
    details.courses-details {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-top: 1.5rem;
        cursor: pointer;
    }

    :global(.dark) details.courses-details {
        background: #f5f5f5;
    }

    details summary {
        font-family: var(--serif);
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
        list-style: none;
    }

    details summary::-webkit-details-marker {
        display: none;
    }

    details summary::before {
        content: '▶';
        display: inline-block;
        margin-right: 0.5rem;
        transition: transform 0.2s ease;
    }

    details[open] summary::before {
        transform: rotate(90deg);
    }

    .courses-list {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-gray-300);
    }

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

    /* Contact Card */
    .contact-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        margin-top: 1.5rem;
    }

    .contact-card h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    :global(.dark) .contact-card {
        background: #f5f5f5;
    }

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
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }

        h2 {
            font-size: 1.5rem;
            flex-direction: column;
            align-items: flex-start;
        }

        .section-header-with-image {
            flex-direction: column;
            align-items: flex-start;
        }

        .section-image {
            width: 120px;
            transform: none;
        }

        .overview-cards,
        .path-cards {
            grid-template-columns: 1fr;
            gap: 1rem;
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

        .program-content {
            max-width: 100%;
        }
    }
</style>
