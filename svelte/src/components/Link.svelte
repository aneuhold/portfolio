<script lang="ts">
  export let url: string;
  export let linkText: string;
</script>

<a rel="noopener noreferrer" target="_blank" href={url}>{linkText}</a>

<style>
  a {
    color: var(--color-primary);
    text-decoration-color: var(--color-primary-300);
  }

  a:hover {
    text-decoration-color: var(--color-primary);
  }
</style>
