<script lang="ts">
    import { onMount } from 'svelte';
  
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let milkLevel: number = 0.2; // Adjust the milk level (0 to 1)
    let waveOffset: number = 0;
    let waveSpeed: number = 0.5; // Adjust the wave speed
    let waveImage: HTMLImageElement;
    let waveYPosition: number = 500; // Adjust the y position of the wave
    let waveScale: number = 1; // Adjust the scale of the wave image
  
    onMount(() => {
      ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
      // Set the canvas resolution
      const scale = window.devicePixelRatio || 2;
      canvas.width = canvas.clientWidth * scale;
      canvas.height = canvas.clientHeight * scale;
      ctx.scale(scale, scale);
  
      waveImage = new Image();
      waveImage.src = '/milk/milkWave.png'; // Update the path to your milkwave.png
      waveImage.onload = () => {
        animate();
      };
    });
  
    function drawMilk() {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const milkHeight = height * milkLevel;
  
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);
  
      // Draw the milk wave texture
      ctx.save();
      ctx.translate(-waveOffset, height - milkHeight - waveImage.height * waveScale + waveYPosition);
      ctx.scale(waveScale, waveScale);
      ctx.fillStyle = ctx.createPattern(waveImage, 'repeat-x')!;
      ctx.fillRect(0, 0, (width + waveImage.width) / waveScale, waveImage.height);
      ctx.restore();
    }
  
    function animate() {
      waveOffset += waveSpeed;
      if (waveOffset > waveImage.width) {
        waveOffset = 0;
      }
      drawMilk();
      requestAnimationFrame(animate);
    }
  </script>
  
  <canvas bind:this={canvas} class="absolute w-full h-full opacity-75"></canvas>
  
  <style>
    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>