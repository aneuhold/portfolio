<!--
  @component

  One project. Work that ran over a stretch of time gets a card with its thumbnail, summary and
  links, and a rail running down from it to the date it started; work that came and went on a
  single date gets a dated row.
-->
<script lang="ts">
  import { type Project, type TimelinePlacement, timelineService } from 'shared';
  import Link from '../../Link.svelte';
  import TimelineDates from '../TimelineDates.svelte';
  import ProjectCardContent from './ProjectCardContent.svelte';
  import ProjectCardThumbnail from './ProjectCardThumbnail.svelte';

  const { project, placement }: { project: Project; placement: TimelinePlacement } = $props();
</script>

{#if timelineService.isCompact(project)}
  <div class="compactProject" style:--row={placement.row} style:--lane={placement.lane}>
    <TimelineDates startDate={project.startDate} endDate={project.endDate} useMaxDateWidth />
    <Link url={project.codeLink} linkText={project.name} />
  </div>
{:else}
  <article
    class="project"
    style:--row={placement.row}
    style:--rail-start={placement.row + 1}
    style:--rail-line={placement.railLine}
    style:--lane={placement.lane}
  >
    <div class="card">
      <ProjectCardThumbnail {project} />
      <ProjectCardContent {project} />
    </div>
    {#if placement.railLine > placement.row + 1}
      <div class="rail"></div>
    {/if}
  </article>
{/if}

<style>
  /* Like the era, the project keeps its element for semantics, and display: contents lets its card
     and rail place directly onto the timeline grid instead of into a box of their own. */
  .project {
    display: contents;
  }

  /* Everything stops short of the project rails crossing its row. */
  .card,
  .rail,
  .compactProject {
    grid-column: 2;
    margin-inline-end: calc(var(--lane) * var(--lane-width));
  }

  /* The era's two rectangles turned 180 degrees: a card, and a rail running down from its right
     end to the date the work began. */
  .card,
  .rail {
    background-color: var(--background);
    box-shadow: var(--shadow-resting);
  }

  .card {
    grid-row: var(--row);
    display: grid;
    grid-template-columns: clamp(9rem, 22%, 12rem) minmax(0, 1fr);
    gap: var(--card-padding);
    margin-block-end: var(--card-gap);
    padding: var(--card-padding);
    border-radius: var(--radius-lg) var(--radius-lg) 0 var(--radius-lg);
  }

  /* Starts on the row below the card, then reaches back up by the gap so it leaves the card's
     bottom edge with no break, and stops short by the same gap at the far end. Half its own width
     of radius rounds the end off completely, whatever width it is given. */
  .rail {
    position: relative;
    grid-row: var(--rail-start) / var(--rail-line);
    justify-self: end;
    inline-size: var(--project-rail-width);
    margin-block: calc(-1 * var(--card-gap)) var(--card-gap);
    border-radius: 0 0 var(--project-rail-width) var(--project-rail-width);
  }

  /* Rounds the corner into the card */
  .rail::after {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 100%;
    inline-size: var(--radius-lg);
    block-size: var(--radius-lg);
    background: radial-gradient(
      circle at 0 100%,
      transparent calc(var(--radius-lg) - 1px),
      var(--background) var(--radius-lg)
    );
  }

  .compactProject {
    grid-row: var(--row);
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--standard-spacing);
    padding: var(--standard-spacing) var(--card-padding);
    background-color: color-mix(in oklab, var(--color-primary) 12%, var(--background));
  }

  /* This only needs :global to satisfy the svelte linter, but it works without */
  :global(.compactProject) + .compactProject {
    border-block-start: 1px solid color-mix(in oklab, var(--color-primary) 18%, transparent);
  }
  /* The top of the series */
  .compactProject:not(.compactProject + .compactProject) {
    border-start-start-radius: var(--radius-lg);
    border-start-end-radius: var(--radius-lg);
  }
  /* The bottom of the series */
  .compactProject:not(:has(+ .compactProject)) {
    margin-block-end: var(--card-gap);
    border-end-start-radius: var(--radius-lg);
    border-end-end-radius: var(--radius-lg);
  }

  /* Thumbnail stacks above content */
  @media (width < 40rem) {
    .card {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
