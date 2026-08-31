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
  {#each items as item, index (item.key)}
    {#if item.kind === TimelineItemKind.Era}
      <EraCard
        era={item}
        row={index + 1}
        railFrom={timelineService.eraRailStartRowRow(items, index)}
      />
    {:else}
      <ProjectCard project={item} row={index + 1} />
    {/if}
  {/each}
</section>

<style>
  /* One grid for the whole page: the era rail, then the content. Rows are slots, one per item, so
     an era's rail can span the projects above it without leaving the grid. No row gap, because the
     rail and the era card have to meet. */
  .timeline {
    --rail-width: calc(var(--standard-spacing) * 5);
    --corner: var(--standard-spacing);

    display: grid;
    grid-template-columns: var(--rail-width) minmax(0, 1fr);
    padding: calc(var(--standard-spacing) * 4);
  }
</style>
