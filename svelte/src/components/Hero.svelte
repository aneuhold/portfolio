<script lang="ts">
  import Link from './Link.svelte';
  import SocialLink from './SocialLink.svelte';
  import socialLinks from 'config/socialLinks';
</script>

<div class="hero">
  <p class="header-4">
    <span>[Software Engineer]</span><br />
    +<br />
    <i>{`< Web Developer />`}</i>
  </p>
  <h1 class="header-2">Anton (Tony) Neuhold</h1>
  <p class="header-6 subtitle">
    Hi! I'm a Software Engineer currently working at <Link
      url="https://www.predictiveindex.com/"
      linkText="The Predictive Index"
    /> with a bachelors degree in the same from <Link
      url="https://www.asu.edu/"
      linkText="Arizona State University"
    />. I live in <Link
      url="https://www.google.com/maps/place/Canby,+OR+97013/@45.2711453,-122.7227492,13z/data=!3m1!4b1!4m5!3m4!1s0x5495646375ceb84f:0x110fdcab2e1cddd4!8m2!3d45.262205!4d-122.6921558"
      linkText="Canby, OR"
    />.
    <br />
    <br />
    When not working, or learning new things about development, I like to exercise and hang out with
    my two pets and beautiful wife. Check out some social media links and projects below:
  </p>

  <div class="heroButtons">
    {#each socialLinks as socialLink}
      <SocialLink
        linkName={socialLink.name}
        url={socialLink.link}
        svgIconPath={socialLink.svgIconPath}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  @use '../global-styles/theme.scss';

  .subtitle {
    color: theme.$color-text-secondary;
  }

  .hero {
    margin: 0 auto;
    max-width: 600px;
  }

  .heroButtons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: calc(theme.$standard-spacing * 4);
  }
</style>
