<script>
    import Meta from "$lib/components/Meta.svelte";
    import MemberCards from "$lib/components/MemberCards.svelte";
    import miscData from '$data/misc.csv';
	
    const entry = miscData.find(p => p.id === 'cnww');
    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<svelte:head>
    <link rel="preload" as="image" href="/common/assets/events/skyline.jpg" />
    <style>
        /* CNWW page: transparent header with absolute positioning */
        .header {
            position: absolute !important;
            background: transparent !important;
            border-bottom-color: transparent !important;
        }

        .header .nav-button,
        .header .nav-link,
        .header .menu-button {
            color: white !important;
        }

        .header .vcsi-logo {
            max-height: 2rem !important;
            transform: translateY(0.2rem) !important;
        }

        .header.scrolled {
            background: transparent !important;
            border-bottom-color: transparent !important;
        }

        /* Body and footer styling */
        body {
            background-color: #162F4B !important;
            transition: background-color 0.3s ease;
        }

        footer.footer {
            background-color: #162F4B !important;
            transition: background-color 0.3s ease;
        }

        footer * {
            color: white !important;
        }
    </style>
</svelte:head>

<Meta
  title="CNWW"
  description="Complex Networks Winter Workshop 2025"
  {preloadFont}
/>

<div class="page-wrapper">
<div class="hero">
    <div class="hero-content">
        <h1>Complex Networks Winter Workshop</h1>
        <p class="date">December 14th to the 19th 2025</p>
        <p class="date-small">(with arrival on the 13th and departure on the 20th)</p>
    </div>
</div>

<div class="intro-section">
    <p>The Complex Networks Winter Workshop (CNWW) is an international school that offers an extraordinary opportunity for participants to engage in rigorous transdisciplinary complexity science research alongside some of the top researchers in the field of networks.</p>
</div>

<div class="content-section">
    <div class="image-column">
        <img src="/common/assets/events/cnww_social.jpg" alt="CNWW Social" />
    </div>
    <div class="text-column">
        <p>The CNWW will focus on the themes detailed below and promote a lively, versatile and dynamic approach that includes lectures and a strong hands-on component framed by experts from a variety of disciplines. Including:</p>
        <ul>
            <li>Introduction to Network Theory</li>
            <li>Random Networks</li>
            <li>Social, Ecological, Technological Networks</li>
            <li>Epidemiological Networks</li>
            <li>Big Data and Complex Networks</li>
            <li>Complex Networks applications in Northern Research</li>
        </ul>
        <p>The training will also allow the development of interpersonal skills such as networking and international scientific collaboration, creativity and communication in a transdisciplinary research context.</p>
    </div>
</div>

<div class="content-section">
    <div class="text-column">
        <p>Up to 40 international graduate students, postdoctoral fellows and professionals from different disciplines will be accepted.</p>
        <p>Proficiency in English and some background in science or mathematics are required. Participants are expected to attend the entire session. Applicants are welcome from all geographic regions. Underrepresented minorities and women are encouraged to apply.</p>
        <p class="room-type"><strong>Application Deadline:</strong> May 15th, 2025.</p>
        <p class="room-type"><strong>Notice of acceptance:</strong> June 1st, 2025</p>
        <p class="room-type"><strong>Registration Deadline:</strong> July 1st, 2025</p>
        <h3>Application Requirements</h3>
        <ul>
            <li>Completed application form</li>
            <li>Up-to-date curriculum vitae</li>
        </ul>
        <a href="https://drive.google.com/open?id=1iEB_EwK2rvqHYBRPQsdc4rKODSO1WwyLpirm-edV10E" target="_blank" rel="noopener noreferrer" class="apply-button">Apply now!</a>
    </div>
    <div class="image-column">
        <img src="/common/assets/events/cnww_sliding.jpg" alt="CNWW Snowball" loading="lazy" />
    </div>
</div>

<div class="content-section">
    <div class="image-column">
        <img src="/common/assets/events/cnww_monastery.jpg" alt="CNWW Monastery" loading="lazy" />
    </div>
    <div class="text-column">
        <p>The Winter Workshop will be held at the historic Monastère des Augustines in Quebec City, a serene haven of wellness and heritage, originally founded in 1639.</p>
        <h3>Accommodation</h3>
        <p>All participants will stay in one of the Monastery's rooms for the entire duration of the workshop.</p>
        <p><strong>Your participation fees include:</strong></p>
        <ul>
            <li>lodging at the monastery</li>
            <li>breakfast</li>
            <li>lunch breaks</li>
            <li>coffee breaks</li>
            <li>access to the monastery</li>
            <li>guided tour of the monastery</li>
            <li>cocktail reception</li>
        </ul>
        <h3>Room Types and Related Registration Fees</h3>
        <p class="room-type"><strong>Chambre Authentique:</strong> 1451.43 CAD</p>
        <p class="room-type"><strong>Chambre Authentique Double:</strong> 1080.81 CAD per person</p>
        <p class="room-type"><strong>Contemporaine Simple:</strong> 1784.70 CAD</p>
        <p class="room-type"><strong>Contemporaine Double:</strong> 1164.15 CAD per person</p>
    </div>
