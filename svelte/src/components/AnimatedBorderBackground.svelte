<!--
  @component

  A component that provides an animated border background effect to its children.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  const {
    children,
    borderWidth = 'var(--standard-spacing)',
    borderRadius = 'calc(var(--standard-spacing) / 2)',
    animationDuration = '5s',
    blurAmount = 'var(--standard-spacing)',
    className
  }: {
    children: Snippet;
    borderWidth?: string;
    borderRadius?: string;
    animationDuration?: string;
    blurAmount?: string;
    className?: string;
  } = $props();
</script>

<div
  class="animatedBorderStack {className}"
  style:--border-width={borderWidth}
  style:--border-radius={borderRadius}
  style:--animation-duration={animationDuration}
  style:--blur-amount={blurAmount}
>
  <div class="animatedBorderBackground">
    <!-- Rotating gradient circle -->
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .animatedBorderStack {
    display: grid;
    grid-template-areas: 'stack';
    position: relative;
  }

  .animatedBorderBackground {
    grid-area: stack;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: var(--border-radius, calc(var(--standard-spacing) / 2));
    position: relative;
    overflow: hidden;
  }

  .animatedBorderBackground::before {
    content: '';
    /* Make it a large circle - use the diagonal of the card plus extra space */
    width: calc(200% + calc(var(--border-width, var(--standard-spacing)) * 4));
    height: calc(200% + calc(var(--border-width, var(--standard-spacing)) * 4));
    background: var(--hdr-gradient);
    position: absolute;
    /* Center the circle */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* Make it perfectly circular */
    border-radius: 50%;
  }

  /* Hover effects */
  .animatedBorderStack:hover .animatedBorderBackground {
    width: calc(100% + calc(var(--border-width, var(--standard-spacing)) * 2));
    height: calc(100% + calc(var(--border-width, var(--standard-spacing)) * 2));
    transform: translate(
      calc(var(--border-width, var(--standard-spacing)) * -1),
      calc(var(--border-width, var(--standard-spacing)) * -1)
    );
    filter: blur(var(--blur-amount, var(--standard-spacing)));
  }

  .animatedBorderStack:hover .animatedBorderBackground::before {
    animation: rotate var(--animation-duration, 5s) linear infinite;
  }

  .content {
    grid-area: stack;
    position: relative;
    z-index: 1;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>
