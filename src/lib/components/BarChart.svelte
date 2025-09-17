<script>
  import { Plot, BarY, RuleY,groupX} from "svelteplot"
  import * as d3 from "d3";

  let { papers } = $props();

    // Flatten once
    console.log(papers)
  const papersByTopic = papers.flatMap(p =>
    (p.topics || []).map(t => ({ topic: t.display_name }))
  );

  // Compute counts
  const counts = Array.from(
    d3.rollup(
      papersByTopic,
      v => v.length,
      d => d.topic
    ),
    ([topic, count]) => ({ topic, count })
  );

  // Sort + take top 20
  const top20 = counts
    .sort((a, b) => d3.descending(a.count, b.count))
    .slice(0, 20);
</script>

  <h3>Top 20 topics</h3>
  <Plot x={{ tickRotate: -90, label: "", tickRotate: 45}} y={{ grid: true }} marginRight=50>
    <BarY data={top20} x="topic" y="count" />
    <RuleY data={[0]} />
  </Plot>
