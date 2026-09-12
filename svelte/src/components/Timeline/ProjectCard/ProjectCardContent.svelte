<!--
  @component

  A project's name, dates and summary, with its links held to the bottom of whatever height it is
  given.
-->
<script lang="ts">
  import { type Project } from 'shared';
  import TimelineDates from '../TimelineDates.svelte';
  import ProjectCardActions from './ProjectCardActions.svelte';

  const { project }: { project: Project } = $props();
</script>

<div class="cardContent">
  <div class="cardText">
    <h3 class="header-6">{project.name}</h3>
    <TimelineDates startDate={project.startDate} endDate={project.endDate} />
    <p class="info">{project.info}</p>
  </div>
  <ProjectCardActions {project} />
</div>

<style>
  /* The text holds the top and the links the bottom, so any height given beyond their own opens up
     between the two. */
  .cardContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--standard-spacing);
  }

  /* Title and dates share the first line; the summary takes the one below it. */
  .cardText {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
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

  /* Steps down at the width the timeline itself does: the dates drop under the title rather than
     squeezing it. */
  @media (width < 40rem) {
    .cardText {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
