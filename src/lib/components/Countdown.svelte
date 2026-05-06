<script>
    /** @type {{ days: number | null }} */
    let { days } = $props();
</script>

{#if days !== null}
    <div class="countdown" class:urgent={days <= 7} class:past={days < 0}>
        {#if days < 0}
            <span class="countdown-number">Passed</span>
        {:else if days === 0}
            <span class="countdown-number">Today!</span>
        {:else if days === 1}
            <span class="countdown-number">1</span>
            <span class="countdown-label">day left</span>
        {:else}
            <span class="countdown-number">{days}</span>
            <span class="countdown-label">days left</span>
        {/if}
    </div>
{/if}

<style>
    .countdown {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-gray-100, #f7fafc);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        min-width: 80px;
    }

    .countdown-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-primary, #2c5282);
        line-height: 1;
    }

    .countdown-label {
        font-size: 0.75rem;
        color: var(--color-gray-600);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .countdown.urgent {
        background: #fff5f5;
    }

    .countdown.urgent .countdown-number {
        color: #c53030;
    }

    .countdown.past {
        background: var(--color-gray-200);
    }

    .countdown.past .countdown-number {
        color: var(--color-gray-500);
        font-size: 1rem;
    }
</style>
