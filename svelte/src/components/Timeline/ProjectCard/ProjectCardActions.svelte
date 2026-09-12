<!--
  @component

  A project's links: its demo, when it has one, and its source.
-->
<script lang="ts">
  import { type Project } from 'shared';
  import TextButton from '../../TextButton.svelte';

  const { project }: { project: Project } = $props();
</script>

<div class="links">
  {#if project.demoLink}
    <TextButton text="demo" url={project.demoLink} />
  {/if}
  <TextButton text="source" url={project.codeLink} />
</div>

<style>
  .links {
    display: flex;
    gap: var(--standard-spacing);
  }
</style>
