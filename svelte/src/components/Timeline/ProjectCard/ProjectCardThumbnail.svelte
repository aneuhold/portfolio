<!--
  @component

  A project's screenshot, cropped to the one shape every thumbnail shares and as wide as the box it
  is placed in.
-->
<script lang="ts">
  import { type Project } from 'shared';
  import projectImages from '../../../util/projectImages';

  const { project }: { project: Project } = $props();
</script>

<enhanced:img
  class="thumbnail"
  src={projectImages[project.key]}
  alt={project.thumbnailDescription}
  sizes="(min-resolution: 2x) 600px, 300px"
/>

<style>
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
</style>
