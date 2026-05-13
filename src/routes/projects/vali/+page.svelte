<script>
  import Meta from "$lib/components/Meta.svelte";
  import TarotCard from '$lib/components/TarotCard.svelte';
  import ValiHero from '$lib/components/ValiHero.svelte';
  import heroImg from '$lib/assets/ai-use/cave_lost_bits.jpg?enhanced';
  import aboutImg from '$lib/assets/ai-use/how_do_llms_work.jpg?enhanced';
  import fractalImg from '$lib/assets/ai-use/fractal.jpg?enhanced';
  import isThisAiImg from '$lib/assets/ai-use/is_this_ai.jpg?enhanced';
  import smallnessImg from '$lib/assets/ai-use/smallness_of_worlds.jpg?enhanced';
  import garden from '$lib/assets/ai-use/garden.png';
  import Timeline from '$lib/components/Timeline.svelte';
  import acknowledgements from './acknowledgements.csv';
  import vcsiLogo from '$lib/assets/ai-use/Roboctopus_2024.png?enhanced';
  import epscorLogo from '$lib/assets/ai-use/vt_epscor_logo2.svg';
  import versoLogo from '$lib/assets/ai-use/verso.png?enhanced';
  
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    .header {
      background: #faf8f3 !important;
    }
    .header.scrolled {
      background: #faf8f3 !important;
    }
    body {
      background-color: #faf8f3 !important;
    }
    main.page {
      max-width: 100% !important;
      padding: 0 !important;
    }
    footer.footer {
      margin-top: 0 !important;
    }
  </style>
</svelte:head>

<Meta
  title="VALI — Vermont AI Literacy Initiative"
  description="Hands-on, visually engaging curriculum that teaches how AI works from the inside out — for K-12+ learners in Vermont and beyond."
/>

<div class="vali">

<!-- HERO -->
<ValiHero
  eyebrow="Vermont AI Literacy Initiative · UVM"
  title="<em>Every Output<br>Comes From Somewhere</em>"
  tagline="Vermont AI Literacy Initiative (VALI)"
  description="Hands-on, visually engaging curriculum that teaches how AI works from the inside out — building helpful intuition and healthy skepticism for all skill levels, without significant math or computational pre-requisites. Designed for and in collaboration with diverse K–12+ populations. Piloting in Vermont, beginning in 2026."
  tags={[
    { label: 'K–12', highlight: true },
    { label: 'Equitable', highlight: true },
    { label: 'Virtual + Hands-On' },
    { label: 'Open source (in development)' },
  ]}
  actions={[
    { label: 'Express interest', href: '#interest' },
    { label: 'See curriculum (in development) &rarr;', href: '#modules', ghost: true },
  ]}
  image={heroImg}
/>

<!-- ABOUT -->
<section class="about" id="about">
  <div class="wrap about-grid">
    <div>
      <p class="eyebrow">Vermont AI Literacy Initiative</p>
      <h2>Demystifying AI because everyone deserves to understand it</h2>
      <p class="lead">As large language models (LLMs) rapidly become part of everyday life (at least, for now), all students and teachers need the foundation necessary to interact with them relatively safely, effectively, and responsibly — not just those in well-resourced environments. We're an interdisciplinary team at UVM's Vermont Complex Systems Institute with strengths in computational linguistics, deep learning, and STEM outreach. Our goal is to co-create a compact, informative, adaptable curriculum that explains the inner workings of AI using metaphor, visual aids, and hands-on activities alongside stakeholders from Vermont communities. Researchers studying AI are acquiring expertise, but that expertise is relatively siloed, and often contained in idiosyncratic representations. We want to translate key lessons from that expertise to accessible language that learners of all skill levels can engage with and apply.</p>
      <div class="stats">
        <div><p class="stat-n">K–12</p><p class="stat-l">Target audience</p></div>
        <div><p class="stat-n">Vermont</p><p class="stat-l">Classroom pilots, beginning Fall 2026</p></div>
        <div><p class="stat-n">Free</p><p class="stat-l">Open access, always (in development)</p></div>
      </div>
    </div>
    <enhanced:img src={aboutImg} alt="How do LLMs work — diagram" class="about-img" />
  </div>
</section>

