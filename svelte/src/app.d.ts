/// <reference types="@sveltejs/kit" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

// Things for enhanced images. This is needed because of a bug in @sveltejs/enhanced-img/types/ambient.d.ts
// that doesn't have the correct typings. All options are in the docs here: https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md
declare module '*&enhanced' {
  import type { Picture } from 'vite-imagetools';
  const value: Picture;
  export default value;
}
