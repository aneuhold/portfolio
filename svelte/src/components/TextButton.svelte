<script lang="ts">
  export let text: string;
  export let url: string;
</script>

<a rel="noopener noreferrer" target="_blank" class="button-text" href={url}>
  {text}
</a>

<style lang="scss">
  @use '../global-styles/theme.scss';
  a {
    display: flex;
    flex-direction: row;
    padding: 4px 5px;
    border-radius: calc(theme.$standard-spacing / 2);
    text-decoration: none;
    justify-content: center;
    min-width: 64px;
    color: theme.$color-primary;
  }

  a:hover {
    background-color: theme.$color-primary-100;
  }
</style>
