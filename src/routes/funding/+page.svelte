<script>
    import Meta from "$lib/components/Meta.svelte";
    import Funding from '$lib/components/Funding.svelte';

</script>

<Meta 
  title="Funding"
  description="Funding sources supporting research at the Vermont Complex Systems Institute."
  
/>

<div class="page-header no-logo">
    <div class="page-header-text">
        <h1>Funding</h1>
        <p class="intro">Our research is supported by leading foundations, government agencies, and industry partners.</p>
    </div>
</div>

<Funding />

<style>
    .intro {
        margin-bottom: 3rem;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .intro {
            max-width: 100%;
        }
    }
</style>