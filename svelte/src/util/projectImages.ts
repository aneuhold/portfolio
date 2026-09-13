import type { ProjectKey } from 'shared';
// Explicitly request 600px and 300px variants for all project thumbnails. Query params must end
// with &enhanced to trigger the enhanced image processing (just due to lazy typing is all.)
import battleship from 'shared/images/battleship.png?w=600;300&enhanced';
import blackjack from 'shared/images/blackjack.png?w=600;300&enhanced';
import calculator from 'shared/images/calculator.png?w=600;300&enhanced';
import carpetGeeks from 'shared/images/carpetgeeks.png?w=600;300&enhanced';
import drumMachine from 'shared/images/drummachine.png?w=600;300&enhanced';
import eslintConfig from 'shared/images/eslint-config.png?w=600;300&enhanced';
import exerciseTracker from 'shared/images/exercisetracker.png?w=600;300&enhanced';
import halomodSpa from 'shared/images/halomod-spa.png?w=600;300&enhanced';
import localNpmRegistry from 'shared/images/local-npm-registry.png?w=600;300&enhanced';
import mainScripts from 'shared/images/main-scripts.png?w=600;300&enhanced';
import mesoPro from 'shared/images/mesopro.png?w=600;300&enhanced';
import nextjs15Course from 'shared/images/nextjs15-invoiceapp.png?w=600;300&enhanced';
import personalDashboard from 'shared/images/personal-dashboard.png?w=600;300&enhanced';
import placesAndroidApp from 'shared/images/placesandroidapp.png?w=600;300&enhanced';
import placesIosApp from 'shared/images/placesIosApp.png?w=600;300&enhanced';
import pointSpire from 'shared/images/pointspire.png?w=600;300&enhanced';
import pomodoroClock from 'shared/images/pomodoroclock.png?w=600;300&enhanced';
import tiddlyDrive2 from 'shared/images/tiddlydrive2.png?w=600;300&enhanced';
import tsLibs from 'shared/images/ts-libs.png?w=600;300&enhanced';
import urlShortener from 'shared/images/urlShortener.png?w=600;300&enhanced';

export type Picture = typeof eslintConfig;

/**
 * The thumbnail for each project, keyed the same way the project data is.
 */
const projectImages: Record<string, Picture> = {
  battleShip: battleship,
  blackJack: blackjack,
  carpetGeeksExampleWebsite: carpetGeeks,
  halomodSpa,
  localNpmRegistry,
  mainScripts,
  mesoPro,
  mongodbExerciseTracker: exerciseTracker,
  nextjs15Course,
  personalDashboard,
  personalTypescriptLibraries: tsLibs,
  placesAndroidApp,
  placesIosApp,
  pointSpire,
  reactCalculator: calculator,
  reactDrumMachine: drumMachine,
  reactPomodoroClock: pomodoroClock,
  tiddlyDrive2,
  urlShortener
} satisfies { [key in ProjectKey]: Picture };

export default projectImages;
