<script lang="ts">
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

<div class="projectCardStack">
  <div class="projectCardBackground"></div>
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
</div>

<style>
  .enhancedImage {
    position: absolute;
    inset: 0; /* top:0; right:0; bottom:0; left:0 */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .projectCardStack {
    display: grid;
    grid-template-areas: 'stack';
  }

  .projectCardBackground {
    grid-area: stack;
    /* Make it just behind the card */
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: calc(var(--standard-spacing) / 2);
    position: relative;
    overflow: hidden;
  }

  .projectCardBackground::before {
    content: '';
    /* Make it a large circle - use the diagonal of the card plus extra space */
    width: calc(200% + calc(var(--standard-spacing) * 4));
    height: calc(200% + calc(var(--standard-spacing) * 4));
    background: var(--hdr-gradient);
    position: absolute;
    /* Center the circle */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* Make it perfectly circular */
    border-radius: 50%;
  }

  .projectCardStack:hover .projectCardBackground {
    width: calc(100% + calc(var(--standard-spacing) * 2));
    height: calc(100% + calc(var(--standard-spacing) * 2));
    transform: translate(calc(var(--standard-spacing) * -1), calc(var(--standard-spacing) * -1));
    filter: blur(var(--standard-spacing));
  }

  .projectCardStack:hover .projectCardBackground::before {
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .projectCard {
    grid-area: stack;
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
  }

  /* Nice hover effect */
  .projectCardStack:hover .projectCard {
    box-shadow:
      0px 8px 12px -4px rgb(0 0 0 / 25%),
      0px 4px 8px 0px rgb(0 0 0 / 18%),
      0px 2px 16px 0px rgb(0 0 0 / 15%);
    transform: translateY(-4px);
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
