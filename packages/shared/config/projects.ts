import { type TimelineItemBase, TimelineItemKind } from '../types/TimelineItemBase';
import { Technology, TechnologyLayer } from './technologies';

export type Project = TimelineItemBase & {
  kind: TimelineItemKind.Project;
  demoLink?: string;
  codeLink: string;
  thumbnailDescription: string;
};

type ProjectMap = { [projectKey: string]: Project };

const projectDefinitions = {
  auroraColonyPub: {
    key: 'auroraColonyPub',
    kind: TimelineItemKind.Project,
    name: 'SEO-First Serverless Website',
    info: 'The website for the Aurora Colony Pub in Aurora, Oregon, focused on fast pages and strong SEO. Built with Astro and Svelte islands on Cloudflare Pages, with Cloudflare Workers handling the contact form and Facebook feed, and Sveltia CMS for editing content.',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-07-01'),
    technologyGroups: [
      { layer: TechnologyLayer.Frontend, technologies: [Technology.Astro, Technology.Svelte] },
      { layer: TechnologyLayer.Backend, technologies: [Technology.CloudflareWorkers] },
      {
        layer: TechnologyLayer.Platform,
        technologies: [Technology.CloudflarePages, Technology.SveltiaCms]
      }
    ],
    demoLink: 'https://auroracolonypub.com',
    codeLink: 'https://github.com/aneuhold/aurora-colony-pub',
    thumbnailDescription: 'Aurora Colony Pub Logo.'
  },
  mesoPro: {
    key: 'mesoPro',
    kind: TimelineItemKind.Project,
    name: 'MesoPro',
    info: 'A hypertrophy training app that plans mesocycles and adjusts weights, reps, and sets from logged performance. Built with SvelteKit and shipped to Android with Capacitor, on top of my Google Cloud backend.',
    startDate: new Date('2026-02-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Frontend,
        technologies: [Technology.SvelteKit, Technology.TypeScript]
      },
      { layer: TechnologyLayer.Mobile, technologies: [Technology.Capacitor, Technology.Android] },
      {
        layer: TechnologyLayer.Backend,
        technologies: [Technology.NestJs, Technology.MongoDb, Technology.GoogleCloud]
      }
    ],
    demoLink: 'https://mesopro.tonyneuhold.com',
    codeLink: 'https://github.com/aneuhold/workout',
    thumbnailDescription: 'MesoPro Logo.'
  },
  personalDashboard: {
    key: 'personalDashboard',
    kind: TimelineItemKind.Project,
    name: 'Personal Dashboard',
    info: 'A personal dashboard for the things I use day to day, centered on shared and recurring tasks. Built with SvelteKit and Svelte Material UI, on top of my Google Cloud backend.',
    startDate: new Date('2023-11-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Frontend,
        technologies: [Technology.SvelteKit, Technology.SvelteMaterialUi, Technology.TypeScript]
      },
      {
        layer: TechnologyLayer.Backend,
        technologies: [Technology.NestJs, Technology.MongoDb, Technology.GoogleCloud]
      }
    ],
    demoLink: 'https://dashboard.tonyneuhold.com',
    codeLink: 'https://github.com/aneuhold/dashboard',
    thumbnailDescription: 'Personal Dashboard Logo.'
  },
  localNpmRegistry: {
    key: 'localNpmRegistry',
    kind: TimelineItemKind.Project,
    name: 'Local NPM Registry',
    info: 'A local NPM registry for testing and development purposes. It is built with Verdaccio and can be used to test packages before publishing them to the public NPM registry.',
    startDate: new Date('2025-05-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Tooling,
        technologies: [Technology.Verdaccio, Technology.NodeJs, Technology.TypeScript]
      }
    ],
    codeLink: 'https://github.com/aneuhold/ts-libs/tree/main/packages/local-npm-registry',
    thumbnailDescription: 'Local NPM Registry Thumbnail.'
  },
  personalTypescriptLibraries: {
    key: 'personalTypescriptLibraries',
    kind: TimelineItemKind.Project,
    name: 'Personal TypeScript Libraries',
    info: 'A collection of personal TypeScript libraries that I use in my projects. A monorepo. All are deployed to NPM, and optionally JSR as well.',
    startDate: new Date('2023-03-01'),
    technologyGroups: [
      { layer: TechnologyLayer.Language, technologies: [Technology.TypeScript] },
      { layer: TechnologyLayer.Platform, technologies: [Technology.Npm, Technology.Jsr] }
    ],
    codeLink: 'https://github.com/aneuhold/ts-libs',
    thumbnailDescription: 'Personal TypeScript Libraries Thumbnail.'
  },
  tiddlyDrive2: {
    key: 'tiddlyDrive2',
    kind: TimelineItemKind.Project,
    name: 'Tiddly Drive 2',
    info: 'A Google Marketplace Google Drive plugin that allows you to save and load TiddlyWikis from Google Drive.',
    startDate: new Date('2025-09-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Frontend,
        technologies: [Technology.SvelteKit, Technology.TypeScript]
      },
      { layer: TechnologyLayer.Backend, technologies: [Technology.NetlifyFunctions] },
      { layer: TechnologyLayer.Platform, technologies: [Technology.GoogleDrive] }
    ],
    codeLink: 'https://github.com/aneuhold/tiddlydrive',
    thumbnailDescription: 'Tiddly Drive 2 Logo.',
    demoLink: 'https://workspace.google.com/marketplace/app/tiddly_drive_2/477983451498?flow_type=2'
  },
  // Commented out because it isn't as important as the other ones. Could be added back if the
  // UI has enough room or it makes sense.
  // personalEslintConfig: {
  //   key: 'personalEslintConfig',
  //   kind: TimelineItemKind.Project,
  //   name: 'Personal ESLint Config',
  //   info: 'A published personal ESLint config that I use in my projects. It is available on NPM.',
  //   startDate: new Date('2024-05-01'),
  //   codeLink: 'https://github.com/aneuhold/eslint-config',
  //   thumbnailDescription: 'Personal ESLint Config Thumbnail.'
  // },
  mainScripts: {
    key: 'mainScripts',
    kind: TimelineItemKind.Project,
    name: 'Main Scripts',
    info: 'A collection of scripts I use day to day for development. Includes package publishing scripts as well.',
    startDate: new Date('2021-09-01'),
    technologyGroups: [
      { layer: TechnologyLayer.Tooling, technologies: [Technology.NodeJs, Technology.TypeScript] }
    ],
    codeLink: 'https://github.com/aneuhold/main-scripts',
    thumbnailDescription: 'Main Scripts Thumbnail.'
  },
  nextjs15Course: {
    key: 'nextjs15Course',
    kind: TimelineItemKind.Project,
    name: 'Next.js Invoices App',
    info: 'A Next.js 15 course project that is an invoice app. It uses a backend with PostgreSQL and Neon + Vercel. See repo for login info.',
    startDate: new Date('2025-08-01'),
    endDate: new Date('2025-08-01'),
    technologyGroups: [
      { layer: TechnologyLayer.Frontend, technologies: [Technology.NextJs, Technology.React] },
      { layer: TechnologyLayer.Backend, technologies: [Technology.PostgreSql, Technology.Neon] },
      { layer: TechnologyLayer.Platform, technologies: [Technology.Vercel] }
    ],
    codeLink: 'https://github.com/aneuhold/nextjs-15-course',
    demoLink: 'https://nextjs-15-course-xi.vercel.app/',
    thumbnailDescription: 'Next.js 15 Invoices App thumbnail'
  },
  halomodSpa: {
    key: 'halomodSpa',
    kind: TimelineItemKind.Project,
    name: 'HaloMod SPA',
    info: 'Capstone project for the ASU Software Engineering program. Done on a team of 5 for an Astrophysics doctorate.',
    startDate: new Date('2020-10-01'),
    endDate: new Date('2021-06-25'),
    technologyGroups: [
      { layer: TechnologyLayer.Frontend, technologies: [Technology.VueJs] },
      { layer: TechnologyLayer.Backend, technologies: [Technology.Python, Technology.Flask] }
    ],
    codeLink: 'https://github.com/halomod/TheHaloMod-SPA',
    thumbnailDescription: 'HaloMod SPA Thumbnail.'
  },
  pointSpire: {
    key: 'pointSpire',
    kind: TimelineItemKind.Project,
    name: 'PointSpire',
    info: 'A personal project manager built with Scrum on a team with MongoDB, OAuth authentication, React, and TypeScript.',
    startDate: new Date('2020-05-01'),
    endDate: new Date('2020-08-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Frontend,
        technologies: [Technology.React, Technology.TypeScript, Technology.MaterialUi]
      },
      {
        layer: TechnologyLayer.Backend,
        technologies: [Technology.NodeJs, Technology.Express, Technology.MongoDb]
      }
    ],
    demoLink: 'https://point-spire.com',
    codeLink: 'https://github.com/PointSpire/PointSpire',
    thumbnailDescription: 'PointSpire Thumbnail'
  },
  carpetGeeksExampleWebsite: {
    key: 'carpetGeeksExampleWebsite',
    kind: TimelineItemKind.Project,
    name: 'Carpet Geeks Example Website',
    info: 'An example website built for a small business',
    startDate: new Date('2019-11-01'),
    endDate: new Date('2020-03-01'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Frontend,
        technologies: [Technology.NextJs, Technology.React, Technology.TypeScript]
      }
    ],
    demoLink: 'https://carpetgeeks.netlify.app/',
    codeLink: 'https://github.com/aneuhold/carpet-geeks',
    thumbnailDescription: 'Carpet Geeks Thumbnail.'
  },
  reactDrumMachine: {
    key: 'reactDrumMachine',
    kind: TimelineItemKind.Project,
    name: 'React Drum Machine',
    info: 'A drum machine built with react',
    startDate: new Date('2018-11-22'),
    endDate: new Date('2018-11-22'),
    technologyGroups: [{ layer: TechnologyLayer.Frontend, technologies: [Technology.React] }],
    demoLink: 'https://aneuhold-drum-machine.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-drum-machine',
    thumbnailDescription: 'React Drum Machine Thumbnail.'
  },
  reactCalculator: {
    key: 'reactCalculator',
    kind: TimelineItemKind.Project,
    name: 'React Calculator',
    info: 'A calculator built with react',
    startDate: new Date('2018-11-22'),
    endDate: new Date('2018-11-22'),
    technologyGroups: [{ layer: TechnologyLayer.Frontend, technologies: [Technology.React] }],
    demoLink: 'https://aneuhold-calculator.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-calculator',
    thumbnailDescription: 'React Cacluator Thumbnail.'
  },
  reactPomodoroClock: {
    key: 'reactPomodoroClock',
    kind: TimelineItemKind.Project,
    name: 'React Pomodoro Clock',
    info: 'A pomodoro clock built with react',
    startDate: new Date('2018-11-24'),
    endDate: new Date('2018-11-24'),
    technologyGroups: [{ layer: TechnologyLayer.Frontend, technologies: [Technology.React] }],
    demoLink: 'https://aneuhold-pomodoro-clock.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-pomodoro-clock',
    thumbnailDescription: 'Pomodoro Clock Thumbnail.'
  },
  mongodbExerciseTracker: {
    key: 'mongodbExerciseTracker',
    kind: TimelineItemKind.Project,
    name: 'MongoDB Exercise Tracker',
    info: 'Built with node.js and express',
    startDate: new Date('2018-12-19'),
    endDate: new Date('2018-12-19'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Backend,
        technologies: [Technology.NodeJs, Technology.Express, Technology.MongoDb]
      }
    ],
    demoLink: 'https://decisive-cowl.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-exercisetracker',
    thumbnailDescription: 'MongoDB Exercise Tracker Thumbnail.'
  },
  placesAndroidApp: {
    key: 'placesAndroidApp',
    kind: TimelineItemKind.Project,
    name: 'Places Android App',
    info: 'A simple Android app built to store and map named coordinates and details for those coordinates',
    startDate: new Date('2019-11-07'),
    endDate: new Date('2019-11-07'),
    technologyGroups: [
      { layer: TechnologyLayer.Mobile, technologies: [Technology.Android] },
      { layer: TechnologyLayer.Language, technologies: [Technology.Java] }
    ],
    codeLink: 'https://github.com/aneuhold/places-android-app',
    thumbnailDescription: 'Places Android App Thumbnail.'
  },
  placesIosApp: {
    key: 'placesIosApp',
    kind: TimelineItemKind.Project,
    name: 'Places iOS App',
    info: 'A simple iOS app built to store and map named coordinates and details for those coordinates',
    startDate: new Date('2019-11-10'),
    endDate: new Date('2019-11-10'),
    technologyGroups: [
      { layer: TechnologyLayer.Mobile, technologies: [Technology.Ios] },
      { layer: TechnologyLayer.Language, technologies: [Technology.Swift] }
    ],
    codeLink: 'https://github.com/aneuhold/PlacesiOSApp',
    thumbnailDescription: 'Places iOS App Thumbnail.'
  },
  urlShortener: {
    key: 'urlShortener',
    kind: TimelineItemKind.Project,
    name: 'URL Shortener',
    info: 'Built with node.js, express, and MongoDB',
    startDate: new Date('2018-12-19'),
    endDate: new Date('2018-12-19'),
    technologyGroups: [
      {
        layer: TechnologyLayer.Backend,
        technologies: [Technology.NodeJs, Technology.Express, Technology.MongoDb]
      }
    ],
    demoLink: 'https://tangible-risk.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-urlshortener',
    thumbnailDescription: 'URL Shortener Thumbnail.'
  },
  battleShip: {
    key: 'battleShip',
    kind: TimelineItemKind.Project,
    name: 'BattleShip',
    info: 'Built in Java as a group project for SER215',
    startDate: new Date('2017-09-25'),
    endDate: new Date('2017-09-25'),
    technologyGroups: [{ layer: TechnologyLayer.Language, technologies: [Technology.Java] }],
    codeLink: 'https://github.com/aneuhold/ser215-battleship',
    thumbnailDescription: 'Battleship Thumbnail.'
  },
  blackJack: {
    key: 'blackJack',
    kind: TimelineItemKind.Project,
    name: 'BlackJack',
    info: 'Built in Python 3.x',
    startDate: new Date('2017-09-21'),
    endDate: new Date('2017-09-21'),
    technologyGroups: [{ layer: TechnologyLayer.Language, technologies: [Technology.Python] }],
    demoLink: 'https://repl.it/@aneuhold/BlackJack',
    codeLink: 'https://github.com/aneuhold/python-projects/tree/master/Black%20Jack',
    thumbnailDescription: 'Python Command Line BlackJack Thumbnail.'
  }
} satisfies ProjectMap;

// Exported as a more generic type to make it easier to use in components.
export const projects: ProjectMap = projectDefinitions;

export type ProjectKey = keyof typeof projectDefinitions;
