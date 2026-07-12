import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({

  base: "/beadstudio_o/",

  plugins: [
    react()
  ]

})