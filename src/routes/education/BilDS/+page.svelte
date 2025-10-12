<script>
    import Meta from "$lib/components/Meta.svelte";
    import { ExternalLink } from '@lucide/svelte';
    import miscData from '$data/misc.csv';
    import MemberCards from "$lib/components/MemberCards.svelte";

    const entry = miscData.find(p => p.id === 'bilds');

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="Bilds"
  description="The UVM BilDS program (formerly known as the Quantitative Evolutionary STEM Training (QuEST) program), is an innovative and evidence-based model for transforming STEM graduate education training. Emerging infectious diseases, antibiotic and pesticide resistance, reduced crop yields caused by climate extremes and shifts, and the loss of biodiversity affect environmental and global health and food security. In each case, identification of successful solutions to these global challenges requires a fundamental knowledge of biological principles. BilDS gives our graduate students the skills and experience to tackle these problems.."
  {preloadFont}
/>

<div class="program">
    <div class="content-wrapper">
        <div class="page-header">
            <div class="page-header-text">
                <h1>Biological Data Science (BilDS) Program</h1>
                <p class="intro">The BilDS program provides doctoral students with the skills, knowledge, and competencies needed to solve environmental and global health problems in an ever-changing workforce and research environment.</p>
                {#if entry?.url}
                    <a href={entry.url} target="_blank" rel="noopener noreferrer" class="external-link">
                        Visit the BiLDS website <ExternalLink size={18} />
                    </a>
                {/if}
            </div>
            <div class="page-header-logo">
                <img src="/common/assets/logos/bilds.webp" alt="Bilds" class="page-header-image" />
            </div>
        </div>
        
        <div class="program-content">
            <section>
                <h2>Program Overview</h2>
                <p>The UVM BilDS program (formerly known as the Quantitative Evolutionary STEM Training (QuEST) program), is an innovative and evidence-based model for transforming STEM graduate education training. Emerging infectious diseases, antibiotic and pesticide resistance, reduced crop yields caused by climate extremes and shifts, and the loss of biodiversity affect environmental and global health and food security. In each case, identification of successful solutions to these global challenges requires a fundamental knowledge of biological principles. BilDS gives our graduate students the skills and experience to tackle these problems.</p>
            </section>

            <section>
                {#if entry?.member}
                    <MemberCards memberIds={entry.member} />
                {/if}
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