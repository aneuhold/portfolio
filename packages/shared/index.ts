import { eras, type Era } from './config/eras';
import { projects, type Project, type ProjectKey } from './config/projects';
import { socialLinks } from './config/socialLinks';
import { technologies, type TechnologyGroup } from './config/technologies';
import { timelineService, type TimelinePlacement } from './services/Timeline.service';
import { timelineDatesService } from './services/TimelineDates.service';
import { timelineLiftService } from './services/TimelineLift.service';
import { TextColor } from './types/TextColor';
import { TimelineDatesSize } from './types/TimelineDatesSize';
import { type TimelineItemBase, TimelineItemKind } from './types/TimelineItemBase';

// Export classes and objects
export {
  eras,
  projects,
  socialLinks,
  technologies,
  TextColor,
  TimelineDatesSize,
  TimelineItemKind,
  timelineDatesService,
  timelineLiftService,
  timelineService
};

// Export TypeScript types where needed
export type { Era, Project, ProjectKey, TechnologyGroup, TimelineItemBase, TimelinePlacement };
