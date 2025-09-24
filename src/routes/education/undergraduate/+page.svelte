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
  title="Undergraduate Degree in Data Science"
  description="BS in Data Science - Joint program between Mathematics & Statistics and Computer Science at UVM."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Undergraduate Degree in Data Science</h1>
                <p class="intro">A joint program between the Department of Mathematics and Statistics and the Department of Computer Science, providing a broad foundation for students pursuing careers in data-rich environments.</p>
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/bachelors.png" alt="Bachelor's degree" class="page-header-image" />
            </div>
        </div>
        
        <div class="program-content">
            <section>
                <h2>Program Overview</h2>
                <p>The Undergraduate Degree in Data Science is housed in the College of Engineering and Mathematical Sciences and offers students comprehensive training in data science fundamentals. This interdisciplinary program bridges mathematics, statistics, and computer science to prepare students for the growing field of data science.</p>
            </section>
            
            <section>
                <h2>Key Features</h2>
                <ul>
                    <li><strong>4+1 Accelerated Masters Pathway:</strong> Students can pursue an accelerated path to a Master's degree in Complex Systems and Data Science</li>
                    <li><strong>Interdisciplinary Approach:</strong> Joint program combining expertise from Mathematics, Statistics, and Computer Science</li>
                    <li><strong>Career Preparation:</strong> Designed to prepare students for diverse career opportunities in data-rich venues</li>
                    <li><strong>Research Opportunities:</strong> Access to faculty research in complex systems and data science</li>
                </ul>
            </section>
            
            <section>
                <h2>Learn More</h2>
                <p>For detailed curriculum information and admission requirements, visit the official <a href="https://www.uvm.edu/cems/program/bs-data-science" target="_blank" rel="noopener noreferrer">BS Data Science program page</a>.</p>
                <p>Interested in the accelerated masters pathway? Learn more about <a href="https://www.uvm.edu/cems/accelerated_masters_programs" target="_blank" rel="noopener noreferrer">UVM's Accelerated Masters Programs</a>.</p>
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