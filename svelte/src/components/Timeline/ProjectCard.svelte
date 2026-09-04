<!--
  @component

  One project. A featured project gets a card with its thumbnail, summary and links, and a rail
  running down from it to the date the work started; a compact one gets a dated row.
-->
<script lang="ts">
  import { type Project, ProjectTier, type TimelinePlacement, timelineService } from 'shared';
  import projectImages from '../../util/projectImages';
  import Link from '../Link.svelte';
  import TextButton from '../TextButton.svelte';

  const { project, placement }: { project: Project; placement: TimelinePlacement } = $props();

  const dates = $derived(timelineService.formatRange(project.startDate, project.endDate));
</script>

{#if project.tier === ProjectTier.Featured}
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
      <h3 class="header-5">{project.name}</h3>
      <p class="dates">{dates}</p>
      <p>{project.info}</p>
      <div class="links">
        {#if project.demoLink}
          <TextButton text="demo" url={project.demoLink} />
        {/if}
        <TextButton text="source" url={project.codeLink} />
      </div>
    </div>
    {#if placement.railLine > placement.row + 1}
      <div class="rail"></div>
    {/if}
  </article>
{:else}
  <div class="compactProject" style:--row={placement.row} style:--lane={placement.lane}>
    <span class="dates">{dates}</span>
    <Link url={project.codeLink} linkText={project.name} />
  </div>
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
     end to the date the work began. One fill across both, so the corner reads as a single shape. */
  .card,
  .rail {
    background-color: var(--background);
  }

  .card {
    grid-row: var(--row);
    margin-block-end: var(--card-gap);
    padding: calc(var(--standard-spacing) * 2);
    border-radius: var(--corner) var(--corner) 0 var(--corner);
  }

  /* Starts on the row below the card, then reaches back up by the gap so it leaves the card's
     bottom edge with no break, and stops short by the same gap at the far end. */
  .rail {
    grid-row: var(--rail-start) / var(--rail-line);
    justify-self: end;
    width: var(--project-rail-width);
    margin-block: calc(-1 * var(--card-gap)) var(--card-gap);
    border-radius: 0 0 var(--corner) var(--corner);
  }

  .thumbnail {
    display: block;
    width: 300px;
    max-width: 100%;
    height: auto;
  }

  .compactProject {
    display: flex;
    grid-row: var(--row);
    gap: var(--standard-spacing);
    padding-block: calc(var(--standard-spacing) / 2);
  }

  .links {
    display: flex;
  }
</style>
