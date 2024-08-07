import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    exclude: [...configDefaults.exclude, '**/data/pg/**'],
  },
  plugins: [
    viteTsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
