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
     rail and the era card have to meet.

     Every measurement the rails and cards share is declared here, and the cards derive the rest. */
  .timeline {
    --era-rail-width: calc(var(--standard-spacing) * 5);
    --lane-width: calc(var(--standard-spacing) * 2);
    --project-rail-width: calc(var(--standard-spacing) / 2);
    --card-padding: calc(var(--standard-spacing) * 2);
    --card-gap: calc(var(--standard-spacing) * 2);
    --era-gap: calc(var(--standard-spacing) * 6);

    display: grid;
    grid-template-columns: var(--era-rail-width) minmax(0, 1fr);
    margin-inline: auto;
    max-inline-size: 68rem;
    padding: calc(var(--standard-spacing) * 2) calc(var(--standard-spacing) * 3);
    /* The site centres its text; a timeline is read down a left edge. */
    text-align: start;
  }

  /* The rails and lanes are page furniture, so they give up their width first when there is little
     of it to go around. */
  @media (width < 40rem) {
    .timeline {
      --era-rail-width: calc(var(--standard-spacing) * 2);
      --lane-width: var(--standard-spacing);
      --era-gap: calc(var(--standard-spacing) * 4);

      padding-inline: calc(var(--standard-spacing) * 2);
    }
  }
</style>
