<script>
    let { selectedPosition = 'All', onFilterChange } = $props();
    
    const positions = [
        'All',
        'Core team', 
        'Technical staff',
        'External faculty',
        'PostDoc'
    ];
    
    function handleFilterClick(position) {
        selectedPosition = position;
        onFilterChange(position);
    }
</script>

<div class="filter-container">
    <div class="filter-buttons">
        {#each positions as position}
            <button 
                class="filter-btn" 
                class:active={selectedPosition === position}
                onclick={() => handleFilterClick(position)}
            >
                {position}
            </button>
        {/each}
    </div>
</div>

<style>
    .filter-container {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
    
    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        border: 1px solid var(--color-gray-300);
        background: var(--color-bg);
        color: var(--color-fg);
        border-radius: var(--border-radius);
        cursor: pointer;
        font-family: var(--serif);
        font-size: 0.9rem;
        transition: all 200ms ease;
    }
    
    .filter-btn:hover {
        border-color: var(--color-gray-500);
        background: var(--color-gray-50);
    }
    
    .filter-btn.active {
        background: var(--color-fg);
        color: var(--color-bg);
        border-color: var(--color-fg);
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .filter-buttons {
            gap: 0.5rem;
        }
        
        .filter-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
        }
    }
</style>