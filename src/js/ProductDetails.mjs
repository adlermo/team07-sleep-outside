import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs'

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId
    this.product = {}
    this.dataSource = dataSource
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId)
    // the product details are needed before rendering the HTML
    this.renderProductDetails()
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    const addToCartButton = document.getElementById('addToCart')
    // if (addToCartButton) {
    addToCartButton.addEventListener('click', this.addProductToCart.bind(this))
    // }
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || []
    cartItems.push(this.product)
    setLocalStorage('so-cart', cartItems)

    alert(`Product ${this.product.NameWithoutBrand} added to cart!`)
    updateCartCount()
  }

  renderProductDetails() {
    productDetailsTemplate(this.product)
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector('#p-brand').textContent = product.Brand.Name;
  document.querySelector('#p-name').textContent = product.NameWithoutBrand;

  const productImage = document.querySelector('#p-image');
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const dollarPrice = new Intl.NumberFormat('en-US',
    {
      style: 'currency', currency: 'USD',
    }).format(Number(product.FinalPrice));
  document.querySelector('#p-price').textContent = `${dollarPrice}`;
  document.querySelector('#p-color').textContent = product.Colors[0].ColorName;
  document.querySelector('#p-description').innerHTML = product.DescriptionHtmlSimple;

  document.querySelector('#addToCart').dataset.id = product.Id;
}
