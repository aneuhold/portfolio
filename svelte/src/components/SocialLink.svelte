<!--
  @SocialLink

  some markdown here
-->
<script lang="ts">
  export let url: string;
  export let svgIconPath: string;
  import IconButton, { Icon } from '@smui/icon-button';
  import { Svg } from '@smui/common/elements';
</script>

<div>
  <a class="svgLink" href={url} rel="noopener noreferrer" target="_blank">
    <svg class="svgIcon">
      <path d={svgIconPath} />
    </svg>
  </a>
  <IconButton>
    <Icon class="svgIcon" component={Svg} viewBox="0 0 24 24">
      <path d={svgIconPath} />
    </Icon>
  </IconButton>
</div>

<style lang="scss">
  @use '../global-styles/theme.scss';

  .svgLink {
    padding: 8px;
    border-radius: 50%;
    color: theme.$color-shadow;
  }

  .svgIcon {
    width: 1em;
    height: 1em;
    color: theme.$color-primary;
    fill: currentColor;
    font-size: 1.5rem;
  }
</style>
