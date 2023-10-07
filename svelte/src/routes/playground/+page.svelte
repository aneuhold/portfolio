<!--
  @component

  A little playground for learning more about canvas!
-->
<script lang="ts">
  import drawOnCanvasContext from 'src/util/canvasDrawer';
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  // Put inside onMount to be able to get the rendered element
  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawOnCanvasContext(ctx);
    }
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
