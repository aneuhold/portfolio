<!--
  @component

  One project. Work that ran over a stretch of time gets a card with its thumbnail, how long it ran,
  and its summary and links. Work that came and went on a single date gets a dated row.
-->
<script lang="ts">
  import { type Project, timelineDatesService, type TimelinePlacement } from 'shared';
  import Link from '../../Link.svelte';
  import TimelineDates from '../TimelineDates.svelte';
  import ProjectCardContent from './ProjectCardContent.svelte';
  import ProjectCardThumbnail from './ProjectCardThumbnail.svelte';

  const { project, placement }: { project: Project; placement: TimelinePlacement } = $props();
</script>

{#if timelineDatesService.isSingleDate(project.startDate, project.endDate)}
  <div
    class="compactProject"
    id="project-{project.key}"
    data-item={project.key}
    style:--row={placement.row}
    style:--era-depth={placement.eraDepth}
    data-year={placement.year}
  >
    <TimelineDates startDate={project.startDate} endDate={project.endDate} useMaxDateWidth />
    <Link url={project.codeLink} linkText={project.name} />
  </div>
{:else}
  <article
    class="card"
    id="project-{project.key}"
    data-item={project.key}
    style:--row={placement.row}
    style:--lane={placement.lane}
    data-year={placement.year}
  >
    <div class="media">
      <ProjectCardThumbnail {project} />
      <TimelineDates startDate={project.startDate} endDate={project.endDate} useDuration />
    </div>
    <ProjectCardContent {project} />
  </article>
{/if}

<style>
  /* Clears whatever is pinned above a card when a link jumps to it. */
  .card,
  .compactProject {
    scroll-margin-block-start: calc(var(--standard-spacing) * 2);

    /* The overview pinned above the cards is about this tall. */
    @media (width < 48rem) {
      scroll-margin-block-start: calc(var(--standard-spacing) * 13);
    }
  }

  .card {
    /* The year label sits level with the middle of the project's name. */
    --node-offset: var(--project-node-offset);

    position: relative;
    grid-column: -2;
    grid-row: var(--row);
    display: grid;
    grid-template-columns: clamp(9rem, 22%, 12rem) minmax(0, 1fr);
    gap: var(--card-padding);
    margin-block-end: var(--card-gap);
    padding: var(--card-padding);
    border-radius: var(--radius-lg);
    background-color: var(--background);
    box-shadow: var(--shadow-resting);

    /* Thumbnail stacks above content */
    @media (width < 40rem) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  /* The thumbnail, with how long the work ran underneath it. */
  .media {
    display: grid;
    align-content: start;
    gap: var(--standard-spacing);
  }

  .compactProject {
    /* The year label sits level with the middle of the dated row. */
    --node-offset: 50%;
    /* Its node sits on the era rail. */
    --rail-color: var(--era-color);

    position: relative;
    grid-column: -2;
    grid-row: var(--row);
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--standard-spacing);
    padding: var(--standard-spacing) var(--card-padding);
    background-color: color-mix(in oklab, var(--color-primary) 12%, var(--background));

    /* This only needs :global to satisfy the svelte linter, but it works without */
    :global(.compactProject) + & {
      border-block-start: 1px solid color-mix(in oklab, var(--color-primary) 18%, transparent);
    }
    /* The top of the series */
    &:not(.compactProject + .compactProject) {
      border-start-start-radius: var(--radius-lg);
      border-start-end-radius: var(--radius-lg);
    }
    /* The bottom of the series */
    &:not(:has(+ .compactProject)) {
      margin-block-end: var(--card-gap);
      border-end-start-radius: var(--radius-lg);
      border-end-end-radius: var(--radius-lg);
    }
  }
</style>
