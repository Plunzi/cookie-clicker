<script lang="ts">
	import { onMount } from 'svelte';
	import { pickRandomCookie } from './cookie';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let milkLevel: number = 0.2;
	let waveOffset: number = 0;
	let waveImage: HTMLImageElement;
	let waveYPosition: number = 400;
	let waveScale: number = 1;
	let numCookies: number = 100;
	let lastTime: number = 0;
	
	// Base speeds (pixels per second)
	const BASE_WAVE_SPEED = 100; // pixels per second
	const BASE_COOKIE_FALL_SPEED = 200; // pixels per second
	const BASE_COOKIE_HORIZONTAL_SPEED = 50; // pixels per second
	const STATIC_FRAME_RATE = 1; // 1 FPS for static display

	let cookies: {
		x: number;
		y: number;
		velocityY: number;
		velocityX: number;
		image: HTMLImageElement;
	}[] = [];

	const { cookieTypes, animateMilk, animateFallingCookies, lockFPS, fpsCap } = $props();

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		// Set the canvas resolution
		const scale = window.devicePixelRatio || 1;
		canvas.width = canvas.clientWidth * scale;
		canvas.height = canvas.clientHeight * scale;
		ctx.scale(scale, scale);

		waveImage = new Image();
		waveImage.src = '/milk/chocolateMilkWave.png';
		waveImage.onload = () => {
			lastTime = performance.now();
			animate();
		};

		// Initialize cookies with velocity instead of speed
		for (let i = 0; i < numCookies; i++) {
			const cookieImage = new Image();
			cookieImage.src = `/cookies/${pickRandomCookie(cookieTypes)}.png`;
			cookies.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				velocityY: BASE_COOKIE_FALL_SPEED * (Math.random() * 0.5 + 0.75),
				velocityX: BASE_COOKIE_HORIZONTAL_SPEED * (Math.random() - 0.5),
				image: cookieImage
			});
		}
	});

	function drawMilk() {
		const width = canvas.width / (window.devicePixelRatio || 1);
		const height = canvas.height / (window.devicePixelRatio || 1);
		const milkHeight = height * milkLevel;

		console.log("Drawing milk");

		ctx.save();
		ctx.globalAlpha = 0.975;
		ctx.translate(-waveOffset, height - milkHeight - waveImage.height * waveScale + waveYPosition);
		ctx.scale(waveScale, waveScale);
		ctx.fillStyle = ctx.createPattern(waveImage, 'repeat-x')!;
		ctx.fillRect(0, 0, (width + waveImage.width) / waveScale, waveImage.height);
		ctx.restore();
	}

	function animate(currentTime: number = performance.now()) {
		const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
		lastTime = currentTime;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.imageSmoothingEnabled = false;

		if (animateFallingCookies) {
			// Update and draw cookies
			cookies.forEach((cookie) => {
				ctx.drawImage(cookie.image, cookie.x, cookie.y, 50, 50);
				
				// Update positions using deltaTime
				cookie.y += cookie.velocityY * deltaTime;
				cookie.x += cookie.velocityX * deltaTime;

				// Reset cookies when they go off screen
				if (cookie.y > canvas.height) {
					cookie.y = -50;
					cookie.x = Math.random() * canvas.width;
				}
				if (cookie.x > canvas.width || cookie.x < -50) {
					cookie.x = Math.random() * canvas.width;
				}
			});
		}

		if (animateMilk) {
			// Update wave offset using deltaTime
			waveOffset += BASE_WAVE_SPEED * deltaTime;
			if (waveOffset > waveImage.width * waveScale) {
				waveOffset = 0;
			}
		}
		drawMilk();

		// Determine the frame rate to use
		const targetFrameRate = (!animateMilk && !animateFallingCookies) 
			? STATIC_FRAME_RATE 
			: (lockFPS ? fpsCap : 60);

		setTimeout(() => {
			requestAnimationFrame(animate);
		}, 1000 / targetFrameRate);
	}
</script>

<canvas bind:this={canvas} class="absolute h-full w-full"></canvas>

<style>
	canvas {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>