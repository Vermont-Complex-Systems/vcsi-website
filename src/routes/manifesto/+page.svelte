<script>
    import Meta from "$lib/components/Meta.svelte";
    import tarotCard from "$lib/assets/tarot-card-manifesto.jpg";
    import reductionismCard from "$lib/assets/tarot-card-golden-age-of-reductionism.jpg";
    import { setMode } from "mode-watcher";
    import { onMount } from "svelte";

    // Making PSD happy
    onMount(() => {
        setMode("dark");
    });
</script>

<svelte:head>
    <style>
        .header {
            display: none !important;
        }
    </style>
</svelte:head>

<Meta
  title="The Three Books of Science"
  description="A manifesto on complex systems as the third and final book in the trilogy that is science."
/>

<nav class="breadcrumb"><a href="/">Home</a> / Manifesto</nav>

<div class="page-header no-logo">
    <div class="page-header-text">
        <h1>The Three Books of Science</h1>
    </div>
</div>

<div class="content manifesto">

    <section>
        <h2>Abstract</h2>
        <p>We venture that the long evolution of science may be viewed as unfolding over three blurred epochs. The first epoch spans the slow, haphazard, error-ridden realization of scientific truths along with foundational scientific methods. The second epoch covers the discovery that everything is formed from atoms and other building blocks. And in the age of computation, the third epoch affords the science of complex systems.</p>
    </section>

    <section>
        <h2>Spoiler</h2>
        <p>The science of complex systems has always been where science was headed. It's the third and final book in the trilogy that is science. We're talking about basic, fundamental science, on par with cosmology and quantum mechanics.</p>
    </section>

    <section>
        <h2>The first book</h2>

        <p>We took thousands of years to develop science in the first place. Physics has become enormously successful but that was after thousands of years of measurement and centuries upon centuries of being harmoniously wrong about the basics. Circles instead of ellipses.</p>

        <p>Apart from the "Science is Hard" issue, religion made things a little tricky along the way. When it really mattered for Team Belief, the Number Boffins and religious leaders could work together. The adjustment from the Julian Calendar to the Gregorian is one of the great examples. Measurement and continued fractions&mdash;pure joy&mdash;brought us to the calendar we use now where every 4 years we have a leap year, every 100 we do not, but every 400 we do&mdash;the exception to the exception to the exception.<sup title="Except for the Possibly Accidental Calendrical Separatists on the island of Foula for what seems to have been a tiny mistake in 1900.">1</sup><span class="sidenote"><sup>1</sup> Except for the Possibly Accidental Calendrical Separatists on the island of <a href="https://en.wikipedia.org/wiki/Foula" target="_blank" rel="noopener">Foula</a> for what seems to have been a tiny mistake in 1900.</span> The year 2000 was gigantic for The CalendArmy<sup title="Every true fandom has to have a name.">2</sup><span class="sidenote"><sup>2</sup> Every true fandom has to have a name.</span> but went unnoticed by the calendrically indifferent&mdash;almost everyone&mdash;who were largely worried that their digital clocks might explode.</p>

        <p>This first book is a big mess. Much of it was spoken before the invention of books and papers. Most of the pages are lost. If we did have all the books, most pages would be scribbled out or covered in warnings. These unwritten and lost pages of the first book would all be filled with madnesses.</p>

        <blockquote>
            <p>"Today, we covered Og in feathers and threw him off the cliff. Og will be okay. Probably. We need more feathers. And honey"</p>
            <p>"We covered Grog in two times feathers and threw him off the cliff. More feathers."</p>
            <p>"We threw Splog off the cliff with no feathers. Not an experiment. Splog wouldn't shut up about how hunting is better than flying. He'll be okay. Unfortunately."</p>
        </blockquote>

        <p>Several pages later: "Maybe we need a bigger cliff."</p>
        <p>Later: "We found a cliff above water."</p>
        <p>Even later: "We found a cliff that's not that far above water."</p>

        <blockquote>
            <p>"The birds are too fast, we can't catch them."</p>
            <p>"Splog is our best hunter and he's still limping," said Phrog, reproachfully.</p>
            <p>"All right, back to the drawing cave. Let's try breathing underwater again. Who wants to go first?"</p>
        </blockquote>

        <p>The survivor bias for knowledge. But all of this is all in retrospect only&mdash;knowledge is hard gained.</p>

        <p>We discovered many basic things over and over before finally starting to build a platform of knowledge. The right angle triangle with squares business is completely misnamed as Pythagoras's theorem. Stigler's law of eponymy states that we routinely wrongly name scientific laws, mis-attributing them by accident, lack of knowledge, or because someone wanted to be famous <span class="ref" title="S. M. Stigler. Stigler's law of eponymy. Transactions of the New York Academy of Sciences, 39:147–157, 1980.">[1]</span>. Always with the fraud. Of course, Stigler's law of eponymy is itself misnamed and should be Robert Merton's law of eponymy. Stigler misnamed his own law to add further evidence, which is all very cheeky and naughty. Reality is reality but the mapping of reality, however good eventually, is socially constructed <span class="ref" title="P. L. Berger and T. Luckmann. The social construction of reality: A treatise in the sociology of knowledge. Penguin UK, 1991.">[2]</span>.</p>

        <p>So in the last few hundred years, we've started to pull things together by formally sharing knowledge through papers and journals (but let's not discuss peer review right now). And in the last 30 years, our ability to sort through scientific knowledge has flipped from small-scale to large-scale. We now have a different hardly search problem and it can seem impossible but we've made more connections across fields. At the heart of this has been data, and it's the move from data scarce to data rich that's helped us find which patterns and mechanisms transcend fields.</p>
    </section>

    <section>
        <h2>The second book</h2>

        <p>Once science started to become what we would now recognize as science&mdash;the word 'scientist' was only coined in 1830 or so because of consilience and the -ist is from artist&mdash;we took several hundred years to figure out the existence of atoms, DNA, viruses, the human genome, and that systems are built out of or coded by small indivisible units. All of this is still new&mdash;it's only in the early 1900s that physicists finally agreed that atoms exist. Most of them. In the year 1900, atoms were viewed as an idiotic conception by many. There's a long history of the anti-atomicism.</p>

        <p>Around 2400 years earlier, Democritus, one of those Ancient Greek Thinker Boffins, had come up with the concept of the atom: <em>a &ndash; temnein</em> (not cut).<sup title="Not recorded: Splog also thought things were made of little things but he was socially constrained to behaving like a hunter.">3</sup><span class="sidenote"><sup>3</sup> Not recorded: Splog also thought things were made of little things but he was socially constrained to behaving like a hunter.</span> That everything is made up of indivisible units. Plato apparently wanted to burn all of Democritus's books&mdash;A Distributed Denial of Science attack&mdash;which could all be just a good story. While his brand remains strong, Plato got a few things wrong. Chemists brought about what we might call the Golden Age of Reductionism, which would start around 1700 and last for hundreds of years. With some completely reasonable excursions into alchemy.<sup title="Absolutely fair play. We had transmuted all kinds of stuff beforehand into something people highly valued. Alcohol. We can make meringues out of water from a can of chickpeas.">4</sup><span class="sidenote"><sup>4</sup> Absolutely fair play. We had transmuted all kinds of stuff beforehand into something people highly valued. Alcohol. We can make meringues out of water from a can of chickpeas.</span></p>

        <p>In 1905, Einstein had a Pretty Good Year (PGY) and one of his papers showed that an atomic model of little things bouncing off other little things could give rise to Brownian motion <span class="ref" title="A. Einstein. Über die von der molekularkinetischen theorie der wärme geforderte bewegung von in ruhenden flüssigkeiten suspendierten teilchen. Annalen der Physik, 322:549–560, 1905.">[3]</span>. In 1908, Jean Perrin backed up Einstein's theory with experiments and the atom part of the second book was starting to take shape <span class="ref" title="J. B. Perrin. Mouvement brownien et réalité moléculaire. Annales de Chimie et de Physique, 18(8):1–114, 1909.">[4]</span>. A moment for Boltzmann. In 1911, which some refer to as 1BT,<sup title="A year before the Fight of the Century, The Commotion in the Ocean, The Get-Frantic in the At-lantic, The Metaphor far out from the Seashore: Iceberg versus The Titanic.">5</sup><span class="sidenote"><sup>5</sup> A year before the Fight of the Century, The Commotion in the Ocean, The Get-Frantic in the At-lantic, The Metaphor far out from the Seashore: Iceberg versus The Titanic.</span> Rutherford's experiments showed that J.J. Thompson's plum pudding model of the atom was not at all correct, or at least that the pudding was prepared with some difficulty and would be rather unappetizing.<sup title="6: To this day, no one has ever made a successful model-of-the-atom showstopper on a national baking show. 7: Rule #37: Don't do science on an empty stomach.">6,7</sup><span class="sidenote"><sup>6</sup> To this day, no one has ever made a successful model-of-the-atom showstopper on a national baking show.<br/><sup>7</sup> Rule #37: Don't do science on an empty stomach.</span></p>

        <figure class="manifesto-figure">
            <img src={reductionismCard} alt="The Golden Age of Reductionism — tarot card illustration of a magnifying glass over Au element" />
            <figcaption>The Reductioning. There Can Be Only Some … Parts.</figcaption>
        </figure>

        <p>We'll keep writing the second book as long as there are so many more building blocks to find. It's a long list, one of those heavy tail things. The rare are legion. All of the molecules, all of the species of everything on Earth. But because evolutionary processes (which includes engineers and mad scientists) will keep creating new building blocks, we'll have to keep updating the second book. New viruses are always fun. LEGOS were only discovered in 1949 by some enterprising Plastics Boffins in Denmark. And we keep finding things are made out of LEGOS. And increasingly we've discovering it's not just cake that's made out of cake. This is a separate discussion, but humans, and, by inclusion, scientists&mdash;well, mostly&mdash;are really, really into food.</p>

        <p>Rutherford&mdash;in a solid instance of a New Zealander going lower than Australians in their behavior&mdash;allegedly said "All science is either physics or stamp collecting." But the second book is not just a philatelical festival. It is absolutely fundamental, bedrock science, full of wonder and magic.</p>

        <p>The atoms of course weren't the end for physicists who have very cleverly kept the money rolling in and continued to give writers material for preposterous but great science fiction (see, for example, sophons). The Tiny Things Boffins first came up with subatomic particles, then strings, then dark matter, and dark energy. They may well have played us for absolute fools, but we now have the word quark&mdash;it can't be the darkest timeline.</p>

        <p>Here's Super Boffin Feynman in Volume 1 <span class="ref" title="R. P. Feynman, R. B. Leighton, and M. Sands. The Feynman Lectures on Physics, Volume I. Addison–Wesley, Reading, MA, 1963.">[5]</span>:</p>

        <blockquote>
            <p>"If, in some cataclysm, all of scientific knowledge were to be destroyed, and only one sentence passed on to the next generation of creatures, what statement would contain the most information in the fewest words?</p>
            <p>"I believe it is the atomic hypothesis that all things are made of atoms&mdash;little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another.</p>
            <p>"In that one sentence, you will see, there is an enormous amount of information about the world, if just a little imagination and thinking are applied."</p>
        </blockquote>
    </section>

    <section>
        <h4>The third book is about complex systems&mdash;how things fit together, how things stay together, how things fall apart</h4>

        <p>What's a complex system? A complex system is a distributed system of many interconnected parts, not governed by any dominant centralized control, possibly with networked structures, and, crucially, one that has emergent behavior <span class="ref" title="6: G. H. Lewes. Problems of Life and Mind, Vol. II, 1875. 7: P. W. Anderson. More is different. Science, 177(4047):393–396, 1972.">[6, 7]</span>. Emergent phenomena are everywhere, from raw physical systems up through all levels of increasingly algorithmic and computational phenomena.<sup title="The advent of life is the advent of algorithms.">8</sup><span class="sidenote"><sup>8</sup> The advent of life is the advent of algorithms.</span></p>

        <p>Emergence is the key: We see patterns and structures and dynamics at the system scale that are not present in the parts.</p>

        <ul class="emergence-list">
            <li>There's no hurricane in a water molecule.</li>
            <li>No financial collapse in a dollar bill.</li>
            <li>No justice in a carbon atom.</li>
            <li>No Shakespeare play in 26 letters and some punctuation.</li>
        </ul>

        <p>Good luck searching for Romeo and Juliet in Borges's fictional hexagons-are-the-bestagons-based library. Disappointingly, you will continue to find something like Robeo and Muliet in the functional infinity of adjacent texts, if you can ever make it that close.</p>

        <p>Emergence is so confounding that ideas like a homunculus have found their way into boffin brains, which is some kind of inception of self.</p>
    </section>

    <section>
        <h2>A modest manifesto</h2>

        <p>Complex systems are everywhere. The systems that matter most are undisciplinary, increasingly of global scale, and involve the behavior of people, physics, and algorithms. We have social systems, information systems, economies, energy systems, food systems, pandemics, political systems, entertainment, sports, artificial intelligence systems, and of course, real stupidity systems <span class="ref" title="C. M. Cipolla. The basic laws of human stupidity. In Allegro ma non troppo. 1988. Originally written in English in 1976.">[8]</span>.</p>

        <p>We are in a renaissance time in science where understanding complex systems is now available to us, for three reasons:</p>

        <p><strong>One:</strong> There are universal mechanisms, patterns, and dynamics that appear across disparate systems. Knowledge of systems is not bespoke and siloed. It could have been! That there is one set of equations that describes the dynamics of water, air, and the Earth, and maple syrup was not obvious (but nothing is obvious).</p>

        <p><strong>Two:</strong> Our ability to measure everything continues to expand enormously, and we continue to move fields from being data scarce to data rich, from non-computational to computational. Computational physics, computational biology, computational medicine, computational social sciences, computational humanities.<sup title="A field being data rich does not mean the end of small data work. Computational sciences are complementary to not obliterating of a field's work. That said, most no-data or small-data theories will not survive contact with data. Kudos again to Tiny Things Boffins.">10</sup><span class="sidenote"><sup>10</sup> A field being data rich does not mean the end of small data work. Computational sciences are complementary to not obliterating of a field's work. That said, most no-data or small-data theories will not survive contact with data. Kudos again to Tiny Things Boffins.</span></p>

        <p>And <strong>three:</strong> We can computationally simulate real complex systems and experiment with hypothetical ones, all with increasing power. Advanced computing facilities are our blackboards.</p>

        <p>And we're finally seeing this transition in the big awards: The 2024 Nobel prizes in physics and chemistry went to "computational scientists" whose work<sup title="And the work of many, many others.">11</sup><span class="sidenote"><sup>11</sup> And the work of many, many others.</span> created complex systems&mdash;neural networks and AI&mdash;or simulated the once impossible like the folding of proteins. Not everyone was happy about this of course, but you know, scientists.<sup title="Non-starter alternate plan: Honor what has been uncovered by science and not the discoverers. Best new supporting species.">12</sup><span class="sidenote"><sup>12</sup> Non-starter alternate plan: Honor what has been uncovered by science and not the discoverers. Best new supporting species.</span></p>

        <p>We will always need to study the specific and the broad. Viruses, individual species, the one offs, the irreproducible accidents.</p>

        <p>But to write the third book of science, we know that we need a postdisciplinary, computational science of complex systems. We will never finish the second and third books, but their writing is the inherent mandate of science, and one we must navigate with a true moral compass.<sup title='For the Greater Good but not for the "For the Greater Good" kind of Greater Good.'>13</sup><span class="sidenote"><sup>13</sup> For the <a href="https://en.wikipedia.org/wiki/Common_good" target="_blank" rel="noopener">Greater Good</a> but not for the "<a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/UtopiaJustifiesTheMeans">For the Greater Good</a>" kind of Greater Good.</span></p>
    </section>
  
    
    <figure class="manifesto-figure">
        <img src={tarotCard} alt="The Manifesto — tarot card illustration of a shovel" />
        <figcaption>Grab a shovel. Lots to do.</figcaption>
    </figure>
    
    <p class="author-sign-off">&mdash; Peter Sheridan Dodds, October 2025 &middot; <a href="https://arxiv.org/abs/2511.00368" target="_blank" rel="noopener">arXiv:2511.00368</a></p>

    <section class="footnotes">
        <h3>Notes</h3>
        <ol>
            <li>Except for the Possibly Accidental Calendrical Separatists on the island of <a href="https://en.wikipedia.org/wiki/Foula" target="_blank" rel="noopener">Foula</a> for what seems to have been a tiny mistake in 1900.</li>
            <li>Every true fandom has to have a name.</li>
            <li>Not recorded: Splog also thought things were made of little things but he was socially constrained to behaving like a hunter.</li>
            <li>Absolutely fair play. We had transmuted all kinds of stuff beforehand into something people highly valued. Alcohol. We can make meringues out of water from a can of chickpeas.</li>
            <li>A year before the Fight of the Century, The Commotion in the Ocean, The Get-Frantic in the At-lantic, The Metaphor far out from the Seashore: Iceberg versus The Titanic.</li>
            <li>To this day, no one has ever made a successful model-of-the-atom showstopper on a national baking show.</li>
            <li>Rule #37: Don't do science on an empty stomach.</li>
            <li>The advent of life is the advent of algorithms.</li>
            <li>Remanifested from many manifestations of Principles of Complex Systems I and II, <a href="https://pdodds.w3.uvm.edu/pocsverse/">pdodds.w3.uvm.edu/pocsverse/</a>.</li>
            <li>A field being data rich does not mean the end of small data work. Computational sciences are complementary to not obliterating of a field's work. That said, most no-data or small-data theories will not survive contact with data. Which is to be expected. Kudos again to Tiny Things Boffins.</li>
            <li>And the work of many, many others.</li>
            <li>Non-starter alternate plan: Honor what has been uncovered by science and not the discoverers. Best new supporting species.</li>
            <li>For the Greater Good but not for the "For the Greater Good" kind of Greater Good.</li>
        </ol>
    </section>

    <section class="references">
        <h3>References</h3>
        <ol>
            <li>S. M. Stigler. Stigler's law of eponymy. <em>Transactions of the New York Academy of Sciences</em>, 39:147&ndash;157, 1980.</li>
            <li>P. L. Berger and T. Luckmann. <em>The social construction of reality: A treatise in the sociology of knowledge.</em> Penguin UK, 1991.</li>
            <li>A. Einstein. &Uuml;ber die von der molekularkinetischen theorie der w&auml;rme geforderte bewegung von in ruhenden fl&uuml;ssigkeiten suspendierten teilchen. <em>Annalen der Physik</em>, 322:549&ndash;560, 1905.</li>
            <li>J. B. Perrin. Mouvement brownien et r&eacute;alit&eacute; mol&eacute;culaire. <em>Annales de Chimie et de Physique</em>, 18(8):1&ndash;114, 1909. Translated into English by F. Soddy as <em>Brownian Movement and Molecular Reality</em>.</li>
            <li>R. P. Feynman, R. B. Leighton, and M. Sands. <em>The Feynman Lectures on Physics, Volume I.</em> Addison&ndash;Wesley, Reading, MA, 1963.</li>
            <li>G. H. Lewes. <em>Problems of Life and Mind, Vol. II: The Physical Basis of Mind.</em> Tr&uuml;bner and Co., London, 1875. See Chapter V, "The Nature of Emergent Effects".</li>
            <li>P. W. Anderson. More is different. <em>Science</em>, 177(4047):393&ndash;396, 1972.</li>
            <li>C. M. Cipolla. The basic laws of human stupidity. In <em>Allegro ma non troppo. Saggi satirici.</em> Societ&agrave; editrice il Mulino, Bologna, Italy, 1988. Originally written in English in 1976 for private circulation.</li>
        </ol>
    </section>


