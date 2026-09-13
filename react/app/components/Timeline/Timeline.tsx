import { timelineDatesService, TimelineItemKind, timelineService } from 'shared';
import EraCard from './EraCard';
import EraRail from './EraRail';
import ProjectCard from './ProjectCard/ProjectCard';
import ProjectRail from './ProjectRail';
import styles from './Timeline.module.css';
import TimelineAnimationWrapper from './TimelineAnimationWrapper';
import TimelineOverview from './TimelineOverview';

/**
 * The page's timeline: every era and project in one reverse chronological list, so scrolling down
 * moves backwards through time. Where there is room it is drawn like git log --graph, with each
 * era's rail down the left and each project's rail running up its lane beside the cards. On a
 * narrow screen the rails give way, the overview is pinned above the cards, and the cards take the
 * full width.
 */
export default function Timeline() {
  const timeline = timelineService.build();
  const laneCount = Math.max(...timeline.map(({ placement }) => placement.lane)) + 1;
  // The first four project cards are the first to scroll into view, so their thumbnails preload.
  const preloadedProjectKeys = timeline
    .map(({ item }) => item)
    .filter(
      (item) =>
        item.kind === TimelineItemKind.Project &&
        !timelineDatesService.isSingleDate(item.startDate, item.endDate)
    )
    .slice(0, 4)
    .map(({ key }) => key);

  return (
    <TimelineAnimationWrapper className={styles.timeline} style={{ '--grid-lanes': laneCount }}>
      <TimelineOverview />
      <div className={styles.grid}>
        {/* Every rail comes before every card, so rails sit next to rails and cards next to cards in
          the markup, which is what a run of dated rows and their nodes are styled by. */}
        {timeline.map(({ item, placement }) =>
          item.kind === TimelineItemKind.Era ? (
            <EraRail key={item.key} era={item} placement={placement} />
          ) : (
            <ProjectRail key={item.key} project={item} placement={placement} />
          )
        )}
        {timeline.map(({ item, placement }) =>
          item.kind === TimelineItemKind.Era ? (
            <EraCard key={item.key} era={item} placement={placement} />
          ) : (
            <ProjectCard
              key={item.key}
              project={item}
              placement={placement}
              preload={preloadedProjectKeys.includes(item.key)}
            />
          )
        )}
        <p className={styles.now} aria-hidden="true">
          now
        </p>
      </div>
    </TimelineAnimationWrapper>
  );
}
