<!--
  @component

  A project's text, technologies, and links.
-->
<script lang="ts">
  import { type Project } from 'shared';
  import TimelineDates from '../TimelineDates.svelte';
  import TimelineTechnologies from '../TimelineTechnologies.svelte';
  import ProjectCardActions from './ProjectCardActions.svelte';

  const { project }: { project: Project } = $props();
</script>

<div class="cardContent">
  <div class="cardText">
    <h3 class="header-6">{project.name}</h3>
    <TimelineDates startDate={project.startDate} endDate={project.endDate} />
    <p class="info">{project.info}</p>
    <div class="technologies">
      <TimelineTechnologies technologyGroups={project.technologyGroups} />
    </div>
  </div>
  <ProjectCardActions {project} />
</div>

<style>
  /* Links pinned to the bottom */
  .cardContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--standard-spacing);
  }

  /* Title and dates share a line */
  .cardText {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: calc(var(--standard-spacing) * 2);
    row-gap: var(--standard-spacing);

    /* Dates drop under the title */
    @media (width < 40rem) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  h3 {
    text-wrap: balance;
  }

  .info,
  .technologies {
    grid-column: 1 / -1;
  }

  .info {
    color: var(--color-text-secondary);
    /* Um. Seemed like an okay trade-off here? */
    text-wrap: pretty;
  }
</style>
