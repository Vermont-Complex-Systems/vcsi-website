<script>
    import Meta from "$lib/components/Meta.svelte";

    const preloadFont = [
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "https://vcsi.cmplxsys.w3.uvm.edu/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];
</script>

<Meta 
  title="SCRaPS"
  description="Student Complexity Research and Pizza Seminar."
  {preloadFont}
/>

<div class="content-wrapper">
    <div class="page-header">
        <div class="page-header-text">
            <h1>Student Complexity Research and Pizza Seminar (SCRaPS)</h1>
        </div>
        <div class="page-header-logo">
            <img src="/common/assets/logos/SCRAPS_logo.png" alt="SCRAPS" class="page-header-image" />
        </div>
    </div>
    
    <div class="program-content">
        <section>
            <div class="section-content">
                <h2>Why SCRaPS</h2>
                <p>SCRaPS is a student-organized weekly seminar group that provides undergraduates and graduates the opportunity to: (1) practice presenting research; (2) learn about each other's work; and (3) provide feedback to one another in a comfortable, low-pressure atmosphere. No professors allowed! We meet every Friday from 11:30am to 12:30pm at Innovation Hall. Lunch is provided by the Vermont Complex Systems Center, often pizza as our name suggests, along with the academic jet fuel known as coffee. All students are welcome to attend, and attendance does not obligate you to present. Come check it out!</p>
            </div>
        </section>
        
        <section>
            <div class="section-content">
                <h2>Core Activities</h2>
                <ul>
                    <li><strong>Practice Presentations:</strong> Safe space for rehearsing conference talks, thesis defenses, and job talks</li>
                    <li><strong>Feedback Workshops:</strong> Structured sessions focusing on delivery, slide design, and content organization</li>
                    <li><strong>Peer Mentoring:</strong> Pairing experienced presenters with newcomers for ongoing support</li>
                    <li><strong>Skills Development:</strong> Workshops on storytelling, visual design, and audience engagement techniques</li>
                </ul>
            </div>
        </section>
        
        <section>
            <div class="section-content">
                <h2>From the Archives</h2>
                <p>Did you know that SCRaPS is part of a long tradition of pizza eating? Here's a random excerpt from the original <a href="https://list.uvm.edu/cgi-bin/wa?A0=scraps">list server</a>.</p>
                <div class="did-you-know-cards">
                    <div class="card archive-card">
                        <h3>📧 From the SCRAPS List Server</h3>
                        <p class="archive-source">Originally posted to <a href="https://list.uvm.edu/cgi-bin/wa?A2=SCRAPS;a0b4d22b.1202&S=" target="_blank" rel="noopener noreferrer">list.uvm.edu</a></p>
                        <div class="listserv-container">
                            <div class="listserv-header">
                                <h4>SCRAPS Archives</h4>
                                <p>February 2012<br>SCRAPS@LIST.UVM.EDU</p>
                            </div>
                            
                            <div class="listserv-options">
                                <strong>Options:</strong> Use Monospaced Font | Show Text Part by Default | Show All Mail Headers
                            </div>
                            
                            <div class="listserv-actions">
                                <a href="#">Print</a> | <a href="#">Reply</a>
                            </div>
                            
                            <div class="listserv-metadata">
                                <table>
                                    <tbody>
                                        <tr><td><strong>Subject:</strong></td><td>Tomorrow's SCRAPS</td></tr>
                                        <tr><td><strong>From:</strong></td><td>Nicholas Allgaier &lt;nallgaie@UVM.EDU&gt;</td></tr>
                                        <tr><td><strong>Reply To:</strong></td><td>Nicholas Allgaier &lt;nallgaie@UVM.EDU&gt;</td></tr>
                                        <tr><td><strong>Date:</strong></td><td>Thu, 16 Feb 2012 12:41:53 -0500</td></tr>
                                        <tr><td><strong>Content-Type:</strong></td><td>text/plain</td></tr>
                                        <tr><td><strong>Parts/Attachments:</strong></td><td>text/plain (30 lines)</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="listserv-body">
<pre>Hey all,

Below you'll find the abstract for Josh's SCRAPS tomorrow, which will  
happen as usual in the Decision Theatre of Farrell Hall from 11:30 to  
12:30.  If you don't come, you shouldn't be surprised if you're  
targeted when skynet becomes self-aware...

We'll be having soup and sandwiches from Sugar Snap: yummy.  Hope to  
see you all there!

Best,
Nick

"On the Relationship Between Environmental and Morphological  
Complexity in Evolved Robots"

The principles of embodied cognition dictate that intelligent behavior  
must arise out of the coupled dynamics of an agent's brain, body, and  
environment.  While the relationship between controllers and  
morphologies (brains and bodies) has been investigated, little is  
known about the interplay between morphological complexity and the  
complexity of a given task environment.  It is hypothesized that the  
morphological complexity of a robot should increase commensurately  
with the complexity of its task environment.  Here this hypothesis is  
tested by evolving robot morphologies in a simple environment and in  
more complex environments.  More complex robots tend to evolve in the  
more complex environments lending support to this hypothesis.  This  
suggests that gradually increasing the complexity of task environments  
may provide a principled approach to evolving more complex robots.</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    </div>
</div>

<style>
    .content-wrapper {
        margin-left: var(--margin-left);
        margin-right: var(--margin-left);
    }
    
     h2 {
        font-size: 1.8rem;
        font-weight: 400;
        font-family: var(--serif);
        margin-bottom: 1rem;
        margin-top: 2.5rem;
    }
    

    p {
        font-size: 1rem;
        line-height: 1.6;
        font-family: var(--serif);
        color: var(--color-fg);
    }
    
    ul {
        font-family: var(--serif);
        color: var(--color-fg);
        padding-left: 1.5rem;
        list-style-type: disc;
    }
    
    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    
    .did-you-know-cards {
        display: flex;
        justify-content: center;
        margin-top: 1.5rem;
    }
    
    .card {
        background: var(--color-gray-50);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        transition: transform 200ms ease, box-shadow 200ms ease;
        max-width: 800px;
        width: 100%;
    }
    
    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .card h3 {
        font-family: var(--serif);
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--color-fg);
        margin: 0 0 0.75rem 0;
    }
    
    .card p {
        margin: 0 0 1rem 0;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--color-gray-300);
    }
    
    .card p:last-child {
        margin-bottom: 0;
    }
    
    .archive-source {
        font-size: 0.85rem;
        color: var(--color-gray-900);
        font-style: italic;
    }
    
    .archive-source a {
        color: var(--color-link);
        text-decoration: none;
    }
    
    .archive-source a:hover {
        text-decoration: underline;
    }
    
    .listserv-container {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        margin: 1rem 0;
        overflow: hidden;
    }
    
    .listserv-header {
        background: #054483;
        color: white;
        padding: 0.75rem 1rem;
        text-align: center;
    }
    
    .listserv-header h4 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: bold;
    }
    
    .listserv-header p {
        margin: 0.25rem 0 0 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .listserv-options,
    .listserv-actions {
        background: #e9ecef;
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
        border-bottom: 1px solid #dee2e6;
    }
    
    .listserv-actions a {
        color: #054483;
        text-decoration: none;
    }
    
    .listserv-actions a:hover {
        text-decoration: underline;
    }
    
    .listserv-metadata {
        background: white;
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
    }
    
    .listserv-metadata table {
        width: 100%;
        font-size: 0.9rem;
        border-collapse: collapse;
    }
    
    .listserv-metadata td {
        padding: 0.25rem 0.5rem 0.25rem 0;
        vertical-align: top;
    }
    
    .listserv-metadata td:first-child {
        width: 140px;
        font-weight: bold;
    }
    
    .listserv-body {
        background: white;
        padding: 1rem;
    }
    
    .listserv-body pre {
        font-family: var(--mono);
        font-size: 0.85rem;
        line-height: 1.4;
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
        color: #212529;
    }
    
    .archive-note {
        font-size: 0.9rem;
        color: var(--color-gray-600);
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .content-wrapper {
            margin-left: var(--margin-left-mobile);
            margin-right: var(--margin-left-mobile);
        }
        
        h2 {
            font-size: 1.8rem;
            font-weight: 400;
            font-family: var(--serif);
            margin-bottom: 1rem;
            margin-top: 2.5rem;
        }
        
        
        .did-you-know-cards {
            margin-top: 1rem;
        }
        
        .card {
            padding: 1rem;
        }
        
        .listserv-metadata td:first-child {
            width: 100px;
            font-size: 0.8rem;
        }
        
        .listserv-metadata td {
            font-size: 0.8rem;
        }
        
        .listserv-body pre {
            font-size: 0.75rem;
        }
    }
</style>