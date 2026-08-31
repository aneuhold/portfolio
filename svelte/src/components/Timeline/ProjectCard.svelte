<!--
  @component

  One project. A featured project gets a card with its thumbnail, summary and links; a compact one
  gets a dated row. Both carry the stem that reaches back to the date the work started.
-->
<script lang="ts">
  import { type Project, ProjectTier } from '$shared/config/projects';
  import timelineService from '$shared/services/Timeline.service';
  import projectImages from '../../util/projectImages';
  import Link from '../Link.svelte';
  import TextButton from '../TextButton.svelte';

  const { project, row }: { project: Project; row: number } = $props();

  const dates = $derived(timelineService.formatRange(project.startDate, project.endDate));
</script>

{#if project.tier === ProjectTier.Featured}
  <article class="project" style:--row={row}>
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
    <div class="stem"></div>
  </article>
{:else}
  <div class="compactProject" style:--row={row}>
    <span class="dates">{dates}</span>
    <Link url={project.codeLink} linkText={project.name} />
  </div>
{/if}

<style>
  .project,
  .compactProject {
    grid-column: 2;
    grid-row: var(--row);
  }

  .project {
    margin-block-end: calc(var(--standard-spacing) * 2);
    padding: calc(var(--standard-spacing) * 2);
    border: 1px solid var(--color-accent);
  }

  .thumbnail {
    display: block;
    width: 300px;
    max-width: 100%;
    height: auto;
  }

  .compactProject {
    display: flex;
    gap: var(--standard-spacing);
    padding-block: calc(var(--standard-spacing) / 2);
    padding-inline-start: calc(var(--standard-spacing) * 2);
  }

  .links {
    display: flex;
  }
</style>
