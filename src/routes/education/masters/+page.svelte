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
        "Coding (Python/R ideal but not necessary)",
        "Data structures",
        "Linear algebra",
        "Probability and Statistics"
    ];

    const catchupCourses = [
        {
            code: "MATH 2522",
            name: "Applied Linear Algebra",
            description: "Solving linear systems, vectors, matrices, linear independence, vector spaces, determinants, linear transformations, eigenvalues and eigenvectors, singular value decomposition, and matrix factorizations."
        },
        {
            code: "CS 2240",
            name: "Data Struc & Algorithms",
            description: "Design and implementation of linear structures, trees and graphs. Examples of common algorithmic paradigms. Theoretical and empirical complexity analysis. Sorting, searching, and basic graph algorithms."
        },
        {
            code: "STAT 1410",
            name: "Basic Statistical Methods 1",
            description: "Fundamental concepts for data analysis and experimental design. Descriptive and inferential statistics, including classical and nonparametric methods, regression, correlation, and analysis of variance. Statistical software."
        }
    ];

    const degreePaths = [
        { name: "Coursework Only", credits: "30 credits" },
        { name: "Coursework and Project", credits: "24-27 credits coursework + 3-6 credits project" },
        { name: "Coursework and Thesis", credits: "21-24 credits coursework + 6-9 credits thesis" }
    ];

    const coreSequences = [
        {
            name: "Data Science",
            required: "Data Science I: CSYS/CS/STAT 5870",
            optional: "Data Science 2: CSYS/CS/STAT 6870"
        },
        {
            name: "Modeling",
            required: "Modeling Complex Systems: CSYS/CS 6020",
            optional: "Modeling Complex Systems 2"
        },
        {
            name: "Principles",
            required: "Principles of Complex Systems 1: CSYS/MATH 6701",
            optional: "Principles of Complex Systems 2: CSYS/MATH 6713"
        }
    ];

    const electivePaths = [
        "Biomedical Systems",
        "Energy Systems",
        "Environmental Systems",
        "Evolutionary Robotics",
        "Policy Systems",
        "Build-Your-Own-Adventure"
    ];
</script>

