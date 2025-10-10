<script lang="ts">
	import { base } from '$app/paths';
	import { Youtube, Github, Linkedin, MessageCircle, ExternalLink } from "@lucide/svelte";
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-section">
			<h3>Community</h3>
			<ul>
				<li><a href="{base}/who-we-are">Who We Are</a></li>
				<li><a href="{base}/community/paper-shredder">Paper Shredder</a></li>
				<li><a href="{base}/community/scraps">SCRaPS</a></li>
				<li><a href="{base}/community/talkboctopus">Talkboctopus</a></li>
				<li><a href="{base}/community/credits">Credits</a></li>
			</ul>
		</div>
		
		<div class="footer-section">
			<h3>Research</h3>
			<ul>
				<li><a href="{base}/projects">Projects</a></li>
				<li><a href="{base}/research/group">Groups</a></li>
				<li><a href="{base}/funding">Funding</a></li>
				<li><a href="https://verso.w3.uvm.edu/" target="_blank" rel="noopener noreferrer">VERSO <ExternalLink size={14} /></a></li>
				<li><a href="{base}/research/mass-mutual">Mass Mutual Center of Excellence</a></li>
				<li><a href="{base}/research/tgir">TGIR Research</a></li>
				<li><a href="https://www.nature.com/npjcomplex/" target="_blank" rel="noopener noreferrer">npj Complexity <ExternalLink size={14} /></a></li>
			</ul>
		</div>
		
		<div class="footer-section">
			<h3>Education</h3>
			<ul>
				<li><a href="{base}/education/undergraduate">Undergraduate</a></li>
				<li><a href="{base}/education/masters">Masters</a></li>
				<li><a href="{base}/education/certificate">Certificate</a></li>
				<li><a href="{base}/education/phd">PhD</a></li>
				<li><a href="{base}/education/BilDS">BilDS</a></li>
			</ul>
		</div>
		
		<div class="footer-section">
			<h3>Follow Us</h3>
			<ul class="social-icons">
				<li>
					<a href="https://www.youtube.com/@UVMcomplexity" target="_blank" rel="noreferrer" aria-label="YouTube">
						<Youtube class="icon" size={20} />
					</a>
				</li>
				<li>
					<a href="https://github.com/Vermont-complex-systems" target="_blank" rel="noreferrer" aria-label="GitHub">
						<Github class="icon" size={20} />
					</a>
				</li>
				<li>
					<a href="https://linkedin.com/school/uvm-vcsc/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
						<Linkedin class="icon" size={20} />
					</a>
				</li>
			</ul>
		</div>
		
		<div class="footer-logo">
			<img src="{base}/UVM_Logo_Primary_Horiz_W_PunchOut.png" alt="UVM Logo" class="uvm-logo-img" />
			<img src="{base}/Roboctopus_2024.png" alt="Roboctopus Logo" class="roboctopus-logo-img" />
			<a class="cc-footer-copy" href="https://www.uvm.edu/equal-opportunity/americans-disabilities-act-and-reasonable-accommodations" target="_blank" rel="noreferrer">
				<span class="link-text">Accessibility <ExternalLink class="icon" size={14} /></span>
			</a>
			<a class="cc-footer-copy" href="https://www.uvm.edu/compliance/website-privacy-policy/terms-use" target="_blank" rel="noreferrer">
				<span class="privacy-text">Privacy/<br>Terms of Use <ExternalLink class="icon" size={14} /></span>
			</a>
			<div class="cc-footer-copy">© 2025, Vermont Complex Systems Institute at UVM</div>
		</div>
	</div>
</footer>

<style>
	.footer {
	margin-top: auto;
	background-color: var(--color-uvm-green);
	border-top: 1px solid var(--color-border);
	padding: 3rem 1rem 2rem;
	width: 100%;
	box-sizing: border-box;
}

:global(.dark) .footer {
	background-color: var(--color-gray-800);
	border-top-color: var(--color-gray-700);
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;
	padding: 0 var(--margin-left) 0 var(--margin-left);
}

.footer-section {
	flex: 1;
}

