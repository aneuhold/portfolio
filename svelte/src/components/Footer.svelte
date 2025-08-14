<script lang="ts">
  import Link from './Link.svelte';
</script>

<footer>
  <span class="header-6"
    >See the code for this website
    <Link url="https://github.com/aneuhold/portfolio" linkText="here!" />
  </span>
  <span class="subtitle-1">©{new Date().getFullYear()} Anton Neuhold</span>
</footer>

<style>
  footer {
    padding: calc(var(--standard-spacing) * 6);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
