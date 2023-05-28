import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import alias from "esbuild-plugin-alias"
import NodeModule from "module"
const { createRequire } = NodeModule
const require = createRequire(import.meta.url)



export default defineConfig(() => {
  return {
    // ssr:{
    //   // noExternal:true,
    //   // target:"webworker"
   
    // },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), 
    alias({
      "@prisma/client":require.resolve('@prisma/client')
    })
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    // build:{
    //   rollupOptions:{
    //   plugins:[includePaths(includePathOptions)]
    //   }
    // }
    // build:{
    //   rollupOptions:{
    //     external: [
    //       /^.prisma\/client\/edge/,
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
