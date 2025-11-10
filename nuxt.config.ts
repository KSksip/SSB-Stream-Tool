// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@vueuse/nuxt'],
  css: ['./app/assets/css/main.css'],

  vite: {    
    plugins: [      
      tailwindcss(),    
    ],  
  },

  nitro: {
    experimental: {
      websocket: true
    }
  },

  icon: {
    serverBundle: {
      collections: ['radix-icons'] // <!--- this
    }
  }
})