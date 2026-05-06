<script>
    /** @type {{ text: string, limit?: number }} */
    let { text, limit = 150 } = $props();

    let expanded = $state(false);
    const isLong = text.length > limit;
</script>

{#if isLong && !expanded}
    <p>{text.slice(0, limit)}...</p>
    <button class="expand-btn" onclick={() => expanded = true}>Read more</button>
{:else}
    <p style="white-space: pre-line">{text}</p>
    {#if isLong}
        <button class="expand-btn" onclick={() => expanded = false}>Show less</button>
    {/if}
{/if}

<style>
    p {
        margin: 0.5rem 0;
    }

    .expand-btn {
        background: none;
        border: none;
        color: var(--color-primary, #2c5282);
        cursor: pointer;
        padding: 0;
        font-size: 0.875rem;
        text-decoration: underline;
    }

    .expand-btn:hover {
        color: var(--color-primary-dark, #1a365d);
    }
</style>
