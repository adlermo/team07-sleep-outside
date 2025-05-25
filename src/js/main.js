import ProductData from './ProductData.mjs'
import ProductList from './ProductList.mjs'
import Alert from './Alert.mjs'

// Create data source instance with your existing ProductData
const dataSource = new ProductData('tents')

// Get the HTML element where we'll render the products
const tentListElement = document.querySelector('.product-list')

// Create and initialize the ProductList
const tentList = new ProductList('tents', dataSource, tentListElement)
tentList.init()

// Create and initialize the Alert

const reader = new Alert("./json/alerts.json")

init(Alert);