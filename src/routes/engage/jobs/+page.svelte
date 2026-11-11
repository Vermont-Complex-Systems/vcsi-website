<script>
	import Meta from '$lib/components/Meta.svelte';
	import { base } from '$app/paths';
	import { ArrowDown, ArrowUpRight } from '@lucide/svelte';

	// Overview cards and ETAP postings; each fellowship section below is written out by hand so it can be customized.
	const ETAP = 'https://etap.nsf.gov/award/8558/opportunity/';
	const fellowships = [
		{ id: 'google', lab: 'Computational Ethics Lab', partner: 'Google', img: 'otter03.png', etap: `${ETAP}12105` },
		{ id: 'beta', lab: 'Computational Story Lab', partner: 'BETA', img: 'wing01.png', etap: `${ETAP}12107` },
		{ id: 'wikimedia', lab: 'Computational Story Lab', partner: 'Wikimedia', img: 'pages_flying.png', etap: `${ETAP}12106` },
		{ id: 'agora', lab: 'Joint Lab', partner: 'Agora Intelligence', img: 'laptop01.png', etap: `${ETAP}12110` },
		{ id: 'cognizant', lab: 'Neurobotics Lab', partner: 'Cognizant AI Labs', img: 'eggs01.png', etap: `${ETAP}12109` },
		{ id: 'massmutual', lab: 'PLAID Lab', partner: 'MassMutual', img: 'goggle01.png', etap: `${ETAP}12111` }
	];
</script>

