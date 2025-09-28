<script lang="ts" context="module">
  // Explicitly request 600px and 300px variants for all project thumbnails.
  // Query params must end with &enhanced to trigger the enhanced image processing (just due to
  // lazy typing is all.)
  import battleshipImg from '$shared/images/battleship.png?w=600;300&enhanced';
  import blackjackImg from '$shared/images/blackjack.png?w=600;300&enhanced';
  import calculatorImg from '$shared/images/calculator.png?w=600;300&enhanced';
  import carpetGeeksImg from '$shared/images/carpetgeeks.png?w=600;300&enhanced';
  import drumMachineImg from '$shared/images/drummachine.png?w=600;300&enhanced';
  import eslintConfigImg from '$shared/images/eslint-config.png?w=600;300&enhanced';
  import exerciseTrackerImg from '$shared/images/exercisetracker.png?w=600;300&enhanced';
  import halomodSpaImg from '$shared/images/halomod-spa.png?w=600;300&enhanced';
  import localNpmRegistryImg from '$shared/images/local-npm-registry.png?w=600;300&enhanced';
  import mainScriptsImg from '$shared/images/main-scripts.png?w=600;300&enhanced';
  import nextjs15Course from '$shared/images/nextjs15-invoiceapp.png?w=600;300&enhanced';
  import placesAndroidImg from '$shared/images/placesandroidapp.png?w=600;300&enhanced';
  import placesIosImg from '$shared/images/placesIosApp.png?w=600;300&enhanced';
  import pointspireImg from '$shared/images/pointspire.png?w=600;300&enhanced';
  import pomodoroImg from '$shared/images/pomodoroclock.png?w=600;300&enhanced';
  import tsLibsImg from '$shared/images/ts-libs.png?w=600;300&enhanced';
  import urlShortenerImg from '$shared/images/urlShortener.png?w=600;300&enhanced';

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