<!-- OBJECTIVES -->
<section class="objectives">
  <div class="wrap">
    <p class="eyebrow">Learning objectives</p>
    <h2>What students will walk away with</h2>
    <div class="obj-grid">
      <div class="obj">
        <p class="obj-n">01</p>
        <p class="obj-t">Understanding the mechanics through metaphor and hands-on activities</p>
        <p class="obj-d">Practicable intuition around embeddings, transformers, and plausible token generation.</p>
      </div>
      <div class="obj">
        <p class="obj-n">02</p>
        <p class="obj-t">Recognizing pitfalls & biases</p>
        <p class="obj-d">Understanding where language models currently fail and how they enact bias through social and technical mechanisms.</p>
      </div>
      <div class="obj">
        <p class="obj-n">03</p>
        <p class="obj-t">Confidence and healthy skepticism</p>
        <p class="obj-d">The confidence to use generative AI tools paired with the critical lens to question what they produce and how they produce it — building toward critical engagement with AI as students encounter it in a variety of contexts.</p>
      </div>
    </div>
  </div>
</section>

<!-- MODULES -->
<section class="modules" id="modules">
  <div class="wrap">
    <p class="eyebrow">Curriculum series</p>
    <h2>Visual, hands-on, teacher-ready.</h2>
    <p class="lead">Our first 3 modules are in active development and will be available for classroom pilots beginning in Fall 2026. Each is designed as a 1–2 hour lesson, but can be dialed up or down in terms of content depth and required time. No prior AI knowledge required, for students or teachers. We plan to create open source, virtual materials that can be accessed online or printed, and physical manipulables and activity plans that won't require classroom access to computers.</p>
    <div class="mod-grid">
      <div class="mod">
        <p class="mod-label">Coming Fall 2026 &middot; VALI</p>
        <h3 class="mod-title">How AI generates language: stochasticity, determinism, the Distributional Hypothesis, and emergence</h3>
        <p class="mod-desc">Architectural components such as embeddings, neural nets, and plausible token prediction objective functions, explained through metaphor, visual aids, and hands-on activities.</p>
        <div class="painting-frame">
          <div class="painting-mat">
            <enhanced:img src={fractalImg} alt="Fractal illustration" class="mod-img" />
          </div>
        </div>
      </div>
      <div class="mod">
        <p class="mod-label">Coming Fall 2026 &middot; VALI</p>
        <h3 class="mod-title">Biases, pitfalls, and AI skepticism: embodied cognition and complex sociotechnical systems</h3>
        <p class="mod-desc">Building actionable intuition for when and why AI tools "fail" — and why that matters. Students interrogate AI outputs and develop a critical vocabulary for navigating these tools in their own lives.</p>
        <div class="painting-frame">
          <div class="painting-mat">
            <enhanced:img src={isThisAiImg} alt="Is this AI — illustration" class="mod-img" />
          </div>
        </div>
      </div>
      <div class="mod">
        <p class="mod-label">Coming Fall 2026 &middot; VALI</p>
        <h3 class="mod-title">Cultural stewardship and production: the extended mind, offloaded cognition, the commons, and the environment</h3>
        <p class="mod-desc">Understanding the sociotechnical landscape within which AI tools are deployed — and why that matters. Students learn about the tradeoffs that could come with AI and its potential and actual dangers.</p>
        <div class="painting-frame painting-frame-dark">
          <div class="painting-mat painting-mat-dark">
            <enhanced:img src={smallnessImg} alt="Smallness of worlds — illustration" class="mod-img" />
          </div>
        </div>
      </div>
    </div>

    <div class="mod-grid mod-grid-extra">
      <div class="mod">
        <p class="mod-label">Curriculum tool &middot; VALI</p>
        <h3 class="mod-title">AI Tarot Cards</h3>
        <p class="mod-desc">A set of 10–22 cards that abstract key AI concepts at a high level — crafted to support the hands-on lessons and activities, spark discussion, and give educators a flexible toolkit for critical thinking about AI. These cards aim to translate relatively siloed AI expertise into widely accessible and intellectually productive abstractions. Designed to complement existing approaches like Stanford d.school's Machineless Machine Learning toolkit that place more emphasis on the concrete mechanisms of AI.</p>
        <div class="tarot-preview">
          <TarotCard image={garden} borderColor="black" />
        </div>
      </div>
      <div class="mod">
        <p class="mod-label">Sample activities</p>
        <h3 class="mod-title">What students might do</h3>
        <p class="mod-desc mod-desc-activities">Activities are designed to be adapted by educators for different class sizes, ages, and time constraints. Examples in development:</p>
        <ul class="activity-list">
          <li>A digital golf-like game where students add words to a prompt to shift next-token probabilities to steer a ball into a hole — visualized as a ball rolling over a changing landscape altered by the addition of tokens to the prompt, analogizing the objective function as a kind of terraformer of the latent space.</li>
          <li>A networked "telephone" game where students model how feedback and error propagate during model training and learn the fundamental components of neural networks.</li>
          <li>Layering transparent acetate sheets to show how simple learned features combine into complex output, without any single layer being able to describe the final picture. This is a close analogy to matrix decomposition (SVD/PCA), which is integral to modern computation, including AI, and, on the other hand, a cautionary metaphor for how complex output can arise from simple pieces but be misinterpreted to impute Human Theory of Mind.</li>
        </ul>
      </div>
    </div>

    <p class="modules-note">Specific module formats, delivery modes, and sequencing are in development. More details coming as the curriculum takes shape. Have ideas or want to be involved? <a href="#interest">Get in touch &rarr;</a></p>
  </div>
