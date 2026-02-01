<script>
    import Meta from "$lib/components/Meta.svelte";
    import Projects from '$lib/components/Projects.svelte';

</script>

<Meta 
  title="Projects"
  description="Research projects at the Vermont Complex Systems Institute."
  
/>

<div class="page-header no-logo">
    <div class="page-header-text">
        <h1>Projects</h1>
        <p class="intro">Explore our current research projects in complex systems and data science.</p>
    </div>
</div>

<Projects />

<style>
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .intro {
            max-width: 100%;
        }
    }
</style>