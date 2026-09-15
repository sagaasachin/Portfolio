// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  build: {
    // three.js is lazy-loaded (Hero is the only 3D consumer) and is served as
    // an independent chunk fetched only when the hero mounts, so its raw size
    // is expected and acceptable. The warning threshold is raised accordingly.
    chunkSizeWarningLimit: 800,
  },
})