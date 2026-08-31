/**
 * A stretch of time the timeline is divided into: a job, or a period of school.
 */
export type Era = {
  name: string;
  info: string;
  startDate: Date;
  endDate?: Date;
};

type EraMap = { [eraKey: string]: Era };

const eras = {
  secondNature: {
    name: 'Second Nature',
    info: 'Senior Frontend Software Engineer on the resident experience platform. Ships resident-facing Next.js and React interfaces along with the NestJS, GraphQL, and Prisma services behind them, and carries production incidents through to the follow-up work that closes the gap.',
    startDate: new Date('2025-10-01')
  },
  predictiveIndex: {
    name: 'The Predictive Index',
    info: 'Four years of full stack work on a behavioral assessment platform, joining as a Software Engineer I and leaving as a Senior Software Engineer. Angular and TypeScript on the front, C# and Azure on the back, translating Figma designs into shipped UI and holding an on-call rotation.',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2025-10-01')
  },
  arizonaStateUniversity: {
    name: 'Arizona State University',
    info: 'Bachelor of Science in Software Engineering, finished with a 4.0. Where the fundamentals came from: coursework across languages and platforms, team projects run with Scrum, and a capstone built for an astrophysics doctorate.',
    startDate: new Date('2017-03-01'),
    endDate: new Date('2021-04-01')
  }
} satisfies EraMap;

// Export as a more generic type to make it easier to use in components.
const genericEras: EraMap = eras;

export default genericEras;

export type EraKey = keyof typeof eras;
