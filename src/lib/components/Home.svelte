<script>
    import { base } from '$app/paths';
</script>

<div class="content-wrapper">
    <div class="hero-text">
        <h1>Describe, Explain,  Create, Share.</h1>
        <p>The Vermont Complex Systems Institute is a post-disciplinary organization working on real-world, data-rich, and meaningful complex systems problems of all kinds.</p>
    </div>
</div>

<style>
    .content-wrapper {
        padding: 0;
        margin-left: var(--margin-left);
    }
    
    .hero-text {
        display: flex;
        flex-direction: column;
        max-width: 60%;
        gap: 2rem;
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
    
    @media (max-width: 768px) {
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

    }
</style>