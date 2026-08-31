import { type TimelineItemBase, TimelineItemKind } from '../types/TimelineItemBase';

export type Project = TimelineItemBase & {
  kind: TimelineItemKind.Project;
  tier: ProjectTier;
  demoLink?: string;
  codeLink: string;
  thumbnailDescription: string;
};

/**
 * How much room a project is given on the timeline.
 */
export enum ProjectTier {
  /** A card carrying a thumbnail, a summary, and links. */
  Featured = 'Featured',
  /** A dated row, for work kept for the progression it shows rather than for itself. */
  Compact = 'Compact'
}

type ProjectMap = { [projectKey: string]: Project };

const projects = {
  localNpmRegistry: {
    key: 'localNpmRegistry',
    kind: TimelineItemKind.Project,
    name: 'Local NPM Registry',
    info: 'A local NPM registry for testing and development purposes. It is built with Verdaccio and can be used to test packages before publishing them to the public NPM registry.',
    tier: ProjectTier.Featured,
    startDate: new Date('2025-05-01'),
    codeLink: 'https://github.com/aneuhold/ts-libs/tree/main/packages/local-npm-registry',
    thumbnailDescription: 'Local NPM Registry Thumbnail.'
  },
  personalTypescriptLibraries: {
    key: 'personalTypescriptLibraries',
    kind: TimelineItemKind.Project,
    name: 'Personal TypeScript Libraries',
    info: 'A collection of personal TypeScript libraries that I use in my projects. A monorepo. All are deployed to NPM, and optionally JSR as well.',
    tier: ProjectTier.Featured,
    startDate: new Date('2023-03-01'),
    codeLink: 'https://github.com/aneuhold/ts-libs',
    thumbnailDescription: 'Personal TypeScript Libraries Thumbnail.'
  },
  tiddlyDrive2: {
    key: 'tiddlyDrive2',
    kind: TimelineItemKind.Project,
    name: 'Tiddly Drive 2',
    info: 'A Google Marketplace Google Drive plugin that allows you to save and load TiddlyWikis from Google Drive.',
    tier: ProjectTier.Featured,
    startDate: new Date('2025-09-01'),
    codeLink: 'https://github.com/aneuhold/tiddlydrive',
    thumbnailDescription: 'Tiddly Drive 2 Logo.',
    demoLink: 'https://workspace.google.com/marketplace/app/tiddly_drive_2/477983451498?flow_type=2'
  },
  personalEslintConfig: {
    key: 'personalEslintConfig',
    kind: TimelineItemKind.Project,
    name: 'Personal ESLint Config',
    info: 'A published personal ESLint config that I use in my projects. It is available on NPM.',
    tier: ProjectTier.Featured,
    startDate: new Date('2024-05-01'),
    codeLink: 'https://github.com/aneuhold/eslint-config',
    thumbnailDescription: 'Personal ESLint Config Thumbnail.'
  },
  mainScripts: {
    key: 'mainScripts',
    kind: TimelineItemKind.Project,
    name: 'Main Scripts',
    info: 'A collection of scripts I use day to day for development. Includes package publishing scripts as well.',
    tier: ProjectTier.Featured,
    startDate: new Date('2021-09-01'),
    codeLink: 'https://github.com/aneuhold/main-scripts',
    thumbnailDescription: 'Main Scripts Thumbnail.'
  },
  nextjs15Course: {
    key: 'nextjs15Course',
    kind: TimelineItemKind.Project,
    name: 'Next.js Invoices App',
    info: 'A Next.js 15 course project that is an invoice app. It uses a backend with PostgreSQL and Neon + Vercel. See repo for login info.',
    tier: ProjectTier.Featured,
    startDate: new Date('2025-08-01'),
    endDate: new Date('2025-08-01'),
    codeLink: 'https://github.com/aneuhold/nextjs-15-course',
    demoLink: 'https://nextjs-15-course-xi.vercel.app/',
    thumbnailDescription: 'Next.js 15 Invoices App thumbnail'
  },
  halomodSpa: {
    key: 'halomodSpa',
    kind: TimelineItemKind.Project,
    name: 'HaloMod SPA',
    info: 'Capstone project for the ASU Software Engineering program. Done on a team of 5 for an Astrophysics doctorate.',
    tier: ProjectTier.Featured,
    startDate: new Date('2020-10-01'),
    endDate: new Date('2022-02-01'),
    codeLink: 'https://github.com/halomod/TheHaloMod-SPA',
    thumbnailDescription: 'HaloMod SPA Thumbnail.'
  },
  pointSpire: {
    key: 'pointSpire',
    kind: TimelineItemKind.Project,
    name: 'PointSpire',
    info: 'A personal project manager built with Scrum on a team with MongoDB, OAuth authentication, React, and TypeScript. Try it now by logging in with Github!',
    tier: ProjectTier.Featured,
    startDate: new Date('2020-05-01'),
    endDate: new Date('2020-08-01'),
    demoLink: 'https://point-spire.com',
    codeLink: 'https://github.com/PointSpire/PointSpire',
    thumbnailDescription: 'PointSpire Thumbnail'
  },
  carpetGeeksExampleWebsite: {
    key: 'carpetGeeksExampleWebsite',
    kind: TimelineItemKind.Project,
    name: 'Carpet Geeks Example Website',
    info: 'An example website built for a small business',
    tier: ProjectTier.Featured,
    startDate: new Date('2019-11-01'),
    endDate: new Date('2020-03-01'),
    demoLink: 'https://carpetgeeks.netlify.app/',
    codeLink: 'https://github.com/aneuhold/carpet-geeks',
    thumbnailDescription: 'Carpet Geeks Thumbnail.'
  },
  reactDrumMachine: {
    key: 'reactDrumMachine',
    kind: TimelineItemKind.Project,
    name: 'React Drum Machine',
    info: 'A drum machine built with react',
    tier: ProjectTier.Compact,
    startDate: new Date('2018-11-01'),
    endDate: new Date('2019-07-01'),
    demoLink: 'https://aneuhold-drum-machine.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-drum-machine',
    thumbnailDescription: 'React Drum Machine Thumbnail.'
  },
  reactCalculator: {
    key: 'reactCalculator',
    kind: TimelineItemKind.Project,
    name: 'React Calculator',
    info: 'A calculator built with react',
    tier: ProjectTier.Compact,
    startDate: new Date('2018-11-01'),
    endDate: new Date('2018-11-01'),
    demoLink: 'https://aneuhold-calculator.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-calculator',
    thumbnailDescription: 'React Cacluator Thumbnail.'
  },
  reactPomodoroClock: {
    key: 'reactPomodoroClock',
    kind: TimelineItemKind.Project,
    name: 'React Pomodoro Clock',
    info: 'A pomodoro clock built with react',
    tier: ProjectTier.Compact,
    startDate: new Date('2018-11-01'),
    endDate: new Date('2018-11-01'),
    demoLink: 'https://aneuhold-pomodoro-clock.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-pomodoro-clock',
    thumbnailDescription: 'Pomodoro Clock Thumbnail.'
  },
  mongodbExerciseTracker: {
    key: 'mongodbExerciseTracker',
    kind: TimelineItemKind.Project,
    name: 'MongoDB Exercise Tracker',
    info: 'Built with node.js and express',
    tier: ProjectTier.Compact,
    startDate: new Date('2018-12-01'),
    endDate: new Date('2018-12-01'),
    demoLink: 'https://decisive-cowl.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-exercisetracker',
    thumbnailDescription: 'MongoDB Exercise Tracker Thumbnail.'
  },
  placesAndroidApp: {
    key: 'placesAndroidApp',
    kind: TimelineItemKind.Project,
    name: 'Places Android App',
    info: 'A simple Android app built to store and map named coordinates and details for those coordinates',
    tier: ProjectTier.Compact,
    startDate: new Date('2019-11-01'),
    endDate: new Date('2020-03-01'),
    codeLink: 'https://github.com/aneuhold/places-android-app',
    thumbnailDescription: 'Places Android App Thumbnail.'
  },
  placesIosApp: {
    key: 'placesIosApp',
    kind: TimelineItemKind.Project,
    name: 'Places iOS App',
    info: 'A simple iOS app built to store and map named coordinates and details for those coordinates',
    tier: ProjectTier.Compact,
    startDate: new Date('2019-10-01'),
    endDate: new Date('2019-12-01'),
    codeLink: 'https://github.com/aneuhold/PlacesiOSApp',
    thumbnailDescription: 'Places iOS App Thumbnail.'
  },
  urlShortener: {
    key: 'urlShortener',
    kind: TimelineItemKind.Project,
    name: 'URL Shortener',
    info: 'Built with node.js, express, and MongoDB',
    tier: ProjectTier.Compact,
    startDate: new Date('2018-12-01'),
    endDate: new Date('2018-12-01'),
    demoLink: 'https://tangible-risk.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-urlshortener',
    thumbnailDescription: 'URL Shortener Thumbnail.'
  },
  battleShip: {
    key: 'battleShip',
    kind: TimelineItemKind.Project,
    name: 'BattleShip',
    info: 'Built in Java as a group project for SER215',
    tier: ProjectTier.Compact,
    startDate: new Date('2017-09-01'),
    endDate: new Date('2017-10-01'),
    codeLink: 'https://github.com/aneuhold/ser215-battleship',
    thumbnailDescription: 'Battleship Thumbnail.'
  },
  blackJack: {
    key: 'blackJack',
    kind: TimelineItemKind.Project,
    name: 'BlackJack',
    info: 'Built in Python 3.x',
    tier: ProjectTier.Compact,
    startDate: new Date('2017-09-01'),
    endDate: new Date('2018-12-01'),
    demoLink: 'https://repl.it/@aneuhold/BlackJack',
    codeLink: 'https://github.com/aneuhold/python-projects/tree/master/Black%20Jack',
    thumbnailDescription: 'Python Command Line BlackJack Thumbnail.'
  }
} satisfies ProjectMap;

// Export as a more generic type to make it easier to use in components.
const genericProjects: ProjectMap = projects;

export default genericProjects;

export type ProjectKey = keyof typeof projects;
