<script>
    import Meta from "$lib/components/Meta.svelte";
    import CourseTooltip from "$lib/components/CourseTooltip.svelte";

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
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
                <p class="intro">Train to become a deeply skilled and ethical research data scientist in a pan-disciplinary environment focused on solving complex, data-rich problems.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/phd.png" alt="PhD degree" class="page-header-image" style="width: 25rem; height: 25rem;" />
            </div>
        </div>
        
        <div class="program-content">
            <section>
                <h2>Program Overview</h2>
                <p>The PhD in Complex Systems and Data Science requires 75+ total graduate credits and emphasizes collaborative research skills in solving complex, data-rich problems. Students work in a pan-disciplinary research environment with opportunities for specialized research paths.</p>
            </section>
            
            <section class="section-with-image">
                <div class="section-content">
                    <h2>Admission Requirements</h2>
                    <ul>
                        <li><strong>Bachelor's degree</strong> (Master's preferred)</li>
                        <li><strong>Prior coursework in:</strong>
                            <ul>
                                <li>Calculus</li>
                                <li>Coding (Python/R ideal)</li>
                                <li>Data structures</li>
                                <li>Linear algebra</li>
                                <li>Probability and Statistics</li>
                            </ul>
                        </li>
                        <li><strong>No GRE required</strong></li>
                        <li><strong>International students:</strong> TOEFL 90+ (100+ for funding)</li>
                    </ul>
                </div>
                <div class="section-image" style="padding-top: 3rem;">
                    <img src="/common/assets/drawing/crow08.png" alt="Crow illustration" class="section-drawing" />
                </div>
            </section>
            
            <section>
                <h2>Program Structure</h2>
                <ul>
                    <li><strong>Total credits:</strong> 75+ graduate credits</li>
                    <li><strong>Research:</strong> Minimum 30 credits</li>
                    <li><strong>Coursework:</strong> Minimum 30 credits</li>
                    <li><strong>GPA requirement:</strong> 3.0 minimum to graduate</li>
                </ul>
            </section>
            
            <section class="section-with-image">
                <div class="section-content">
                    <h2>Core Coursework</h2>
                    <p>Students complete 9 credits in Common Core sequences:</p>
                    <ul>
                        <li><CourseTooltip crn="93652">CSYS/STAT/CS 5870: Data Science I - Experience</CourseTooltip></li>
                        <li><CourseTooltip crn="94549">CSYS/CS 6020: Modeling Complex Systems I</CourseTooltip></li>
                        <li><CourseTooltip crn="92543">CSYS/MATH 6701: Principles of Complex Systems</CourseTooltip></li>
                    </ul>
                </div>
                <div class="section-image">
                    <img src="/common/assets/drawing/crow05.png" alt="Crow illustration" class="section-drawing"/>
                </div>
            </section>
            
            <section>
                <h2>Research Requirements</h2>
                <ul>
                    <li><strong>Dissertation:</strong> Must include three or more peer-reviewed journal papers</li>
                    <li><strong>Comprehensive written exams</strong> in three subjects</li>
                    <li><strong>Dissertation proposal defense</strong></li>
                    <li><strong>Oral dissertation defense</strong></li>
                </ul>
            </section>
            
            <section>
                <h2>Specialized Research Paths</h2>
                <p>Optional elective paths available in:</p>
                <ul>
                    <li>Energy Systems</li>
                    <li>Evolutionary Robotics</li>
                    <li>Biomedical Systems</li>
                    <li>Environmental Systems</li>
                    <li>Policy Systems</li>
                    <li>Distributed Systems</li>
                </ul>
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
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }
    
    
    .program-content {
        max-width: 800px;
    }
    
    
    p {
        font-size: 1rem;
        line-height: 1.6;
        font-family: var(--serif);
        color: var(--color-fg);
    }
    
    ul {
        font-family: var(--serif);
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: disc;
    }
    
    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
    }
</style>