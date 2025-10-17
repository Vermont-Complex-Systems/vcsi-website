<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import { base } from '$app/paths';

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
            name: "Data Structures",
            description: "Design and implementation of linear structures, trees and graphs. Examples of common algorithmic paradigms. Theoretical and empirical complexity analysis. Sorting, searching, and basic graph algorithms."
        },
        {
            code: "STAT 1410",
            name: "Basic Statistical Methods 1",
            description: "Foundational course for students taking further quantitative courses. Exploratory data analysis, probability distributions, estimation, hypothesis testing. Introductory regression, experimentation, contingency tables, and nonparametrics. Computer software used."
        }
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

    const majorSkills = [
        {
            title: "Team Collaboration",
            description: "Being a good team member in a highly-collaborative pan-disciplinary, creative research environment that helps solve some of the biggest questions in the world."
        },
        {
            title: "Data Wrangling",
            description: "Methods of data acquisition, storage, manipulation, and curation."
        },
        {
            title: "Visualization",
            description: "Visualization techniques, with a potential for building high-quality web-based applications."
        },
        {
            title: "Mechanistic Stories",
            description: "Powerful ways of identifying and extracting explanatory, mechanistic stories underlying complex systems—not just how to use black box techniques."
        }
    ];

    const phdStages = [
        "Completion of 75 credits of coursework with sufficiently high GPA",
        "Passing of the written comprehensive exams: PhD students sit for a triplet of 1 hour written exams (in 3 subjects) on topics decided upon in consultation with their research advisor(s)",
        "Presentation and defense of the dissertation proposal",
        "Generation of at least two published or accepted peer-reviewed publications prior to defending their dissertation, with a third at least in peer-review",
        "Delivery of a written dissertation and oral defense of the dissertation"
    ];
</script>

