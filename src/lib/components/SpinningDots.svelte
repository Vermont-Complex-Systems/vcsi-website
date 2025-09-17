<script>
  import { onMount, onDestroy } from 'svelte';
  let canvas;
  let animationFrameId;

  // Force field config
  let forceFieldRadius = 0.2; // in normalized coordinates (0=center, 1=edge)
  let forceFieldStrength = 0.15; // how strongly dots are repelled

  // Mouse tracking
  let mouseActive = false;
  let mouseNormX = 0;
  let mouseNormY = 0;

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Convert to normalized coordinates (-1 to 1, center is 0,0)
    mouseNormX = (x / rect.width) * 2 - 1;
    mouseNormY = -((y / rect.height) * 2 - 1);
    mouseActive = true;
  }
  function handleMouseLeave() {
    mouseActive = false;
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    const gl = canvas.getContext('webgl');
    if (gl) gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  onMount(() => {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: false });
    if (!gl) {
      console.error('WebGL is not supported by your browser.');
      return;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Vertex Shader
    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      attribute float a_random;
      uniform float u_rotation;
      uniform float u_time;
      void main() {
        float s = sin(u_rotation);
        float c = cos(u_rotation);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        vec2 rotatedPosition = rotationMatrix * a_position;
        gl_Position = vec4(rotatedPosition, 0.0, 1.0);
        gl_PointSize = 4.0 + 2.0 * sin(u_time * 0.002 + a_random * 30.0); // Vary size with time and random attribute
      }
    `;
    // Fragment Shader
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
        vec3 color = vec3(0.0, 0.0, 0.0); // black dots
        gl_FragColor = vec4(color, alpha);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Generate Point Data
    const numPoints = 5000;
    // Dot jump config
    const jumpDotCount = 50; // Number of dots to jump at once
    const jumpFrequency = 4000; // ms between jumps
    const jumpDuration = 1000; // ms dot stays in center

    // Dot state array
    const dots = [];
    const positions = new Float32Array(numPoints * 2);
    const randoms = new Float32Array(numPoints);
    const minRadius = 0.4;
    const maxRadius = 0.8;
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      positions[i * 2] = x;
      positions[i * 2 + 1] = y;
      randoms[i] = Math.random();
      dots.push({
        x,
        y,
        origX: x,
        origY: y,
        jumping: false,
        jumpStart: 0,
        jumpPhase: 'idle', // idle, toCenter, hold, toPerimeter
      });
    }

    // Position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Random buffer
    const randomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, randoms, gl.STATIC_DRAW);
    const randomAttributeLocation = gl.getAttribLocation(program, 'a_random');
    gl.enableVertexAttribArray(randomAttributeLocation);
    gl.vertexAttribPointer(randomAttributeLocation, 1, gl.FLOAT, false, 0, 0);
    const rotationUniformLocation = gl.getUniformLocation(program, 'u_rotation');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    let rotationAngle = 0;
    let lastJumpTime = 0;
    let jumpingIndices = [];

    function triggerJump(now) {
      // Only select idle dots
      const idleIndices = dots.map((d, i) => d.jumpPhase === 'idle' ? i : null).filter(i => i !== null);
      if (idleIndices.length < jumpDotCount) return;
      jumpingIndices = [];
      // Pick random idle dots
      while (jumpingIndices.length < jumpDotCount) {
        const idx = idleIndices[Math.floor(Math.random() * idleIndices.length)];
        if (!jumpingIndices.includes(idx)) jumpingIndices.push(idx);
      }
      jumpingIndices.forEach(idx => {
        dots[idx].jumpPhase = 'toCenter';
        dots[idx].jumpStart = now;
      });
    }

    function updateDotPositions(now) {
      // Handle jumping dots
      for (let idx of jumpingIndices) {
        const dot = dots[idx];
        const elapsed = now - dot.jumpStart;
        if (dot.jumpPhase === 'toCenter') {
          // Animate to center over 0.2s
          const t = Math.min(elapsed / 200, 1.0);
          dot.x = dot.origX * (1.0 - t);
          dot.y = dot.origY * (1.0 - t);
          if (t >= 1.0) {
            dot.x = 0.0;
            dot.y = 0.0;
            dot.jumpPhase = 'hold';
            dot.jumpStart = now;
          }
        } else if (dot.jumpPhase === 'hold') {
          // Hold at center for jumpDuration
          if (elapsed >= jumpDuration) {
            dot.jumpPhase = 'toPerimeter';
            dot.jumpStart = now;
          }
        } else if (dot.jumpPhase === 'toPerimeter') {
          // Animate back to perimeter over 0.2s
          const t = Math.min(elapsed / 200, 1.0);
          dot.x = dot.origX * t;
          dot.y = dot.origY * t;
          if (t >= 1.0) {
            dot.x = dot.origX;
            dot.y = dot.origY;
            dot.jumpPhase = 'idle';
          }
        }
      }
      // Remove finished dots from jumpingIndices
      jumpingIndices = jumpingIndices.filter(idx => dots[idx].jumpPhase !== 'idle');

      // Force field effect for non-jumping dots
      if (mouseActive) {
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          if (dot.jumpPhase !== 'idle') continue; // Don't affect jumping dots
          // Calculate distance from mouse
          const dx = dot.x - mouseNormX;
          const dy = dot.y - mouseNormY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < forceFieldRadius) {
            // Repel dot away from mouse
            const repel = (forceFieldRadius - dist) * forceFieldStrength;
            const angle = Math.atan2(dy, dx);
            dot.x += Math.cos(angle) * repel;
            dot.y += Math.sin(angle) * repel;
          } else {
            // Gradually return to original position
            dot.x += (dot.origX - dot.x) * 0.05;
            dot.y += (dot.origY - dot.y) * 0.05;
          }
        }
      } else {
        // No mouse: all dots return to original position
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          if (dot.jumpPhase !== 'idle') continue;
          dot.x += (dot.origX - dot.x) * 0.05;
          dot.y += (dot.origY - dot.y) * 0.05;
        }
      }
    }

    function updateBuffers() {
      // Update positions buffer for rendering
      for (let i = 0; i < numPoints; i++) {
        positions[i * 2] = dots[i].x;
        positions[i * 2 + 1] = dots[i].y;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    }

    function animate(timestamp) {
      rotationAngle += 0.0005;
      gl.uniform1f(rotationUniformLocation, rotationAngle);
      gl.uniform1f(timeUniformLocation, timestamp);
      gl.clearColor(0.937, 0.937, 0.937, 1.0); // bg color #EFEFEF
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Handle dot jumps
      if (timestamp - lastJumpTime > jumpFrequency) {
        triggerJump(timestamp);
        lastJumpTime = timestamp;
      }
      updateDotPositions(timestamp);
      updateBuffers();

      // All dots are rendered using their current positions, so jumping dots appear in the center when appropriate
      gl.drawArrays(gl.POINTS, 0, numPoints);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate(0);

    onDestroy(() => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
    });
  });
</script>

<div id="dot-container" class="flex items-center justify-center w-full h-screen">
  <canvas bind:this={canvas} class="w-full h-full"></canvas>
</div>


<style>
    #dot-container {
  width: 100%;
  height: 400px;
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