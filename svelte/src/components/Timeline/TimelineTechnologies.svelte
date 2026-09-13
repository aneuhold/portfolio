<!--
  @component

  The technologies behind a timeline item, grouped by the layer of the system they make up, in one
  split badge per layer like the status badges at the top of a README: the layer's name on a tinted
  cap, then the logo and name of each technology in it.
-->
<script lang="ts">
  import { technologies, type TechnologyGroup } from 'shared';

  const {
    technologyGroups,
    onDarkGround = false
  }: {
    technologyGroups: TechnologyGroup[];
    /** Whether the badges sit on a dark ground, which the layer's cap is tinted to read against. */
    onDarkGround?: boolean;
  } = $props();
</script>

<ul class="badges" class:onDarkGround aria-label="Technologies by layer">
  {#each technologyGroups as group (group.layer)}
    <li class="badge">
      <span class="layer">{group.layer}</span>
      <ul class="stack">
        {#each group.technologies as technology (technology)}
          {@const { name, svgIconPath } = technologies[technology]}
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={svgIconPath} /></svg>{name}
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<style>
  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--standard-spacing);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* The outline and the text take the color around the badge, so only the cap needs a dark ground
     of its own. */
  .badge {
    display: inline-flex;
    overflow: clip;
    border: 1px solid color-mix(in oklab, currentColor 16%, transparent);
    border-radius: calc(infinity * 1px);
    font-size: 0.75rem;
    line-height: 1.75;
    letter-spacing: 0.02em;
  }

  /* Set like the year labels beside the timeline. */
  .layer {
    display: flex;
    align-items: center;
    padding-inline: calc(var(--standard-spacing) * 1.25) var(--standard-spacing);
    background-color: color-mix(in oklab, var(--color-primary) 12%, var(--background));
    color: var(--color-text-secondary);
    font-size: 0.625rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    .onDarkGround & {
      background-color: color-mix(in oklab, var(--background) 18%, transparent);
    }
  }

  /* A layer with more technologies than fit across the card wraps them onto another line beside the
     cap, keeping each technology's logo and name together. */
  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0 calc(var(--standard-spacing) * 1.25);
    margin: 0;
    padding: calc(var(--standard-spacing) / 4) calc(var(--standard-spacing) * 1.25)
      calc(var(--standard-spacing) / 4) var(--standard-spacing);
    list-style: none;

    li {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--standard-spacing) * 0.625);
      white-space: nowrap;
    }

    /* The logo is drawn in the text color. */
    svg {
      flex: none;
      inline-size: 0.875rem;
      block-size: 0.875rem;
      fill: currentColor;
    }
  }
</style>
