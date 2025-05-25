export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category
    this.dataSource = dataSource
    this.listElement = listElement
  }

  async init() {
    try {
      // Get the product data using the existing getData() method
      // const products = await this.dataSource.getData()
      const list = await this.dataSource.getData(this.category);
      /*
            // Filter products by category if needed
            const categoryProducts = this.category
                ? products.filter(product => product.Category === this.category)
                : products;
             */

      // Render the product list
      this.renderProductList(products)
      document.querySelector(".title").textContent = this.category;
    } catch (error) {
      console.error('Error initializing product list:', error)
    }
  }

  renderProductList(products) {
    console.log('Rendering product list:', products.length)
    // Clear the list element first
    this.listElement.innerHTML = ''

    // Create HTML for each product and add to the list
    products.forEach(product => {
      const productCard = this.renderProductCard(product)
      this.listElement.appendChild(productCard)
    })
  }

  renderProductCard(product) {
    // Create list item element
    const li = document.createElement('li')
    li.className = 'product-card'

    // Create the product card HTML structure
    li.innerHTML = `
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}" />
            <h3 class="card__brand">${product.Brand.Name || ''}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        </a>`

    return li
  }
}
