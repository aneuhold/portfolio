<div class="cardGrid">
  <slot />
</div>

<style lang="scss">
  @use '../global-styles/theme.scss';

  $grid-gap: calc(theme.$standard-spacing * 4);

  .cardGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    max-width: minmax(1100px, 1fr);
    gap: $grid-gap;
    padding: $grid-gap;
  }
</style>
