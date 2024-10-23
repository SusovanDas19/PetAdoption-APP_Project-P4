import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PetAdoption-APP_Project-P4/',
  plugins: [react()],
})

