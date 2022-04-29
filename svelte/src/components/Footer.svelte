<template>
  <footer>
    <span class="header-6"
      >See the code for this website
      <a href="https://github.com/aneuhold/portfolio" rel="noopener noreferrer" target="_blank"
        >here!</a
      >
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
