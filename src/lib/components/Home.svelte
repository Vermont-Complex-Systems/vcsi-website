<script>
    import { base } from '$app/paths';
    import DotsToImage from './DotsToImage.svelte';
    import { ArrowRight } from '@lucide/svelte';
</script>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-inner">
        <div class="hero-text">
            <h1>Describe, Explain, Create, Share.</h1>
            <p>The Vermont Complex Systems Institute is a post-disciplinary organization working on real-world, data-rich, and meaningful complex systems problems of all kinds.</p>
        </div>
        <DotsToImage imgFilePath={`${base}/favicon.jpg`} />
    </div>
</section>

<hr class="section-divider">

<!-- Features Section -->
<section class="features-section">
    <div class="features-header">
        <h2>Nutshellfully</h2>
    </div>

    <div class="features-grid">
        <div class="feature-card post-disciplinary">
            <img
                src="{base}/common/assets/drawing/otter01.png"
                alt="Otter Drawing"
                style="transform: translate(-30px, -30px);"/>
            <div class="card-content">
                <p style="margin-top: -45px;">Nurturing collaborations taking a post-disciplinary perspective, leverage computational tools.</p>
            </div>
        </div>

        <div class="feature-card methods">
            <div class="card-content">
                <img
                    src="{base}/common/assets/drawing/roboctopus01.jpg"
                    alt="Roboctopus Drawing"
                />
                <p style="margin-top: 25px;">Integrating surveys, experiments, simulations, and theory to tackle complex problems.</p>
            </div>
        </div>

        <div class="feature-card scale and scope">
            <img
                src="{base}/common/assets/drawing/hedonometer_logo_small.png"
                alt="Hedonometer"
            />
            <div class="card-content">
                <p style="margin-top: 25px;">Bird's-eye view meets qualitative approaches and measurements, making the best of both worlds.</p>
            </div>
        </div>

        <div class="feature-card impact">
            <img
                src="{base}/common/assets/drawing/mce-lab.png"
                alt="mce-lab"
                style="transform: translate(30px, 50px) scaleX(-1);;"
            />
            <div class="card-content">
                <p style="margin-top:100px;">Translating complex data into actionable insights that inform policymakers, healthcare providers, and communities.</p>
            </div>
        </div>
    </div>
</section>

<div class="separator-wrapper">
    <img
        src="{base}/common/assets/drawing/tentacle.png"
        alt="Tentacle Drawing"
        class="tentacle-image"
    />
    <hr>
</div>

<!-- Learning Section -->
<section class="learning-section">
    <div class="learning-header">
        <div class="learning-header-text">
            <h2>Scales of learning</h2>
            <p>Learning the tools of complexity</p>
        </div>
        <img
            src="{base}/common/assets/drawing/paws02.png"
            alt="Paws Drawing"
            class="learning-header-image"
        />
    </div>

    <div class="learning-grid">
        <a href="{base}/education/undergraduate" class="learning-card undergraduate">
            <img
                src="{base}/common/assets/drawing/squirrel-small-01@2x.png"
                alt="Squirrel Drawing" />
            <div class="card-content">
                <p style="margin-top: 15px;">Obtain squirrel mind. Learn more about the joint program of the Department of Mathematics and Statistics and the Department of Computer Science.</p>
                <ArrowRight class="learn-more-arrow" size="24" />
            </div>
        </a>

        <a href="{base}/education/certificate" class="learning-card certificate">
            <div class="card-content">
                <img
                    src="{base}/common/assets/drawing/platypus.png"
                    alt="Platypus Drawing"
                />
                <p style="margin-top: 15px;">For curious platypuses. Learn more about our broadest educational program at the graduate level—now available online!</p>
                <ArrowRight class="learn-more-arrow" size="24" />
            </div>
        </a>

        <a href="{base}/education/masters" class="learning-card masters">
            <img
                src="{base}/common/assets/drawing/fox03.png"
                alt="Hedonometer"
            />
            <div class="card-content">
                <p style="margin-top: 15px;">Become the fox. Learn more about our newest educational program.</p>
                <ArrowRight class="learn-more-arrow" size="24" />
            </div>
        </a>

        <a href="{base}/education/phd" class="learning-card phd">
            <img
                src="{base}/common/assets/drawing/crow02.png"
                alt="mce-lab"
                style="transform: translate(0, 50px);"
            />
            <div class="card-content">
                <p style="margin-top:90px;">Earn crow-level cleverness. Learn more about our plans.</p>
                <ArrowRight class="learn-more-arrow" size="24" />
            </div>
        </a>
    </div>
