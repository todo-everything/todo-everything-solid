import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
    solid(),
  ],
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   transformMode: {
  //     web: [/\.[jt]sx?$/],
  //   },
  //   setupFiles: './setupVitest.ts',
  //   // solid needs to be inline to work around
  //   // a resolution issue in vitest:
  //   deps: {
  //     inline: [/solid-js/, 'solid-testing-library'],
  //   },
  //   // if you have few tests, try commenting one
  //   // or both out to improve performance:
  //   threads: false,
  //   isolate: false,
  // },
  // build: {
  //   target: 'esnext',
  //   // polyfillDynamicImport: false,
  // },
  // resolve: {
  //   conditions: ['development', 'browser'],
  // }
})

