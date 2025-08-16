<script lang="ts">
  import projects from '$shared/config/projects';
  import CardGrid from '../CardGrid.svelte';
  import ProjectCard from './ProjectCard.svelte';
</script>

<div class="container">
  <CardGrid>
    {#each projects as project (project.name)}
      <ProjectCard
        projectName={project.name}
        imgUrl={project.thumbnailUrl}
        imgAlt={project.thumbnailDescription}
        info={project.info}
        demoLink={project.demoLink}
        codeLink={project.codeLink}
      />
    {/each}
  </CardGrid>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }
</style>
