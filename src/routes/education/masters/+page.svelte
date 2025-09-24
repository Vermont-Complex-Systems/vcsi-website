<script>
    import Meta from "$lib/components/Meta.svelte";

    const preloadFont = [
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
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
            <section>
                <h2>Program Overview</h2>
                <p>The Masters in Complex Systems and Data Science (CSDS) is a 30-credit hour program designed to develop versatile data scientists. Students gain expertise in data wrangling, visualization, machine learning, and understanding complex system mechanisms through hands-on experience with real-world problems.</p>
            </section>
            
            <section>
                <h2>Degree Options</h2>
                <ul>
                    <li><strong>2-year stand-alone degree</strong> for all students</li>
                    <li><strong>1-year Accelerated Masters</strong> for UVM undergraduates</li>
                    <li><strong>Three completion paths:</strong> Coursework only, Coursework + Project, or Coursework + Thesis</li>
                </ul>
            </section>
            
            <section>
                <h2>Core Curriculum</h2>
                <h3>Required Core Courses (9 credits)</h3>
                <ul>
                    <li><strong>Data Science I</strong> (CSYS/CS/STAT 5870)</li>
                    <li><strong>Modeling Complex Systems</strong> (CSYS/CS 6020)</li>
                    <li><strong>Principles of Complex Systems 1</strong> (CSYS/MATH 6701)</li>
                </ul>
                
                <h3>Electives (9 credits)</h3>
                <p>Choose from 19+ courses across Complex Systems, Data Science, Statistics, and Computer Science. Optional domain-specific paths include:</p>
                <ul>
                    <li>Biomedical Systems</li>
                    <li>Energy Systems</li>
                    <li>Environmental Systems</li>
                    <li>Evolutionary Robotics</li>
                    <li>Policy Systems</li>
                </ul>
            </section>
            
            <section>
                <h2>Admission Requirements</h2>
                <ul>
                    <li><strong>Prerequisites:</strong> Calculus, Coding (Python/R preferred), Data structures, Linear algebra, Probability/Statistics</li>
                    <li><strong>Catch-up courses</strong> available for missing prerequisites</li>
                    <li><strong>No GRE required</strong></li>
                    <li><strong>International students:</strong> TOEFL minimum 90 (100 for teaching positions)</li>
                    <li><strong>Application deadline:</strong> February 15</li>
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