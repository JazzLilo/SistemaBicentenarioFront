import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': '*',
      'Cross-Origin-Embedder-Policy': '*',
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      //'react/jsx-runtime': 'react/jsx-runtime.js'
    },
  },
  optimizeDeps: {
    include: ['leaflet'],
  }
})
