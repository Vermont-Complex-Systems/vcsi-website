<script>
    import Meta from "$lib/components/Meta.svelte";

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Graduate Certificate in Complex Systems"
  description="5-course booster pack in Complex Systems and Data Science for graduate and post-baccalaureate students."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Graduate Certificate in Complex Systems</h1>
                <p class="intro">A five-course booster pack in Complex Systems and Data Science designed for graduate students across UVM and post-baccalaureate students seeking specialized expertise.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/certificate.png" alt="Certificate" class="page-header-image" />
            </div>
        </div>
        
        <div class="program-content">
            <section>
                <h2>Program Overview</h2>
                <p>The Graduate Certificate in Complex Systems is a focused 15-credit program (5 courses) that provides comprehensive training in complex systems theory and data science applications. Students maintain a minimum 3.0 GPA throughout the program.</p>
            </section>
            
            <section>
                <h2>Target Audience</h2>
                <ul>
                    <li><strong>Graduate students</strong> across the University of Vermont</li>
                    <li><strong>Post-baccalaureate students</strong> (online or in-person)</li>
                    <li><strong>Working professionals</strong> seeking specialized expertise</li>
                </ul>
            </section>
            
            <section>
                <h2>Prerequisites</h2>
                <ul>
                    <li><strong>Bachelor's degree</strong></li>
                    <li><strong>Calculus</strong> proficiency</li>
                    <li><strong>Probability and statistics</strong> background</li>
                    <li><strong>Computer programming</strong> skills (Python, R, or Matlab preferred)</li>
                </ul>
            </section>
            
            <section>
                <h2>Program Structure</h2>
                <p>Students complete 5 courses (15 credits) with two possible configurations:</p>
                
                <h3>Configuration Option 1</h3>
                <ul>
                    <li>3 required core courses</li>
                    <li>1-2 A-list elective courses</li>
                    <li>0-2 B-list elective courses</li>
                </ul>
                
                <h3>Configuration Option 2</h3>
                <ul>
                    <li>2 required core courses</li>
                    <li>1-3 A-list elective courses</li>
                    <li>0-2 B-list elective courses</li>
                </ul>
            </section>
            
            <section>
                <h2>Required Core Courses</h2>
                <ul>
                    <li><strong>CSYS/MATH 6701:</strong> Principles of Complex Systems</li>
                    <li><strong>CSYS/CS 6020:</strong> Modeling Complex Systems</li>
                    <li><strong>CSYS/STAT/CS 5870:</strong> Data Science I - Experience</li>
                </ul>
            </section>
            
            <section>
                <h2>Elective Courses</h2>
                <ul>
                    <li><strong>A-List Courses:</strong> Chaos, Complex Networks, Evolutionary Computation, and other specialized topics</li>
                    <li><strong>B-List Courses:</strong> Diverse range from Machine Learning to Environmental Modeling</li>
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
    
    section {
        margin-bottom: 2rem;
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