<Meta
  title="PhD in Complex Systems and Data Science"
  description="Doctoral program training deeply skilled and ethical research data scientists the world needs."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>PhD in Complex Systems and Data Science</h1>
                <p class="intro">Build a deep portfolio of research on important, complicated, data-rich problems that matter.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/phd.png" alt="PhD degree" class="page-header-image" />
            </div>
        </div>

        <div class="program-content">
            <!-- Overview -->
            <section>
                <h2>Overview</h2>
                <div class="overview-cards">
                    <div class="overview-card">
                        <p>Our PhD in Complex Systems and Data Science (CSDS) enables students to build a deep portfolio of research on important, complicated, data-rich problems that matter.</p>
                        <p>Students will receive a wide and rich training in empirical, computational, and theoretical methods for describing and understanding complex systems.</p>
                    </div>
                    <div class="overview-card">
                        <p>Depending on their chosen area of focus, students will work within and across research groups, and be strongly connected with other students through co-location and regular student-led meetings and events.</p>
                        <p>The program's scope is science-wide, encompassing natural, artificial, and sociotechnical systems.</p>
                    </div>
                </div>
            </section>

            <!-- Program Goals -->
            <section>
                <h2>Program Goals</h2>
                <div class="mission-content">
                    <h3>Our Essential Goal</h3>
                    <p class="mission-statement">To train the deeply skilled and ethical research data scientists the world needs.</p>

                    <h3>Our More Detailed Goal</h3>
                    <p>Our PhD is for students who want to develop a potent portfolio of scientific research into data-rich problems. We want to make this happen.</p>
                    <p>And as for our <a href="{base}/education/masters">Masters</a>, we provide students with a broad training in computational and theoretical techniques for (1) describing and understanding complex natural and sociotechnical systems, enabling them to then, as possible, (2) predict, control, manage, and create such systems.</p>

                    <h3>Foundation</h3>
                    <p>The PhD rests upon our Master's and our five-course Graduate Certificate.</p>

                    <h3>Major Skill Sets</h3>
                    <div class="skills-grid">
                        {#each majorSkills as skill}
                            <div class="skill-card">
                                <strong>{skill.title}</strong>
                                <p>{skill.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </section>

            <!-- Step 1: Becoming the Crow -->
            <section>
                <div class="section-header-with-image">
                    <h2><span class="step-number">Step 1</span> Becoming the Crow</h2>
                    <img src="/common/assets/drawing/crow03.png" alt="Crow" class="section-image"/>
                </div>
                <h3>Who we're looking for to join our corvine cohort:</h3>
                <div class="becoming-crow">
                    <div class="prerequisites-section">
                            <h4>Prerequisites</h4>
                        <p>Students must have a Bachelor's degree and preferably a Master's degree in a relevant field and prior coursework in:</p>
                        <ul class="prerequisite-list">
                            {#each prerequisites as prereq}
                                <li>{prereq}</li>
                            {/each}
                        </ul>

                        <p class="note"><strong>Additional Background:</strong> Training in relevant aspects of physics (e.g., statistical mechanics) will be beneficial but not required. Applicants lacking one or more of these prerequisite areas may be accepted provisionally and will be required to complete an approved program of supplementary work within their first year of study.</p>

                        <p class="note"><strong>Evaluation Criteria:</strong> Applicants will be evaluated based on their potential for excellence in research, as judged from their academic background, test scores, relevant experience and three (3) letters of recommendation. We will admit students who we believe are most likely to succeed and thrive in the program.</p>
                    </div>

                    <h4>Catch-up Courses Available</h4>
                    <p class="note">Not all three courses can be taken together. At most one of MATH 2522 or CS 2240 may be taken for graduate credit.</p>
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
                </div>
            </section>

            <!-- Step 2: PhD Requirements -->
            <section>
                <h2><span class="step-number">Step 2</span> Your Destination</h2>
                <div class="destination-card">
                    <h3>Create and defend a PhD Dissertation</h3>
                    <p>Consisting of three or more peer-reviewed journal papers. There are many ways to reach this level.</p>
                </div>
            </section>

            <!-- Step 3: Common Core -->
            <section>
                <h2><span class="step-number">Step 3</span> Common Core Requirements</h2>
                <p class="core-description">Take the first course in each sequence (9 credits) and at least two accompanying second courses:</p>

                <div class="sequence-cards">
                    {#each coreSequences as seq, i}
                        <div class="sequence-card">
                            <h3>Option {i + 1}: {seq.name}</h3>
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
                <p class="note"><em>Each course scores 3 credits.</em></p>
            </section>

            <!-- Step 4: Credit Requirements -->
            <section>
                <h2><span class="step-number">Step 4</span> Notch up 75 or more credits total</h2>
                <div class="credit-requirements">
                    <div class="credit-card">
                        <h3>Minimum Requirements</h3>
                        <ul>
                            <li><strong>75 credits total</strong> of graduate study approved by your graduate studies committee</li>
                            <li><strong>30 credits minimum</strong> of research</li>
                            <li><strong>30 credits minimum</strong> of graduate coursework</li>
                            <li><strong>15 credits minimum</strong> must be graded (B- or above)</li>
                        </ul>
                    </div>
                    <div class="credit-card">
                        <h3>Transfer Credits and GPA</h3>
                        <p>Students may transfer credits from other universities or within UVM following standard UVM policies.</p>
                        <p><strong>Minimum GPA to graduate:</strong> 3.0</p>
                        <p class="warning">Students with two grades below B are eligible for dismissal.</p>
                    </div>
                </div>
            </section>

            <!-- Step 5: Electives -->
            <section>
                <h2><span class="step-number">Step 5</span> Complex Systems and Data Science Electives</h2>

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
                            <li>Statistical Methods (STAT 3210)</li>
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
            </section>

            <!-- Step 6: Optional Elective Paths -->
            <section>
                <h2><span class="step-number">Step 6</span> Optional Elective Paths to Tailor Your PhD</h2>

                <div class="specialized-paths">
                    <div class="specialized-path-card">
                        <h3>Energy Systems</h3>
                        <p><strong>Domain Consultant:</strong>
                            <a href="https://www.uvm.edu/cems/ebe/profile/mads-almassalkhi" target="_blank" rel="noopener noreferrer">
                                Mads Almassalkhi
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
                        <h3>Biomedical Systems</h3>
                        <p><strong>Domain Consultant:</strong>
                            <a href="https://comis.med.uvm.edu/bioviewer/WebBio.aspx?BioID=22694" target="_blank" rel="noopener noreferrer">
                                Jason Bates
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
                        <h3>Policy Systems</h3>
                        <p><strong>Domain Consultant:</strong>
                            <a href="https://www.uvm.edu/cals/cdae/profile/asim-zia" target="_blank" rel="noopener noreferrer">
                                Asim Zia
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                    <div class="specialized-path-card">
                        <h3>Distributed Systems</h3>
                        <p><strong>Domain Consultant:</strong>
                            <a href="https://www.uvm.edu/cems/cs/profile/christian-skalka" target="_blank" rel="noopener noreferrer">
                                Chris Skalka
                                <ExternalLink size={14} />
                            </a></p>
                    </div>
                </div>
            </section>

            <!-- Step 7: Five Stages -->
            <section>
                <h2><span class="step-number">Step 7</span> Five Stages to Acquire Corvid Cleverness</h2>

                <div class="stages-content">
                    <h3>Stages 1-2: Coursework and Exams</h3>
                    <ul class="stages-list">
                        <li>{phdStages[0]}</li>
                        <li>{phdStages[1]}</li>
                    </ul>
                    <p class="note">For example, the exams might cover the content found in CSYS 6701, CSYS 6020, and STAT 6870. Students need not have taken all core classes prior to sitting for a particular exam, and the exams need not be taken on the same day. A follow-up oral exam could be scheduled to address material the student failed to demonstrate mastery of during the written exam.</p>

                    <h3>Stages 3-5: Research and Dissertation</h3>
                    <ul class="stages-list">
                        <li>{phdStages[2]}</li>
                        <li>{phdStages[3]}. These publications must be deemed of sufficient breadth, depth, and quality by their Graduate Studies Committee.</li>
                        <li>{phdStages[4]}</li>
                    </ul>
                </div>
            </section>

            <!-- Application Details -->
            <section>
                <h2>How to Apply</h2>
                <div class="application-grid">
                    <div class="app-detail">
                        <div class="app-label">Deadline</div>
                        <div class="app-value">February 15 for Fall admission</div>
                    </div>
                    <div class="app-detail">
                        <div class="app-label">Requirements</div>
                        <div class="app-value">Bachelor's degree (Master's preferred)<br>Relevant coursework or competency</div>
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
                        <div class="app-label">Program Director</div>
                        <div class="app-value">Professor
                            <a href="https://www.uvm.edu/cems/cs/profile/laurent-hebert-dufresne" target="_blank" rel="noopener noreferrer">
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

                <div class="advisor-note">
                    <h4>Important Notes</h4>
                    <p><strong>Start Term:</strong> Students may not start in the Spring.</p>
                    <p><strong>Faculty Advisor:</strong> We recommend prospective students identify a faculty advisor in advance.</p>
                    <p><strong>International Students:</strong> Will need to apply well in advance taking into consideration visa processes.</p>
                    <p><strong>Funding:</strong> Limited funding opportunities are available.</p>
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

     .section-header-with-image {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .section-image {
        width: 25rem;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        transform: translateY(1rem);
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
        margin-top: 1.5rem;
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

    .warning {
        color: #b8860b;
        font-weight: 600;
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

    ul.stages-list {
        font-family: var(--serif);
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: decimal;
        margin-bottom: 2rem;
    }

    ul.stages-list li {
        margin-bottom: 1rem;
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

    .overview-card p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    .overview-card p:last-child {
        margin-bottom: 0;
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

    /* Course Cards */
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

    /* Destination Card */
    .destination-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        text-align: center;
    }

    .destination-card h3 {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    :global(.dark) .destination-card {
        background: #f5f5f5;
    }

    /* Sequence Cards */
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

    /* Credit Requirements */
    .credit-requirements {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 1.5rem;
    }

    .credit-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
    }

    .credit-card h3 {
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    .credit-card ul {
        font-family: var(--serif);
        padding-left: 1.5rem;
        list-style-type: disc;
        margin: 0;
    }

    .credit-card li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
    }

    .credit-card p {
        margin-bottom: 0.75rem;
    }

    .credit-card p:last-child {
        margin-bottom: 0;
    }

    :global(.dark) .credit-card {
        background: #f5f5f5;
    }

    /* Details/Summary */
    details.electives-details {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
    }

    :global(.dark) details.electives-details {
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

    .electives-list {
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
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
    }

    .specialized-path-card a:hover {
        text-decoration: underline;
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

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        .section-image {
            width: 200px;
            transform: translateX(-5%);
        }

        h2 {
            font-size: 1.5rem;
            flex-direction: column;
            align-items: flex-start;
        }

        .course-cards,
        .sequence-cards,
        .application-grid,
        .overview-cards,
        .skills-grid,
        .specialized-paths,
        .credit-requirements {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .electives-list ul {
            column-count: 1;
        }

        .mission-statement {
            font-size: 1.1rem;
        }
    }
</style>
