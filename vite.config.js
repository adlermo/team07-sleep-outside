import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/',
  // base: '/dist/',

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
<<<<<<< HEAD
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_page/index.html"),
>>>>>>> adc--individual2
=======
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        product_listing: resolve(__dirname, 'src/product_listing/index.html'),
>>>>>>> a518db6f3f592b981e88eabc69c704b129ef1ab7
      },
    },
  },
})
