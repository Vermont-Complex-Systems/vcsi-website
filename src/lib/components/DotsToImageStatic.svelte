<script>
  import { onMount, onDestroy } from 'svelte';
  export let imgFilePath;
  export let numPoints = 10000;
  export let minRadius = 0.4;
  export let morphToPNGSpeed = 0.05;

  let canvas;
  let shapeTargets = [];
  let dots = [];
  let positions;
  let animationFrameId;

  async function getShapeTargetsFromImage(imgSrc, numPoints, minRadius) {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const points = [];
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const alpha = imageData.data[i + 3];
          const brightness = (r + g + b) / 3;
          if (brightness < 180 && alpha > 128) {
            const idx = i / 4;
            const x = (idx % img.width);
            const y = img.height - 1 - Math.floor(idx / img.width);
            points.push({ x, y });
          }
        }
        const cx = img.width / 2;
        const cy = img.height / 2;
        const scale = minRadius * 3 / Math.max(img.width, img.height);
        const selected = [];
        for (let i = 0; i < numPoints; i++) {
          const pt = points[Math.floor(Math.random() * points.length)];
          const nx = (pt.x - cx) * scale;
          const ny = (pt.y - cy) * scale;
          selected.push({ x: nx, y: ny });
        }
        resolve(selected);
      };
      img.onerror = reject;
      img.src = imgSrc;
    });
  }

  async function setupDots() {
    shapeTargets = await getShapeTargetsFromImage(imgFilePath, numPoints, minRadius);
    dots = [];
    positions = new Float32Array(numPoints * 2);
    for (let i = 0; i < numPoints; i++) {
      const { x, y } = shapeTargets[i];
      dots.push({ x, y });
      positions[i * 2] = x;
      positions[i * 2 + 1] = y;
    }
  }

  function drawDots() {
    const gl = canvas.getContext('webgl');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.937, 0.937, 0.937, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex Shader
    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        gl_PointSize = 4.0;
      }
    `;
    // Fragment Shader
    const fsSource = `
      precision mediump float;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
        vec3 color = vec3(0.0, 0.0, 0.0);
        gl_FragColor = vec4(color, alpha);
      }
    `;
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, numPoints);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
  }

  onMount(async () => {
    resizeCanvas();
    await setupDots();
    drawDots();
  });

  onDestroy(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
</script>

<div id="dot-container" class="flex items-center justify-center w-full h-screen">
  <canvas bind:this={canvas} class="w-full h-full"></canvas>
</div>

<style>
#dot-container {
  width: 300px;
  height: 300px;
  background-color: #EFEFEF;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
@media (max-width: 768px) {
  #dot-container {
    width: 100%;
    height: 300px;
  }
}
</style>
