import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { resolve } from 'path';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    // build:{
    //   rollupOptions:{
    //     external: [
    //       /^.prisma\/client\/index-browser/,
    //     ]
    //   }
    // }
   
    // build:{
    //  rollupOptions:{
    //   external:['prisma','@prisma/client']
    //  }
    // }

    // build:{
    //   extraResources:[
    //     {
    //       from:"node_modules/.prisma/client/",
    //       to:"app/node_modules/.prisma/client/"
    //     }
    //   ]
    // }
  };
});
