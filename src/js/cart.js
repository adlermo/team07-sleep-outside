import { getLocalStorage, qs } from './utils.mjs'

import ShoppingCart from './ShoppingCart';
import { loadHeaderFooter } from './utils.mjs'

const productArray = getLocalStorage('so-cart') || []

function updateCartCount() {
    // adding visual feedback
    const cartCount = qs('.cart-count')
    const cartCountValue = productArray.length
    cartCount.innerText = cartCountValue
}

setTimeout(updateCartCount, 2000)

const cartItems = getLocalStorage('so-cart')

const cartItemsList = document.querySelector('.product-list')

const shoppingCart = new ShoppingCart('cart', cartItems, cartItemsList)
shoppingCart.init()

loadHeaderFooter()