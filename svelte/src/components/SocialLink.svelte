<!--
  @SocialLink

  some markdown here
-->
<script lang="ts">
  export let url: string;
  export let svgIconPath: string;
  export let linkName: string;
</script>

<a class="svgLink" href={url} rel="noopener noreferrer" target="_blank">
  <svg class="svgIcon">
    <title>{linkName}</title>
    <path d={svgIconPath} />
  </svg>
</a>

<style>
  .svgLink {
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    /* The height and the width are set below because for some reason it has
       4px of extra height. Couldn't quite figure out why that was. */
    height: 24px;
    width: 24px;
  }
  .svgLink:hover {
    background-color: var(--color-primary-100);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-shadow);
  }

  .svgIcon {
    width: 1em;
    height: 1em;
    color: var(--color-primary);
    fill: currentColor;
    font-size: 1.5rem;
  }
</style>
