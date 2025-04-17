import path from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ],
  resolve: {
    alias: {
      '@': path.resolve(fileURLToPath(import.meta.url), './src'),
    },
  },
})
