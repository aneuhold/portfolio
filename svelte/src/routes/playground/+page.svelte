<!--
  @component

  A little playground for learning more about canvas!
-->
<script lang="ts">
  import drawOnCanvas from 'src/util/canvasDrawer';
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  // Put inside onMount to be able to get the rendered element
  onMount(() => {
    drawOnCanvas(canvas);
  });
</script>

<template>
  <canvas id="canvas" bind:this={canvas} />
</template>

<style lang="scss">
  canvas {
    width: 100%;
    height: 100%;
    background-color: #000;
  }
</style>
