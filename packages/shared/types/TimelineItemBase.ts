import { type TechnologyGroup } from '../config/technologies';

/**
 * What every element of the timeline has in common.
 */
export type TimelineItemBase = {
  /**
   * Stable identity, independent of the display name. Each app keys its images by it.
   */
  key: string;
  name: string;
  info: string;
  startDate: Date;
  endDate?: Date;
  /**
   * The technologies behind the item, one group per layer, in the order they are shown.
   */
  technologyGroups: TechnologyGroup[];
};

/**
 * Which kind of thing a timeline item is, so a list holding both can tell them apart.
 */
export enum TimelineItemKind {
  Era = 'Era',
  Project = 'Project'
}
