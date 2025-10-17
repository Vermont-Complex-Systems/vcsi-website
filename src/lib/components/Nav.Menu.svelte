<script>
	import { base } from "$app/paths";
	import { afterNavigate } from "$app/navigation";
	import { X, Youtube, Github, MessageCircle, Linkedin, ChevronDown, ChevronUp, ExternalLink } from "@lucide/svelte";
	
	let { visible, close } = $props();
	
	let mainEl;
	let closeBtnEl;
	let isWhoWeAreOpen = $state(false);
	let isResearchOpen = $state(false);
	let isEducationOpen = $state(false);
	
	export const open = () => {
		closeBtnEl?.focus();
		mainEl?.setAttribute("aria-hidden", true);
	};
	
	const onClose = async (e) => {
		if (e?.type === "keyup" && e?.key !== "Escape") return;
		mainEl?.removeAttribute("aria-hidden");
		close(e === "skip");
	};
	
	$effect(() => {
		mainEl = document.querySelector("main");
	});
	
	afterNavigate(() => {
		onClose("skip");
	});
</script>

<svelte:window on:keyup={onClose} />

<nav id="nav-menu" class:visible aria-hidden={!visible}>
	<div class="nav-content">
		<button 
			class="btn-close" 
			aria-label="close menu" 
			bind:this={closeBtnEl} 
			onclick={onClose}
		>
			<X class="icon" size={20} />
		</button>
		
		<div class="nav-links">
			<ul>				
				<li class="dropdown-section">
					<button 
						onclick={() => isWhoWeAreOpen = !isWhoWeAreOpen}
						class="section-button"
					>
						Community
						{#if isWhoWeAreOpen}
							<ChevronUp size={16} />
						{:else}
							<ChevronDown size={16} />
						{/if}
					</button>
					
					{#if isWhoWeAreOpen}
						<ul class="sub-menu">
							<li><a href="{base}/who-we-are">Who We Are</a></li>
							<li><a href="{base}/community/students">Students</a></li>
							<li><a href="{base}/community/paper-shredder">Paper Shredder</a></li>
							<li><a href="{base}/community/scraps">SCRAPS</a></li>
							<li><a href="{base}/community/talkboctopus">Talkboctopus</a></li>
							<li><a href="{base}/community/credits">Credits</a></li>
						</ul>
					{/if}
				</li>
				
				<li class="dropdown-section">
					<button 
						onclick={() => isResearchOpen = !isResearchOpen}
						class="section-button"
					>
						Research
						{#if isResearchOpen}
							<ChevronUp size={16} />
						{:else}
							<ChevronDown size={16} />
						{/if}
					</button>
					
					{#if isResearchOpen}
						<ul class="sub-menu">
							<li><a href="{base}/projects">Projects</a></li>
							<li><a href="{base}/research/group">Groups</a></li>
							<li><a href="{base}/explore">Explore</a></li>
							<li><a href="{base}/funding">Funding</a></li>
							<li>
								<a href="https://verso.w3.uvm.edu/" target="_blank" rel="noopener noreferrer">
									VERSO
									<ExternalLink size={14}/>
								</a></li>
							<li><a href="{base}/research/mass-mutual">Mass Mutual Center of Excellence</a></li>
							<li><a href="{base}/research/tgir">TGIR Research</a></li>
							<li>
								<a href="https://www.nature.com/npjcomplex/" target="_blank" rel="noopener noreferrer">
									npj Complexity
									<ExternalLink size={14}/>
								</a></li>
						</ul>
					{/if}
				</li>
				
				<li class="dropdown-section">
					<button
						onclick={() => isEducationOpen = !isEducationOpen}
						class="section-button"
					>
						Education
						{#if isEducationOpen}
							<ChevronUp size={16} />
						{:else}
							<ChevronDown size={16} />
						{/if}
					</button>

					{#if isEducationOpen}
						<ul class="sub-menu">
							<li><a href="{base}/education/undergraduate">Undergraduate</a></li>
							<li><a href="{base}/education/masters">Masters</a></li>
							<li><a href="{base}/education/certificate">Certificate</a></li>
							<li><a href="{base}/education/phd">PhD</a></li>
							<li><a href="{base}/education/BilDS">BilDS</a></li>
						</ul>
					{/if}
				</li>

				<li>
					<a href="{base}/events" rel="noopener noreferrer">
						Events
					</a>
				</li>

				<li>
					<a href="https://complex-stories.uvm.edu/" target="_blank" rel="noopener noreferrer">
						Complex Stories
						<ExternalLink size={14} />
					</a>
				</li>
			</ul>
		</div>
		
		<div class="social-links">
			<h4>Follow Us</h4>
			<ul class="social-icons">
				<li>
					<a href="https://www.youtube.com/@UVMcomplexity" target="_blank" rel="noreferrer" aria-label="YouTube">
						<Youtube class="icon" size={24} />
					</a>
				</li>
				<li>
					<a href="https://github.com/Vermont-complex-systems" target="_blank" rel="noreferrer" aria-label="GitHub">
						<Github class="icon" size={24} />
					</a>
				</li>
				<li>
					<a href="https://bsky.app/profile/vcsi.bsky.social" target="_blank" rel="noreferrer" aria-label="Bluesky">
						<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
						</svg>
					</a>
				</li>
				<li>
					<a href="https://linkedin.com/school/uvm-vcsc/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
						<Linkedin class="icon" size={24} />
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		max-width: min(17.5rem, 85vw);
		height: 100svh;
		z-index: calc(var(--z-overlay) + 1);
		visibility: hidden;
		transform: translateX(100%);
		transition: transform var(--transition-medium);
		overflow-y: auto;
		
		/* Light mode = Dark menu */
		background: var(--color-gray-900);
		color: var(--color-gray-100);
		border-left: 1px solid var(--color-gray-700);
		box-shadow: -0.25rem 0 1.5rem rgba(0, 0, 0, 0.3);
	}
	
	/* Dark mode = Light menu */
	:global(.dark) nav {
		background: var(--color-gray-200);
		color: var(--color-gray-800);
		border-left: 1px solid var(--color-gray-300);
		box-shadow: -0.25rem 0 1.5rem rgba(0, 0, 0, 0.2);
	}
	
	nav.visible {
		visibility: visible;
		transform: translateX(0);
	}
	
	.nav-content {
		padding: 2rem 1.5rem;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.btn-close {
		/* Reset button defaults */
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		font-family: inherit;
		
		/* Our styling */
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--color-gray-700);
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-gray-100);
		margin-bottom: 2rem;
		transition: all var(--transition-medium);
		align-self: flex-start;
	}
	
	.btn-close:hover {
		background: var(--color-gray-800);
		transform: rotate(var(--right-tilt)) scale(1.05);
	}
	
	/* Dark mode close button */
	:global(.dark) .btn-close {
		border-color: var(--color-gray-400);
		color: var(--color-gray-800);
	}
	
	:global(.dark) .btn-close:hover {
		background: var(--color-gray-300);
	}
	
	.nav-links,
	.social-links {
		margin-bottom: 2rem;
	}
	
	h4 {
		font-family: var(--mono);
		font-size: var(--font-size-small);
		text-transform: uppercase;
		color: var(--color-gray-400);
		margin: 0 0 1rem 0;
		letter-spacing: 0.03em;
	}
	
	:global(.dark) h4 {
		color: var(--color-gray-600);
	}
	
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	li {
		margin-bottom: 0.75rem;
	}
	
	a {
		font-family: var(--sans);
		font-size: var(--font-size-medium);
		font-weight: 500;
		color: var(--color-gray-100);
		text-decoration: none;
		transition: all var(--transition-medium);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
	}
	
	a:hover {
		color: var(--color-white);
		transform: translateX(0.25rem);
	}
	
	:global(.dark) a {
		color: var(--color-gray-800);
	}
	
	:global(.dark) a:hover {
		color: var(--color-gray-900);
	}
	
	.dropdown-section {
		margin-bottom: 0.75rem;
	}
	
	.section-button {
		/* Reset button defaults */
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		font-family: inherit;
		
		/* Our styling */
		font-family: var(--sans);
		font-size: var(--font-size-medium);
		font-weight: 500;
		color: var(--color-gray-100);
		text-decoration: none;
		transition: all var(--transition-medium);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.5rem 0;
		width: 100%;
		text-align: left;
	}
	
	.section-button:hover {
		color: var(--color-white);
		transform: translateX(0.25rem);
	}
	
	:global(.dark) .section-button {
		color: var(--color-gray-800);
	}
	
	:global(.dark) .section-button:hover {
		color: var(--color-gray-900);
	}
	
	.sub-menu {
		padding-left: 1.5rem;
		margin-top: 0.5rem;
		list-style: none;
	}
	
	.sub-menu li {
		margin-bottom: 0.5rem;
		list-style: none;
	}
	
	.sub-menu a {
		font-size: var(--font-size-small);
		opacity: 0.9;
	}

	.social-icons {
		display: flex;
		gap: 1.5rem;
		padding-left: 0;
	}

	.social-icons li {
		list-style: none;
		margin-bottom: 0;
	}

	.social-icons a {
		padding: 0;
	}

</style>