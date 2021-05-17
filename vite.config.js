import path from 'path'

export default ({ mode }) => {
  if (mode === 'netlify') {
    return {
      build: {
        rollupOptions: {
          input: {
            index: path.resolve(__dirname, 'index.html'),
            page: path.resolve(__dirname, 'page.html')
          }
        }
      }
    }
  }

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'stimulus-prefetch'
      },
      rollupOptions: {
        external: ['stimulus'],
        output: {
          globals: {
            stimulus: 'Stimulus'
          }
        }
      }
    }
  }
}
