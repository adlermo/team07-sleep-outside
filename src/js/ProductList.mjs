import { renderListWithTemplate } from './utils.mjs'

const productCardTemplate = product => `
  <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
          <img src="${product.Images?.PrimaryMedium || product.Image}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand.Name || ''}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice.toFixed(2) || 'N/A'}</p>
      </a>
  </li>`

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category
    this.dataSource = dataSource
    this.listElement = listElement
  }

  async init() {
    const list = await this.dataSource.getData(this.category)

    if (!Array.isArray(list)) {
      console.error(`No products found for category: ${this.category}`, list)
    }

    this.renderProductList(list)

    const title = document.querySelector('.title')
    title.textContent = this.category
    title.style.textTransform = 'capitalize'
  }

  renderProductList(products) {
    // Clear the list element before rendering
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      'afterbegin',
      true,
    )
  }
}
