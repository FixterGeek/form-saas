import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    resolve:{
      alias: {
        ".prisma/client/edge":"./node_modules/.prisma/client/edge.js"
      }
    },
      plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
        preview: {
          headers: {
            'Cache-Control': 'public, max-age=600',
          },
        }
  };})
