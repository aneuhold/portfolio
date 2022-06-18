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
    />. I live in <Link url="Canby, OR" linkText="Canby, OR" />.
    <br />
    <br />
    When not working, or learning new things about development, I like to exercise and hang out with
    my two pets and beautiful wife. Check out some social media links and projects below:
  </p>

  <div class="heroButtons">
    {#each socialLinks as socialLink}
      <SocialLink url={socialLink.link} svgIconPath={socialLink.svgIconPath} />
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