.footer-section h3 {
	font-family: var(--mono);
	font-weight: var(--font-weight-bold);
	text-transform: uppercase;
	font-size: var(--font-size-small) !important;
	margin-bottom: 0.75rem;
	color: var(--color-uvm-gold);
	margin-top: 0;
}

:global(.dark) .footer-section h3 {
	color: var(--color-gray-100);
}

.footer-section ul {
	list-style: none;
	padding: 0;
	margin: 0;
	color: var(--color-gray-100);
}

.footer-section li {
	margin-bottom: 0.5rem;
}

.footer-section a {
	color: var(--color-white);
	text-decoration: underline;
	font-weight: 500;
	font-size: 0.95rem !important;
	transition: color var(--transition-medium);
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

:global(.dark) .footer-section a {
	color: var(--color-gray-gold);
}

.footer-section a:hover {
	color: var(--color-uvm-gold);
}

:global(.dark) .footer-section a:hover {
	color: var(--color-gray-100);
}

.social-icons {
	display: flex;
	gap: 1rem;
}

.social-icons a {
	text-decoration: none;
}

.footer-logo {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	max-width: 12rem;
	min-width: 0;
	gap: 0.5rem;
	flex-shrink: 1;
	overflow: hidden;
}

.footer-logo a {
	color: var(--color-uvm-gold);
}

.uvm-logo-img {
	width: 100%;
	height: auto;
	max-height: 4rem;
	border-radius: var(--border-radius);
	transition: transform var(--transition-medium);
}

.roboctopus-logo-img {
	width: auto;
	max-width: 100%;
	height: auto;
	max-height: 8rem;
	border-radius: var(--border-radius);
	transition: transform var(--transition-medium);
	object-fit: contain;
	align-self: flex-start;
}

.roboctopus-logo-img:hover {
	transform: rotate(var(--left-tilt));
}

.cc-footer-copy {
	color: var(--color-white);
	font-weight: 500;
	font-size: 1rem;
	transition: color var(--transition-medium);
	text-align: left;
	display: block;
	max-width: 100%;
}

.link-text {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	flex-wrap: nowrap;
}

.link-text :global(.icon),
.privacy-text :global(.icon) {
	width: 14px !important;
	height: 14px !important;
	flex-shrink: 0;
	transform: translateY(-0.1rem);
}

.privacy-text {
	display: inline-flex;
	align-items: flex-end;
	gap: 0.25rem;
	flex-wrap: nowrap;
	line-height: 1.2;
}

:global(.dark) .cc-footer-copy {
	color: var(--color-gray-300);
}

.cc-footer-copy:hover {
	color: var(--color-gray-300);
}

:global(.dark) .cc-footer-copy:hover {
	color: var(--color-gray-100);
}

.cc-footer-copy:not(a) {
	color: var(--color-white);
	text-decoration: none;
	justify-content: flex-start;
}

:global(.dark) .cc-footer-copy:not(a) {
	color: var(--color-gray-300);
}

/* ---------- Mobile adjustments ---------- */
@media (max-width: 768px) {
	.footer {
		padding: 2rem 1rem 1.5rem;
	}

	.footer-content {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto auto;
	gap: 1.5rem 1rem;
	padding: 0 var(--margin-left-mobile);
}

/* Explicit placement: 4 sections */
.footer-section:nth-child(1) { grid-column: 1; grid-row: 1; } /* Community */
.footer-section:nth-child(2) { grid-column: 2; grid-row: 1; } /* Research */
.footer-section:nth-child(3) { grid-column: 1; grid-row: 2; } /* Education */
.footer-section:nth-child(4) { grid-column: 2; grid-row: 2; } /* Follow Us */

/* Logo pinned top-right, spans both rows */
.footer-logo {
	grid-column: 3;
	grid-row: 1 / 3;
	max-width: 6.5rem;
	min-width: 0;
}


	.footer-section h3 {
		font-size: var(--font-size-xsmall);
		margin-bottom: 0.75rem;
	}

	.footer-section a {
		font-size: var(--font-size-xsmall);
	}

	.footer-section li {
		margin-bottom: 0.3rem;
	}

	.cc-footer-copy {
		font-size: 0.85rem;
	}
}

</style>