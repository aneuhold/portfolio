<script lang="ts">
  export let projectName: string;
  export let imgUrl: string;
  export let imgAlt: string;
  export let info: string;
</script>

<div class="projectCard">
  <div class="media" alt={imgAlt} style={`background-image: url(${imgUrl});`} />
  <div class="textContent">
    <h3 class="header-4">{projectName}</h3>
    <p>{info}</p>
  </div>
</div>

<style lang="scss">
  @use '../../global-styles/theme.scss';

  $border-radius: calc(theme.$standard-spacing / 2);

  .projectCard {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    border-radius: $border-radius;
  }
  .media {
    display: block;
    padding-top: 56.25%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: $border-radius $border-radius 0 0;
  }
  .textContent {
    text-align: left;
    padding: calc(theme.$standard-spacing * 2);
  }
  .footer {
    padding: calc(theme.$standard-spacing * 2);
  }
</style>
