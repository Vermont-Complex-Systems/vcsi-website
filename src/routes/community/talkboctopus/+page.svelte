<script>
    import Meta from "$lib/components/Meta.svelte";
    import talkboctopusData from '$data/talkboctopus-playlist.csv';


    // Process CSV data into video objects
    const videos = talkboctopusData
        .filter(row => row && row.id && row.title) // Filter out empty or incomplete rows
        .map(row => {
            // Extract title and abstract portions
            let description = row.description || '';
            
            // Try to extract title first
            const titleMatch = description.match(/^Title:\s*([^\n]*)/i);
            const extractedTitle = titleMatch ? titleMatch[1].trim() : '';
            
            // Extract abstract
            const abstractMatch = description.match(/Abstract:\s*([\s\S]*?)(?:\n\n|Bio:|$)/i);
            const extractedAbstract = abstractMatch ? abstractMatch[1].trim() : '';
            
            // Combine title and abstract
            let cleanDescription = '';
            if (extractedTitle) {
                cleanDescription += `Title: ${extractedTitle}\n\n`;
            }
            if (extractedAbstract) {
                cleanDescription += `Abstract: ${extractedAbstract}`;
            }
            
            // Fallback to original if no matches
            if (!cleanDescription) {
                cleanDescription = description;
            }
            
            return {
                id: row.id,
                title: row.title,
                url: `https://www.youtube.com/watch?v=${row.id}`,
                thumbnail: row.thumbnail,
                description: cleanDescription
            };
        });
</script>

<Meta 
  title="Talkboctopus"
  description="Video talks and presentations from the Vermont Complex Systems community."
  
/>

<div class="page-header no-logo">
    <div class="page-header-text">
        <h1>Talkboctopus</h1>
        <p class="intro">Watch talks and presentations from our community of researchers.</p>
    </div>
</div>

<div class="videos-grid">
    {#each videos as video}
        <div class="video-card">
            <a href="{video.url}" target="_blank" rel="noopener noreferrer" class="video-link">
                <div class="video-thumbnail">
                    <img
                        src="{video.thumbnail}"
                        alt="{video.title}"
                    />
                    <div class="play-overlay">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
                <div class="video-info">
                    <h3 class="video-title">{video.title}</h3>
                </div>
            </a>
            <div class="tooltip-trigger" title="Hover to see abstract">ⓘ</div>
            <div class="tooltip">
                {video.description}
            </div>
        </div>
    {/each}
</div>

<style>
    .intro {
        margin-bottom: 3rem;
    }
    

    .videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .video-card {
        position: relative;
        transition: transform 200ms ease, box-shadow 200ms ease;
        border-radius: var(--border-radius);
        overflow: visible;
        background: var(--color-white);
        border: 1px solid var(--color-border);
        z-index: 1;
    }
    
    .video-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 10;
    }
    
    .video-link {
        display: block;
        text-decoration: none;
        color: inherit;
    }
    
    .video-thumbnail {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        overflow: hidden;
        background: var(--color-gray-100);
    }
    
    .video-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 200ms ease;
    }
    
    .video-card:hover .video-thumbnail img {
        transform: scale(1.05);
    }
    
    .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 200ms ease;
    }
    
    .video-card:hover .play-overlay {
        background: rgba(0, 0, 0, 0.8);
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    .video-info {
        padding: 1.5rem;
    }
    
    .video-title {
        font-size: 1.2rem;
        font-weight: 600;
        font-family: var(--serif);
        margin: 0;
        color: var(--color-fg);
        line-height: 1.3;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        .videos-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .intro {
            max-width: 100%;
        }
        
        .tooltip {
            width: calc(100vw - 2rem) !important;
            max-width: none !important;
            left: 50% !important;
            right: auto !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
        }
    }
    
    /* Tooltip styles */
    .tooltip {
        position: fixed;
        background: var(--color-fg);
        color: var(--color-white);
        padding: 2rem;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
        line-height: 1.6;
        width: calc(45vw);
        max-width: 1000px;
        max-height: calc(100vh - 4rem);
        overflow-y: auto;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 200ms ease 100ms, visibility 200ms ease 100ms;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        white-space: pre-line;
        pointer-events: auto;
        box-sizing: border-box;
        
        /* Simple centering */
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        /* Ensure readable text */
        text-align: left;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    
    /* Tooltip trigger */
    .tooltip-trigger {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        cursor: help;
        z-index: 5;
    }
    
    .tooltip-trigger:hover ~ .tooltip,
    .tooltip:hover {
        opacity: 1;
        visibility: visible;
        transition: opacity 200ms ease, visibility 200ms ease;
    }
    
    /* Scrollbar styling for webkit browsers */
    .tooltip::-webkit-scrollbar {
        width: 6px;
    }
    
    .tooltip::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    
    .tooltip::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
    }
    
    .tooltip::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
    }
</style>