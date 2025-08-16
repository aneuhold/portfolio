type Project = {
  name: string;
  heading: string;
  info: string;
  demoLink?: string;
  codeLink: string;
  thumbnailUrl: string;
  /**
   * Thumbnail path is the "local" path.
   */
  thumbnailPath?: string;
  thumbnailDescription: string;
};

const projects: Array<Project> = [
  {
    name: 'Local NPM Registry',
    heading: 'Local NPM Registry',
    info: 'A local NPM registry for testing and development purposes. It is built with Verdaccio and can be used to test packages before publishing them to the public NPM registry.',
    codeLink: 'https://github.com/aneuhold/ts-libs/tree/main/packages/local-npm-registry',
    thumbnailUrl: 'https://i.imgur.com/Bg75UX8.png',
    thumbnailDescription: 'Local NPM Registry Thumbnail.'
  },
  {
    name: 'Personal TypeScript Libraries',
    heading: 'Personal TypeScript Libraries',
    info: 'A collection of personal TypeScript libraries that I use in my projects. A monorepo. All are deployed to NPM, and optionally JSR as well.',
    codeLink: 'https://github.com/aneuhold/ts-libs',
    thumbnailUrl: 'https://i.imgur.com/uPHzooH.png',
    thumbnailDescription: 'Personal TypeScript Libraries Thumbnail.'
  },
  {
    name: 'Personal ESLint Config',
    heading: 'Personal ESLint Config',
    info: 'A published personal ESLint config that I use in my projects. It is available on NPM.',
    codeLink: 'https://github.com/aneuhold/eslint-config',
    thumbnailUrl: 'https://i.imgur.com/cUQ5hQ1.png',
    thumbnailDescription: 'Personal ESLint Config Thumbnail.'
  },
  {
    name: 'Main Scripts',
    heading: 'Main Scripts',
    info: 'A collection of scripts I use day to day for development. Includes package publishing scripts as well.',
    codeLink: 'https://github.com/aneuhold/main-scripts',
    thumbnailUrl: 'https://i.imgur.com/3s6XWDg.png',
    thumbnailDescription: 'Main Scripts Thumbnail.'
  },
  {
    name: 'HaloMod SPA',
    heading: 'HaloMod SPA',
    info: 'Capstone project for the ASU Software Engineering program. Done on a team of 5 for an Astrophysics doctorate.',
    codeLink: 'https://github.com/halomod/TheHaloMod-SPA',
    thumbnailUrl: 'https://i.imgur.com/uxBxJWM.png',
    thumbnailDescription: 'HaloMod SPA Thumbnail.'
  },
  {
    name: 'PointSpire',
    heading: 'PointSpire',
    info: 'A personal project manager built with Scrum on a team with MongoDB, OAuth authentication, React, and TypeScript. Try it now by logging in with Github!',
    demoLink: 'https://point-spire.com',
    codeLink: 'https://github.com/PointSpire/PointSpire',
    thumbnailUrl: 'https://i.imgur.com/Hwq5mBH.png',
    thumbnailDescription: 'PointSpire Thumbnail'
  },
  {
    name: 'Carpet Geeks Example Website',
    heading: 'Carpet Geeks',
    info: 'An example website built for a small business',
    demoLink: 'https://carpetgeeks.netlify.app/',
    codeLink: 'https://github.com/aneuhold/carpet-geeks',
    thumbnailUrl: 'https://i.imgur.com/NuK5Z1y.png',
    thumbnailDescription: 'Carpet Geeks Thumbnail.'
  },
  {
    name: 'React Drum Machine',
    heading: 'React Drum Machine',
    info: 'A drum machine built with react',
    demoLink: 'https://aneuhold-drum-machine.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-drum-machine',
    thumbnailUrl: 'https://i.imgur.com/Y7N4jRO.png',
    thumbnailDescription: 'React Drum Machine Thumbnail.'
  },
  {
    name: 'React Calculator',
    heading: 'React Calculator',
    info: 'A calculator built with react',
    demoLink: 'https://aneuhold-calculator.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-calculator',
    thumbnailUrl: 'https://i.imgur.com/Jn7zDGy.png',
    thumbnailDescription: 'React Cacluator Thumbnail.'
  },
  {
    name: 'React Pomodoro Clock',
    heading: 'React Pomodoro Clock',
    info: 'A pomodoro clock built with react',
    demoLink: 'https://aneuhold-pomodoro-clock.netlify.com/',
    codeLink: 'https://github.com/aneuhold/React-Projects/tree/master/fcc-pomodoro-clock',
    thumbnailUrl: 'https://i.imgur.com/UsnewFM.png',
    thumbnailDescription: 'Pomodoro Clock Thumbnail.'
  },
  {
    name: 'MongoDB Exercise Tracker',
    heading: 'MongoDB Exercise Tracker',
    info: 'Built with node.js and express',
    demoLink: 'https://decisive-cowl.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-exercisetracker',
    thumbnailUrl: 'https://i.imgur.com/Ql5RFLb.png',
    thumbnailDescription: 'MongoDB Exercise Tracker Thumbnail.'
  },
  {
    name: 'Places Android App',
    heading: 'Places Android App',
    info: 'A simple Android app built to store and map named coordinates and details for those coordinates',
    codeLink: 'https://github.com/aneuhold/places-android-app',
    thumbnailUrl: 'https://i.imgur.com/aNwCNIp.png',
    thumbnailDescription: 'Places Android App Thumbnail.'
  },
  {
    name: 'Places iOS App',
    heading: 'Places iOS App',
    info: 'A simple iOS app built to store and map named coordinates and details for those coordinates',
    codeLink: 'https://github.com/aneuhold/PlacesiOSApp',
    thumbnailUrl: 'https://i.imgur.com/MuDnnHO.png',
    thumbnailDescription: 'Places iOS App Thumbnail.'
  },
  {
    name: 'URL Shortener',
    heading: 'URL Shortener',
    info: 'Built with node.js, express, and MongoDB',
    demoLink: 'https://tangible-risk.glitch.me/',
    codeLink: 'https://github.com/aneuhold/fcc-urlshortener',
    thumbnailUrl: 'https://i.imgur.com/i2rhDTm.png',
    thumbnailDescription: 'URL Shortener Thumbnail.'
  },
  {
    name: 'BattleShip',
    heading: 'BattleShip',
    info: 'Built in Java as a group project for SER215',
    codeLink: 'https://github.com/aneuhold/ser215-battleship',
    thumbnailUrl: 'https://i.imgur.com/RKV5vQ4.png',
    thumbnailDescription: 'Battleship Thumbnail.'
  },
  {
    name: 'BlackJack',
    heading: 'Command Line BlackJack',
    info: 'Built in Python 3.x',
    demoLink: 'https://repl.it/@aneuhold/BlackJack',
    codeLink: 'https://github.com/aneuhold/python-projects/tree/master/Black%20Jack',
    thumbnailUrl: 'https://i.imgur.com/gE20dr8.png',
    thumbnailDescription: 'Python Command Line BlackJack Thumbnail.'
  }
];

export default projects;
