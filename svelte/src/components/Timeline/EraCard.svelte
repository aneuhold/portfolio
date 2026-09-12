<!--
  @component

  The card heading its era, saying who it was with, when, for how long, and what it amounted to. On
  a narrow screen, where there are no project rails, the card also names the projects still running
  from before the era began.
-->
<script lang="ts">
  import { type Era, TextColor, type TimelinePlacement, timelineService } from 'shared';
  import TimelineDates, { TimelineDatesSize } from './TimelineDates.svelte';

  const { era, placement }: { era: Era; placement: TimelinePlacement } = $props();

  const projectsRunningAtStart = $derived(timelineService.projectsRunningAtStart(era));
</script>

<section
  class="card"
  style:--row={placement.row}
  style:--era-depth={placement.eraDepth}
  data-year={placement.year}
>
  <h2 class="header-4">{era.name}</h2>
  <p class="tenure">
    <TimelineDates
      startDate={era.startDate}
      endDate={era.endDate}
      useDuration
      size={TimelineDatesSize.Large}
      color={TextColor.Inherit}
    />
  </p>
  <TimelineDates startDate={era.startDate} endDate={era.endDate} />
  <p class="info">{era.info}</p>
  {#if projectsRunningAtStart.length > 0}
    <p class="runningAtStart">
      Still running from before:
      {#each projectsRunningAtStart as project, index (project.key)}{index > 0 ? ', ' : ''}<a
          href="#project-{project.key}">{project.name}</a
        >{/each}
    </p>
  {/if}
</section>

<style>
  /* The name and the tenure share the top, the dates sit under the name, and the summary takes the
     rest. */
  .card {
    /* The year label sits level with the middle of the era's name. */
    --node-offset: var(--era-node-offset);
    /* The ground here is dark, so a step back from the name is a step off white, not off black. */
    --color-text-secondary: color-mix(in oklab, var(--background) 76%, transparent);

    position: relative;
    grid-column: -2;
    grid-row: var(--row);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: calc(var(--standard-spacing) * 2);
    row-gap: calc(var(--standard-spacing) / 2);
    margin-block: var(--era-space) var(--card-gap);
    padding: calc(var(--card-padding) * 1.5);
    border-radius: var(--radius-lg);
    background-color: var(--era-color);
    color: var(--background);
    box-shadow: var(--shadow-resting);

    @media (width < 40rem) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  h2 {
    text-wrap: balance;
  }

  .tenure {
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
    white-space: nowrap;

    /* The tenure drops under the name rather than squeezing it. */
    @media (width < 40rem) {
      grid-column: auto;
      grid-row: auto;
    }
  }

  .info,
  .runningAtStart {
    grid-column: 1 / -1;
    margin-block-start: var(--standard-spacing);
    color: var(--color-text-secondary);
    text-wrap: pretty;
  }

  /* The project rails show what carried on from earlier eras, so the card only names it once they
     give way on a narrow screen. */
  .runningAtStart {
    display: none;

    @media (width < 48rem) {
      display: block;
    }

    a {
      color: var(--background);
      text-decoration-color: color-mix(in oklab, var(--background) 50%, transparent);
    }
  }
</style>
