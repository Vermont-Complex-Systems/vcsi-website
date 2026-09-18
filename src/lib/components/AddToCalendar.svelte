<script>
	import { CalendarPlus } from '@lucide/svelte';
	import { buildIcs, icsFilename } from '../../utils/calendar.js';

	/** @type {{ event: Record<string, any>, label?: string }} */
	let { event, label = 'Add to calendar' } = $props();

	const ics = $derived(buildIcs(event));

	function download() {
		if (!ics) return;
		const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = icsFilename(event);
		link.click();
		URL.revokeObjectURL(url);
	}
</script>

{#if ics}
	<button type="button" class="add-to-calendar" onclick={download}>
		<CalendarPlus size={14} aria-hidden="true" />
		{label}
	</button>
{/if}

<style>
	.add-to-calendar {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: none;
		border: 1px solid var(--color-gray-300, #e2e8f0);
		border-radius: 4px;
		padding: 0.25rem 0.6rem;
		margin: 0.25rem 0;
		font-family: inherit;
		font-size: 0.8rem;
		color: var(--color-gray-700);
		cursor: pointer;
	}

	.add-to-calendar:hover {
		background: var(--color-gray-100, #f7fafc);
		color: var(--color-primary, #2c5282);
	}
</style>