<!-- Apply button linking to a fellowship's own ETAP posting -->
{#snippet apply(/** @type {string} */ id)}
	<a
		href={fellowships.find((f) => f.id === id)?.etap}
		class="apply-button"
		target="_blank"
		rel="noopener noreferrer"
	>
		Apply on NSF ETAP <ArrowUpRight size={18} />
	</a>
{/snippet}

<!-- Shared between the two Computational Story Lab fellowships -->
{#snippet storyLab()}
	<p class="lab-blurb">
		The <a href="https://compstorylab.org/" target="_blank" rel="noopener noreferrer"
			>Computational Story Lab</a
		>, co-directed by Chris Danforth and Peter Sheridan Dodds, works at the basic science level on
		complex sociotechnical systems. The lab studies how people, language, and stories move through and
		shape sociotechnical systems. Housed within the Vermont Complex Systems Institute, the lab combines
		large-scale data collection and analysis, sociotechnical experiments, and the formulation and
		simulation of theoretical models to examine contagion, meaning, emotion, and narrative across
		social media, literature, news, and other large text corpora. The lab's work also spans the
		measurement of individual and collective health and well-being, the structure of essential
		meaning, the evolution of stories and characters, and it has a long history of creating open
		measuring instruments for data-rich systems for use by researchers and the public. The lab's
		research has been supported by NSF, NIH, NASA, ONR, the MITRE Corporation, MassMutual, and
		Google, and has drawn regular coverage from venues including the BBC, the New York Times, the
		Washington Post, and National Geographic.
	</p>
{/snippet}

{#snippet danforth()}
	<p>
		<a href="{base}/who-we-are/chris">Dr. Chris Danforth</a> is Professor of Mathematics & Statistics,
		Director of the Vermont Advanced Computing Center, and co-Director of the Computational Story Lab.
		He works in applications of data science to health, with a focus on mental health, wearable
		devices, and social media. Dr. Danforth has published over 100 peer-reviewed studies and
		co-advised more than 50 graduate students. Dr. Danforth was recognized as a University Scholar in
		2024, honoring his significant academic contributions to the University of Vermont.
	</p>
{/snippet}

<Meta
	title="AIM PhD Fellowships"
	description="Six fully funded NSF PhD fellowships at the intersection of AI, Machine Learning and Data Science, each pairing a VCSI lab with an industry partner."
/>

<!-- Hero -->
<section class="hero">
	<div class="hero-text">
		<p class="kicker">Jobs · PhD positions</p>
		<h1>AIM PhD Fellowships</h1>
		<p>
			The Vermont Complex Systems Institute has received funding from the National Science
			Foundation to support six fully funded PhD fellowships at the intersection of AI, Machine
			Learning and Data Science (AIM Fellows). Each fellow will become part of a VCSI lab and will be
			paired with an industry partner working with that lab.
		</p>
		<p>
			The fellowships provide an opportunity to explore research at the intersection of academia and
			industry.
		</p>
	</div>
	<img
		src="{base}/common/assets/drawing/crow05.png"
		alt="A flock of crows"
		class="hero-image"
	/>
</section>

<div class="separator-wrapper">
	<img
		src="{base}/common/assets/drawing/tentacle.png"
		alt=""
		class="tentacle-image"
	/>
	<hr />
</div>

<!-- Eligibility -->
<section class="eligibility">
	<h2>Who can apply</h2>
	<div class="card card-lg eligibility-card">
		<p>
			To be eligible, applicants must have received <strong>honorable mention</strong> status after
			applying to the
			<a href="https://www.nsf.gov/funding/initiatives/grfp" target="_blank" rel="noopener noreferrer"
				>NSF Graduate Research Fellowship Program</a
			> (GRFP).
		</p>
		<p>
			Applicants who meet GRFP honorable mention criteria can apply for these fellowships through the
			<a href="https://etap.nsf.gov/" target="_blank" rel="noopener noreferrer">NSF ETAP platform</a>.
			Each fellowship has its own posting: use the Apply button in its section below.
		</p>
	</div>
</section>

<!-- Overview grid -->
<section class="overview">
	<h2>Six fellowships</h2>
	<p class="section-intro">Learn more about each fellowship opportunity.</p>
	<div class="overview-grid">
		{#each fellowships as f (f.id)}
			<a href="#{f.id}" class="overview-card">
				<img src="{base}/common/assets/drawing/{f.img}" alt="" />
				<div class="overview-card-text">
					<span class="lab">{f.lab}</span>
					<span class="plus">+</span>
					<span class="partner">{f.partner}</span>
				</div>
				<ArrowDown class="overview-arrow" size={20} />
			</a>
		{/each}
	</div>
</section>

<hr class="section-divider" />

<!-- Fellowship: Computational Ethics Lab + Google -->
<section id="google" class="fellowship">
	<header class="fellowship-header">
		<div>
			<p class="kicker">Fellowship 01</p>
			<h2>Computational Ethics Lab <span class="plus">+</span> Google</h2>
			{@render apply('google')}
		</div>
		<img src="{base}/common/assets/drawing/otter03.png" alt="Two otters holding hands" />
	</header>

	<p class="lab-blurb">
		The <a href="https://www.compethicslab.org/" target="_blank" rel="noopener noreferrer"
			>Computational Ethics Lab</a
		> is a post-disciplinary research group at the Vermont Complex Systems Institute working at the
		intersection of complex systems, computational social science, and philosophy. The lab studies the
		ethical dimensions of emerging technology using natural language processing, network science,
		mechanistic interpretability, and qualitative methods. Current research asks what stories large
		language models learn and distort, where individual consent breaks down in networked systems, and
		how human bias shapes the perception and detection of AI-generated content.
	</p>
	<p class="lab-blurb">
		Through this fellowship, the student will work on research on how AI and machine learning are
		reshaping open-source ecosystems, including questions about AI-generated contributions, trust
		between maintainers and contributors, and the health and sustainability of the communities that
		build shared software infrastructure. The fellow will be advised by Dr. Lovato.
	</p>

	<div class="people">
		<div class="person-card">
			<h3>Advisor</h3>
			<p>
				<a href="{base}/who-we-are/juni">Dr. Juniper Lovato</a> is Assistant Professor of Computer
				Science at the University of Vermont, a core faculty member at the Vermont Complex Systems
				Institute, and Director of the Computational Ethics Lab. Her expertise is at the intersection
				of complex systems, computational social science, survey development and analysis, natural
				language processing, ethical philosophy, and socio-technical systems research. Her work has
				been funded by NSF, the Alfred P. Sloan Foundation, and Google Open Source. Students
				interested in working with Google will join the Computational Ethics Lab to explore AI/ML
				applications in open-source ecosystems.
			</p>
		</div>
		<div class="person-card partner">
			<h3>Industry partner</h3>
			<p>
				The <a href="https://opensource.google/" target="_blank" rel="noopener noreferrer"
					>Google Open Source Programs Office</a
				> (OSPO) was founded in 2004, making it one of the first in the industry. It began by enabling
				Google to build on open-source technologies and to release Google-developed technology under
				open licenses, and expanded with the 2005 launch of Google Summer of Code to support
				mentorship and lower barriers to participation.
			</p>
			<p>
				Today the office runs programs aimed at improving the open-source ecosystem as a whole,
				including Season of Docs and efforts on open-source security. It also helps Google-led
				projects grow, among them Android, Chromium, and Go, and Google partnered with the Linux
				Foundation to create the Cloud Native Computing Foundation, which hosts Kubernetes. Google
				remains committed to supporting open-source projects, communities, and maintainers across the
				entire ecosystem.
			</p>
		</div>
	</div>
</section>

<!-- Fellowship: Computational Story Lab + BETA -->
<section id="beta" class="fellowship">
	<header class="fellowship-header">
		<div>
			<p class="kicker">Fellowship 02</p>
			<h2>Computational Story Lab <span class="plus">+</span> BETA</h2>
			{@render apply('beta')}
		</div>
		<img src="{base}/common/assets/drawing/wing01.png" alt="A wing" />
	</header>

	{@render storyLab()}

	<div class="people">
		<div class="person-card">
			<h3>Advisor</h3>
			{@render danforth()}
		</div>
		<div class="person-card partner">
			<h3>Industry partner</h3>
			<p>
				<a href="https://beta.team/" target="_blank" rel="noopener noreferrer">BETA</a> is a Vermont-based aerospace company designing, manufacturing and selling
				high-performance electric aircraft, advanced electric propulsion systems, components and
				charging systems to top operators worldwide. BETA has built and flown its family of ALIA
				aircraft, consisting of both conventional fixed-wing electric aircraft and electric vertical
				takeoff and landing aircraft, more than 200,000 nautical miles, including multiple trips across
				the United States.
			</p>
			<p>
				BETA is deploying a network of charging infrastructure across the United States and
				internationally to enable the growing industry. BETA's intentional approach to developing the
				enabling technologies necessary to electrify aviation allows BETA to serve a customer base
				across cargo and logistics, defense, passenger and medical end markets and unlock
				cost-effective and safe missions. BETA is a publicly traded company listed on the New York
				Stock Exchange.
			</p>
		</div>
	</div>
</section>

<!-- Fellowship: Computational Story Lab + Wikimedia -->
<section id="wikimedia" class="fellowship">
	<header class="fellowship-header">
		<div>
			<p class="kicker">Fellowship 03</p>
			<h2>Computational Story Lab <span class="plus">+</span> Wikimedia</h2>
			{@render apply('wikimedia')}
		</div>
		<img src="{base}/common/assets/drawing/pages_flying.png" alt="Pages flying" />
	</header>

	{@render storyLab()}

	<div class="people">
		<div class="person-card">
			<h3>Advisors</h3>
			<p>
				<a href="{base}/who-we-are/peter">Dr. Peter Dodds</a> is Professor of Mathematics &
				Statistics and Director of the Vermont Complex Systems Institute. He co-runs the
				Computational Story Lab with Chris Danforth. He was named a Fellow of the Network Science
				Society in 2022, was honored as a UVM University Scholar in 2019, and is an external faculty
				member of the Santa Fe Institute and the Complexity Science Hub in Vienna.
			</p>
			{@render danforth()}
		</div>
		<div class="person-card partner">
			<h3>Industry partner</h3>
			<p>
				The <a href="https://wikimediafoundation.org/" target="_blank" rel="noopener noreferrer">Wikimedia Foundation</a> works towards the vision of a world in which every single human being
				can freely share in the sum of all knowledge. They host a technology infrastructure that makes
				possible billions of monthly visits to Wikipedia, and are collaborating with the Computational
				Story Lab at UVM to understand collective attention through language-based instruments like
				the prototype at
				<a href="https://wikipedia.uvm.edu/" target="_blank" rel="noopener noreferrer"
					>wikipedia.uvm.edu</a
				>.
			</p>
		</div>
	</div>
</section>

<!-- Fellowship: Joint Lab + Agora Intelligence -->
<section id="agora" class="fellowship">
	<header class="fellowship-header">
		<div>
			<p class="kicker">Fellowship 04</p>
			<h2>Joint Lab <span class="plus">+</span> Agora Intelligence</h2>
			{@render apply('agora')}
		</div>
		<img src="{base}/common/assets/drawing/laptop01.png" alt="Paws typing on a laptop" />
	</header>

	<div class="people">
		<div class="person-card">
			<h3>Advisor</h3>
			<p>
				<a href="{base}/who-we-are/jgy">Dr. Jean-Gabriel Young</a> is Assistant Professor of
				Mathematics and Statistics at the University of Vermont, a core faculty member at the Vermont
				Complex Systems Institute, and co-Director of the
				<a href="https://joint-lab.github.io/" target="_blank" rel="noopener noreferrer">Joint Lab</a
				>. His interdisciplinary research intersects computational statistics, AI, complex systems, and
				forecasting. He has written over 45 peer-reviewed articles, mentored 12 graduate students and
				postdocs, and actively contributes to various open-source projects and scientific
				communities.
			</p>
			<p>
				Dr. Young also works with several industry partners, including Google, Hive.one, and Agora
				Intelligence. Students interested in working with Dr. Young will have the opportunity to be
				paired with industry mentors from Agora Intelligence exploring applied generative AI research
				in the Joint Lab.
			</p>
		</div>
		<div class="person-card partner">
			<h3>Industry partner</h3>
			<p>
				Agora Intelligence is the maker of <a href="https://tilt.io/" target="_blank" rel="noopener noreferrer">Tilt</a>, a platform for investment research and custom
				indexing. Tilt helps users translate ideas and emerging trends into baskets of public
				companies. Its natural-language interface converts user requests into structured inputs for a
				rules-based methodology engine. The company aims to make AI-assisted investment decisions
				auditable and reproducible.
			</p>
		</div>
	</div>
</section>

<!-- Fellowship: Neurobotics Lab + Cognizant AI Labs -->
<section id="cognizant" class="fellowship">
	<header class="fellowship-header">
		<div>
			<p class="kicker">Fellowship 05</p>
			<h2>Neurobotics Lab <span class="plus">+</span> Cognizant AI Labs</h2>
			{@render apply('cognizant')}
		</div>
		<img src="{base}/common/assets/drawing/eggs01.png" alt="Eggs in a nest" />
	</header>

	<p class="lab-blurb">
		The <a href="https://www.uvm.edu/neurobotics/" target="_blank" rel="noopener noreferrer"
			>UVM Neurobotics Lab</a
		> investigates bio-inspired machine learning approaches to produce more robust, adaptable, and efficient
		AI models. The lab is inspired not by specific instances of biological intelligence, but by the
		underlying processes that evolve, learn, develop, and grow naturally intelligent systems, with
		the intent to better understand and replicate these fundamental processes to increase our
		understanding of the natural world and our ability to recreate it for engineering purposes.
	</p>
	<p class="lab-blurb">
		The lab has a particular specialization in open-endedness: creating AI systems that continually
		improve and diversify like a branching evolutionary process, instead of training that converges
		on a single solution like most modern AI systems. The fellow will investigate open-endedness on
		topics shared between the UVM Neurobotics Lab and Cognizant AI Labs, which may include recursive
		self-improvement, agentic systems with multi-agent teams, quality-diversity, and evolutionary
		computation.
	</p>

	<div class="people">
		<div class="person-card">
			<h3>Advisor</h3>
			<p>
				<a href="{base}/who-we-are/nick-cheney">Dr. Nick Cheney</a> is Associate Professor of
				Computer Science and Director of the Neurobotics Lab. His foundational research has won awards
				from a wide variety of AI conferences and professional societies. He is the winner of an NSF
				CAREER Award, the ACM SIGEVO Impact Award for seminal contributions to the field of
				Evolutionary Computation, the UVM Provost's Award for Excellence in Doctoral Mentoring, and
				the UVM Inventor Hall of Fame Award for success in translating basic research to real-world
				commercial use.
			</p>
			<p>
				Dr. Cheney has published over 100 peer-reviewed studies, advised 14 graduate students, and
				has ongoing collaborations with numerous industry partners. He has led over $15M in funding
				as a PI and been involved in over $55M in funding from the NSF, DARPA, Army, USDA, NIH, NASA,
				Google, MassMutual, and the Alfred P. Sloan Foundation. His award-winning scientific
				communication videos have over 1 million views, and his work has been highlighted in media
				outlets like Wired, Popular Science, and TED.
			</p>
		</div>
		<div class="person-card partner">
			<h3>Industry partner</h3>
			<p>
				The fellow will work in close collaboration with Risto Miikkulainen, VP of AI Research at
				Cognizant AI Lab and Professor of Computer Science at the University of Texas at Austin.
			</p>
			<p>
				<a href="https://www.cognizant.com/us/en/ai-lab" target="_blank" rel="noopener noreferrer">Cognizant AI Lab (CAIL)</a> is doing basic and applied research in Evolutionary Computation and Generative AI in San Francisco. We focus in particular on neuroevolution, surrogate optimization, decision-making, and theory of evolutionary computation, as well as on LLM topics such as fine-tuning, multi-agent systems, uncertainty estimation, long-horizon reasoning, creativity, and explainability.  Research problems are often derived from real-world use cases, and the solutions integrated into the NeuroAI and NeuroSAN platforms, enabling transformative applications in health care, business, finance, and security, as well as scientific collaborations with academic institutions, and AI for Good projects. We publish the research in the standard evolution and AI venues, and often make code available through open source as well. There are opportunities for students in these areas through collaborations and internships.
			</p>
		</div>
	</div>
</section>

<!-- Fellowship: PLAID Lab + MassMutual -->
<section id="massmutual" class="fellowship">
	<header class="fellowship-header">
		<div>
			<p class="kicker">Fellowship 06</p>
			<h2>PLAID Lab <span class="plus">+</span> MassMutual</h2>
			{@render apply('massmutual')}
		</div>
		<img src="{base}/common/assets/drawing/goggle01.png" alt="A pair of goggles" />
	</header>

	<p class="lab-blurb">
		This fellowship will support one fully funded Computer Science PhD student in the PLAID Lab under
		the supervision of Dr. Joe Near for the duration of their PhD studies. The
		<a href="https://plaid.w3.uvm.edu/" target="_blank" rel="noopener noreferrer">PLAID Lab</a> at the
		University of Vermont conducts research in cybersecurity and data privacy, using techniques from
		programming languages and formal methods, AI, and HCI. Research projects have included
		development of approaches to privacy-preserving data analytics and machine learning, formal
		verification of cryptographic protocols and differential privacy, modeling and verification of
		security properties in distributed systems, and AI-based network traffic analysis for malware
		detection.
	</p>

	<div class="people">
		<div class="person-card">
			<h3>Advisor</h3>
			<p>
				<a href="{base}/who-we-are/joe-near">Dr. Joseph Near</a> is an Associate Professor in the
				Computer Science department at the University of Vermont. His primary research areas include
				cybersecurity and privacy, along with AI and programming languages. He is a core faculty
				member of the UVM Center for Computer Security and Privacy and the PLAID Lab, and an Affiliate
				of the Vermont Complex Systems Institute. Dr. Near's research has been funded by NSF, DARPA,
				IARPA, and industry collaborations, and includes work in applied cryptography, differential
				privacy, type systems and formal methods, human-computer interaction, and privacy-preserving
				machine learning.
			</p>
			<p>
				Students interested in working with Dr. Near will have the opportunity to collaborate with
				MassMutual on security, privacy, and AI-related projects. This collaboration has included
				research on new cryptographic protocols for distributed machine learning, and on threat
				modeling for network traffic analysis and data exfiltration.
			</p>
		</div>
		<div class="person-card partner">
			<h3>Industry partner</h3>
			<p>
				<a href="https://www.massmutual.com/" target="_blank" rel="noopener noreferrer">MassMutual</a> is a Fortune-500 life insurance company that employs more than 10,000 people
				worldwide. MassMutual's AI & Data Science team brings together experts in applied AI,
				statistics, and computer science, operating at the intersection of cutting-edge research and
				enterprise delivery. The team designs, builds, and deploys AI solutions to complex, high-value
				business problems, drawing on machine learning, LLMs, generative and agentic AI, and
				probabilistic modeling, with work that shapes the future of MassMutual and the life insurance
				industry more broadly.
			</p>
			<p>
				It partners closely with technology and business stakeholders across the enterprise, and it
				invests in growth through a culture of peer learning, candid feedback, and shared technical
				standards, grounded in a commitment to scientific and engineering excellence.
			</p>
		</div>
	</div>
</section>

<style>
	/* ---------------- Hero ---------------- */
	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4rem;
		padding-top: 4rem;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 55%;
	}

	.hero-text h1 {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 400;
		font-family: var(--serif);
		margin: 0;
	}

	.hero-text p:not(.kicker) {
		font-size: clamp(1.1rem, 2vw, 1.35rem);
		font-family: var(--serif);
		line-height: 1.5;
		margin: 0;
		color: var(--color-gray-700);
	}

	.hero-image {
		width: 26rem;
		max-width: 40%;
		height: auto;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	.kicker {
		font-family: var(--mono);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-gray-600);
		margin: 0;
	}

	/* ---------------- Dividers ---------------- */
	.section-divider {
		margin: 4rem 0;
		width: 100vw;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		border: none;
		border-bottom: 1px solid var(--color-gray-300);
	}

	.separator-wrapper {
		position: relative;
		margin-block: 4rem;
	}

	.separator-wrapper hr {
		margin: 0;
		width: 100vw;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		border: none;
		border-bottom: 1px solid var(--color-gray-300);
	}

	/* Rotated so it hangs from the divider into the section below, base at the right edge */
	.tentacle-image {
		position: absolute;
		top: 0;
		right: 0;
		width: 200px;
		height: auto;
		mix-blend-mode: multiply;
		transform: translateX(35%) rotate(180deg);
		pointer-events: none;
	}


	/* ---------------- Section headings ---------------- */
	h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 400;
		font-family: var(--serif);
		margin: 0 0 1.5rem;
	}

	.section-intro {
		font-family: var(--serif);
		color: var(--color-gray-700);
		margin: -0.75rem 0 2rem;
	}

	.plus {
		color: var(--color-gray-500);
		padding-inline: 0.15em;
	}

	/* ---------------- Eligibility ---------------- */
	.eligibility-card {
		/* Sits above the hanging tentacle */
		position: relative;
		z-index: 1;
		max-width: 48rem;
		font-family: var(--serif);
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.eligibility-card p:last-of-type {
		margin-bottom: 0;
	}

	.fellowship-header .apply-button {
		margin-top: 1rem;
	}

	.apply-button {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 1.5rem;
		padding: 0.7rem 1.25rem;
		/* Hardcoded like .card so it reads the same on the light card in both themes */
		background: #4a4a4a;
		color: #fafafa;
		border: 2px solid #4a4a4a;
		border-radius: var(--border-radius);
		font-family: var(--sans);
		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
		transition:
			background-color 200ms ease,
			color 200ms ease;
	}

	.apply-button :global(svg) {
		transition: transform 200ms ease;
	}

	.apply-button:hover {
		background: transparent;
		color: #4a4a4a;
	}

	.apply-button:hover :global(svg) {
		transform: translate(2px, -2px);
	}

	/* ---------------- Overview grid ---------------- */
	.overview {
		margin-top: 4rem;
	}

	.overview-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.overview-card {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 0.5px solid var(--color-gray-300);
		padding: 1rem 1rem 1.25rem;
		text-decoration: none;
		color: inherit;
		transition:
			box-shadow 0.2s,
			border 0.2s;
	}

	.overview-card:hover {
		box-shadow: 4px 4px 0px var(--color-gray-400);
		border-color: var(--color-gray-600);
	}

	.overview-card img {
		height: 9rem;
		width: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
		margin-bottom: 1rem;
	}

	.overview-card-text {
		font-family: var(--serif);
		font-size: 1.1rem;
		line-height: 1.4;
		padding-right: 1.5rem;
	}

	.overview-card-text .partner {
		font-weight: 600;
	}

	:global(.overview-arrow) {
		position: absolute;
		right: 1rem;
		bottom: 1.25rem;
		color: var(--color-primary, #007acc);
		transition: transform 0.2s ease;
	}

	.overview-card:hover :global(.overview-arrow) {
		transform: translateY(3px);
	}

	/* ---------------- Fellowship sections ---------------- */
	.fellowship {
		padding-block: 3rem;
		border-bottom: 1px solid var(--color-gray-300);
		scroll-margin-top: calc(var(--announcement-height, 0px) + var(--nav-height) + 1rem);
	}

	.fellowship:last-of-type {
		border-bottom: none;
	}

	.fellowship-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 1.5rem;
	}

	/* Alternate the drawing side from one fellowship to the next */
	.fellowship:nth-of-type(even) .fellowship-header {
		flex-direction: row-reverse;
	}

	.fellowship-header h2 {
		margin: 0.5rem 0 0;
	}

	.fellowship-header img {
		width: 14rem;
		max-height: 10rem;
		object-fit: contain;
		mix-blend-mode: multiply;
		flex-shrink: 0;
	}

	.lab-blurb {
		font-family: var(--serif);
		font-size: 1.1rem;
		line-height: 1.65;
		max-width: 52rem;
	}

	.people {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.person-card {
		background: #fafafa;
		border: 2px solid #4a4a4a;
		border-radius: var(--border-radius);
		padding: 1.5rem;
	}

	.person-card.partner {
		background: transparent;
		border-style: dashed;
	}

	:global(.dark) .person-card:not(.partner) {
		background: #f5f5f5;
	}

	.person-card h3 {
		font-family: var(--mono);
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1rem;
	}

	.person-card p {
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.person-card p:last-child {
		margin-bottom: 0;
	}

	/* ---------------- Responsive ---------------- */
	@media (max-width: 1200px) {
		.overview-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.hero {
			flex-direction: column;
			gap: 2rem;
			padding-top: 2rem;
		}

		.hero-text {
			max-width: 100%;
		}

		.hero-image {
			max-width: 80%;
		}

		.overview-grid,
		.people {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.fellowship-header,
		.fellowship:nth-of-type(even) .fellowship-header {
			flex-direction: column-reverse;
			align-items: flex-start;
		}

		.fellowship-header img {
			width: 10rem;
		}

		.tentacle-image {
			width: 120px;
			transform: translateX(25%) rotate(180deg);
		}
	}
</style>
