export default function () {
  return `import { fileURLToPath, URL } from "url"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // add path alias here
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})`;
}
