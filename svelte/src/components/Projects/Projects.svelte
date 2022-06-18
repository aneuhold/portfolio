<script lang="ts">
  import projects from 'config/projects';
  import CardGrid from '../CardGrid.svelte';
  import ProjectCard from './ProjectCard.svelte';
</script>

<div class="container">
  <CardGrid>
    {#each projects as project}
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

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }
</style>
