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
    padding: calc(var(--standard-spacing) / 2) var(--standard-spacing);
    border-radius: var(--radius-sm);
    text-decoration: none;
    justify-content: center;
    min-width: 64px;
    color: var(--color-primary);
    transition:
      background-color var(--duration-fast) var(--ease-standard),
      box-shadow var(--duration-fast) var(--ease-standard);
  }

  a:hover {
    background-color: var(--color-primary-100);
    box-shadow: var(--shadow-resting);
  }
</style>
