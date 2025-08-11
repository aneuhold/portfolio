<script lang="ts">
  export let text: string;
  export let url: string;
</script>

<a rel="noopener noreferrer" target="_blank" class="button-text" href={url}>
  {text}
</a>

<style>
  a {
    display: flex;
    flex-direction: row;
    padding: 4px 5px;
    border-radius: calc(var(--standard-spacing) / 2);
    text-decoration: none;
    justify-content: center;
    min-width: 64px;
    color: var(--color-primary);
  }

  a:hover {
    background-color: var(--color-primary-100);
  }
</style>
