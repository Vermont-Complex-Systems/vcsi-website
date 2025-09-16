<script>
    import { getCourseByCRN } from '../../routes/data.remote.js';
    
    let { crn, children } = $props();
    
    let showTooltip = $state(false);
    let courseData = $state(null);
    let loading = $state(false);
    let tooltipElement = $state();

    async function loadCourseData() {
        if (courseData || loading) return; // Don't reload if already loaded
        
        loading = true;
        try {
            courseData = await getCourseByCRN(crn);
        } catch (error) {
            console.error('Error loading course:', error);
            courseData = { error: 'Course not found' };
        } finally {
            loading = false;
        }
    }

    function handleMouseEnter() {
        showTooltip = true;
        loadCourseData();
    }

    function handleMouseLeave() {
        showTooltip = false;
    }
</script>

<span 
    class="course-link"
    role="button"
    tabindex="0"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    bind:this={tooltipElement}
>
    {@render children()}
    
    {#if showTooltip}
        <div class="tooltip" class:loading>
            
            {#if loading}
                <div class="tooltip-loading">Loading...</div>
            {:else if courseData?.error}
                <div class="tooltip-error">Course not found</div>
            {:else if courseData}
                <div class="tooltip-content">
                    <div class="tooltip-header">
                        <div class="course-code">{courseData.course_code} {courseData.section}</div>
                        <div class="course-title">{courseData.title}</div>
                    </div>
                    
                    <div class="tooltip-body">
                        {#if courseData.instructor_name}
                            <div class="tooltip-field">
                                <strong>Instructor:</strong> {courseData.instructor_name}
                            </div>
                        {/if}
                        
                        {#if courseData.meeting_time}
                            <div class="tooltip-field">
                                <strong>Time:</strong> {courseData.meeting_time}
                            </div>
                        {/if}
                        
                        {#if courseData.location}
                            <div class="tooltip-field">
                                <strong>Location:</strong> {courseData.location}
                            </div>
                        {/if}
                        
                        {#if courseData.credit_hours}
                            <div class="tooltip-field">
                                <strong>Credits:</strong> {courseData.credit_hours}
                            </div>
                        {/if}
                        
                        {#if courseData.catalog_description}
                            <div class="tooltip-description">
                                {@html courseData.catalog_description}
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</span>

<style>
    .course-link {
        position: relative;
        display: inline-block;
        cursor: pointer;
        border-bottom: 1px dashed var(--color-accent);
        color: var(--color-accent);
    }

    .course-link:hover {
        border-bottom-style: solid;
    }

    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
        background: white;
        border: 1px solid var(--color-gray-300);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 1.25rem;
        width: 520px;
        max-width: 90vw;
        z-index: 1000;
        font-size: 0.9rem;
        line-height: 1.4;
        transition: all 0.2s ease;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        border-color: var(--color-accent);
    }

    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: white;
    }

    .tooltip::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 7px solid transparent;
        border-top-color: var(--color-gray-300);
        margin-top: -1px;
    }

    .tooltip-header {
        border-bottom: 1px solid var(--color-gray-200);
        padding-bottom: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .course-code {
        font-family: var(--mono);
        font-size: 0.8rem;
        color: var(--color-gray-600);
        margin-bottom: 0.25rem;
    }

    .course-title {
        font-weight: 600;
        color: var(--color-fg);
        font-family: var(--serif);
    }

    .tooltip-field {
        margin-bottom: 0.5rem;
        font-family: var(--serif);
    }

    .tooltip-field strong {
        color: var(--color-gray-700);
    }


    .tooltip-description {
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--color-gray-200);
        font-family: var(--serif);
        font-size: 0.85rem;
        line-height: 1.5;
        color: var(--color-gray-700);
        max-height: 120px;
        overflow-y: auto;
    }

    .tooltip-description {
        max-height: 280px;
    }

    .tooltip-loading,
    .tooltip-error {
        text-align: center;
        padding: 1rem;
        color: var(--color-gray-600);
        font-family: var(--serif);
    }

    .tooltip-error {
        color: var(--color-error);
    }

    /* Responsive positioning */
    @media (max-width: 768px) {
        .tooltip {
            width: 380px;
            left: 0;
            transform: none;
        }

        .tooltip::after,
        .tooltip::before {
            left: 20px;
            transform: none;
        }
    }
</style>