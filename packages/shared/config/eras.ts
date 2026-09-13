import { type TimelineItemBase, TimelineItemKind } from '../types/TimelineItemBase';
import { Technology, TechnologyLayer } from './technologies';

/**
 * A stretch of time the timeline is divided into: a job, or a period of school.
 *
 * Nothing links a project to an era. Where they sit relative to each other is derived from the
 * dates, so adding an era re-slots the surrounding projects without touching `projects.ts`.
 */
export type Era = TimelineItemBase & {
  kind: TimelineItemKind.Era;
};

type EraMap = { [eraKey: string]: Era };

const eraDefinitions = {
  secondNature: {
    key: 'secondNature',
    kind: TimelineItemKind.Era,
    name: 'Second Nature',
    info: 'Senior Frontend Software Engineer on the resident experience platform. Ships resident-facing Next.js and React interfaces along with the NestJS, GraphQL, and Prisma services behind them, and carries production incidents through to the follow-up work that closes the gap.',
    startDate: new Date('2025-10-01'),
    technologyGroups: [
      { layer: TechnologyLayer.Frontend, technologies: [Technology.NextJs, Technology.React] },
      {
        layer: TechnologyLayer.Backend,
        technologies: [
          Technology.NestJs,
          Technology.GraphQl,
          Technology.Prisma,
          Technology.PostgreSql,
          Technology.Aws
        ]
      },
      { layer: TechnologyLayer.Language, technologies: [Technology.TypeScript] }
    ]
  },
  predictiveIndex: {
    key: 'predictiveIndex',
    kind: TimelineItemKind.Era,
    name: 'The Predictive Index',
    info: 'Four years of full stack work on a behavioral assessment platform, joining as a Software Engineer I and leaving as a Senior Software Engineer. Angular and TypeScript on the front, C# and Azure on the back, translating Figma designs into shipped UI and holding an on-call rotation.',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2025-10-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Frontend,
        technologies: [Technology.Angular, Technology.TypeScript]
      },
      { layer: TechnologyLayer.Backend, technologies: [Technology.CSharp, Technology.Azure] }
    ]
  },
  arizonaStateUniversity: {
    key: 'arizonaStateUniversity',
    kind: TimelineItemKind.Era,
    name: 'Arizona State University',
    info: 'Bachelor of Science in Software Engineering, finished with a 4.0. Where the fundamentals came from: coursework across languages and platforms, team projects run with Scrum, and a capstone built for an astrophysics doctorate.',
    startDate: new Date('2017-03-01'),
    endDate: new Date('2021-04-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Language,
        technologies: [
          Technology.Java,
          Technology.Python,
          Technology.C,
          Technology.CPlusPlus,
          Technology.Swift,
          Technology.TypeScript
        ]
      },
      { layer: TechnologyLayer.Frontend, technologies: [Technology.React, Technology.VueJs] }
    ]
  }
} satisfies EraMap;

// Exported as a more generic type to make it easier to use in components.
export const eras: EraMap = eraDefinitions;