</section>

<style>
    /* ---------------- Hero Section ---------------- */
    .hero {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - var(--nav-height));
    }

    .hero-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
        width: 100%;
    }

    .hero-text {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 55%;
    }

    .hero-text h1 {
        font-size: clamp(2.5rem, 6vw, 4.5rem);
        font-weight: 400;
        font-family: var(--serif);
        margin: 0;
    }

    .hero-text p {
        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
        font-family: var(--serif);
        margin: 0;
        color: var(--color-gray-700);
    }

    /* ---------------- Section Dividers ---------------- */
    .section-divider {
        max-width: var(--page-max-width);
        margin: 4rem auto;
        border: none;
        border-bottom: 1px solid var(--color-gray-300);
    }

    .separator-wrapper {
        position: relative;
        max-width: var(--page-max-width);
        margin: 0 auto;
        padding: 0 var(--page-padding);
    }

    .separator-wrapper hr {
        margin-top: 8rem;
        margin-bottom: 4rem;
        border: none;
        border-bottom: 1px solid var(--color-gray-300);
    }

    .tentacle-image {
        position: absolute;
        right: var(--page-padding);
        width: 200px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        transform: translateX(80%) translateY(-95%);
        z-index: 1;
    }

    /* ---------------- Features Section ---------------- */
    .features-section {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .features-header {
        text-align: left;
        margin-bottom: 3rem;
    }

    .features-header h2 {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 400;
        font-family: var(--serif);
        margin: 0;
        color: var(--color-fg);
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }

    .feature-card {
        background: #fafafa;
        border: 2px solid #4a4a4a;
        border-radius: var(--border-radius);
        padding: 2rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        height: 420px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: hidden;
    }

    .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    :global(.dark) .feature-card {
        background: #f5f5f5;
        border-color: #4a4a4a;
    }

    .feature-card p {
        font-family: var(--serif);
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
        color: var(--color-gray-700);
    }

    .feature-card img {
        width: 180px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        display: block;
        margin: 0 auto;
    }

    /* ---------------- Learning Section ---------------- */
    .learning-section {
        padding-top: 2rem;
        padding-bottom: 4rem;
    }

    .learning-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        margin-bottom: 3rem;
        gap: 0;
    }

    .learning-header-text {
        flex: 1;
    }

    .learning-header h2 {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 400;
        font-family: var(--serif);
        margin: 0 0 1rem 0;
        color: var(--color-fg);
    }

    .learning-header-image {
        width: 25rem;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
        flex-shrink: 0;
        transform: rotate(20deg) translateX(8rem) translateY(-5rem);
    }

    .learning-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }

    .learning-card {
        padding: 2rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        position: relative;
        overflow: hidden;
    }

    .learning-card img {
        width: 180px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
    }

    .learning-card.certificate img {
        margin-right: 3rem;
    }

    .learning-card.masters,
    .learning-card.phd {
        align-items: center;
        text-align: left;
    }

    .learning-card p {
        font-size: 1rem;
    }

    .card-content {
        position: relative;
        flex: 1;
    }

    .learning-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    /* Learn more arrow styling */
    :global(.learn-more-arrow) {
        color: var(--color-primary, #007acc);
        transition: transform 0.2s ease, color 0.2s ease;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .learning-card:hover :global(.learn-more-arrow) {
        transform: translateX(4px);
        color: var(--color-primary-hover, #005fa3);
    }

    /* ---------------- Responsive ---------------- */
    @media (max-width: 1200px) {
        .features-grid,
        .learning-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .hero {
            min-height: auto;
            padding: 3rem var(--page-padding);

        }

        .hero-inner {
            flex-direction: column;
            gap: 2rem;
            text-align: left;
        }

        .hero-text {
            max-width: 100%;
        }

        .features-grid,
        .learning-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            justify-items: center;
        }

        .feature-card {
            padding: 1.5rem;
            max-width: 300px;
            width: 100%;
        }

        .feature-card p,
        .learning-card p {
            font-size: 1.3rem;
        }

        .learning-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .learning-header-image {
            width: 20rem;
            transform: rotate(4deg) translateX(-1rem) translateY(2rem);
        }

        .learning-card {
            padding: 1.5rem;
        }

        .learning-card.certificate img {
            margin-left: 4rem;
        }

        .tentacle-image {
            width: 170px;
            transform: translateY(-95%);
        }
    }
</style>
