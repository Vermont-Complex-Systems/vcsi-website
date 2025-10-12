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
  title="Paper Shredder"
  description="A Reading (with Optional Rending) of Journal Papers Group."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>Paper Shredder</h1>
            <p class="intro">A Reading (with Optional Rending) of Journal Papers Group.</p>
        </div>
        <div class="page-header-logo">
            <img src="/common/assets/logos/shredder@2x.jpg" alt="Paper Shredder" class="page-header-image" />
        </div>
    </div>
    
    <div class="program-content">
        <section class="section-with-image-left">
            <div class="section-content">
                <h2>Mission</h2>
                <p>Every two (or three or four) weeks, and in the grand tradition of courageous academics everywhere, we review the painstaking, meticulous work of others not present to defend themselves. Pure of motivation, we endeavor to instantly and yet casually see where the paper obviously goes wrong and how work we did 15 years ago contains the entire paper's thesis as a footnote on page 17. Finally, based on a loudness of ritualistic chant measure, we decide whether the paper lives to be read again, or dies by shredding, cited nevermore.</p>
            </div>
            <div class="section-image">
                <img src="/common/assets/drawing/pages_flying.png" alt="Pages flying illustration" class="section-drawing"/>
            </div>
        </section>

    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }

        .intro {
            margin-bottom: 0;
        }
    }
</style>