</div>

<section class="faculty-section">
    <h3>Invited mentors</h3>
    <MemberCards memberIds={entry.member} />
</section>

<section class="testimonials-section">
    <h2>Testimonials</h2>

    <div class="testimonials-container">
        <div class="testimonials-list">
            <div class="testimonial-item">
                <p class="testimonial-text">"The CNWW allowed me to establish bonds with my peers in network science from around the globe. Since the workshop, I have been connecting with them and I think these could become lasting friendships that will foster collaboration and a broader, more diverse understanding of network science through casual discussion."</p>
                <p class="testimonial-signature">Sam Rosenblatt<br/>University of Vermont</p>
            </div>

            <div class="testimonial-item">
                <p class="testimonial-text">"CNWW was the perfect scholarly vacation. I learned so much, made new friends, experienced a beautiful city, and had a safe and supportive environment to take intellectual risks beyond what my typical responsibilities allow. I truly learned something from every single person I met at CNWW, and each welcomed me as someone from whom they could learn as well. I returned exhausted and exhilarated, brimming new knowledge and perspectives and excited for the cross-disciplinary connections I made with scholars from around the world. I would highly recommend participation in CNWW; the experience made me a better scholar and brought renewed vigor to my work. I am so thankful I had the opportunity to participate."</p>
                <p class="testimonial-signature">Sarah Shugars<br/>Network Science Institute, Northeastern University</p>
            </div>

            <div class="testimonial-item">
                <p class="testimonial-text">"The multiple disciplines represented by all the participants, the knowledgeable and highly approachable lecturers and mentors, the multicultural atmosphere and the historical location, the scientific content of the lectures, the imaginative research ideas, and the intense collaborative work that emerges during this event make CNWW one of most satisfying workshops that I have ever attended."</p>
                <p class="testimonial-signature">José R. Nicolás-Carlock<br/>National Autonomous University of Mexico</p>
            </div>

            <div class="testimonial-item">
                <p class="testimonial-text">"The most engaging workshop I have ever attended! The organizers put great effort in encouraging a collaborative, multi-disciplinary environment where ideas about complex networks could be explored."</p>
                <p class="testimonial-signature">Niall Keleher<br/>U.C. Berkeley</p>
            </div>
        </div>

        <div class="testimonial-images">
            <img src="/common/assets/events/cnww_snowball.jpg" alt="CNWW Activity" loading="lazy" />
            <img src="/common/assets/events/cnww_singing.jpg" alt="CNWW Social" loading="lazy" />
        </div>
    </div>
</section>

<section class="gallery-section">
    <div class="gallery-grid">
        <img src="/common/assets/events/cnww_cats.jpg" alt="CNWW" loading="lazy" />
        <img src="/common/assets/events/cnww_hot.jpg" alt="CNWW" loading="lazy" />
        <img src="/common/assets/events/cnww_restaurant.jpg" alt="CNWW" loading="lazy" />
        <img src="/common/assets/events/cnww_fireplace.jpg" alt="CNWW" loading="lazy" />
    </div>
</section>

<section class="logos-section">
    <div class="logos-grid">
        <img src="/Roboctopus_2024.png" alt="Roboctopus" />
        <img src="/UVM_Logo_Primary_Horiz_W_PunchOut.png" alt="UVM" />
        <img src="/common/assets/logos/netsi.png" alt="NetSI" />
        <img src="/common/assets/logos/rgb_logo_Sentinelle_Nord_ang.png" alt="Sentinelle Nord" />
    </div>
</section>
</div>

