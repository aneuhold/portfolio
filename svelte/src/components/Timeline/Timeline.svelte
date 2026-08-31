<!--
  @component

  The page's timeline: every era and project in one reverse chronological list, so scrolling down
  moves backwards through time. Owns the grid that every rail, card and stem places onto.
-->
<script lang="ts">
  import timelineService from '$shared/services/Timeline.service';
  import { TimelineItemKind } from '$shared/types/TimelineItemBase';
  import EraCard from './EraCard.svelte';
  import ProjectCard from './ProjectCard.svelte';

  const items = timelineService.build();
</script>

<section class="timeline">
  {#each items as item (item.name)}
    {#if item.kind === TimelineItemKind.Era}
      <EraCard era={item} />
    {:else}
      <ProjectCard project={item} />
    {/if}
  {/each}
</section>

<style>
  .timeline {
    display: grid;
    gap: var(--standard-spacing);
    padding: calc(var(--standard-spacing) * 4);
  }
</style>