</section>

<!-- TEAM + PARTNERS -->
<section class="team" id="team">
  <div class="wrap">
    <div class="team-2col">
      <div>
        <p class="eyebrow">The team</p>
        <h2>Scientists, educators, artists, and STEM communicators</h2>
        <p class="lead">Based at UVM's <a href="https://vermontcomplexsystems.org/" target="_blank" rel="noopener noreferrer" class="green-link">Vermont Complex Systems Institute</a>, with strengths in demystifying LLMs via computational linguistics and deep learning, building interactive and visually appealing computational stories, and engaging the broader community on STEM topics.</p>
        <!-- Core Team -->
        <div class="team-list">
          <div class="team-member">
            <p class="person-name">Dr. Julia Witte Zimmerman</p>
            <p class="person-role">Postdoctoral Associate in Artificial Intelligence and Computational Social Science &middot; Co-lead</p>
          </div>
          <div class="team-member">
            <p class="person-name">Calla Beauregard</p>
            <p class="person-role">PhD Candidate &middot; Co-lead</p>
          </div>
          <div class="team-member last">
            <p class="person-name">Bryn Loftness</p>
            <p class="person-role">PhD Candidate &middot; Co-lead</p>
          </div>
        </div>

        <!-- Mentors / PIs -->
        <div class="team-list mentors">
          <div class="team-member">
            <p class="person-name">Kristine Harootunian</p>
            <p class="person-role">Educator, SBSD</p>
          </div>
          <div class="team-member">
            <p class="person-name">Dr. Juniper Lovato</p>
            <p class="person-role">VCSI</p>
          </div>
          <div class="team-member last">
            <p class="person-name">Alexa Woodward</p>
            <p class="person-role">VCSI</p>
          </div>
        </div>
      </div>
      <div>
        <p class="eyebrow">Outreach, community connections, and prior experience</p>
        <h2>Where we've been working</h2>
        <p class="lead">We're presenting and developing related work through community and school partnerships across Vermont and beyond. We also view this project as the natural outgrowth of some of our previous projects and affiliations, all of which provided invaluable inspiration.</p>
        <div class="partner-list">
          <a href="https://scratch.mit.edu" target="_blank" rel="noopener noreferrer" class="pchip">Scratch</a>
          <a href="https://www.girlsangle.org/page/bulletin.php" target="_blank" rel="noopener noreferrer" class="pchip">Girls' Angle Bulletin</a>
          <a href="https://momath.org" target="_blank" rel="noopener noreferrer" class="pchip">National Museum of Mathematics</a>
          <a href="https://girlswhocode.com/" target="_blank" rel="noopener noreferrer" class="pchip">Girls Who Code</a>
          <a href="https://vtworksforwomen.org/program/rosies-girls-afterschool/" target="_blank" rel="noopener noreferrer" class="pchip">Rosie's Girls</a>
          <span class="pchip">Local K–12 STEM teachers</span>
          <a href="https://ncwit.org/" target="_blank" rel="noopener noreferrer" class="pchip">NCWIT</a>
          <a href="https://www.uvm.edu/extension/youth/vermont-science-olympiad" target="_blank" rel="noopener noreferrer" class="pchip">Vermont Science Olympiad</a>
          <a href="https://www.uvm.edu/extension/youth" target="_blank" rel="noopener noreferrer" class="pchip">Vermont 4-H / UVM Extension</a>
          <a href="https://snellingcenter.org/leadership/vermont-leadership-institute/" target="_blank" rel="noopener noreferrer" class="pchip">Vermont Leadership Institute</a>
          <a href="https://girlcon.org/" target="_blank" rel="noopener noreferrer" class="pchip">GirlCon</a>
        </div>
        <p class="partner-cta">We're always looking for more school, community, and organizational partners; we welcome diverse opinions and backgrounds! <a href="#interest" class="green-link">Fill out the interest form &rarr;</a></p>
      </div>
    </div>

    <!-- Collaborators ticker -->
    <div class="collab-section">
      <p class="collab-label">Acknowledgements:</p>
      <div class="collab-ticker">
        <div class="collab-track">
          {#each [0, 1] as _set}
            {#each acknowledgements as person}
              <span class="collab-name">{person.name}</span>
              <span class="collab-dot"></span>
            {/each}
          {/each}
        </div>
      </div>
    </div>

    <div class="project-partners">
      <p class="eyebrow">Project partners</p>
      <p class="lead partners-lead">Organizations supporting and hosting this work. All curriculum materials will be open source.</p>
      <div class="partner-cards">
        <a href="https://vermontcomplexsystems.org/" target="_blank" rel="noopener noreferrer" class="partner-card">
          <enhanced:img src={vcsiLogo} alt="VCSI" class="partner-logo-img" />
          <p class="partner-card-name">Vermont Complex Systems Institute</p>
          <p class="partner-card-role">Host institution</p>
        </a>
        <a href="https://epscor.w3.uvm.edu/bree/" target="_blank" rel="noopener noreferrer" class="partner-card">
          <img src={epscorLogo} alt="Vermont EPSCoR" class="partner-logo-img" />
          <p class="partner-card-name">Vermont EPSCoR; SOCKS grant, NSF OIA 2242829</p>
          <p class="partner-card-role">Project partner</p>
        </a>
        <a href="https://verso.w3.uvm.edu/" target="_blank" rel="noopener noreferrer" class="partner-card">
          <enhanced:img src={versoLogo} alt="VERSO" class="partner-logo-img" />
          <p class="partner-card-name">VERSO</p>
          <p class="partner-card-role">Project partner</p>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- TIMELINE -->
<section class="timeline-sec" id="timeline">
  <div class="wrap">
    <p class="eyebrow">Initiative timeline</p>
    <h2>Where we are and where we're headed</h2>
    <Timeline events={[
      { date: 'Fall 2026', title: 'Vermont classroom pilots', description: 'First VALI modules piloted in Vermont K–12 classrooms. Collecting teacher and student feedback to inform the open-source release.', status: 'upcoming' },
      { date: 'Summer 2026', title: 'Educator and student research studies', description: 'Working with teachers and students to understand current AI intuition, identify gaps, and refine the curriculum before classroom pilots. Finalizing prototypes for piloting.', status: 'upcoming' },
      { date: 'May 2026', title: 'Project secures additional funding', description: '"Advancing the VCSI AI Literacy Initiative: Translational Fellowship" selected as an awardee for a VCSI Complexity Award.', status: 'done' },
      { date: 'Spring 2026', title: 'Curriculum development begins', description: 'Development of prototype interactive scrollytelling modules, hands-on activities, and educator materials — in collaboration with additional researchers and outreach partners.', status: 'done' },
      { date: 'February 2026', title: 'Initiative launches', description: 'Proposal for the Vermont AI Literacy Initiative and VALI curriculum awarded a UVM AI Innovation grant.', status: 'done' },
    ]} />
    <p class="timeline-note">More milestones, events, partnerships, and grant updates will be added here as the initiative grows.</p>
  </div>
</section>

<!-- INTEREST FORM -->
<section class="form-sec" id="interest">
  <div class="wrap form-grid">
    <div class="form-aside">
      <p class="eyebrow">Get involved</p>
      <h2>Connect with VALI</h2>
      <p class="lead">Whether you're a teacher interested in piloting, an administrator thinking about school-wide adoption, a researcher or organization looking to collaborate, or simply want to stay updated — we'd love to hear from you.</p>
      <ul class="aside-list">
        <li>Pilot the curriculum in your classroom or program</li>
        <li>Receive educator materials and training before public release</li>
        <li>Contribute feedback that shapes the final curriculum</li>
        <li>Partner as a community organization, district, or institution</li>
        <li>Collaborate on research or curriculum development</li>
        <li>Stay updated as materials are released</li>
      </ul>
    </div>
    <div class="form-card">
      <h3>Interest form</h3>
      <p>Takes about 2 minutes. Responses go directly to our team for future follow up.</p>
      <div class="form-preview">
        <p class="form-preview-text">The form asks for your name, email, school or organization, role, grade levels you work with, and what kind of involvement you're interested in.</p>
        <div class="form-fields-preview">
          <span class="field-chip">Your name</span>
          <span class="field-chip">Email</span>
          <span class="field-chip">School / org</span>
          <span class="field-chip">Your role</span>
          <span class="field-chip">Grade levels</span>
          <span class="field-chip">Interest type</span>
        </div>
      </div>
      <a href="https://qualtrics.uvm.edu/jfe/form/SV_0wg2QO0P0hS5q6y" target="_blank" rel="noopener noreferrer" class="btn form-submit-btn">Open interest form &rarr;</a>
      <p class="form-note">Opens in a new tab. Your info is used only to follow up about this program and generally gauge interest.</p>
      <div class="form-email-alt">
        <p>Prefer to reach us directly?</p>
        <a href="mailto:aiforclassrooms.vt@gmail.com" class="btn-ghost">aiforclassrooms.vt@gmail.com</a>
      </div>
    </div>
  </div>
</section>

<!-- RESOURCES -->
<section class="resources" id="resources">
  <div class="wrap">
    <p class="eyebrow">Resources & related work</p>
    <h2>This section currently under construction!</h2>
    <p class="lead resources-lead">A growing library of related work, background reading, tools, and our own outputs. We'll be adding to each of these as the initiative develops.</p>
    <div class="res-grid">
      <a href="https://ai4k12.org" target="_blank" rel="noopener noreferrer" class="res">
        <p class="res-type">Related work</p>
        <p class="res-title">AI4K12 — Five Big Ideas in AI</p>
        <p class="res-desc">AI4K12's Five Big Ideas framework is one of several national efforts shaping K–12 AI education. We'll be linking to parallel projects, proposals, and teams working in this space.</p>
      </a>
      <a href="https://complexstories.uvm.edu/tokenization" target="_blank" rel="noopener noreferrer" class="res">
        <p class="res-type">Our work &middot; Scrollytelling</p>
        <p class="res-title">Tokenization — an interactive story</p>
        <p class="res-desc">An in-progress scrollytelling story being developed by the VCSI team exploring how LLMs tokenize language — one of the core concepts in the VALI curriculum.</p>
      </a>
      <div class="res">
        <p class="res-type">Background reading & related research</p>
        <p class="res-title">Reading list</p>
        <p class="res-desc">Background reading and our own work, growing over time. To start: <a href="https://doi.org/10.1371/journal.pbio.3003243" target="_blank" rel="noopener noreferrer" class="green-link">Too poor to science (McClain, 2025)</a>; <a href="https://arxiv.org/abs/2306.06794" target="_blank" rel="noopener noreferrer" class="green-link">A blind spot for LLMs (2023)</a>; <a href="https://arxiv.org/abs/2412.10924" target="_blank" rel="noopener noreferrer" class="green-link">Tokens, the oft-overlooked appetizer (2024)</a>. More coming soon.</p>
      </div>
      <div class="res res-disabled">
        <p class="res-type">Tools & Demos</p>
        <p class="res-title">Interactive AI tools</p>
        <p class="res-desc">Tools and demos we recommend for exploring AI concepts. Coming soon.</p>
      </div>
      <a href="#interest" class="res res-highlight">
        <p class="res-type res-type-green">Coming Summer / Fall 2026</p>
        <p class="res-title">Curriculum materials</p>
        <p class="res-desc">Slide decks, activity guides, Tarot Cards, and scrollytelling modules posted here as they're developed. Sign up to be notified.</p>
      </a>
    </div>
  </div>
</section>

</div>

<style>
  /* ============================================================
     VALI DESIGN TOKENS
     ============================================================ */
  .vali {
    --green: #1a4f3a;
    --green-mid: #2d7a5a;
    --green-pale: #e8f2ec;
    --cream: #faf8f3;
    --ink: #1c1c1a;
    --ink-2: #5a5a55;
    --ink-3: #9a9a92;
    --border: rgba(28,28,26,0.1);
    --gold: #c8a84b;
    --serif: 'DM Serif Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;

    font-family: var(--sans);
    background: var(--cream);
    color: var(--ink);
    line-height: 1.7;
    font-weight: 300;
    font-size: 15px;
    width: 100vw;
    margin-left: calc(50% - 50vw);
  }

  /* ============================================================
     SHARED
     ============================================================ */
  .wrap { max-width: var(--page-max-width); margin: 0 auto; padding-inline: var(--page-padding); }
  section { padding-block: 4rem; }
  .eyebrow {
    font-size: 0.67rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 0.7rem;
  }
  h2 {
    font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.6rem);
    line-height: 1.15; margin-bottom: 0.9rem;
  }
  .lead {
    font-size: 0.95rem; color: var(--ink-2); line-height: 1.85; max-width: 58ch;
  }
  .green-link { color: var(--green); font-weight: 500; }


  /* ============================================================
     BUTTONS
     ============================================================ */
  .btn {
    background: var(--green); color: #fff; padding: 0.68rem 1.7rem;
    border-radius: 2px; text-decoration: none; font-size: 0.85rem;
    font-weight: 500; letter-spacing: 0.03em;
    transition: background 0.2s, transform 0.15s; display: inline-block;
  }
  .btn:hover { background: var(--green-mid); transform: translateY(-1px); }
  .btn-ghost {
    color: var(--green); font-size: 0.85rem; font-weight: 500;
    text-decoration: none; border-bottom: 1px solid currentColor;
    padding-bottom: 1px; transition: opacity 0.2s;
  }
  .btn-ghost:hover { opacity: 0.65; }

  /* ============================================================
     ABOUT
     ============================================================ */
  .about { background: #fff; border-bottom: 1px solid var(--border); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
  }
  .stats { display: flex; gap: 2.5rem; margin-top: 2rem; flex-wrap: wrap; }
  .stat-n { font-family: var(--serif); font-size: 2.6rem; color: var(--green); line-height: 1; }
  .stat-l {
    font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--ink-3); margin-top: 0.15rem;
  }
  .about-img { width: 100%; height: auto; border-radius: 3px; }

  /* ============================================================
     OBJECTIVES
     ============================================================ */
  .objectives { border-bottom: 1px solid var(--border); }
  .obj-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border); margin-top: 2rem;
  }
  .obj { padding: 1.8rem 1.6rem; }
  .obj + .obj { border-left: 1px solid var(--border); }
  .obj-n {
    font-family: var(--serif); font-size: 2rem;
    color: var(--green-mid); opacity: 0.4; line-height: 1; margin-bottom: 0.65rem;
  }
  .obj-t { font-weight: 500; font-size: 0.88rem; color: var(--green); margin-bottom: 0.45rem; }
  .obj-d { font-size: 0.82rem; color: var(--ink-2); line-height: 1.75; }

  /* ============================================================
     MODULES
     ============================================================ */
  .modules { background: var(--green); color: #fff; border-bottom: 1px solid var(--border); }
  .modules h2 { color: #fff; }
  .modules .lead { color: rgba(255,255,255,0.62); margin-bottom: 2.2rem; }
  .modules .eyebrow { color: var(--gold); }
  .mod-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
  .mod-grid-extra { margin-top: 2rem; }
  .mod {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 3px; padding: 1.2rem;
  }
  .mod-label {
    font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase;
    opacity: 0.48; margin-bottom: 0.4rem;
  }
  .mod-title {
    font-family: var(--serif); font-size: 0.95rem;
    margin-bottom: 0.4rem; line-height: 1.25;
  }
  .mod-desc { font-size: 0.75rem; opacity: 0.68; line-height: 1.65; margin-bottom: 0.7rem; }
  .mod-desc-activities { margin-bottom: 0.75rem; }

  /* Painting frame */
  .painting-frame {
    margin-top: 0.8rem; padding: 4px;
    background: linear-gradient(145deg, #b8944a, #8a6d30 30%, #c8a84b 50%, #8a6d30 70%, #b8944a);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .painting-mat {
    padding: 5px; background: #f5f0e8;
    box-shadow: inset 0 0 12px rgba(0,0,0,0.08);
  }
  .painting-frame-dark {
    background: linear-gradient(145deg, #8a3578, #702963 30%, #9a4088 50%, #702963 70%, #8a3578);
  }
  .painting-mat-dark {
    background: #702963;
    box-shadow: inset 0 0 2px #702963;
  }
  .painting-frame :global(.mod-img) {
    width: 100%; height: auto; display: block;
  }

  .tarot-preview {
    margin-top: 1.1rem; display: flex; justify-content: center; padding: 1rem 0;
  }
  .activity-list {
    list-style: none; display: flex; flex-direction: column; gap: 0.6rem; padding: 0;
  }
  .activity-list li {
    font-size: 0.8rem; opacity: 0.7; line-height: 1.65;
    padding-left: 0.9rem; border-left: 1.5px solid rgba(255,255,255,0.2);
  }
  .modules-note {
    font-size: 0.78rem; color: rgba(255,255,255,0.4);
    margin-top: 1.5rem; font-style: italic;
  }
  .modules-note a { color: rgba(255,255,255,0.65); text-decoration: underline; }

  /* ============================================================
     TEAM
     ============================================================ */
  .team { background: #fff; border-bottom: 1px solid var(--border); }
  .team-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .team-list {
    margin-top: 1.2rem; border: 1px solid var(--border); border-radius: 3px; overflow: hidden;
  }
  .team-list.mentors { margin-top: 0.75rem; background: var(--green-pale); }
  .team-member { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); }
  .team-member.last { border-bottom: none; }
  .person-name { font-weight: 500; margin-bottom: 0; }
  .person-role {
    font-size: 0.65rem; color: var(--green-mid);
    text-transform: uppercase; letter-spacing: 0.07em;
  }
  .team p { margin-bottom: 0; }

  /* ============================================================
     PARTNERS
     ============================================================ */
  .partner-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem; }
  .pchip {
    font-size: 0.76rem; color: var(--ink-2); padding: 0.3rem 0.8rem;
    border: 1px solid var(--border); border-radius: 100px;
    background: #fff; text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  a.pchip:hover { border-color: var(--green); color: var(--green); }
  .partner-cta {
    font-size: 0.82rem; color: var(--ink-2); margin-top: 1.5rem; line-height: 1.75;
  }

  /* Collaborator ticker */
  .collab-section { margin-top: 2rem; }
  .collab-label { font-size: 0.78rem; color: var(--ink-2); margin-bottom: 0.75rem; }
  .collab-ticker {
    overflow: hidden; position: relative;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 0.65rem 0;
  }
  .collab-ticker::before, .collab-ticker::after {
    content: ''; position: absolute; top: 0; bottom: 0; width: 40px;
    z-index: 2; pointer-events: none;
  }
  .collab-ticker::before { left: 0; background: linear-gradient(to right, #fff, transparent); }
  .collab-ticker::after { right: 0; background: linear-gradient(to left, #fff, transparent); }
  .collab-track {
    display: flex; align-items: center; gap: 0; white-space: nowrap;
    animation: ticker 38s linear infinite; width: max-content;
  }
  .collab-track:hover { animation-play-state: paused; }
  .collab-name { font-size: 0.8rem; color: var(--ink-2); font-weight: 400; padding: 0 0.85rem; flex-shrink: 0; }
  .collab-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: var(--green-mid); opacity: 0.4; flex-shrink: 0;
  }
  @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Project partner cards */
  .project-partners {
    margin-top: 2rem; padding-top: 2rem;
  }
  .partners-lead { margin-bottom: 2rem; }
  .partner-cards { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: stretch; }
  .partner-card {
    text-decoration: none; flex: 1; min-width: 180px;
    border: 1px solid var(--border); border-radius: 3px; padding: 1.5rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    transition: border-color 0.2s;
  }
  .partner-card:hover { border-color: var(--green); }
  .partner-logo-img { width: 100%; height: auto; max-height: 180px; object-fit: contain; border-radius: 2px; }
  .partner-card-name { font-weight: 500; font-size: 0.85rem; color: var(--ink); text-align: center; }
  .partner-card-role { font-size: 0.75rem; color: var(--ink-3); text-align: center; }

  /* ============================================================
     TIMELINE
     ============================================================ */
  .timeline-sec { background: #fff; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .timeline-note {
    font-size: 0.78rem; color: var(--ink-3); margin-top: 2rem; font-style: italic;
  }

  /* ============================================================
     INTEREST FORM
     ============================================================ */
  .form-sec { background: var(--green-pale); border-bottom: 1px solid var(--border); }
  .form-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 4rem; align-items: start; }
  .form-aside .lead { margin-bottom: 1.4rem; }
  .aside-list { list-style: none; margin-top: 0.4rem; padding: 0; }
  .aside-list li {
    display: flex; gap: 0.55rem; font-size: 0.83rem; color: var(--ink-2);
    padding: 0.5rem 0; border-bottom: 1px solid var(--border); line-height: 1.6;
  }
  .aside-list li::before {
    content: '\2192'; color: var(--green); font-weight: 500;
    flex-shrink: 0; margin-top: 1px;
  }
  .form-card {
    background: #fff; border: 1px solid var(--border); border-radius: 3px; padding: 2rem;
  }
  .form-card h3 { font-family: var(--serif); font-size: 1.35rem; margin-bottom: 0.3rem; }
  .form-card > p { font-size: 0.8rem; color: var(--ink-2); margin-bottom: 1.6rem; }
  .form-preview {
    border: 1px solid var(--border); border-radius: 3px; padding: 2rem;
    margin: 1.5rem 0; background: var(--cream);
    display: flex; flex-direction: column; gap: 1rem;
  }
  .form-preview-text { font-size: 0.82rem; color: var(--ink-2); line-height: 1.7; }
  .form-fields-preview { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .field-chip {
    font-size: 0.72rem; color: var(--ink-3); padding: 0.22rem 0.65rem;
    border: 1px solid var(--border); border-radius: 100px;
  }
  .form-submit-btn { display: block; text-align: center; text-decoration: none; }
  .form-note { font-size: 0.7rem; color: var(--ink-3); text-align: center; margin-top: 0.75rem; }
  .form-email-alt {
    border-top: 1px solid var(--border); margin-top: 1.5rem;
    padding-top: 1.5rem; text-align: center;
  }
  .form-email-alt > p { font-size: 0.8rem; color: var(--ink-2); margin-bottom: 0.75rem; }
  .form-email-alt .btn-ghost { font-size: 0.82rem; }

  /* ============================================================
     RESOURCES
     ============================================================ */
  .resources { background: #fff; padding-bottom: 9rem; }
  .resources-lead { margin-bottom: 2rem; }
  .res-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 1.8rem; }
  .res {
    border: 1px solid var(--border); border-radius: 3px; padding: 1.25rem;
    text-decoration: none; color: inherit; transition: border-color 0.2s; display: block;
  }
  .res:hover { border-color: var(--green); }
  .res-disabled { opacity: 0.55; cursor: default; }
  .res-highlight { background: var(--green-pale); border-color: transparent; }
  .res-type {
    font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 0.35rem;
  }
  .res-type-green { color: var(--green); }
  .res-title { font-size: 0.88rem; font-weight: 500; margin-bottom: 0.3rem; line-height: 1.35; }
  .res-desc { font-size: 0.78rem; color: var(--ink-2); line-height: 1.65; }

  /* ============================================================
     RESPONSIVE
     ============================================================ */
  @media (max-width: 840px) {
    .vali { font-size: 17px; }
    .lead { font-size: 1.05rem; }
    .about-grid, .mod-grid, .form-grid, .obj-grid, .res-grid, .team-2col {
      grid-template-columns: 1fr;
    }
    .team-2col { gap: 2.5rem; }
    section { padding-block: 3rem; }
    .obj + .obj { border-left: none; border-top: 1px solid var(--border); }
    .obj-d, .mod-desc, .res-desc { font-size: 0.9rem; }
    .obj-t, .res-title { font-size: 1rem; }
    .stats { gap: 1.5rem; margin-top: 1.2rem; }
    .stat-n { font-size: 1.6rem; }
    .mod-title { font-size: 1.05rem; }
    .mod-desc { font-size: 0.9rem; }
    .mod-label { font-size: 0.65rem; }
    .activity-list li { font-size: 0.9rem; }
  }
  @media (min-width: 841px) and (max-width: 1024px) {
    .obj-grid, .res-grid { grid-template-columns: repeat(2, 1fr); }
    .mod-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
