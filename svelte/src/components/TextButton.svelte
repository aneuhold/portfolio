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
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  a:hover {
    background-color: var(--color-primary-100);
    box-shadow: 0 2px 8px var(--color-shadow-light);
  }
</style>
