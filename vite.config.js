import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { postcss } from 'tailwindcss'
import tailwindcss from "tailwindcss"
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/SnakeGame/",
  css:{
    postcss:{
      plugins: [tailwindcss, autoprefixer]
    }
  }
})
