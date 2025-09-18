<!--
  @component
  Generates an SVG force simulation using [d3-force](https://github.com/d3/d3-force). The values here are defaults which you will likely have to customize because every force simulation is different. This technique comes from @plmrry.
 -->
<script>
  import { getContext } from 'svelte';
  import { forceSimulation, forceX, forceManyBody, forceCollide, forceCenter } from 'd3-force';

  const { data, width, height, xScale, xGet, rGet, zGet } = getContext('LayerCake');

  /**
   * @typedef {Object} Props
   * @property {number} [manyBodyStrength=5] - The value passed into the `.strength` method on `forceManyBody`, which is used as the `'charge'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#manyBody_strength) for more.
   * @property {number} [xStrength=0.1] - The value passed into the `.strength` method on `forceX`, which is used as the `'x'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#x_strength) for more.
   * @property {string|undefined} [nodeColor] - Set a color manually otherwise it will default to the `zScale`.
   * @property {string} [nodeStroke='#fff'] - The circle's stroke color.
   * @property {number} [nodeStrokeWidth=1] - The circle's stroke width, in pixels.
   * @property {number} [lineBreak=15] - Breaking lines for circle titles
   * @property {number} [textThresh=30] - Threshold above which we show text
   */

  /** @type {Props} */
  let {
    manyBodyStrength = 5,
    xStrength = 0.1,
    nodeColor,
    nodeStroke = '#fff',
    nodeStrokeWidth = 1,
    lineBreak = 15,
    textThresh = 30,
    onTopicClick,
    selectedTopic
  } = $props();

  /* --------------------------------------------
   * Make a copy because the simulation will alter the objects
   */
  const initialNodes = $data.map(d => ({ ...d }));

  const simulation = forceSimulation(initialNodes);

  let nodes = $state([]);
  let hoveredNode = $state(null);

  simulation.on('tick', () => {
    nodes = simulation.nodes();
  });

  /* ----------------------------------------------
   * When variables change, set forces and restart the simulation
   */
  $effect(() => {
    simulation
      .force(
        'x',
        forceX()
          .x(/** @param {any} d */ d => {
            return $width / 2;
          })
          .strength(xStrength)
      )
      .force('center', forceCenter($width / 2, $height / 2 + 15))
      .force('charge', forceManyBody().strength(manyBodyStrength))
      .force(
        'collision',
        forceCollide().radius(/** @param {any} d */ d => {
          return $rGet(d) + nodeStrokeWidth / 2; // Divide this by two because an svg stroke is drawn halfway out
        })
      )
      .alpha(1)
      .restart();
  });
</script>

{#each nodes as point}
  {@const r = $rGet(point)}
  <g
    role="button"
    tabindex="0"
    onmouseenter={() => hoveredNode = point}
    onmouseleave={() => hoveredNode = null}
    onclick={() => onTopicClick?.(point.topic)}
    style="cursor: pointer;"
  >
    <!-- Invisible larger hover area -->
    <circle
      r={Math.max(r + 10, 25)}
      fill="transparent"
      cx={point.x}
      cy={point.y}
    ></circle>
    <!-- Visible circle -->
    <circle
      class="node"
      {r}
      fill={nodeColor || $zGet(point)}
      stroke={selectedTopic === point.topic ? "#000" : nodeStroke}
      stroke-width={selectedTopic === point.topic ? 3 : nodeStrokeWidth}
      cx={point.x}
      cy={point.y}
      opacity={selectedTopic && selectedTopic !== point.topic ? 0.5 : 1}
    ></circle>
    {#if r > textThresh}
    {@const wrapTextInCircle = (text, maxChars) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        if ((currentLine + word).length <= maxChars) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    }}
    {@const lines = wrapTextInCircle(point.topic, lineBreak)}
    {@const fontSize = Math.min(Math.max(r / 4, 8), 16)}
    {@const lineHeight = fontSize * 1.2}
    <text
        x={point.x}
        y={point.y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="{fontSize}px"
        font-weight="bold"
        fill="white"
        stroke="black"
        stroke-width="0.1"
        pointer-events="none"
        style="text-shadow: 2px 2px 4px rgba(0,0,0,1);"
        >
        {#each lines as line, i}
         <tspan x={point.x} dy={i === 0 ? `-${(lines.length - 1) * lineHeight / 2}px` : `${lineHeight}px`}>
            {line}
         </tspan>
         {/each}
    </text>
    {/if}
  </g>
{/each}

<!-- Custom tooltip -->
{#if hoveredNode}
  {@const wrapText = (text, maxChars) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      if ((currentLine + word).length <= maxChars) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }}
  {@const topicLines = wrapText(hoveredNode.topic, 25)}
  {@const paperCountLine = `${hoveredNode.count} papers`}
  {@const allLines = [...topicLines, paperCountLine]}
  {@const lineHeight = 18}
  {@const tooltipWidth = Math.max(200, Math.min(300, topicLines[0]?.length * 8 + 40))}
  {@const tooltipHeight = allLines.length * lineHeight + 20}
  <g class="tooltip" pointer-events="none">
    <rect
      x={hoveredNode.x - tooltipWidth/2}
      y={hoveredNode.y - tooltipHeight - 10}
      width={tooltipWidth}
      height={tooltipHeight}
      fill="rgba(0,0,0,0.9)"
      stroke="white"
      stroke-width="1"
      rx="6"
    />
    <text
      x={hoveredNode.x}
      text-anchor="middle"
      fill="white"
      font-size="13px"
      font-weight="bold"
    >
      {#each allLines as line, i}
        <tspan 
          x={hoveredNode.x} 
          y={hoveredNode.y - tooltipHeight + 15 + (i * lineHeight)}
          font-weight={i === allLines.length - 1 ? "normal" : "bold"}
          font-style={i === allLines.length - 1 ? "italic" : "normal"}
        >
          {line}
        </tspan>
      {/each}
    </text>
  </g>
{/if}