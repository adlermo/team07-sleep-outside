import {
  getLocalStorage,
  qs,
  setClick,
  setLocalStorage,
  getParam,
} from './utils.mjs'
import ProductData from './ProductData.mjs'
import ProductDetails from './ProductDetails.mjs'

const dataSource = new ProductData('tents')
const productId = getParam('product')

console.log(dataSource.findProductById(productId))

const productArray = getLocalStorage('so-cart') || []

const product = new ProductDetails(productID, dataSource)
product.init()

function updateCartCount() {
  // adding visual feedback
  const cartCount = qs('.cart-count')
  const cartCountValue = productArray.length
  cartCount.innerText = cartCountValue
}

updateCartCount()

function addProductToCart(product) {
  // check to see if theres anything in localstorage
  // if theres nothing, add new 'empty array'
  if (getLocalStorage('so-cart') === null) {
    setLocalStorage('so-cart', [])
  }

  productArray.push(product)

  // add to updated array to localstorage
  setLocalStorage('so-cart', productArray)

  // update cart count
  updateCartCount(productArray)

  // alert user
  alert('Product added to cart!')
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id)
  addProductToCart(product)
}

// add listener to Add to Cart button
setClick('#addToCart', addToCartHandler)
