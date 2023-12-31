import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles: {
      },
      tokens: {
        colors: {
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  jsxFramework: "react",

  layers: {
    base: "panda_base",
    recipes: "panda_recipes",
    utilities: "panda_utilities",
    reset: "panda_reset",
    tokens: "panda_tokens",
  }
})