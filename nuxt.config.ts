// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const siteTitle = "E-Lista | KinWebb";
const siteDescription =
  "E-Lista is a simple and reliable inventory and debtor tracking system designed for small businesses and sari-sari stores. Designed and developed by KinWebb. © 2026 Kent Joemar Escoto.";
const siteVerification = "eMMfU0WDt9Hz-TWRGBTQY-mgFsF66m9octorJRumMzQ";
// const siteThumbnail = "https://dailyz.netlify.app/images/thumbnail.png";
const webIcon = "/images/web_icon.png";
const iosIcon = "/images/ios_icon.png";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["@nuxt/fonts", 'kinwebb-attribute', '@pinia/nuxt', '@nuxt/icon'],
  app: {
    head: {
      title: siteTitle,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // search console verification
        { name: "google-site-verification", content: siteVerification },

        // SEO
        { name: "description", content: siteDescription },

        // Open Graph (previews: FB, Discord, iMessage, etc.)
        { property: "og:type", content: "website" },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: siteDescription },
        // { property: "og:image", content: siteThumbnail },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },

        // Twitter/X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: siteTitle },
        { name: "twitter:description", content: siteDescription },
        // { name: "twitter:image", content: siteThumbnail },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: webIcon },
        { rel: 'apple-touch-icon', href: iosIcon },
      ],
    },
  },
  runtimeConfig: { 
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      firebaseMeasurementId: '',
    },
  },
})
