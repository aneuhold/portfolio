<!--
  @component

  The page's timeline: every era and project in one reverse chronological list, so scrolling down
  moves backwards through time. Owns the grid that every rail and card places onto.
-->
<script lang="ts">
  import { TimelineItemKind, timelineService } from 'shared';
  import EraCard from './EraCard.svelte';
  import ProjectCard from './ProjectCard.svelte';

  const timeline = timelineService.build();
</script>

<section class="timeline">
  {#each timeline as { item, placement } (item.key)}
    {#if item.kind === TimelineItemKind.Era}
      <EraCard era={item} {placement} />
    {:else}
      <ProjectCard project={item} {placement} />
    {/if}
  {/each}
</section>

<style>
  /* One grid for the whole page: the era rail, then the content. Rows are slots, one per item, so
     an era's rail can span the projects above it without leaving the grid. No row gap, because the
     rail and the era card have to meet. */
  .timeline {
    --era-rail-width: calc(var(--standard-spacing) * 5);
    --lane-width: calc(var(--standard-spacing) * 2);
    --project-rail-width: calc(var(--standard-spacing) / 2);
    --card-gap: calc(var(--standard-spacing) * 2);
    --corner: var(--standard-spacing);

    display: grid;
    grid-template-columns: var(--era-rail-width) minmax(0, 1fr);
    padding: calc(var(--standard-spacing) * 4);
  }
</style>
