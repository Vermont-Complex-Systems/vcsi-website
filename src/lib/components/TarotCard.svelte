<script>
	let { image = undefined, borderColor = 'rgba(255,255,255,0.15)' } = $props();
	let flipped = $state(false);
</script>

<div class="container">
	<button
		class="card"
		style:transform={flipped ? 'rotateY(0)' : ''}
		style:--bg-1="#e8f2ec"
		style:--bg-2="#1a4f3a"
		style:--bg-3="#c8a84b"
		style:--border-color={borderColor}
		onclick={() => flipped = !flipped}
	>
		<div class="front">
			{#if image}
				<img src={image} alt="Tarot card" class="card-image" />
			{:else}
				<span class="symbol">?</span>
				<p class="card-label">AI Tarot</p>
			{/if}
		</div>
		<div class="back">
			<div class="pattern"></div>
		</div>
	</button>
	<p class="hint">Click to flip</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.6em;
		align-items: center;
		justify-content: center;
		perspective: 100vh;
	}

	.card {
		position: relative;
		aspect-ratio: 7 / 12;
		font-size: min(1vh, 0.25rem);
		height: 80em;
		background: var(--border-color);
		border-radius: 2em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
		border: 1px solid var(--border-color);
	}

	.front, .back {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--border-color);
		box-sizing: border-box;
		padding: 2em;
	}

	.front {
		background-color: var(--border-color);
	}

	.back {
		transform: rotateY(180deg);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1em;
	}

	.symbol {
		font-family: 'DM Serif Display', Georgia, serif;
		font-size: 30em;
		color: #1a4f3a;
	}

	.card-label {
		font-family: 'DM Sans', system-ui, sans-serif;
		font-size: 5em;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #1a4f3a;
		opacity: 0.6;
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: var(--bg-2);
		background-image:
			radial-gradient(var(--bg-3) 0.9em, transparent 1em),
			repeating-radial-gradient(var(--bg-3) 0, var(--bg-3) 0.4em, transparent 0.5em, transparent 2em, var(--bg-3) 2.1em, var(--bg-3) 2.5em, transparent 2.6em, transparent 5em);
		background-size: 3em 3em, 9em 9em;
		background-position: 0 0;
		border-radius: 1em;
	}

	.hint {
		font-size: 0.7rem;
		color: rgba(255,255,255,0.35);
		font-style: italic;
	}
</style>
