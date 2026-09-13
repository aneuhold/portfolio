import { eras, type Era } from './config/eras';
import { projects, type Project, type ProjectKey } from './config/projects';
import { socialLinks } from './config/socialLinks';
import { timelineService, type TimelinePlacement } from './services/Timeline.service';
import { timelineDatesService } from './services/TimelineDates.service';
import { timelineLiftService } from './services/TimelineLift.service';
import { TextColor } from './types/TextColor';
import { type TimelineItemBase, TimelineItemKind } from './types/TimelineItemBase';

// Export classes and objects
export {
  eras,
  projects,
  socialLinks,
  TextColor,
  TimelineItemKind,
  timelineDatesService,
  timelineLiftService,
  timelineService
};

// Export TypeScript types where needed
export type { Era, Project, ProjectKey, TimelineItemBase, TimelinePlacement };
