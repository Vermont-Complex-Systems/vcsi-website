<script>
    import { base } from '$app/paths';
    import SpinningDots from './SpinningDots.svelte';
</script>

<div class="content-wrapper">
    <div id="hero-section">
        <div class="hero-text">
            <h1>Describe, Explain,  Create, Share.</h1>
            <p>The Vermont Complex Systems Institute is a post-disciplinary organization working on real-world, data-rich, and meaningful complex systems problems of all kinds.</p>
        </div>
        <SpinningDots />
    </div>
</div>

<hr>

<section class="features-section">
    <div class="features-wrapper">
        <div class="features-header">
            <h2>Nutshellfully</h2>
        </div>
        
        <div class="features-grid">
            <div class="feature-card post-disciplinary">
                <img 
                    src="{base}/common/assets/drawing/otter01.png" 
                    alt="Roboctopus logo" 
                    style="transform: translate(-30px, -50px);"/>
                <div class="card-content">
                    <p style="margin-top: -55px;">Nurturing collaborations taking a post-disciplinary perspective, leverage computational tools.</p>
                </div>
            </div>
            
            <div class="feature-card methods">
                <div class="card-content">
                    <img 
                        src="{base}/common/assets/drawing/roboctopus01.jpg" 
                        alt="Roboctopus logo"
                    />
                    <p style="margin-top: 15px;">Integrating surveys, experiment, simulation, and theory to tackle complex problems.</p>
                </div>
            </div>
            
            <div class="feature-card scale and scope">
                <img 
                        src="{base}/common/assets/drawing/hedonometer_logo_small.png" 
                        alt="Hedonometer"
                    />
                <div class="card-content">
                    <p style="margin-top: 15px;">Birds-eye view meets qualitative approaches and measurements, making the best of both world.</p>
                </div>
            </div>
            
            <div class="feature-card impact">
                <img 
                        src="{base}/common/assets/drawing/mce-lab.png" 
                        alt="mce-lab"
                        style="transform: translate(0, 50px);"
                    />
                <div class="card-content">
                    <p style="margin-top:90px;">Translating complex data into actionable insights that inform policymakers, healthcare providers, and community.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<hr>

<section class="learning-section">
    <div class="learning-wrapper">
        <div class="learning-header">
            <h2>Scales of learning</h2>
            <p>Learning the tools of complexity</p>
        </div>
        
        <div class="learning-grid">
            <div class="learning-card undergraduate">
                <a href="{base}/education/undergraduate">
                    <img 
                        src="{base}/common/assets/drawing/squirrel-small-01@2x.png" 
                        alt="Squirrel logo" />
                </a>
                <div class="card-content">
                    <p>Obtain squirrel mind. Learn more about the joint program of the Department of Mathematics and Statistics and the Department of Computer Science.</p>
                </div>
            </div>
            
            <div class="learning-card certificate">
                <div class="card-content">
                    <a href="{base}/education/certificate">
                        <img 
                            src="{base}/common/assets/drawing/platypus.png" 
                            alt="Platypus logo"
                        />
                    </a>
                    <p style="margin-top: 15px;">For curious platypuses. Learn more about our broadest educational program at the graduate level—now available online!</p>
                </div>
            </div>
            
            <div class="learning-card masters">
                <a href="{base}/education/masters">
                    <img 
                            src="{base}/common/assets/drawing/fox03.png" 
                            alt="Hedonometer"
                        />
                </a>
                <div class="card-content">
                    <p style="margin-top: 15px;">Become the fox. Learn more about our newest educational program.</p>
                </div>
            </div>
            
            <div class="learning-card phd">
                <a href="{base}/education/phd">
                    <img 
                    src="{base}/common/assets/drawing/crow02.png" 
                    alt="mce-lab"
                    style="transform: translate(0, 50px);"
                    />
                </a>
                    <div class="card-content">
                        <p style="margin-top:90px;">Earn crow-level cleverness. Learn more about our plans.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .content-wrapper {
        padding: 0;
        margin-left: var(--margin-left);
    }
    
    .hero-text {
        display: flex;
        flex-direction: column;
        max-width: 50%;
        gap: 2rem;
    }
    
    .hero-text p {
        font-size: 1.5rem;
    }
    
    h1 {
        font-size: 4.5rem;
        font-weight: 400;
        font-family: var(--serif);
        margin: 0;
    }
    
    p {
        font-size: 1.5rem;
        font-family: var(--serif);
        margin: 0;
    }

    hr {
        margin-top: 12rem;
        margin-bottom: 6rem;
        border-bottom: 1px solid #888;
    }
    
    /* Features Section */


    
    .features-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    .features-header {
        text-align: left;
        margin-bottom: 4rem;
    }
    
    .features-header h2 {
        font-size: 3rem;
        font-weight: 400;
        font-family: var(--serif);
        margin: 0 0 1rem 0;
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
        height: 410px;
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
        font-size: 1.2rem;
        line-height: 1.5;
        margin: 0;
        color: var(--color-gray-700);
    }
    
    .feature-card img {
        width: 180px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
    }
    
    /* Learning Section */

    
    .learning-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
    .learning-header {
        text-align: left;
        margin-bottom: 4rem;
    }
    
    .learning-header h2 {
        font-size: 3rem;
        font-weight: 400;
        font-family: var(--serif);
        margin: 0 0 1rem 0;
        color: var(--color-fg);
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
        justify-content: flex-start;
    }

     .learning-card img {
        width: 180px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
    }
    
    .learning-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    :global(.dark) .feature-card {
        background: #f5f5f5;
        border-color: #4a4a4a;
    }
    
    
    .feature-card p {
        font-family: var(--serif);
        font-size: 1.2rem;
        line-height: 1.5;
        margin: 0;
        color: var(--color-gray-700);
    }
    
    .feature-card img {
        width: 180px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
    }

    #hero-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
        height: 100vh;
        padding-right: var(--margin-left);
    }

    @media (max-width: 1200px) {
        .features-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        #hero-section {
            flex-direction: column;
            text-align: center;
            justify-content: center;
            height: auto;
            padding: 4rem 0;
            gap: 3rem;
        }
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
        }
        
        .hero-text {
            max-width: 90%;
        }
        
        h1 {
            font-size: 2.5rem;
        }
        
        p {
            font-size: 1.2rem;
        }
        
        .features-section {
            padding: 4rem 0;
            margin-top: 4rem;
        }
        
        .features-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        .features-header h2 {
            font-size: 2rem;
        }
        
        .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .feature-card {
            padding: 1.5rem;
            height: 140px;
        }
    }
</style>