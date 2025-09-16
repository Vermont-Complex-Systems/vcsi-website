<script>
    import Meta from "$lib/components/Meta.svelte";

    const preloadFont = [
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://pudding.cool/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Lived Experiences Measured Using Rings Study (LEMURS)"
  description="A longitudinal experiment exploring health interventions through a partnership with Oura ring technology."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>Lived Experiences Measured Using Rings Study (LEMURS)</h1>
            <p class="intro">Exploring health interventions through a partnership with Oura ring technology, studying the wellness behaviors of University of Vermont students.</p>
        </div>
        <div class="page-header-logo">
            <img src="/common/assets/drawing/lemur02.png" alt="LEMURS Study" class="page-header-image" />
        </div>
    </div>
    
    <div class="content">
        
        <section>
            <h2>Study Overview</h2>
            <p>At the start of Fall 2022, the Lived Experiences Measured Using Rings Study (LEMURS) recruited a cohort of more than 600 first-year students at the University of Vermont to take part in a longitudinal experiment incentivizing healthy behaviors. During the Fall of 2022, we assessed changes in students' sleep, stress, mental health, and other outcomes through a series of weekly surveys. We also monitored heart-rate (HR), sleep, and activity continuously in this cohort using Oura rings.</p>
            
            <p>In Spring 2023, we randomized students into four groups of 150:</p>
            <ul>
                <li><strong>Exercise</strong> - Physical activity interventions</li>
                <li><strong>Nature Experiences</strong> - Outdoor and nature-based wellness activities</li>
                <li><strong>Group Therapy</strong> - Structured therapeutic group sessions</li>
                <li><strong>Self-Monitoring</strong> - Individual wellness tracking and reflection</li>
            </ul>
            
            <p>Students were engaged in these wellness interventions and completed weekly surveys via a bespoke mobile application platform developed in Fall 2022.</p>
        </section>
        
        <section>
            <h2>Research Findings</h2>
            <p>Using over 10 million heart-rate and activity measurements over a 6-month period, we've begun to identify intriguing patterns in the survey and Oura ring data that advance our understanding of relationships between well-being, health, cardiac activity, and sleep.</p>
            
            <p>College students are at high-risk for mental-health related challenges—determining which objective markers from a popular consumer wearable are associated with stress and anxiety provides opportunities to identify specifically who is at risk, and intervene at scale in real time.</p>
        </section>
        
        <section>
            <h2>Contact & Resources</h2>
            <p>Please contact <a href="mailto:lemurs.study@uvm.edu">lemurs.study@uvm.edu</a> if you have questions.</p>
            
            <div class="resources">
                <ul>
                    <li><a href="https://storylab.w3.uvm.edu/lemurs/lemurs-app-terms-of-use.pdf" target="_blank" rel="noopener noreferrer">LEMURS Study App Terms and Conditions</a></li>
                    <li><a href="https://storylab.w3.uvm.edu/lemurs/lemurs-app-privacy-policy.pdf" target="_blank" rel="noopener noreferrer">LEMURS Study App Privacy Policy</a></li>
                </ul>
            </div>
        </section>
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    
    h1 {
        font-size: 3rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
    }
    
    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }
    
    .intro {
        font-size: 1.25rem;
        font-family: var(--serif);
        color: var(--color-gray-600);
        margin-bottom: 3rem;
    }
    
    .content {
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
        margin-bottom: 1rem;
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
    
    a {
        color: var(--color-accent);
        text-decoration: underline;
    }
    
    a:hover {
        color: var(--color-accent-hover);
    }
    
    .resources {
        margin-top: 1rem;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        
        h1 {
            font-size: 2rem;
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
        .intro {
            font-size: 1.1rem;
        }
    }
</style>