<!--
  @component

  An era's L: the rail carrying its colour down the page, turning at the bottom into the card that
  says who it was with, when it ran, and what it amounted to. The projects it overlaps are siblings
  on the timeline rather than children, because a project can outlive the era it began in.
-->
<script lang="ts">
  import type { Era } from '$shared/config/eras';
  import timelineService from '$shared/services/Timeline.service';

  const { era }: { era: Era } = $props();
</script>

<section class="era">
  <div class="rail"></div>
  <div class="card">
    <h2 class="header-4">{era.name}</h2>
    <p class="dates">{timelineService.formatRange(era.startDate, era.endDate)}</p>
    <p>{era.info}</p>
  </div>
</section>

<style>
  .card {
    padding: calc(var(--standard-spacing) * 2);
    border: 1px solid var(--color-primary);
  }
</style>
