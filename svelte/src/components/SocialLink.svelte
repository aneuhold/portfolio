<!--
  @SocialLink

  some markdown here
-->
<script lang="ts">
  export let url: string;
  export let svgIconPath: string;
</script>

<a class="svgLink" href={url} rel="noopener noreferrer" target="_blank">
  <svg class="svgIcon">
    <path d={svgIconPath} />
  </svg>
</a>

<style lang="scss">
  @use '../global-styles/theme.scss';

  $icon-size: 24px;

  .svgLink {
    padding: 8px;
    border-radius: 50%;

    // The height and the width are set below because for some reason it has
    // 4px of extra height. Couldn't quite figure out why that was.
    height: $icon-size;
    width: $icon-size;
  }
  .svgLink:hover {
    background-color: theme.$color-shadow;
  }

  .svgIcon {
    border-radius: 50%;
    width: 1em;
    height: 1em;
    color: theme.$color-primary;
    fill: currentColor;
    font-size: 1.5rem;
  }
</style>
