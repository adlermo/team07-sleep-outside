import { loadHeaderFooter, updateCartCount } from './utils.mjs'
// import ProductData from './ProductData.mjs'
// import ProductList from './ProductList.mjs'

/* ================= Content moved to product_listing.js ============= */
// // Create data source instance with your existing ProductData
// const dataSource = new ProductData('tents')

// // Get the HTML element where we'll render the products
// const tentListElement = document.querySelector('.product-list')

// // Create and initialize the ProductList
// const tentList = new ProductList('tents', dataSource, tentListElement)
// tentList.init()

updateCartCount()

loadHeaderFooter()