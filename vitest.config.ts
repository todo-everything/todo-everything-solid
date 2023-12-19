import {defineConfig} from 'vite'
import solidPlugin from 'vite-plugin-solid'
import * as path from 'path'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  test: {
    deps: {
      // solid needs to be inline to work around
      // a resolution issue in vitest with node-20:
      // https://github.com/solidjs/solid-testing-library/issues/38#issuecomment-1564593881
      inline: [/solid-js/, /@solidjs\/router/],
    },
    environment: 'jsdom',
    globals: true,
    testTransformMode: {web: ['/\.[jt]sx?$/']},
    setupFiles: ['./setupVitest.js'],
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})