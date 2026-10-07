<script>
    import { catalogueUrl, primaryCode, scheduleUrl } from '$lib/catalogue.js';
    import courses from '$data/courses.json';

    /** @type {{ course: string }} */
    let { course } = $props();

    const id = $props.id();
    const code = $derived(primaryCode(course));
    const info = $derived(code ? courses[code] : undefined);

    /** @param {string} name */
    const professor = (name) => (name && !/^(tba|staff)$/i.test(name) ? `Prof. ${name}` : '');

    // Hover and keyboard focus open the tooltip through CSS; a click (or tap on
    // touch screens) pins it open until the next click elsewhere or Escape.
    let open = $state(false);
    /** @type {HTMLElement | undefined} */
    let root = $state();
</script>

<svelte:window
    onclick={(e) => { if (open && !root?.contains(/** @type {Node} */ (e.target))) open = false; }}
    onkeydown={(e) => { if (e.key === 'Escape') open = false; }}
/>

{#if info}
    <span class="course" class:open bind:this={root}>
        <button type="button" aria-expanded={open} aria-controls={id} onclick={() => (open = !open)}>
            {course}
        </button>
        <span class="tip" {id}>
            <span class="tip-box">
                <span class="desc">{info.description}</span>
                {#each info.sections as section}
                    <span class="offering">
                        <strong>{section.term}</strong>
                        {[section.meets, professor(section.instructor)].filter(Boolean).join(' · ')}
                        <a href={scheduleUrl(section)} target="_blank" rel="noopener noreferrer">View in schedule</a>
                    </span>
                {:else}
                    <span class="offering">
                        Not on the current schedule.
                        <a href={catalogueUrl(course)} target="_blank" rel="noopener noreferrer">View in catalogue</a>
                    </span>
                {/each}
            </span>
        </span>
    </span>
{:else}
    {course}
{/if}

<style>
    .course {
        position: relative;
    }

    button {
        all: unset;
        cursor: help;
    }

    button:focus-visible {
        outline: 2px solid var(--color-link-underline);
        outline-offset: 2px;
    }

    /* The top padding bridges the gap to the trigger so the pointer can move into
       the tooltip (and click the link) without it closing. */
    .tip {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 20;
        padding-top: 0.4rem;
        width: min(24rem, 75vw);
    }

    .course:hover .tip,
    .course:focus-within .tip,
    .course.open .tip {
        display: block;
    }

    .tip-box {
        display: block;
        padding: 0.75rem 1rem;
        background: #fff;
        border: 1px solid #4a4a4a;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
    }

    .desc,
    .offering {
        display: block;
        font-family: var(--sans);
        font-size: 0.85rem;
        line-height: 1.5;
        color: #333;
    }

    .offering {
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid var(--color-gray-300);
    }

    .offering + .offering {
        margin-top: 0.25rem;
        padding-top: 0;
        border-top: none;
    }
</style>
