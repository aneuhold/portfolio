<script lang="ts">
  import { seoGraphScriptTag, siteMetadata } from 'shared';
  import Hero from '$components/Hero.svelte';
  import Timeline from '$components/Timeline/Timeline.svelte';

  const { siteUrl, siteName, title, description, ogImage } = siteMetadata;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={siteUrl} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:image" content={ogImage.url} />
  <meta property="og:image:width" content={String(ogImage.width)} />
  <meta property="og:image:height" content={String(ogImage.height)} />
  <meta property="og:image:alt" content={ogImage.alt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage.url} />

  <!-- Svelte emits the content of a <script> element as raw text, so the JSON-LD tag is inserted
    prebuilt. Building that string inline here fails ESLint's Svelte parser. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- The tag holds a constant JSON string with every `<` escaped. -->
  {@html seoGraphScriptTag}
</svelte:head>

<Hero />
<Timeline />
