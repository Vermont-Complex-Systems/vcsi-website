<script>
	import Meta from '$lib/components/Meta.svelte';
	import ResearchNetwork from '$lib/components/ResearchNetwork.svelte';
	import { base } from '$app/paths';
	import wastewaterFig from '$lib/assets/modeling-complexity/41591_2025_3501_Fig1_HTML.webp?enhanced';
	import cropSwitchingFig from '$lib/assets/modeling-complexity/pnas.2402195121fig02.jpg?enhanced';
	import governanceFig from '$lib/assets/modeling-complexity/44260_2025_41_Fig2_HTML.webp?enhanced';
	import branchingFig from '$lib/assets/modeling-complexity/1722cb9d-a7b8-490e-aa10-5ced3b9077f7.png?enhanced';
	import diseaseModelsFig from '$lib/assets/modeling-complexity/41562_2021_1136_Fig1_HTML.webp?enhanced';
	import culturalAdaptationFig from '$lib/assets/modeling-complexity/m_rstb20220397f03.png?enhanced';
	import centralizationFig from '$lib/assets/modeling-complexity/1-s2.0-S246869642400017X-gr4_lrg.jpg?enhanced';
	import scalesFig from '$lib/assets/modeling-complexity/41467_2025_59777_Fig4_HTML.webp?enhanced';
	import cosmoPreview from '$lib/assets/modeling-complexity/cosmo-notes-preview.jpg?enhanced';
	import npjPreview from '$lib/assets/modeling-complexity/npj-complexity.jpg?enhanced';

	// Drawings are WebP copies of the PNG originals, at most 640px wide (about a quarter of the bytes)
	const img = (name) => `${base}/common/assets/modeling-complexity/${name}.webp`;

	// Background constellation, drawn in a 1600x1000 viewBox. `delay` staggers the line drawing,
	// `faint` lines are the dashed bridges between clusters.
	const lines = [
		{ d: 'M120 180 L260 120 L380 230 L300 350 L160 330 Z' },
		{ d: 'M380 230 L430 420', delay: 2 },
		{ d: 'M300 350 L220 500 L160 330', delay: 2 },
		{ d: 'M760 140 L900 90 L1010 200 L880 260 Z', delay: 3 },
		{ d: 'M1010 200 L1130 120 L1240 260 L1090 360 L1010 200', delay: 3 },
		{ d: 'M880 260 L1090 360', delay: 4 },
		{ d: 'M620 560 L760 650 L700 780 L540 720 Z', delay: 2 },
		{ d: 'M760 650 L900 560 L980 720 L840 860 L700 780', delay: 3 },
		{ d: 'M760 650 L980 720', delay: 4 },
		{ d: 'M1280 600 L1420 520 L1500 680 L1360 780 Z', delay: 3 },
		{ d: 'M1360 780 L1220 860', delay: 4 },
		{ d: 'M1360 780 L1480 900 L1500 680', delay: 4 },
		{ d: 'M80 760 L200 700 L320 820 L180 900 Z', delay: 2 },
		{ d: 'M200 700 L180 900', delay: 5 },
		{ d: 'M430 420 L620 560', delay: 5, faint: true },
		{ d: 'M880 260 L900 560', delay: 5, faint: true },
		{ d: 'M1240 260 L1420 520', delay: 5, faint: true },
		{ d: 'M540 720 L320 820', delay: 5, faint: true },
		{ d: 'M380 230 L760 140', delay: 5, faint: true }
	];

	// [cx, cy, r]: the first 31 are the vertices above, the rest are loose stars
	const stars = [
		[120, 180, 6],
		[260, 120, 5],
		[380, 230, 8],
		[300, 350, 5],
		[160, 330, 6],
		[430, 420, 5],
		[220, 500, 6],
		[760, 140, 5],
		[900, 90, 8],
		[1010, 200, 6],
		[880, 260, 5],
		[1130, 120, 5],
		[1240, 260, 8],
		[1090, 360, 6],
		[620, 560, 6],
		[760, 650, 8],
		[700, 780, 5],
		[540, 720, 6],
		[900, 560, 5],
		[980, 720, 6],
		[840, 860, 5],
		[1280, 600, 5],
		[1420, 520, 8],
		[1500, 680, 6],
		[1360, 780, 6],
		[1220, 860, 5],
		[1480, 900, 5],
		[80, 760, 5],
		[200, 700, 6],
		[320, 820, 5],
		[180, 900, 6],
		[50, 60, 2.6],
		[470, 60, 3],
		[590, 250, 2.4],
		[660, 380, 3],
		[540, 470, 2.4],
		[1180, 40, 2.6],
		[1360, 120, 3],
		[1520, 260, 2.6],
		[1420, 400, 2.4],
		[1130, 480, 3],
		[1040, 620, 2.6],
		[1160, 740, 2.4],
		[1060, 930, 3],
		[640, 900, 2.6],
		[450, 610, 3],
		[380, 960, 2.4],
		[60, 560, 2.6],
		[1560, 780, 3],
		[960, 400, 2.4],
		[690, 60, 2.6]
	];

	const themes = [
		{
			id: 'contagions',
			kicker: 'Contagions',
			title: 'Interacting contagions and higher-order effects',
			text: 'How pathogens, behaviors, and ideas spread and interact with network structure and among themselves.'
		},
		{
			id: 'global-health',
			kicker: 'Global health',
			title: 'Infectious diseases and epidemics',
			text: 'How pathogens evolve, how outbreaks emerge, and how we respond to epidemics.'
		},
		{
			id: 'networks',
			kicker: 'Networks',
			title: 'Adaptive and temporal networks',
			text: 'Networks that rewire, evolve and unfold in time alongside the dynamics they carry.'
		},
		{
			id: 'society',
			kicker: 'Society',
			title: 'Social and cultural dynamics',
			text: 'Opinions, norms and collective behavior as emergent properties of interacting people.'
		},
		{
			id: 'climate',
			kicker: 'Climate',
			title: 'Adaptation to climate change',
			text: 'How farmers, communities and institutions adapt their practices to a changing climate.'
		}
	];

	// How the research section is laid out: 'network' links each theme to its projects
	// (ResearchNetwork); 'grid' is a plain grid of themes, then one of projects
	const researchLayout = 'network';

	// One card per paper. `themes` are theme ids above; `figure` is optional
	const projects = [
		{
			id: 'wastewater',
			themes: ['global-health'],
			kicker: 'Global health',
			title: 'Pandemic monitoring with global aircraft-based wastewater surveillance networks',
			venue: 'Nature Medicine, 2025',
			url: 'https://doi.org/10.1038/s41591-025-03501-4',
			figure: {
				src: wastewaterFig,
				alt: 'Figure from the paper on aircraft-based wastewater surveillance networks'
			}
		},
		{
			id: 'integrated-disease-models',
			themes: ['global-health', 'society'],
			kicker: 'Global health',
			title:
				'A review and agenda for integrated disease models including social and behavioural factors',
			venue: 'Nature Human Behaviour, 2021',
			url: 'https://doi.org/10.1038/s41562-021-01136-2',
			figure: {
				src: diseaseModelsFig,
				alt: 'Design cycle for integrated disease models, from research question to modelling approach, parameters and outcomes, built by multidisciplinary teams'
			}
		},
		{
			id: 'crop-switching',
			themes: ['climate', 'society'],
			kicker: 'Climate',
			title: 'Innovations through crop switching happen on the diverse margins of US agriculture',
			venue: 'PNAS, 2024',
			url: 'https://doi.org/10.1073/pnas.2402195121',
			figure: {
				src: cropSwitchingFig,
				alt: 'Share of US cropland that switched crops each year from 2008 to 2022, by type of switch'
			}
		},
		{
			id: 'cultural-adaptation',
			themes: ['climate', 'society'],
			kicker: 'Climate',
			title:
				'Operationalizing cultural adaptation to climate change: contemporary examples from United States agriculture',
			venue: 'Philosophical Transactions of the Royal Society B, 2023',
			url: 'https://doi.org/10.1098/rstb.2022.0397',
			figure: {
				src: culturalAdaptationFig,
				alt: 'Scatter plots and US county maps showing where trends in climate and in crop choices match'
			}
		},
		{
			id: 'governance-sat',
			themes: ['networks', 'society'],
			kicker: 'Governance',
			title: 'Governance as a complex, networked, democratic, satisfiability problem',
			venue: 'npj Complexity, 2025',
			url: 'https://doi.org/10.1038/s44260-025-00041-3',
			figure: {
				src: governanceFig,
				alt: 'Figure from the paper on governance as a networked satisfiability problem'
			}
		},
		{
			id: 'platform-centralization',
			themes: ['networks', 'society'],
			kicker: 'Governance',
			title:
				'Measuring centralization of online platforms through size and interconnection of communities',
			venue: 'Online Social Networks and Media, 2024',
			url: 'https://doi.org/10.1016/j.osnem.2024.100292',
			figure: {
				src: centralizationFig,
				alt: 'Community size distributions and disruption curves for Mastodon, Penumbra, BitChute, Voat and Usenet'
			}
		},
		{
			id: 'characteristic-scales',
			themes: ['contagions', 'networks'],
			kicker: 'Contagion',
			title: 'Characteristic scales and adaptation in higher-order contagions',
			venue: 'Nature Communications, 2025',
			url: 'https://doi.org/10.1038/s41467-025-59777-0',
			figure: {
				src: scalesFig,
				alt: 'Prevalence against transmission rate on board-of-directors data, simulations compared with model predictions'
			}
		},
		{
			id: 'self-reinforcing-cascades',
			themes: ['contagions'],
			kicker: 'Contagion',
			title:
				'Self-reinforcing cascades: a spreading model for beliefs or products of varying intensity or quality',
			venue: 'Physical Review Letters, 2025',
			url: 'https://doi.org/10.1103/5mph-sws5',
			figure: {
				src: branchingFig,
				alt: 'Diagram of a branching cascade where each node carries an intensity, from a seed to dead-ends and absorbing boundaries'
			}
		}
	];

	// `id` is the members.csv id (links the who-we-are profile); `photo` is in static/common/assets/members
	const leaders = [
		{ id: 'lhd', name: 'Laurent Hébert-Dufresne', role: 'Director', photo: 'lhd-fancy.jpg' }
	];

	const honors = [
		{
			year: '2026',
			title: 'Young Scientist Award for Socio- and Econophysics',
			body: 'German Physical Society',
			text: 'Recognizes “outstanding original contributions that use physical methods to develop a better understanding of socio-economic problems.”',
			url: 'https://www.uvm.edu/cems/cs/news/international-honor-laurent-hebert-dufresne'
		},
		{
			year: '2026',
			title: 'Erdős–Rényi Prize',
			body: 'Network Science Society (NetSci)',
			text: 'Widely regarded as the field’s top honor for early-career researchers, awarded for “outstanding achievements in network science and contributions to the interdisciplinary development of the field.”',
			url: 'https://www.uvm.edu/cems/cs/news/laurent-hebert-dufresne-wins-2026-erdos-renyi-prize'
		}
	];

	const affiliations = [
		{
			kicker: 'Founding editor-in-chief',
			title: 'npj Complexity',
			text: 'Director Laurent Hébert-Dufresne launched npj Complexity in 2024 as founding editor-in-chief: a partner journal to Nature and a “home for research that transcends disciplines.”',
			url: 'https://www.nature.com/npjcomplex/',
			label: 'nature.com/npjcomplex'
		},
		{
			kicker: 'External faculty',
			title: 'Complexity Science Hub',
			text: 'Founded in 2016 in Vienna, Austria, the CSH conducts independent science for a better understanding of our complex world.',
			url: 'https://csh.ac.at/',
			label: 'csh.ac.at'
		},
		{
			kicker: 'External faculty',
			title: 'Santa Fe Institute',
			text: 'Founded in 1984 in Santa Fe, New Mexico, SFI is the first research institute dedicated to the study of complex adaptive systems.',
			url: 'https://www.santafe.edu/',
			label: 'santafe.edu'
		}
	];

	const outreach = [
		{
			kicker: 'Journal',
			title: 'npj Complexity',
			text: 'An open-access journal from Nature Portfolio devoted to research on complex systems.',
			url: 'https://www.nature.com/npjcomplex/',
			label: 'nature.com/npjcomplex',
			preview: npjPreview
		},
		{
			title: 'cosmo-notes',
			text: 'COmplex Systems MOdelling notebooks, an always-evolving collection of modeling tutorials.',
			url: 'https://cosmo-notes.github.io/',
			label: 'cosmo-notes.github.io',
			// Screenshot of the site's landing page (it has no og:image of its own)
			preview: cosmoPreview,
			tags: [
				{
					label: 'PGFunk',
					title: 'Probability-generating-functionology',
					url: 'https://cosmo-notes.github.io/pgfunk/chapters/index.html'
				},
				{
					label: 'TAME',
					title: 'Taming complexity with Approximate Master Equations',
					url: 'https://cosmo-notes.github.io/tame/chapters/index.html'
				},
				{
					label: 'SOS',
					title: 'Simulation of Systems using computational algorithms',
					url: 'https://cosmo-notes.github.io/sos/chapters/index.html'
				}
			]
		}
	];
