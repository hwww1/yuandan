import { defineConfig } from 'vite'

export default defineConfig({
  // No plugins needed for plain HTML, but keeping file valid
  base: './', // Use relative paths so it works in subfolders
  build: {
    outDir: 'dist'
  }
})