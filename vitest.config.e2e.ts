import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    exclude: [...configDefaults.exclude, '**/data/pg/**'],
    setupFiles: ['./test/setup-e2e.ts'],
  },
  plugins: [
    viteTsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
