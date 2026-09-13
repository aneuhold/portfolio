import type { ProjectKey } from 'shared';
import type { StaticImageData } from 'next/image';

// Static image imports from the shared images directory
import auroraColonyPub from 'shared/images/aurora-colony-pub.png';
import battleship from 'shared/images/battleship.png';
import blackjack from 'shared/images/blackjack.png';
import calculator from 'shared/images/calculator.png';
import carpetgeeks from 'shared/images/carpetgeeks.png';
import drummachine from 'shared/images/drummachine.png';
import exercisetracker from 'shared/images/exercisetracker.png';
import halomodSpa from 'shared/images/halomod-spa.png';
import localNpmRegistry from 'shared/images/local-npm-registry.png';
import mainScripts from 'shared/images/main-scripts.png';
import mesoPro from 'shared/images/mesopro.png';
import nextjs15Course from 'shared/images/nextjs15-invoiceapp.png';
import personalDashboard from 'shared/images/personal-dashboard.png';
import placesAndroidApp from 'shared/images/placesandroidapp.png';
import placesIosApp from 'shared/images/placesIosApp.png';
import pointSpire from 'shared/images/pointspire.png';
import pomodoroClock from 'shared/images/pomodoroclock.png';
import tiddlyDrive2 from 'shared/images/tiddlydrive2.png';
import tsLibs from 'shared/images/ts-libs.png';
import urlShortener from 'shared/images/urlShortener.png';

const projectImages: Record<string, StaticImageData> = {
  auroraColonyPub,
  mesoPro,
  personalDashboard,
  localNpmRegistry,
  tiddlyDrive2,
  personalTypescriptLibraries: tsLibs,
  nextjs15Course,
  pointSpire,
  battleShip: battleship,
  blackJack: blackjack,
  reactCalculator: calculator,
  carpetGeeksExampleWebsite: carpetgeeks,
  reactDrumMachine: drummachine,
  mongodbExerciseTracker: exercisetracker,
  halomodSpa,
  mainScripts,
  placesAndroidApp,
  placesIosApp,
  reactPomodoroClock: pomodoroClock,
  urlShortener
} satisfies { [key in ProjectKey]: StaticImageData };

export default projectImages;
