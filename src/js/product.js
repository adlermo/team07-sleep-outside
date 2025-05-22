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

const product = new ProductDetails(productId, dataSource)
product.init()

const productArray = getLocalStorage('so-cart') || []

function updateCartCount() {
  // adding visual feedback
  const cartCount = qs('.cart-count')
  const cartCountValue = productArray.length
  cartCount.innerText = cartCountValue
}

setTimeout(updateCartCount, 2000)


function addProductToCart() {
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
  const cartProduct = await dataSource.findProductById(e.target.dataset.id)
  addProductToCart(cartProduct)
}

// add listener to Add to Cart button
setClick('#addToCart', addToCartHandler)
