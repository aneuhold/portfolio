<script lang="ts" context="module">
  import battleshipImg from '$shared/images/battleship.png?enhanced';
  import blackjackImg from '$shared/images/blackjack.png?enhanced';
  import calculatorImg from '$shared/images/calculator.png?enhanced';
  import carpetGeeksImg from '$shared/images/carpetgeeks.png?enhanced';
  import drumMachineImg from '$shared/images/drummachine.png?enhanced';
  import eslintConfigImg from '$shared/images/eslint-config.png?enhanced';
  import exerciseTrackerImg from '$shared/images/exercisetracker.png?enhanced';
  import halomodSpaImg from '$shared/images/halomod-spa.png?enhanced';
  import localNpmRegistryImg from '$shared/images/local-npm-registry.png?enhanced';
  import mainScriptsImg from '$shared/images/main-scripts.png?enhanced';
  import nextjs15Course from '$shared/images/nextjs15-invoiceapp.png?enhanced';
  import placesAndroidImg from '$shared/images/placesandroidapp.png?enhanced';
  import placesIosImg from '$shared/images/placesIosApp.png?enhanced';
  import pointspireImg from '$shared/images/pointspire.png?enhanced';
  import pomodoroImg from '$shared/images/pomodoroclock.png?enhanced';
  import tsLibsImg from '$shared/images/ts-libs.png?enhanced';
  import urlShortenerImg from '$shared/images/urlShortener.png?enhanced';

  export type Picture = typeof eslintConfigImg;
</script>

<script lang="ts">
  import projects, { type ProjectKey } from '$shared/config/projects';
  import CardGrid from '../CardGrid.svelte';
  import ProjectCard from './ProjectCard.svelte';

  /**
   * Maps project keys to their respective image paths.
   */
  const projectImages: { [key in ProjectKey]: Picture } = {
    localNpmRegistry: localNpmRegistryImg,
    personalEslintConfig: eslintConfigImg,
    personalTypescriptLibraries: tsLibsImg,
    nextjs15Course,
    pointSpire: pointspireImg,
    battleShip: battleshipImg,
    blackJack: blackjackImg,
    reactCalculator: calculatorImg,
    carpetGeeksExampleWebsite: carpetGeeksImg,
    reactDrumMachine: drumMachineImg,
    mongodbExerciseTracker: exerciseTrackerImg,
    halomodSpa: halomodSpaImg,
    mainScripts: mainScriptsImg,
    placesAndroidApp: placesAndroidImg,
    placesIosApp: placesIosImg,
    reactPomodoroClock: pomodoroImg,
    urlShortener: urlShortenerImg
  };

  const projectsWithImages = Object.entries(projects).map(([key, project]) => {
    return {
      ...project,
      thumbnail: projectImages[key as ProjectKey]
    };
  });
</script>

<div class="container">
  <CardGrid>
    {#each projectsWithImages as project (project.name)}
      <ProjectCard
        projectName={project.name}
        img={project.thumbnail}
        imgAlt={project.thumbnailDescription}
        info={project.info}
        demoLink={project.demoLink}
        codeLink={project.codeLink}
      />
    {/each}
  </CardGrid>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }
</style>
