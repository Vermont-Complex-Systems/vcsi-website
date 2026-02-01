<script>
    import Meta from "$lib/components/Meta.svelte";

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
  
/>

<div class="page-background"></div>
<div class="page-header">
    <h2>Mascots and random elements are furnished by the wonderful Rob Babboni.</h2>
    <div class="page-header-logo">
        <img src="/common/assets/members/rob-babboni.jpg" alt="rob-flying" class="page-header-image" />
    </div>
    <p class="intro"><a href=https://www.robertbabboni.com>Robert Babboni</a> is an award-winning print and digital illustrator and motion graphic artist who has been creating works for magazines, newspapers, digital and print publishers since 1993. He received his BFA in Illustration in 1993 and MFA in Computer Art with a concentration in digital publishing in 2015, both from the School of Visual Arts in New York City. Babboni has created illustrations for books and articles in both print and digital media with a client list that includes The Wall Street Journal, Business Week, Fast Co, Forbes, Penguin Group, Rolling Stone, and The Washington Post. His work has been exhibited in New York City at the Society of Illustrators, the Art Directors Club, the Visual Arts Museum, and American Illustration Annual Exhibitions. Whether in print or digital media, Babboni's illustrations never fail to elevate diverse narratives into thought-provoking visual tableaux that resonate emotionally.</p>
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

    
    .intro {
        max-width: 80%;
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
        margin-top: calc(4.6rem);
    }

    .page-header {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        gap: 1rem 2rem;
    }

    .page-header h2 {
        grid-column: 2;
        grid-row: 1;
    }

    .page-header-logo {
        grid-column: 1;
        grid-row: 1 / 3;
        align-self: start;
    }

    .page-header .intro {
        grid-column: 2;
        grid-row: 2;
    }


    /* Mobile layout: switch from 2-column grid to single column with order h2 → image → text */
    @media (max-width: 768px) {
        .page-header {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            row-gap: 1rem;
        }

        .page-header h2 {
            grid-column: 1;
            grid-row: 1;
            max-width: 100%;
        }

        .page-header-logo {
            grid-column: 1;
            grid-row: 2;
            margin-bottom: 1rem; /* Extra space between image and text */
        }

        .page-header .intro {
            grid-column: 1;
            grid-row: 3;
            max-width: 100%;
        }

        .page-header-image {
            margin-top: 0; /* Remove desktop alignment margin */
        }

        p {
            font-size: 1.2rem;
        }
    }
</style>