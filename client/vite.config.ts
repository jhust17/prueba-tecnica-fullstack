import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toda petición que empiece con /api se enviará al backend (NestJS)
      '/api': 'http://localhost:3000'
    }
  }
})