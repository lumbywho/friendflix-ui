import { defineNuxtConfig } from "nuxt3";
const open = require('open')

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  srcDir: "src/",
  publicRuntimeConfig: {
    API_URL: (process.env.API_URL || "https://friendflix-api.herokuapp.com/")
  },
  hooks: {
    listen() {
      open(`http://localhost:3000`)
    }
  }
});
