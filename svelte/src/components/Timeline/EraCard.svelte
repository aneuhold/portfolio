<!--
  @component

  The foot of an era: who it was with, when it ran, and what it amounted to.
-->
<script lang="ts">
  import type { Era } from '$shared/config/eras';
  import timelineService from '$shared/services/Timeline.service';

  const { era }: { era: Era } = $props();
</script>

<div class="eraCard">
  <h2 class="header-4">{era.name}</h2>
  <p class="dates">{timelineService.formatRange(era.startDate, era.endDate)}</p>
  <p>{era.info}</p>
</div>

<style>
  .eraCard {
    padding: calc(var(--standard-spacing) * 2);
    border: 1px solid var(--color-primary);
  }
</style>
