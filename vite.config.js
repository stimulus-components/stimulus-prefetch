import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'netlify') {
    return {
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'index.html'),
            card: resolve(__dirname, 'page.html')
          }
        }
      }
    }
  }

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'StimulusPrefetch',
        fileName: 'stimulus-prefetch'
      },
      rollupOptions: {
        external: ['@hotwired/stimulus'],
        output: {
          globals: {
            '@hotwired/stimulus': 'Stimulus'
          }
        }
      }
    }
  }
})
