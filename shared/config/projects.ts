export type Project = {
  name: string;
  heading: string;
  info: string;
  demoLink?: string;
  codeLink: string;
  thumbnailDescription: string;
};

type ProjectMap = { [projectKey: string]: Project };

const projects = {
  localNpmRegistry: {
    name: 'Local NPM Registry',
    heading: 'Local NPM Registry',
    info: 'A local NPM registry for testing and development purposes. It is built with Verdaccio and can be used to test packages before publishing them to the public NPM registry.',
    codeLink: 'https://github.com/aneuhold/ts-libs/tree/main/packages/local-npm-registry',
    thumbnailDescription: 'Local NPM Registry Thumbnail.'
  },
  personalTypescriptLibraries: {
    name: 'Personal TypeScript Libraries',
    heading: 'Personal TypeScript Libraries',
    info: 'A collection of personal TypeScript libraries that I use in my projects. A monorepo. All are deployed to NPM, and optionally JSR as well.',
    codeLink: 'https://github.com/aneuhold/ts-libs',
    thumbnailDescription: 'Personal TypeScript Libraries Thumbnail.'
  },
  personalEslintConfig: {
    name: 'Personal ESLint Config',
    heading: 'Personal ESLint Config',
    info: 'A published personal ESLint config that I use in my projects. It is available on NPM.',
    codeLink: 'https://github.com/aneuhold/eslint-config',
    thumbnailDescription: 'Personal ESLint Config Thumbnail.'
  },
  mainScripts: {
    name: 'Main Scripts',
    heading: 'Main Scripts',
    info: 'A collection of scripts I use day to day for development. Includes package publishing scripts as well.',
    codeLink: 'https://github.com/aneuhold/main-scripts',
    thumbnailDescription: 'Main Scripts Thumbnail.'
  },
  halomodSpa: {
    name: 'HaloMod SPA',
    heading: 'HaloMod SPA',
    info: 'Capstone project for the ASU Software Engineering program. Done on a team of 5 for an Astrophysics doctorate.',
    codeLink: 'https://github.com/halomod/TheHaloMod-SPA',
    thumbnailDescription: 'HaloMod SPA Thumbnail.'
  },
  pointSpire: {
    name: 'PointSpire',
    heading: 'PointSpire',
    info: 'A personal project manager built with Scrum on a team with MongoDB, OAuth authentication, React, and TypeScript. Try it now by logging in with Github!',
    demoLink: 'https://point-spire.com',
    codeLink: 'https://github.com/PointSpire/PointSpire',
    thumbnailDescription: 'PointSpire Thumbnail'
  },
  carpetGeeksExampleWebsite: {
    name: 'Carpet Geeks Example Website',
    heading: 'Carpet Geeks',
    info: 'An example website built for a small business',
    demoLink: 'https://carpetgeeks.netlify.app/',
    codeLink: 'https://github.com/aneuhold/carpet-geeks',
    thumbnailDescription: 'Carpet Geeks Thumbnail.'
  },
  reactDrumMachine: {
    name: 'React Drum Machine',
    heading: 'React Drum Machine',
    info: 'A drum machine built with react',
    demoLink: 'https://aneuhold-drum-machine.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-drum-machine',
    thumbnailDescription: 'React Drum Machine Thumbnail.'
  },
  reactCalculator: {
    name: 'React Calculator',
    heading: 'React Calculator',
    info: 'A calculator built with react',
    demoLink: 'https://aneuhold-calculator.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-calculator',
    thumbnailDescription: 'React Cacluator Thumbnail.'
  },
  reactPomodoroClock: {
    name: 'React Pomodoro Clock',
    heading: 'React Pomodoro Clock',
    info: 'A pomodoro clock built with react',
    demoLink: 'https://aneuhold-pomodoro-clock.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-pomodoro-clock',
    thumbnailDescription: 'Pomodoro Clock Thumbnail.'
  },
  mongodbExerciseTracker: {
    name: 'MongoDB Exercise Tracker',
    heading: 'MongoDB Exercise Tracker',
    info: 'Built with node.js and express',
    demoLink: 'https://decisive-cowl.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-exercisetracker',
    thumbnailDescription: 'MongoDB Exercise Tracker Thumbnail.'
  },
  placesAndroidApp: {
    name: 'Places Android App',
    heading: 'Places Android App',
    info: 'A simple Android app built to store and map named coordinates and details for those coordinates',
    codeLink: 'https://github.com/aneuhold/places-android-app',
    thumbnailDescription: 'Places Android App Thumbnail.'
  },
  placesIosApp: {
    name: 'Places iOS App',
    heading: 'Places iOS App',
    info: 'A simple iOS app built to store and map named coordinates and details for those coordinates',
    codeLink: 'https://github.com/aneuhold/PlacesiOSApp',
    thumbnailDescription: 'Places iOS App Thumbnail.'
  },
  urlShortener: {
    name: 'URL Shortener',
    heading: 'URL Shortener',
    info: 'Built with node.js, express, and MongoDB',
    demoLink: 'https://tangible-risk.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-urlshortener',
    thumbnailDescription: 'URL Shortener Thumbnail.'
  },
  battleShip: {
    name: 'BattleShip',
    heading: 'BattleShip',
    info: 'Built in Java as a group project for SER215',
    codeLink: 'https://github.com/aneuhold/ser215-battleship',
    thumbnailDescription: 'Battleship Thumbnail.'
  },
  blackJack: {
    name: 'BlackJack',
    heading: 'Command Line BlackJack',
    info: 'Built in Python 3.x',
    demoLink: 'https://repl.it/@aneuhold/BlackJack',
    codeLink: 'https://github.com/aneuhold/python-projects/tree/master/Black%20Jack',
    thumbnailDescription: 'Python Command Line BlackJack Thumbnail.'
  }
} satisfies ProjectMap;

// Export as a more generic type to make it easier to use in components.
export default projects as ProjectMap;

export type ProjectKey = keyof typeof projects;