</script>

<Meta
	title="Center of Excellence in Modeling Complexity"
	description="Building translational value in state-of-the-art mathematical and computational models of societal challenges in global health, climate change, information dynamics and emergent technologies."
/>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=Reenie+Beanie&display=swap"
	/>
	<!-- Page-only nav override, removed on navigation (same approach as community/credits).
	     The nav is see-through at the top and picks up the page's grain once scrolled. -->
	<style>
		:root {
			--cemc-grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.14'/%3E%3C/svg%3E");
		}
		.header {
			background: transparent !important;
		}
		.header.scrolled {
			background:
				var(--cemc-grain) 0 calc(-1 * var(--announcement-height, 0px)) / 240px 240px,
				var(--color-bg) !important;
		}
	</style>
</svelte:head>

{#snippet kicker(label, squiggle)}
	<div class="kicker">{label}</div>
	<svg class="squiggle" width="130" height="12" viewBox="0 0 130 12" fill="none" aria-hidden="true">
		<path d={squiggle} />
	</svg>
{/snippet}

{#snippet themeTile(theme)}
	<div class="tile theme-card">
		<div class="label">{theme.kicker}</div>
		<h3>{theme.title}</h3>
		<p>{theme.text}</p>
	</div>
{/snippet}

{#snippet projectTile(project)}
	<a class="tile linked project-card" href={project.url} target="_blank" rel="noopener noreferrer">
		{#if project.figure}
			<div class="figure">
				<enhanced:img
					src={project.figure.src}
					alt={project.figure.alt}
					sizes="(min-width: 1100px) 260px, (min-width: 600px) 45vw, 90vw"
				/>
			</div>
		{/if}
		<div class="label">{project.kicker}</div>
		<h4>{project.title}</h4>
		{@render linkLabel(project.venue)}
	</a>
{/snippet}

<!-- One paper as a row of the research graph: thumbnail, then its text -->
{#snippet projectRow(project)}
	<a class="tile linked project-row" href={project.url} target="_blank" rel="noopener noreferrer">
		<div class="thumb">
			{#if project.figure}
				<enhanced:img src={project.figure.src} alt={project.figure.alt} sizes="110px" />
			{:else}
				<span>{project.venue.match(/\d{4}/)}</span>
			{/if}
		</div>
		<div>
			<h4>{project.title}</h4>
			{@render linkLabel(project.venue)}
		</div>
	</a>
{/snippet}

{#snippet columnHeading(text)}
	<h3 class="handwritten column-heading">{text}</h3>
{/snippet}

{#snippet linkLabel(label)}
	<div class="link-label" aria-hidden="true">
		<span>{label}</span>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path d="M4 12 L12 4 M5.5 4 H12 V10.5" />
		</svg>
	</div>
{/snippet}

{#snippet deco(name, className, style)}
	<!-- lazy: hidden on phones, and a lazy image that is never displayed is never downloaded -->
	<img
		class="deco {className}"
		src={img(name)}
		alt=""
		aria-hidden="true"
		loading="lazy"
		decoding="async"
		{style}
	/>
{/snippet}

<div class="cemc">
	<div class="grain" aria-hidden="true"></div>
	<!-- Nothing here animates continuously: in Firefox any endless motion of this full-screen
	     layer (even a slow drift or a twinkle) repaints it every frame and spins up the fan.
	     Only the one-off line drawing and the scroll parallax move it. -->
	<div class="const" aria-hidden="true">
		<div class="const-inner">
			<svg
				class="const-svg"
				viewBox="0 0 1600 1000"
				preserveAspectRatio="xMidYMid slice"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<filter id="cemc-rough1" x="-5%" y="-5%" width="110%" height="110%">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.014"
							numOctaves="2"
							seed="3"
							result="n"
						/>
						<feDisplacementMap in="SourceGraphic" in2="n" scale="10" />
					</filter>
					<filter id="cemc-rough2" x="-5%" y="-5%" width="110%" height="110%">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.018"
							numOctaves="2"
							seed="9"
							result="n"
						/>
						<feDisplacementMap in="SourceGraphic" in2="n" scale="8" />
					</filter>
					<filter id="cemc-blob" x="-5%" y="-5%" width="110%" height="110%">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.09"
							numOctaves="2"
							seed="5"
							result="n"
						/>
						<feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
					</filter>
					<g id="cemc-lines">
						{#each lines as line}
							<path
								class="ln"
								class:f={line.faint}
								class:d2={line.delay === 2}
								class:d3={line.delay === 3}
								class:d4={line.delay === 4}
								class:d5={line.delay === 5}
								d={line.d}
							/>
						{/each}
					</g>
				</defs>
				<use href="#cemc-lines" filter="url(#cemc-rough1)" />
				<use
					href="#cemc-lines"
					filter="url(#cemc-rough2)"
					transform="translate(2 1.5)"
					opacity="0.4"
				/>
				<g filter="url(#cemc-blob)">
					{#each stars as [cx, cy, r]}
						<circle class="st" {cx} {cy} {r} />
					{/each}
				</g>
			</svg>
		</div>
	</div>

	<section id="mission" class="hero">
		{@render kicker('Mission', 'M2 7 C 22 2, 40 11, 62 6 S 104 3, 128 8')}
		<h1>Center of Excellence in <em class="accent">Modeling Complexity</em></h1>
		<p class="lede">
			To build translational value in state-of-the-art mathematical and computational models of
			societal challenges.
		</p>
		<p class="mission-statement">
			In global health, climate change, information dynamics, and emergent technologies, the Center
			of Excellence in Modeling Complexity aims to study how crises emerge, how failures cascade,
			how innovations occur and spread, and how governance can adapt to these crises. Our team
			tackles this modeling pipeline through globally recognized research, specialized teaching, and
			broad scientific collaborations and communication.
		</p>
		<div class="scroll-cue" aria-hidden="true">
			<span class="scroll-line"></span>
			<span>scroll</span>
		</div>
	</section>

	<section id="research">
		{@render deco('ocelot', '', 'width: clamp(170px, 20vw, 290px); right: -30px; top: 60px')}
		{@render deco('flower', '', 'width: clamp(120px, 14vw, 200px); left: -70px; bottom: -30px')}
		{@render kicker('Research', 'M2 6 C 24 10, 44 2, 66 7 S 106 9, 128 5')}
		<h2>What we <em>look into</em></h2>
		{#if researchLayout === 'network'}
			<div class="network-ground">
				<ResearchNetwork
					{themes}
					{projects}
					theme={themeTile}
					project={projectRow}
					heading={columnHeading}
				/>
			</div>
		{:else}
			<div class="grid themes">
				{#each themes as theme}
					{@render themeTile(theme)}
				{/each}
			</div>

			<h3 class="handwritten">Selected projects</h3>
			<!-- Full rows only: 3 across for a multiple of three, otherwise 4 (then 2, then 1) -->
			<div class="grid projects" class:thirds={projects.length % 3 === 0}>
				{#each projects as project}
					{@render projectTile(project)}
				{/each}
			</div>
		{/if}
	</section>

	<section id="leadership">
		{@render kicker('Leadership', 'M2 6 C 22 10, 44 3, 66 8 S 104 4, 128 7')}
		<h2>Who <em>leads the Center</em></h2>
		<div class="grid leaders">
			{#each leaders as leader}
				<a class="leader" href="{base}/who-we-are/{leader.id}">
					<img
						src="{base}/common/assets/members/{leader.photo}"
						alt={leader.name}
						loading="lazy"
						decoding="async"
					/>
					<div>
						<div class="label">{leader.role}</div>
						<h4>{leader.name}</h4>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section id="recognition">
		{@render deco('tiger-globe', '', 'width: clamp(150px, 15vw, 220px); right: -10px; top: 20px')}
		{@render kicker('Global recognition', 'M2 8 C 20 3, 42 10, 64 5 S 102 9, 128 4')}
		<h2>Recognized <em>around the world</em></h2>
		<div class="grid honors">
			{#each honors as honor}
				<a class="tile linked" href={honor.url} target="_blank" rel="noopener noreferrer">
					<div class="year">{honor.year}</div>
					<p class="honor-title">{honor.title}</p>
					<p class="honor-body">{honor.body}</p>
					<p class="honor-text">{honor.text}</p>
					{@render linkLabel('Read the story')}
				</a>
			{/each}
		</div>
		<div class="handwritten partners-heading">Affiliations and editorial roles</div>
		<div class="grid affiliations">
			{#each affiliations as item}
				<a class="tile linked" href={item.url} target="_blank" rel="noopener noreferrer">
					<div class="label">{item.kicker}</div>
					<h4>{item.title}</h4>
					<p>{item.text}</p>
					{@render linkLabel(item.label)}
				</a>
			{/each}
		</div>
	</section>

	<section id="outreach">
		{@render deco('tail-laptop', '', 'width: clamp(170px, 21vw, 300px); left: -30px; bottom: 10px')}
		{@render deco('frog-ferns', '', 'width: clamp(120px, 13vw, 190px); right: 30px; bottom: -4px')}
		{@render kicker('Outreach', 'M2 5 C 26 10, 46 2, 68 7 S 108 4, 128 8')}
		<h2>Sharing the science, <em>openly</em></h2>
		<div class="grid outreach">
			{#each outreach as item}
				<!-- The title link stretches over the whole card; the tags are separate links on top -->
				<div class="tile linked">
					{#if item.preview}
						<div class="preview">
							<enhanced:img
								src={item.preview}
								alt="Preview of {item.label}"
								sizes="(min-width: 900px) 520px, 90vw"
							/>
						</div>
					{/if}
					{#if item.kicker}
						<div class="label">{item.kicker}</div>
					{/if}
					<h3>
						<a class="card-link" href={item.url} target="_blank" rel="noopener noreferrer">
							{item.title}
						</a>
					</h3>
					<p>{item.text}</p>
					{#if item.tags}
						<ul class="tags">
							{#each item.tags as tag}
								<li>
									<a
										class="tag"
										href={tag.url}
										title={tag.title}
										target="_blank"
										rel="noopener noreferrer"
									>
										{tag.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
					{@render linkLabel(item.label)}
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.cemc {
		--accent: #a63f2a;
		--ink: #1f1c17;
		--serif-display: 'Newsreader', Georgia, serif;
		--hand: 'Reenie Beanie', cursive;

		position: relative;
		font-family: 'Instrument Sans', system-ui, sans-serif;
		color: var(--ink);
	}

	/* Fixed backdrop layers. z-index -1 keeps them under the site footer and nav. */
	.grain,
	.const {
		position: fixed;
		z-index: -1;
		pointer-events: none;
	}

	.grain {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* Grain as a tiled image (defined in svelte:head, shared with the nav): rasterized once,
		   unlike a live full-screen filter */
		background-image: var(--cemc-grain);
		background-size: 240px 240px;
	}

	.const {
		inset: 0;
		overflow: hidden;
		opacity: 0.45;
	}

	.const-inner {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 112%;
	}

	.const-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	/* The constellation drifts up slightly as you scroll */
	@supports (animation-timeline: scroll()) {
		.const-inner {
			animation: parallax 1s linear both;
			animation-timeline: scroll(root);
		}
	}

	.ln {
		stroke: #26221c;
		stroke-width: 1.4;
		stroke-opacity: 0.62;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 1000;
		stroke-dashoffset: 0;
		animation: draw 3.5s ease-out both;
	}
	.ln.f {
		stroke-opacity: 0.32;
		stroke-dasharray: 6 7;
		stroke-width: 1.2;
	}
	.d2 {
		animation-delay: 0.5s;
	}
	.d3 {
		animation-delay: 1s;
	}
	.d4 {
		animation-delay: 1.5s;
	}
	.d5 {
		animation-delay: 2s;
	}

	.st {
		fill: #26221c;
	}

	@keyframes parallax {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-9%);
		}
	}
	@keyframes draw {
		from {
			stroke-dashoffset: 1000;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	.tile {
		color: inherit;
		text-decoration: none;
	}

	/* Sections */
	section {
		position: relative;
		padding-block: clamp(64px, 10vw, 120px) clamp(80px, 12vw, 150px);
		scroll-margin-top: var(--nav-height);
		/* Vertical radius ≤ vertical position, so the wash is fully clear by the section's top edge */
		--wash-size: 45% 220px;
		--wash-pos: 30% 230px;
	}

	/* Soft wash of page color behind the unboxed text, so the network fades out under it.
	   It spans the full window width (html/body clip the overflow) so its left edge is the
	   window edge, not a visible line at the content column.
	   z-index -1 puts it above the fixed backdrop (earlier in the DOM) but below the text. */
	section::before {
		content: '';
		position: absolute;
		inset: 0 calc(50% - 50vw);
		z-index: -1;
		pointer-events: none;
		background: radial-gradient(
			ellipse var(--wash-size) at var(--wash-pos),
			color-mix(in srgb, var(--color-bg) 92%, transparent) 55%,
			transparent
		);
	}

	section.hero {
		padding-block: clamp(72px, 11vw, 130px) clamp(96px, 14vw, 170px);
		--wash-size: 60% 50%;
		--wash-pos: 35% 50%;
	}

	.kicker {
		display: inline-block;
		transform: rotate(-2deg);
		transform-origin: left center;
		font-family: var(--hand);
		font-size: 46px;
		line-height: 1;
		color: var(--accent);
	}

	.squiggle {
		display: block;
		margin-top: 2px;
	}

	.squiggle path {
		stroke: var(--accent);
		stroke-width: 2;
		stroke-linecap: round;
	}

	h1,
	h2,
	h3,
	h4 {
		font-family: var(--serif-display);
		color: var(--ink);
	}

	h1 {
		margin: 16px 0 0;
		max-width: 1000px;
		font-weight: 300;
		font-size: clamp(42px, 7vw, 100px);
		line-height: 1.02;
		letter-spacing: -0.02em;
	}

	h2 {
		margin: 12px 0 0;
		max-width: 800px;
		font-weight: 300;
		font-size: clamp(36px, 5vw, 64px);
		line-height: 1.05;
		letter-spacing: -0.015em;
	}

	.accent {
		color: var(--accent);
	}

	.lede {
		margin: 40px 0 0;
		max-width: 720px;
		font-size: clamp(18px, 2vw, 23px);
		line-height: 1.55;
		color: rgba(31, 28, 23, 0.9);
	}

	.mission-statement {
		margin: 20px 0 0;
		max-width: 640px;
		font-size: 16px;
		line-height: 1.6;
		color: rgba(31, 28, 23, 0.72);
	}

	.scroll-cue {
		margin-top: 72px;
		display: flex;
		align-items: center;
		gap: 14px;
		font-family: var(--hand);
		font-size: 32px;
		color: rgba(31, 28, 23, 0.75);
	}

	.scroll-line {
		width: 56px;
		height: 1.5px;
		background: rgba(31, 28, 23, 0.6);
	}

	.handwritten {
		display: inline-block;
		transform: rotate(-1.5deg);
		transform-origin: left center;
		font-family: var(--hand);
		font-weight: 400;
		line-height: 1;
	}

	h3.handwritten {
		margin: 88px 0 0;
		font-size: 54px;
	}

	h3.column-heading {
		margin: 0 0 18px;
		font-size: 44px;
	}

	.partners-heading {
		margin-top: 64px;
		font-size: 44px;
	}

	/* Grids and tiles */
	.grid {
		display: grid;
		gap: 20px;
		margin-top: 48px;
	}
	.honors {
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}
	/* Four across on desktop, then 2 and 1 */
	.themes {
		grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
	}

	.projects {
		margin-top: 20px;
		grid-template-columns: repeat(4, 1fr);
	}
	.projects.thirds {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 1000px) {
		.projects,
		.projects.thirds {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 600px) {
		.projects,
		.projects.thirds {
			grid-template-columns: 1fr;
		}
	}
	.affiliations {
		margin-top: 16px;
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
	}
	.outreach {
		grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
	}

	.tile {
		position: relative;
		z-index: 1;
		padding: 32px;
		background: rgba(255, 252, 244, 0.88);
		border: 1.5px solid rgba(31, 28, 23, 0.35);
		border-radius: var(--border-radius);
		transition:
			box-shadow 0.2s,
			border-color 0.2s;
	}

	/* Clickable cards only, matching the site's linked cards (Home's .learning-card):
	   darker border, hard offset shadow, arrow nudges right */
	.tile.linked:hover {
		border-color: rgba(31, 28, 23, 0.75);
		box-shadow: 4px 4px 0 var(--color-gray-400);
	}

	.link-label svg {
		transition: transform 0.2s ease;
	}

	.tile.linked:hover .link-label svg {
		transform: translateX(4px);
	}

	.label {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.tile h3 {
		margin: 14px 0 0;
		font-weight: 400;
		font-size: 28px;
		line-height: 1.15;
	}

	.theme-card {
		padding: 28px;
	}

	/* A little tighter in the network, where five of them sit beside the papers */
	.network-ground .theme-card {
		padding: 22px 24px;
	}

	.theme-card h3 {
		font-size: 24px;
	}

	.tile p {
		margin: 14px 0 0;
		font-size: 15px;
		line-height: 1.6;
		color: rgba(31, 28, 23, 0.8);
	}

	.project-card {
		display: flex;
		flex-direction: column;
		padding: 24px;
	}

	/* Fades the background constellation out behind the research network, so the two don't mix */
	.network-ground {
		position: relative;
	}

	.network-ground::before {
		content: '';
		position: absolute;
		inset: -40px calc(50% - 50vw);
		z-index: -1;
		pointer-events: none;
		background: radial-gradient(
			ellipse 60% 55% at 50% 50%,
			color-mix(in srgb, var(--color-bg) 94%, transparent) 60%,
			transparent
		);
	}

	.project-row {
		display: grid;
		grid-template-columns: 110px 1fr;
		align-items: center;
		gap: 18px;
		padding: 14px 18px 14px 14px;
	}

	.thumb {
		height: 82px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		background: #fff;
		border: 1px solid rgba(31, 28, 23, 0.15);
		border-radius: var(--border-radius);
	}

	.thumb :global(picture) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.thumb :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.thumb span {
		font-family: var(--serif-display);
		font-size: 26px;
		font-weight: 300;
		color: rgba(31, 28, 23, 0.4);
	}

	.project-row h4 {
		margin: 0;
		font-weight: 400;
		font-size: 17px;
		line-height: 1.3;
	}

	.project-row .link-label {
		margin-top: 8px;
		font-size: 12px;
	}

	/* Paper figures have white grounds and mixed shapes: a white frame of fixed shape, figure contained */
	.figure {
		margin-bottom: 20px;
		padding: 10px;
		aspect-ratio: 4 / 3;
		/* without this a narrower figure stretches the frame past 4:3 */
		overflow: hidden;
		background: #fff;
		border: 1px solid rgba(31, 28, 23, 0.15);
		border-radius: var(--border-radius);
	}

	/* enhanced:img renders <picture><img>: the picture must fill the frame for img's 100% to work */
	.figure :global(picture) {
		display: block;
		height: 100%;
	}

	.figure :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.affiliations h4 {
		margin: 12px 0 0;
		font-weight: 400;
		font-size: 24px;
		line-height: 1.2;
	}

	.project-card h4 {
		margin: 10px 0 0;
		font-weight: 400;
		font-size: 19px;
		line-height: 1.3;
	}

	/* Venue sits at the bottom, so cards in a row line up whatever their title length */
	.project-card .link-label {
		margin-top: auto;
		padding-top: 18px;
		font-size: 13px;
	}

	.leaders {
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	/* No tile: the photo's beige walls sit on the page color, with the edges faded into it */
	.leader {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 40px;
		color: inherit;
		text-decoration: none;
	}

	.leader img {
		width: min(440px, 100%);
		height: auto;
		mask-image: radial-gradient(ellipse 72% 82% at 46% 48%, #000 55%, transparent);
	}

	.leader h4 {
		margin: 10px 0 0;
		font-weight: 300;
		font-size: clamp(30px, 3.6vw, 44px);
		line-height: 1.1;
		transition: color 0.25s ease;
	}

	.leader:hover h4 {
		color: var(--accent);
	}

	.year {
		font-family: var(--serif-display);
		font-size: 44px;
		font-weight: 300;
		color: var(--accent);
	}

	.tile p.honor-title {
		margin-top: 12px;
		font-size: 16px;
		line-height: 1.55;
		color: rgba(31, 28, 23, 0.88);
	}

	.tile p.honor-body {
		margin-top: 8px;
		font-size: 13px;
		color: rgba(31, 28, 23, 0.7);
	}

	.tile p.honor-text {
		margin-top: 16px;
		font-size: 14px;
		line-height: 1.55;
		color: rgba(31, 28, 23, 0.78);
	}

	.outreach .tile {
		--pad: clamp(24px, 4vw, 40px);
		display: block;
		overflow: hidden;
		padding: var(--pad);
		min-height: 240px;
	}

	/* Bleeds to the card's edges. 16:10 is the cosmo-notes screenshot's own shape, so it is never
	   cropped; other images (the npj banner) fill the same frame so the cards line up */
	.preview {
		margin: calc(-1 * var(--pad)) calc(-1 * var(--pad)) 24px;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		border-bottom: 1.5px solid rgba(31, 28, 23, 0.35);
	}

	.preview :global(picture) {
		display: block;
		height: 100%;
	}

	.preview :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.outreach h3 {
		margin-top: 16px;
		font-size: 40px;
		line-height: 1.1;
	}

	.preview + h3 {
		margin-top: 0;
	}

	.card-link {
		color: inherit;
		text-decoration: none;
	}

	.card-link::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.tags {
		position: relative;
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
	}

	.tag {
		display: inline-block;
		padding: 5px 12px;
		border: 1px solid rgba(166, 63, 42, 0.45);
		border-radius: 999px;
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--accent);
		text-decoration: none;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.tag:hover {
		background: var(--accent);
		color: #fff;
	}

	.outreach .tile p {
		margin-top: 16px;
		max-width: 460px;
		font-size: 16px;
		color: rgba(31, 28, 23, 0.85);
	}

	.link-label {
		margin-top: 28px;
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 14px;
		color: var(--accent);
	}

	/* Hand-drawn animals around the sections */
	.deco {
		position: absolute;
		z-index: 0;
		height: auto;
		pointer-events: none;
		user-select: none;
	}
	@media (max-width: 860px) {
		.deco {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ln,
		.const-inner {
			animation: none;
		}
	}
</style>
