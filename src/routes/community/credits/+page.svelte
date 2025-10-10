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

<svelte:head>
    <style>
        /* Light mode: default background */
        .header {
            background: var(--color-bg) !important;
        }
        .header.scrolled {
            background: var(--color-bg) !important;
        }
        /* Dark mode: transparent header to show collage */
        .dark .header {
            background: transparent !important;
        }
        .dark .header.scrolled {
            background: whitesmoke !important;
        }
    </style>
</svelte:head>

<Meta 
  title="Credits"
  description="Acknowledgments and credits for the VCSI website and community."
  {preloadFont}
/>

<div class="page-background"></div>
<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-logo">
            <img src="/common/assets/members/rob-babboni.jpg" alt="rob-flying" class="page-header-image" />
        </div>
        <div class="page-header-text">
            <h2>Mascots and random elements are furnished by the wonderful Rob Babboni.</h2>
            <p class="intro"><a href=https://www.robertbabboni.com>Robert Babboni</a> is an award-winning print and digital illustrator and motion graphic artist who has been creating works for magazines, newspapers, digital and print publishers since 1993. He received his BFA in Illustration in 1993 and MFA in Computer Art with a concentration in digital publishing in 2015, both from the School of Visual Arts in New York City. Babboni has created illustrations for books and articles in both print and digital media with a client list that includes The Wall Street Journal, Business Week, Fast Co, Forbes, Penguin Group, Rolling Stone, and The Washington Post. His work has been exhibited in New York City at the Society of Illustrators, the Art Directors Club, the Visual Arts Museum, and American Illustration Annual Exhibitions. Whether in print or digital media, Babboni's illustrations never fail to elevate diverse narratives into thought-provoking visual tableaux that resonate emotionally.</p>
        </div>
    </div>
</div>

<style>

    .page-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: none;
        background-size: cover;
        background-position: top center;
        background-repeat: no-repeat;
        z-index: -1;
        pointer-events: none;
        opacity: 0.5;
    }

    :global(.dark) .page-background {
        background-image: url('/common/assets/drawing/collage-background-desktop.png?v=5');
    }

    @media (max-width: 1024px) {
        :global(.dark) .page-background {
            background-image: url('/common/assets/drawing/collage-background-tablet.png?v=3');
        }
    }

    @media (max-width: 768px) {
        :global(.dark) .page-background {
            background-image: url('/common/assets/drawing/collage-background-mobile.png?v=3');
        }
    }

    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
        position: relative;
        z-index: 1;
    }
    
    .intro {
        max-width: 80%;
        font-size: var(--font-size-small) !important;
        color: black !important;
    }
    
    h2 {
        font-size: 1.8rem;
        font-weight: 600;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 0;
        max-width: 80%;
    }

    p {
        font-size: 1rem;
        line-height: 1.6;
        font-family: var(--serif);
        color: var(--color-fg);
    }

    /* Aligned on the p tag: h2 font-size + h2 margin-bottom + gap*/
    .page-header-image {
        margin-top: calc(4.6rem) !important;
    }

    .page-header {
        display: flex;
        align-items: start;
        gap: 2rem;
    }

    .page-header-text {
        display: flex;
        text-align: left;
        flex-direction: column;
        max-width: 100%;
        gap: 1rem;
        flex: 1;
    }

    .page-header-logo {
        flex-shrink: 0;
    }


    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }

        .page-header {
            flex-direction: column;
            gap: 0;
        }

        .page-header-text {
            display: contents;
        }

        .page-header-text h2 {
            order: 1;
            margin-bottom: 0;
        }

        .page-header-logo {
            order: 2;
        }

        .page-header-text .intro {
            order: 3;
        }

        .page-header-image {
            transform: none;
            margin-top: 1rem !important;
            margin-bottom: 1rem;
        }
    }
</style>