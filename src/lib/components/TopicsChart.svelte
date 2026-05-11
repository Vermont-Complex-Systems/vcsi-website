<script>
  import { LayerCake, Svg } from 'layercake';
  import * as d3 from "d3";
  import { isMobile } from '$lib/state.svelte'
  import ForceLayout from "../layerCake/CirclePackForce.svelte";
  
  let { papers = [], selectedTopic = null, onTopicClick } = $props();
  
  const papersByTopic = papers && papers.length > 0 ? papers.flatMap(p =>
    (p.topics || []).map(t => ({ topic: t.display_name }))
  ) : [];

  const counts = Array.from(
    d3.rollup(
      papersByTopic,
      v => v.length,
      d => d.topic
    ),
    ([topic, count]) => ({ topic, count })
  );
  
  let mobileForceStrength = $derived(isMobile() ? 0.02 : 0.0005);
  let mobileXStrength = $derived(isMobile() ? 0.05 : 0.0001);
  let mobileYStrength = $derived(isMobile() ? 0.02 : (counts.length > 30 ? 0.05 : 0.01));
  let yOffset = $derived(isMobile() ? 70 : 10);

  // Single, clear height calculation
  const height = $derived(
    isMobile()
      ? Math.min(120 + counts.length * 6, 500)  // vertical: scales with topics
      : Math.min(300 + counts.length * 3, 450)  // horizontal: scales with topics
  );

</script>

<div class="chart-container" style="--height: {height}px">
  <LayerCake
    data={counts}
    x={'topic'}
    r={'count'}
    z={'count'}
    xScale={d3.scaleBand()}
    rScale={d3.scaleSqrt()}
    rRange={[8, 50]}
    zScale={d3.scaleSequential(t => {
      const color = d3.interpolatePlasma(t);
      const hsl = d3.hsl(color);
      hsl.l = Math.min(hsl.l * 0.7, 0.6);
      return hsl.toString();
    })}
  >
    <Svg>
      <ForceLayout
        manyBodyStrength={mobileForceStrength}
        xStrength={mobileXStrength}
        yStrength={mobileYStrength}
        {yOffset}
        lineBreak={isMobile() ? 8 : 10}
        textThresh={isMobile() ? 25 : 20}
        vertical={isMobile()}
        {onTopicClick}
        {selectedTopic}
      />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: var(--height);
  }
</style>