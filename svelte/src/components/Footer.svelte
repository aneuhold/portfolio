<script lang="ts">
  import Link from './Link.svelte';
</script>

<template>
  <footer>
    <span class="header-6"
      >See the code for this website
      <Link url="https://github.com/aneuhold/portfolio" linkText="here!" />
    </span>
    <span class="subtitle-1">©{new Date().getFullYear()} Anton Neuhold</span>
  </footer>
</template>

<style lang="scss">
  @use '../global-styles/theme.scss';

  footer {
    background-color: theme.$background;
    padding: calc(theme.$standard-spacing * 6);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
