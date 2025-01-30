import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ brotliSize: true, gzipSize: true })],
  build: {
    chunkSizeWarningLimit: 600,
    //se usar lodash, ou biblioteca que aumente o tamanho do index.js, considerar seguinte trecho:
    rollupOptions: {
      output: {
        manualChunks,
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      //"@/assets": path.resolve(__dirname, "src/assets")
    }
  },
  server: { port: 5176 },
})

function manualChunks(id: string) {
  if(id.includes('node_modules/lodash')) return 'lodash'
  if(id.includes('src/locales')) return 'locales'
}