<script lang="ts">
  import AnimatedBorderBackground from '../AnimatedBorderBackground.svelte';
  import TextButton from '../TextButton.svelte';
  import type { Picture } from './Projects.svelte';

  const {
    projectName,
    img,
    imgAlt,
    info,
    demoLink,
    codeLink
  }: {
    projectName: string;
    img: Picture;
    imgAlt: string;
    info: string;
    demoLink?: string;
    codeLink: string;
  } = $props();
</script>

<AnimatedBorderBackground className="projectCardBorder">
  <div class="projectCard">
    <div class="media" aria-label={imgAlt}>
      <enhanced:img class="enhancedImage" src={img} alt={imgAlt} />
    </div>

    <div class="textContent">
      <h3 class="header-4">{projectName}</h3>
      <p>{info}</p>
    </div>
    <div class="footer">
      {#if demoLink}
        <TextButton text="demo" url={demoLink} />
      {/if}
      <TextButton text="source" url={codeLink} />
    </div>
  </div>
</AnimatedBorderBackground>

<style>
  .enhancedImage {
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .projectCard {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* Crazy box-shadow!! Not really sure what is going on here. Copy pasted
       from React Material UI */
    box-shadow:
      0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    border-radius: calc(var(--standard-spacing) / 2);
    background-color: var(--background);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateZ(0);
  }

  /* Nice hover effect 🎉 But only on devices that support hover so it isn't so jarring. */
  @media (hover: hover) {
    :global(.projectCardBorder:hover) .projectCard {
      box-shadow:
        0px 8px 12px -4px rgb(0 0 0 / 25%),
        0px 4px 8px 0px rgb(0 0 0 / 18%),
        0px 2px 16px 0px rgb(0 0 0 / 15%);
      transform: translateY(-4px);
    }
  }

  h3 {
    /* Kind of a weird bottom margin, this is what Material UI has though. */
    margin: 0 0 0.35em 0;
  }
  p {
    margin: 0;
  }
  .media {
    display: block;
    /* padding-top is how tall the image is. This is currently a 16:9 ratio. */
    padding-top: 56.25%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: calc(var(--standard-spacing) / 2) calc(var(--standard-spacing) / 2) 0 0;
    position: relative; /* enable absolutely positioned img inside */
    overflow: hidden;
  }
  .textContent {
    text-align: left;
    height: 100%;
    padding: calc(var(--standard-spacing) * 2);
  }
  .footer {
    padding: var(--standard-spacing);
    display: flex;
    flex-direction: row;
  }
</style>
