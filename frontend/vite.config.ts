import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const API_URL = "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/_api': {
        target: API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/_api/, '')
      }
    }
  },
  build: {
    outDir: "../dist/frontend"
  }
})
