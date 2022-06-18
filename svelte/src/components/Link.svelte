<script lang="ts">
  export let url: string;
  export let linkText: string;
</script>

<a rel="noopener noreferrer" target="_blank" href={url}>{linkText}</a>

<style lang="scss">
  @use '../global-styles/theme.scss';

  a {
    color: theme.$color-primary;
    text-decoration: underline;
    text-decoration-line: underline;
    text-decoration-thickness: initial;
    text-decoration-style: initial;
    text-decoration-color: theme.$color-primary-300;
    cursor: pointer;
  }

  a:hover {
    text-decoration-color: theme.$color-primary;
  }
</style>
