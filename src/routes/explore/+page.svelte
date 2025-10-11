<script>
    import Meta from "$lib/components/Meta.svelte";
    import Member from "$lib/components/Member.svelte";
    import Spinner from "$lib/components/Spinner.svelte";
    import { getAllAuthorsWithPapers } from '../data.remote.js';

    const preloadFont = [
        "/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
        "/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Regular-Web.woff2",
        "/assets/fonts/atlas/AtlasGrotesk-Bold-Web.woff2",
        "/assets/fonts/atlas/AtlasTypewriter-Medium-Web.woff2"
    ];

    const TOPIC_THRESHOLD = 10;

    // Filter papers to only include topics that appear in at least 3 papers
    function filterTopics(authorData) {
        const papers = authorData.papers || [];

        // Count papers per topic
        const topicCounts = {};
        papers.forEach(paper => {
            if (paper.topics && Array.isArray(paper.topics)) {
                paper.topics.forEach(topic => {
                    const topicName = topic.display_name || topic.name;
                    if (topicName) {
                        topicCounts[topicName] = (topicCounts[topicName] || 0) + 1;
                    }
                });
            }
        });

        // Filter topics with fewer than 3 papers
        const validTopics = new Set(
            Object.entries(topicCounts)
                .filter(([_, count]) => count >= TOPIC_THRESHOLD)
                .map(([topic, _]) => topic)
        );

        // Filter papers to only include valid topics
        const filteredPapers = papers.map(paper => ({
            ...paper,
            topics: (paper.topics || []).filter(topic =>
                validTopics.has(topic.display_name || topic.name)
            )
        }));

        return {
            ...authorData,
            papers: filteredPapers
        };
    }
</script>

<Meta
    title="Explore Research"
    description="Explore all research from our OpenAlex database"
    {preloadFont}
/>

{#await getAllAuthorsWithPapers()}
    <Spinner text="Loading research data..." />
{:then author}
    <Member author={filterTopics(author)} />
{:catch error}
    <p>Error loading research data: {error.message || 'Unknown error'}</p>
{/await}
