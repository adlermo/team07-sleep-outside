import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/',

<<<<<<< HEAD
build: {
  outDir: "../dist",
  rollupOptions: {
    input: {
      main: resolve(__dirname, "src/index.html"),
      cart: resolve(__dirname, "src/cart/index.html"),
      checkout: resolve(__dirname, "src/checkout/index.html"),
      product: resolve(__dirname, "src/product_pages/index.html"),
=======
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_page/index.html"),
>>>>>>> adc--individual2
      },
    },
  },
})
