export default class ShoppingCart {
  constructor(category, dataSource, listElement) {
    this.category = category
    this.dataSource = dataSource
    this.listElement = listElement
  }

  async init() {
    try {
      // Get the product data array
      const cartItems = this.dataSource

      // Render the product list
      this.renderCartContents(cartItems)
    } catch (error) {
      console.error('Error initializing product list:', error)
    }
  }

  calculateTotal(items) {
    if (items > 0) {
      document.querySelector('cart-footer').classList.toggle('hide')
    }
    const totalPrice = items.reduce((acc, item) => acc + item.FinalPrice, 0)
    document.querySelector('.cart-total').innerHTML +=
      `<span>$${totalPrice}</span>`
  }

  renderCartContents(cartItems) {
    this.calculateTotal(cartItems)
    const htmlItems = cartItems.map(item => this.cartItemTemplate(item))

    document.querySelector('.product-list').innerHTML = htmlItems.join('')
  }

  cartItemTemplate(item) {
    const newItem = `
        <li class="cart-card divider">
            <a href="#" class="cart-card__image">
                <img
                src="${item.product.Image}"
                alt="${item.product.Name}"
                />
            </a>
            <a href="#">
                <h2 class="card__name">${item.product.Name}</h2>
            </a>
            <p class="cart-card__color">${item.product.Colors[0]?.ColorName}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${item.product.FinalPrice}</p>
        </li>`

    return newItem
  }
}