<style>
    .page-wrapper {
        background-color: #162F4B;
        min-height: 100vh;
    }

    .hero {
        height: 100vh;
        margin-top: calc(-1.2 * var(--nav-height, 80px));
        background-image: url('/common/assets/events/skyline.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
    }

    .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;
    }

    h1 {
        font-size: clamp(2rem, 4vw, 3.5rem);
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.2;
        text-align: center;
    }

    .date {
        font-size: clamp(1.2rem, 3vw, 2rem);
        font-family: var(--serif);
        font-weight: 400;
        color: white;
    }
   
    .date-small {
        font-size: clamp(0.6rem, 1.5vw, 1.4rem);
        font-family: var(--serif);
        font-weight: 100;
        color: white;
    }

    .intro-section {
        padding: 4rem var(--margin-left);
        max-width: 1200px;
        margin: 0 auto;
    }

    .intro-section p {
        font-size: 1.3rem;
        line-height: 1.4;
        font-family: var(--serif);
        color: white;
        text-align: center;
        margin: 0;
    }

    .content-section {
        display: flex;
        gap: 3rem;
        padding: 4rem var(--margin-left);
        align-items: center;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: 600;
        font-family: var(--sans);
        margin-bottom: 1.5rem;
        color: whitesmoke;
    }

    .image-column {
        flex: 0.8;
    }

    .image-column img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: var(--border-radius);
    }

    .text-column {
        flex: 1.2;
    }

    .text-column p {
        font-size: 1.01rem;
        line-height: 1.4;
        font-family: var(--serif);
        color: white;
        margin-bottom: 1.5rem;
    }

    .text-column ul {
        font-family: var(--serif);
        color: white;
        padding-left: 1.5rem;
        list-style-type: disc;
        margin-bottom: 1.5rem;
    }

    .text-column li {
        margin-bottom: 0.5rem;
        line-height: 1.3;
    }

    .text-column h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .text-column strong {
        font-weight: 700;
        color: white;
    }

    .text-column .room-type {
        margin-left: 2rem;
        margin-bottom: 0.5rem;
    }

    .apply-button {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.75rem 2rem;
        background-color: white;
        color: #162F4B;
        font-family: var(--sans);
        font-size: 1.1rem;
        font-weight: 700;
        text-decoration: none;
        border-radius: var(--border-radius);
        transition: all 0.2s ease;
    }

    .apply-button:hover {
        background-color: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .faculty-section {
        padding: 4rem var(--margin-left);
        max-width: 1400px;
        margin: 0 auto;
    }

    .faculty-section :global(.members-section h3) {
        color: white !important;
    }

    .faculty-section :global(.member-card) {
        color: white;
    }

    .faculty-section :global(.member-card a) {
        color: white;
    }

    .faculty-section :global(.member-info h4) {
        color: white !important;
    }

    .faculty-section :global(.member-info p) {
        color: white !important;
    }

    .testimonials-section {
        padding: 4rem var(--margin-left);
        max-width: 1400px;
        margin: 0 auto;
    }

    .testimonials-section h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        margin-bottom: 3rem;
        text-align: center;
    }

    .testimonials-container {
        display: flex;
        gap: 4rem;
        align-items: flex-start;
    }

    .testimonials-list {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .testimonial-item {
        margin-bottom: 0;
    }

    .testimonial-text {
        font-size: 1.2rem;
        line-height: 1.8;
        font-family: var(--serif);
        color: white;
        font-style: italic;
        margin-bottom: 1.5rem;
    }

    .testimonial-signature {
        font-size: 1rem;
        font-family: var(--serif);
        color: white;
        text-align: right;
        font-weight: 600;
        line-height: 1.4;
    }

    .testimonial-images {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: sticky;
        top: 6rem;
    }

    .testimonial-images img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: var(--border-radius);
    }

    .gallery-section {
        padding: 4rem var(--margin-left) 6rem;
        max-width: 1600px;
        margin: 0 auto;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    .gallery-grid img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--border-radius);
        aspect-ratio: 1;
    }

    .logos-section {
        padding: 0;
        padding-top: 3rem;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .logos-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
        align-items: center;
        padding: 4rem var(--margin-left);
        max-width: 1400px;
        margin: 0 auto;
    }

    .logos-grid img {
        width: 100%;
        height: auto;
        max-height: 100px;
        object-fit: contain;
        filter: brightness(0) invert(1);
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .hero {
            height: 100vh;
            margin-top: calc(-1.4 * var(--nav-height-mobile, 60px));
        }

        .intro-section {
            padding: 2rem var(--margin-left-mobile);
        }

        .intro-section p,
        .content-section p {
            font-size: 1.1rem;
        }

        .content-section {
            flex-direction: column;
            padding: 2rem var(--margin-left-mobile);
            gap: 2rem;
        }

        .content-section .image-column {
            order: -1;
        }

        .faculty-section {
            padding: 2rem var(--margin-left-mobile);
        }


        .testimonials-section {
            padding: 2rem var(--margin-left-mobile);
        }

        .testimonials-section h2 {
            font-size: 2rem;
        }

        .testimonials-container {
            flex-direction: column;
            gap: 2rem;
        }

        .testimonials-list {
            gap: 2rem;
        }

        .testimonial-images {
            width: 100%;
            position: static;
        }

        .gallery-section {
            padding: 2rem var(--margin-left-mobile) 3rem;
        }

        .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .logos-section {
            padding: 2rem var(--margin-left-mobile);
        }

        .logos-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .logos-grid img {
            max-height: 60px;
        }
    }
</style>