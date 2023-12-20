import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
    solid(),
  ],
  // build: {
  //   target: 'esnext',
  //   // polyfillDynamicImport: false,
  // },
  resolve: {
    //   conditions: ['development', 'browser'],
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})

