import { ProjectKey } from '$shared/config/projects';

const base = '/images';
const projectImages: { [key in ProjectKey]: string } = {
  localNpmRegistry: `${base}/local-npm-registry.png`,
  personalEslintConfig: `${base}/eslint-config.png`,
  personalTypescriptLibraries: `${base}/ts-libs.png`,
  pointSpire: `${base}/pointspire.png`,
  battleShip: `${base}/battleship.png`,
  blackJack: `${base}/blackjack.png`,
  reactCalculator: `${base}/calculator.png`,
  carpetGeeksExampleWebsite: `${base}/carpetgeeks.png`,
  reactDrumMachine: `${base}/drummachine.png`,
  mongodbExerciseTracker: `${base}/exercisetracker.png`,
  halomodSpa: `${base}/halomod-spa.png`,
  mainScripts: `${base}/main-scripts.png`,
  placesAndroidApp: `${base}/placesandroidapp.png`,
  placesIosApp: `${base}/placesIosApp.png`,
  reactPomodoroClock: `${base}/pomodoroclock.png`,
  urlShortener: `${base}/urlShortener.png`
};

export default projectImages;
export function getImageSrc(img: string): string {
  return img;
}
