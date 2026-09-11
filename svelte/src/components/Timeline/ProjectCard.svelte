<!--
  @component

  One project. Work that ran over a stretch of time gets a card with its thumbnail, summary and
  links, and a rail running down from it to the date it started; work that came and went on a
  single date gets a dated row.
-->
<script lang="ts">
  import { type Project, type TimelinePlacement, timelineService } from 'shared';
  import projectImages from '../../util/projectImages';
  import Link from '../Link.svelte';
  import TextButton from '../TextButton.svelte';
  import TimelineDates from './TimelineDates.svelte';

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
      <enhanced:img
        class="thumbnail"
        src={projectImages[project.key]}
        alt={project.thumbnailDescription}
        sizes="(min-resolution: 2x) 600px, 300px"
      />
      <div class="cardText">
        <h3 class="header-6">{project.name}</h3>
        <TimelineDates startDate={project.startDate} endDate={project.endDate} />
        <p class="info">{project.info}</p>
        <div class="links">
          {#if project.demoLink}
            <TextButton text="demo" url={project.demoLink} />
          {/if}
          <TextButton text="source" url={project.codeLink} />
        </div>
      </div>
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
    container-type: inline-size;
    display: grid;
    grid-auto-columns: auto minmax(0, 1fr);
    gap: var(--card-padding);
    margin-block-end: var(--card-gap);
    padding: var(--card-padding);
    border-radius: var(--radius-lg) var(--radius-lg) 0 var(--radius-lg);
  }

  /* Starts on the row below the card, then reaches back up by the gap so it leaves the card's
     bottom edge with no break, and stops short by the same gap at the far end. Half its own width
     of radius rounds the end off completely, whatever width it is given. */
  .rail {
    grid-row: var(--rail-start) / var(--rail-line);
    justify-self: end;
    inline-size: var(--project-rail-width);
    margin-block: calc(-1 * var(--card-gap)) var(--card-gap);
    border-radius: 0 0 var(--project-rail-width) var(--project-rail-width);
  }

  /* One shape for every thumbnail, whatever the screenshot behind it, so the column of cards reads
     as a set. */
  .thumbnail {
    display: block;
    /* Needs 100% to keep it inside the box it is given */
    inline-size: 100%;
    /* Overrides the normal height of the image so the ratio decides */
    block-size: auto;
    /** 3/2 just kinda looks good */
    aspect-ratio: 3 / 2;
    object-fit: cover;
    /* Because some screenshots have a header */
    object-position: center top;
    border-radius: var(--radius-md);
  }

  /* Title and dates share the first line; the summary and the links take one each below it.
     Centred, because the thumbnail beside it sets the height. */
  .cardText {
    grid-column: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: baseline;
    align-content: center;
    column-gap: calc(var(--standard-spacing) * 2);
    row-gap: var(--standard-spacing);
  }

  h3 {
    text-wrap: balance;
  }

  .info {
    grid-column: 1 / -1;
    color: var(--color-text-secondary);
    /* Um. Seemed like an okay trade-off here? */
    text-wrap: pretty;
  }

  /* Pulled back by the buttons' own inline padding so their labels sit on the text's left edge. */
  .links {
    grid-column: 1 / -1;
    display: flex;
    gap: var(--standard-spacing);
    margin-inline-start: calc(var(--standard-spacing) * -1);
  }

  @container (inline-size >= 32rem) {
    .thumbnail {
      inline-size: clamp(9rem, 22cqi, 12rem);
    }

    /* Beside the thumbnail, and wide enough for the dates to sit out at the end of the title's
       line rather than under it. */
    .cardText {
      grid-area: 1 / 2;
      grid-template-columns: minmax(0, 1fr) auto;
    }
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
</style>
