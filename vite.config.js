import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/isa-project/'
})git add .
git commit -m "Agregado base para GitHub Pages"
git push origin main