<script lang="ts">
  import TextButton from '../TextButton.svelte';

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
  <div class="footer">
    <TextButton text="test" url="www.google.com" />
  </div>
</div>

<style lang="scss">
  @use '../../global-styles/theme.scss';

  $border-radius: calc(theme.$standard-spacing / 2);

  .projectCard {
    display: flex;
    flex-direction: column;
    // Crazy box-shadow!! Not really sure what is going on here. Copy pasted
    // from React material UI
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    border-radius: $border-radius;
  }
  h3 {
    // Kind of a weird bottom margin, this is what Material UI has though.
    margin: 0 0 0.35em 0;
  }
  p {
    margin: 0;
  }
  .media {
    display: block;
    // padding-top is how tall the image is. This is currently a 16:9 ratio.
    padding-top: 56.25%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: $border-radius $border-radius 0 0;
  }
  .textContent {
    text-align: left;
    height: 100%;
    padding: calc(theme.$standard-spacing * 2);
  }
  .footer {
    padding: theme.$standard-spacing;
    display: flex;
    flex-direction: row;
  }
</style>
