

<script>
	import { onMount, onDestroy } from 'svelte';
	export let imagePath = '/src/lib/assets/peter.png';
	let canvasContainer;
	let p5Instance;

	// Pointillism sketch
	function sketch(p) {
		let img = null;
		let dots = [];
		let dotCount = 30000;
		let imgReady = false;

		p.setup = function() {
			p.createCanvas(300, 300).parent(canvasContainer);
			p.background(255);
			p.noStroke();
			p.loadImage(imagePath, function(loadedImg) {
				img = loadedImg;
				img.loadPixels();
				for (let i = 0; i < dotCount; i++) {
					let x = p.random(img.width);
					let y = p.random(img.height);
					let idx = 4 * (Math.floor(x) + Math.floor(y) * img.width);
					let r = img.pixels[idx];
					let g = img.pixels[idx + 1];
					let b = img.pixels[idx + 2];
					dots.push({ x, y, r, g, b, size: p.random(4, 5)});
				}
				imgReady = true;
			});
		};

		let dotsToShow = 0;
		let dotsPerFrame = 300; // Adjust for speed
		p.draw = function() {
			p.background(255);
			if (!imgReady) return;
			dotsToShow = Math.min(dots.length, dotsToShow + dotsPerFrame);
			for (let i = 0; i < dotsToShow; i++) {
				let dot = dots[i];
				p.fill(dot.r, dot.g, dot.b);
				p.ellipse(dot.x, dot.y, dot.size, dot.size);
			}
		};
	}

	onMount(async () => {
		const p5 = (await import('p5')).default;
		p5Instance = new p5(sketch);
	});

	onDestroy(() => {
		if (p5Instance) {
			p5Instance.remove();
		}
	});
</script>

<div class="canvas-container" bind:this={canvasContainer} style="width: 300px; height: 300px;"></div>

<style>
	.canvas-container {
		border: 1px solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
        margin: 10px;
	}
</style>