</div>

<style>
    .breadcrumb {
        max-width: 520px;
        margin-inline: auto;
        font-family: var(--sans);
        font-size: 0.85rem;
        color: var(--color-gray-700);
    }

    .breadcrumb a {
        color: var(--color-gray-700);
        text-decoration: none;
    }

    .breadcrumb a:hover {
        color: var(--color-fg);
        text-decoration: underline;
    }

    .page-header {
        max-width: 520px;
        margin-inline: auto;
        text-align: center;
    }

    .page-header h1 {
        font-family: "ET Book", var(--serif);
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-black, #000);
    }

    .manifesto {
        font-family: "ET Book", var(--serif);
        font-size: 1.1rem;
        line-height: 1.8;
        max-width: 520px;
        margin-inline: auto;
        overflow: visible;
    }

    .manifesto h2 {
        font-family: "ET Book", var(--serif);
        margin-top: 3rem;
        font-size: 1.5rem;
    }

    .manifesto h4 {
        font-family: "ET Book", var(--serif);
        margin-top: 3rem;
        margin-bottom: 1.2rem;
        font-size: 1.2rem;
        line-height: 1.2rem;
    }

    blockquote {
        border-left: 3px solid var(--color-gray-300);
        padding-left: 1.5rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: var(--color-gray-700);
    }

    blockquote p {
        width: 100% !important;
        margin-bottom: 0.5rem;
    }

    .emergence-list {
        list-style: none;
        padding-left: 0;
        margin: 1.5rem 0;
    }

    .emergence-list li {
        padding: 0.25rem 0;
        font-style: italic;
    }

    .emergence-list li::before {
        content: "\2022";
        margin-right: 0.75rem;
        color: var(--color-gray-700);
    }

    /* Sidenote number in body text */
    sup[title], .ref {
        cursor: help;
    }

    sup {
        font-size: 0.7em;
        line-height: 0;
        vertical-align: super;
    }

    .ref {
        font-size: 0.85em;
    }

    /* Tufte-style sidenotes in right margin */
    .sidenote {
        float: right;
        clear: right;
        margin-right: -55%;
        width: 45%;
        margin-top: 0.3rem;
        margin-bottom: 1rem;
        font-size: 0.8rem;
        line-height: 1.4;
        color: var(--color-gray-700);
    }

    .sidenote sup {
        margin-right: 0.2em;
    }

    .footnotes, .references {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--color-gray-300);
    }

    .footnotes ol, .references ol {
        padding-left: 1.5rem;
    }

    .footnotes li, .references li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .manifesto-figure {
        text-align: center;
        margin: 3rem auto 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .manifesto-figure img {
        max-width: 200px;
        height: auto;
        mix-blend-mode: multiply;
    }

    .manifesto-figure figcaption {
        font-size: 0.85rem;
        font-style: italic;
        color: var(--color-gray-700);
        margin-top: 0.5rem;
    }

    .author-sign-off {
        margin-top: 3rem;
        font-style: italic;
        text-align: right;
        color: var(--color-gray-700);
    }

    /* Desktop: hide bottom footnotes since they're in margins */
    @media (min-width: 1001px) {
        .footnotes {
            display: none;
        }
    }

    /* Mobile: hide sidenotes, show footnotes at bottom */
    @media (max-width: 1000px) {
        .sidenote {
            display: none;
        }

        sup[title], .ref {
            text-decoration-line: underline;
            text-decoration-style: dotted;
            text-decoration-color: var(--color-gray-300);
            text-underline-offset: 2px;
        }
    }
</style>