<Meta 
  title="Masters in Complex Systems and Data Science"
  description="MS in Complex Systems and Data Science - Training protean data scientists with transferable skills."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Masters in Complex Systems and Data Science</h1>
                <p class="intro">Train to become a protean data scientist with eminently transferable skills, capable of describing, understanding, predicting, and managing complex natural and sociotechnical systems.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/master.png" alt="Master's degree" class="page-header-image" />
            </div>
        </div>
        
        <div class="program-content">
            <!-- Overview -->
            <section>
                <h2>Overview</h2>
                <div class="overview-cards">
                    <div class="overview-card">
                        <p>Our Masters in Complex Systems and Data Science (CSDS) trains emerging data scientists to find, model, understand, and tell the stories of the patterns they uncover.</p>
                    </div>
                    <div class="overview-card">
                        <p>Our coursework comprises a balanced core of Complex Systems and Data Science and includes choose-your-own adventure options.</p>
                    </div>
                    <div class="overview-card">
                        <p>The Masters may be earned as a two year stand-alone degree or in one year as part of an Accelerated Masters for UVM undergraduate students.</p>
                    </div>
                </div>
            </section>

            <!-- Educational Mission -->
            <section>
                <h2>Educational Mission</h2>
                <div class="mission-content">
                    <h3>Our Essential Goal</h3>
                    <p class="mission-statement">We enable students to become protean data scientists with eminently transferable skills (read: super powers).</p>

                    <h3>Our More Detailed Goal</h3>
                    <p>We provide students with a broad training in computational and theoretical techniques for:</p>
                    <ul class="mission-list">
                        <li>describing and understanding complex natural and sociotechnical systems, enabling them to then, as possible,</li>
                        <li>predict, control, manage, and create such systems.</li>
                    </ul>

                    <h3>Major Skill Sets</h3>
                    <div class="skills-grid">
                        <div class="skill-card">
                            <strong>Data Wrangling</strong>
                            <p>Methods of data acquisition, storage, manipulation, and curation.</p>
                        </div>
                        <div class="skill-card">
                            <strong>Visualization</strong>
                            <p>Visualization techniques, with a potential for building high quality web-based applications.</p>
                        </div>
                        <div class="skill-card">
                            <strong>Machine Learning</strong>
                            <p>Uncovering complex patterns and correlations in systems through data-fueled machine learning and genetic programming.</p>
                        </div>
                        <div class="skill-card">
                            <strong>Mechanistic Stories</strong>
                            <p>Powerful ways of identifying and extracting explanatory, mechanistic stories underlying complex systems—not just how to use black box techniques.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Step 1: Prerequisites -->
            <section>
                <div class="section-header-with-image">
                    <h2><span class="step-number">Step 1</span> Prerequisites</h2>
                    <img src="/common/assets/drawing/laptop01.png" alt="Laptop" class="section-image" />
                </div>
                <p>Students must have prior coursework or competency in:</p>
                <ul class="prerequisite-list">
                    {#each prerequisites as prereq}
                        <li>{prereq}</li>
                    {/each}
                </ul>

                <h3>Catch-up Courses Available</h3>
                <p class="note">Maximum 1 course for graduate credit:</p>
                <div class="course-cards">
                    {#each catchupCourses as course}
                        <div class="course-card">
                            <div class="course-code">{course.code}</div>
                            <div class="course-name">{course.name}</div>
                            <div class="tooltip-icon">ⓘ</div>
                            <div class="course-tooltip">{course.description}</div>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- Step 2: Three Degree Paths -->
            <section>
                <h2><span class="step-number">Step 2</span> Three Degree Paths</h2>
                <div class="path-cards">
                    {#each degreePaths as path, i}
                        <div class="path-card">
                            <div class="path-number">{i + 1}</div>
                            <h3>{path.name}</h3>
                            <p>{path.credits}</p>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- Step 3: Common Core -->
            <section>
                <h2><span class="step-number">Step 3</span> Common Core</h2>
                <p class="core-description">9 credits required — Take the first course in each sequence + at least one second course:</p>

                <div class="sequence-cards">
                    {#each coreSequences as seq, i}
                        <div class="sequence-card">
                            <h3>Sequence {i + 1}: {seq.name}</h3>
                            <div class="course-item required">
                                <span class="badge">Required</span>
                                <p>{seq.required}</p>
                            </div>
                            <div class="course-item optional">
                                <span class="badge">Optional</span>
                                <p>{seq.optional}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <!-- Step 4: Electives -->
            <section>
                <h2><span class="step-number">Step 4</span> Electives</h2>
                <p><strong>9 credits (3 courses)</strong> — Choose from CSDS electives or specialized paths:</p>

                <details class="electives-details">
                    <summary>View All CSDS Electives</summary>
                    <div class="electives-list">
                        <ul>
                            <li>Chaos, Fractals and Dynamical Systems (CSYS 5766)</li>
                            <li>Complex Networks (CSYS/MATH 6713)</li>
                            <li>Evolutionary Computation (CSYS/CS 6520)</li>
                            <li>Applied Artificial Neural Networks (CSYS/CEE 7920)</li>
                            <li>Applied Geostatistics (CSYS/STAT/CEE 7980)</li>
                            <li>Database Systems (CS 3040)</li>
                            <li>Human Computer Interaction (CS 3280)</li>
                            <li>Machine Learning (CS 3540)</li>
                            <li>Statistical Methods II (STAT 3210)</li>
                            <li>Multivariate Analysis (STAT 5230)</li>
                            <li>Logistic Regression and Survival Analysis (STAT 5290)</li>
                            <li>Experimental Design (STAT 5310)</li>
                            <li>Categorical Data Analysis (STAT 5350)</li>
                            <li>Probability Theory (STAT 5510)</li>
                            <li>Statistical Theory (STAT 5610)</li>
                            <li>Bayesian Statistics (STAT 6300)</li>
                            <li>Statistical Learning (STAT/CS 3990)</li>
                        </ul>
                        <p class="note"><em>This course list evolves and not all courses will be offered in any given semester. Other courses (including special topics) may be approved by the CSDS Curriculum Committee.</em></p>
                    </div>
                </details>

                <div class="elective-grid">
                    {#each electivePaths as path}
                        <div class="elective-badge">{path}</div>
                    {/each}
                </div>
            </section>

            <!-- Step 5: Travel the Right Path -->
            <section>
                <h2><span class="step-number">Step 5</span> Travel the Right Path</h2>

                <details class="path-details">
                    <summary><strong>Path 1:</strong> Coursework Only</summary>
                    <div class="path-detail-content">
                        <p>Students must complete a minimum of 30 credit hours and they can:</p>
                        <ul>
                            <li>Either take the pure CSDS Path and choose three (3) or more Complex Systems and Data Science Electives from the list above.</li>
                            <li>Or choose three (3) or more courses in one of the Elective Paths below.</li>
                        </ul>
                    </div>
                </details>

                <details class="path-details">
                    <summary><strong>Path 2:</strong> Coursework and Project</summary>
                    <div class="path-detail-content">
                        <p>Students must complete a minimum of 30 credit hours, comprising <strong>24 to 27 credits of coursework and 3 to 6 credits of project (CSYS 6392)</strong>.</p>
                        <p>A graduate project typically consists of a significant study of a data-rich problem carried out under the supervision of a faculty member. Full-time students should plan to search for and acquire a project advisor by the end of their first semester.</p>
                        <p>The results of the project must be presented before a project committee in a public talk, which has been advertised to the community. The project committee must include two or three individuals. The chair, who may be the project advisor, must be a member of the Graduate College.</p>
                        <p>A pdf (or similar) of the report along with accompanying web products should be submitted to the Graduate Program Coordinator within 30 days after the defense. The products will be housed online by the Vermont Complex Systems Center.</p>
                    </div>
                </details>

                <details class="path-details">
                    <summary><strong>Path 3:</strong> Coursework and Thesis</summary>
                    <div class="path-detail-content">
                        <p>Students choosing the thesis option must complete a minimum of 30 credit hours, including <strong>21 to 24 credits of coursework and 6 to 9 credits of thesis research (CSYS 6391)</strong>.</p>
                        <p>A Master's thesis consists of original research work done under the guidance of a faculty member. Students opting to pursue a thesis must find and arrange a thesis advisor in their first semester.</p>
                        <p>The student must defend their thesis before committee in a public oral thesis defense. The thesis committee must include three members of the Graduate College and include the thesis advisor.</p>
                        <p>At least three weeks before the defense, the written thesis must be submitted to the Graduate College for a format check. At least two weeks before the defense, the student must make electronic copies of the written thesis available to all members of the thesis committee. The thesis defense itself must be adequately advertised to the community.</p>
                        <p>Students are responsible for checking with the graduate college, one year before planned graduation, about relevant forms and procedure for preparing and defending their thesis.</p>
                    </div>
                </details>

                <div class="advisor-note">
                    <h4>Finding a Faculty Advisor</h4>
                    <p>In your first semester after admission, if you wish to pursue the project or thesis option, please identify a faculty advisor. If you do not recruit a faculty advisor, you will have to follow the coursework only track.</p>
                    <p>You identify a faculty advisor by meeting with faculty. After identifying an advisor, please obtain written consent and ask the advisor to email the graduate coordinator.</p>
                </div>
            </section>

            <!-- Step 6: Specialized Paths -->
            <section>
                <h2><span class="step-number">Step 6</span> Optional Elective Paths</h2>
                <p>Instead of choosing 3 more pure CSDS courses, here are some other directions:</p>

                <div class="specialized-paths">
                    <div class="specialized-path-card">
                        <h3>Build-Your-Own-Adventure</h3>
                        <p>Design your own path with your advisor.</p>
                    </div>
                    <div class="specialized-path-card">
                        <h3>Biomedical Systems</h3>
                        <p><strong>Domain Consultant:</strong> 
                            <a href="https://comis.med.uvm.edu/bioviewer/WebBio.aspx?BioID=22694" target="_blank" rel="noopener noreferrer">
                                Jason Bates
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                    <div class="specialized-path-card">
                        <h3>Energy Systems</h3>
                        <p><strong>Domain Consultant:</strong> 
                            <a href="https://www.uvm.edu/cems/ebe/profile/mads-almassalkhi" target="_blank" rel="noopener noreferrer">
                                Mads Almassalkhi
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                    <div class="specialized-path-card">
                        <h3>Environmental Systems</h3>
                        <p><strong>Domain Consultants:</strong> 
                            <a href="https://www.uvm.edu/cems/cee/profile/donna-rizzo" target="_blank" rel="noopener noreferrer">
                                Donna Rizzo
                                <ExternalLink size={14} />
                            </a> and 
                            <a href="https://www.uvm.edu/gund/profile/taylor-ricketts" target="_blank" rel="noopener noreferrer">
                                Taylor Ricketts
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                    <div class="specialized-path-card">
                        <h3>Evolutionary Robotics</h3>
                        <p><strong>Domain Consultant:</strong> 
                            <a href="https://www.uvm.edu/cems/cs/profile/josh-bongard" target="_blank" rel="noopener noreferrer">
                                Josh Bongard
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                    <div class="specialized-path-card">
                        <h3>Policy Systems</h3>
                        <p><strong>Domain Consultant:</strong> 
                            <a href="https://www.uvm.edu/cals/cdae/profile/asim-zia" target="_blank" rel="noopener noreferrer">
                                Asim Zia
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                </div>
            </section>

            <!-- Application Details -->
            <section>
                <h2>How to Apply</h2>
                <div class="application-grid">
                    <div class="app-detail">
                        <div class="app-label">Deadline</div>
                        <div class="app-value">February 15</div>
                    </div>
                    <div class="app-detail">
                        <div class="app-label">GRE</div>
                        <div class="app-value">Not Required</div>
                    </div>
                    <div class="app-detail">
                        <div class="app-label">TOEFL</div>
                        <div class="app-value">90 minimum (100 for TA funding)</div>
                    </div>
                    <div class="app-detail">
                        <div class="app-label">Duration</div>
                        <div class="app-value">2 years standalone<br>1 year accelerated (UVM undergrads)</div>
                    </div>
                    <div class="app-detail">
                        <div class="app-label">Program Director</div>
                        <div class="app-value">Professor 
                            <a href="https://www.uvm.edu/cems/cs/profile/laurent-hebert-dufresne">
                            Laurent Hébert-Dufresne
                            <ExternalLink size={14} />
                        </a></div>
                    </div>
                    <div class="app-detail">
                        <div class="app-label">Apply</div>
                        <div class="app-value">
                            <a href="https://www.uvm.edu/graduatecollege/admissions" target="_blank" rel="noopener noreferrer">
                                UVM Graduate College
                                <ExternalLink size={14} />
                            </a>
                        </div>
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
        width: 200px;
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
        max-width: 1000px;
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
    }

    .core-description {
        font-weight: 500;
        margin-bottom: 2rem;
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

    /* Course Cards - Catch-up courses */
    .course-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .course-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        text-align: center;
        position: relative;
        cursor: help;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .course-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    :global(.dark) .course-card {
        background: #f5f5f5;
    }

    .course-code {
        font-family: var(--mono);
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--color-fg);
        margin-bottom: 0.5rem;
    }

    .course-name {
        font-family: var(--serif);
        font-size: 0.9rem;
        color: var(--color-gray-700);
    }

    .tooltip-icon {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        font-size: 1rem;
        color: var(--color-gray-600);
        opacity: 0.6;
        transition: opacity 0.2s ease;
    }

    .course-card:hover .tooltip-icon {
        opacity: 1;
    }

    .course-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #2a2a2a;
        color: white;
        padding: 0.75rem 1rem;
        border-radius: var(--border-radius);
        font-size: 0.85rem;
        line-height: 1.4;
        width: 280px;
        max-width: 90vw;
        margin-bottom: 0.5rem;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, visibility 0.2s ease;
        pointer-events: none;
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        text-align: left;
    }

    .course-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: #2a2a2a;
    }

    .course-card:hover .course-tooltip {
        opacity: 1;
        visibility: visible;
    }

    /* Path Cards - Three degree paths */
    .path-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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

    .path-card h3 {
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 1rem;
        padding-right: 3rem;
    }

    .path-card p {
        font-size: 0.95rem;
        margin: 0;
        color: var(--color-gray-700);
    }

    /* Sequence Cards - Core courses */
    .sequence-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 1.5rem;
    }

    .sequence-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
    }

    :global(.dark) .sequence-card {
        background: #f5f5f5;
    }

    .sequence-card h3 {
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid var(--color-gray-300);
        padding-bottom: 0.5rem;
    }

    .course-item {
        margin-bottom: 1rem;
    }

    .course-item:last-child {
        margin-bottom: 0;
    }

    .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: var(--border-radius);
        font-size: 0.75rem;
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    .required .badge {
        background: #4a4a4a;
        color: white;
    }

    .optional .badge {
        background: var(--color-gray-300);
        color: var(--color-gray-700);
    }

    .course-item p {
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0;
    }

    /* Elective Grid */
    .elective-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .elective-badge {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 0.75rem 1.5rem;
        font-family: var(--serif);
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-fg);
        transition: transform 0.2s ease, background 0.2s ease;
    }

    .elective-badge:hover {
        transform: translateY(-2px);
        background: #f0f0f0;
    }

    :global(.dark) .elective-badge {
        background: #f5f5f5;
    }

    /* Application Grid */
    .application-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .app-detail {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
    }

    :global(.dark) .app-detail {
        background: #f5f5f5;
    }

    .app-label {
        font-family: var(--mono);
        font-size: 0.85rem;
        text-transform: uppercase;
        font-weight: 700;
        color: var(--color-gray-700);
        margin-bottom: 0.5rem;
        letter-spacing: 0.5px;
    }

    .app-value {
        font-family: var(--serif);
        font-size: 1.1rem;
        color: var(--color-fg);
        line-height: 1.4;
    }

    .app-value a {
        color: var(--color-accent);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .app-value a:hover {
        text-decoration: underline;
    }

    /* Overview Cards */
    .overview-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 1.5rem;
    }

    .overview-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
    }

    .overview-card p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.6;
    }

    :global(.dark) .overview-card {
        background: #f5f5f5;
    }

    /* Mission Content */
    .mission-content {
        margin-top: 1.5rem;
    }

    .mission-statement {
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--color-fg);
        margin: 1rem 0 2rem 0;
    }

    .mission-list {
        font-family: var(--serif);
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: disc;
        margin-bottom: 2rem;
    }

    .mission-list li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    /* Skills Grid */
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .skill-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
    }

    .skill-card strong {
        display: block;
        font-family: var(--sans);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: var(--color-fg);
    }

    .skill-card p {
        margin: 0;
        font-size: 0.95rem;
        color: var(--color-gray-700);
    }

    :global(.dark) .skill-card {
        background: #f5f5f5;
    }

    /* Details/Summary for Electives and Paths */
    details.electives-details,
    details.path-details {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
    }

    :global(.dark) details.electives-details,
    :global(.dark) details.path-details {
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

    .electives-list,
    .path-detail-content {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-gray-300);
    }

    .electives-list ul {
        column-count: 2;
        column-gap: 2rem;
        font-family: var(--serif);
        padding-left: 1.5rem;
    }

    .electives-list li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
        break-inside: avoid;
    }

    .path-detail-content ul {
        font-family: var(--serif);
        padding-left: 1.5rem;
        margin: 1rem 0;
    }

    .path-detail-content li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    /* Advisor Note */
    .advisor-note {
        background: #fff9e6;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-top: 2rem;
    }

    .advisor-note h4 {
        font-family: var(--sans);
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 1rem;
        color: var(--color-fg);
    }

    .advisor-note p {
        margin-bottom: 0.75rem;
    }

    .advisor-note p:last-child {
        margin-bottom: 0;
    }

    /* Specialized Paths */
    .specialized-paths {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .specialized-path-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .specialized-path-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    :global(.dark) .specialized-path-card {
        background: #f5f5f5;
    }

    .specialized-path-card h3 {
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: 0.75rem;
    }

    .specialized-path-card p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-gray-700);
    }

    .specialized-path-card a {
        color: var(--color-accent);
        text-decoration: none;
    }

    .specialized-path-card a:hover {
        text-decoration: underline;
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

        .course-cards,
        .path-cards,
        .sequence-cards,
        .application-grid,
        .overview-cards,
        .skills-grid,
        .specialized-paths {
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

        .path-card h3 {
            padding-right: 2.5rem;
        }

        .elective-grid {
            gap: 0.75rem;
        }

        .elective-badge {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .electives-list ul {
            column-count: 1;
        }

        .mission-statement {
            font-size: 1.1rem;
        }

        .section-header-with-image {
            flex-direction: column;
            align-items: flex-start;
        }

        .section-image {
            width: 120px;
        }
    }
</style>