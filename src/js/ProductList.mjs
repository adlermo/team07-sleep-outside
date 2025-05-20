import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      this.renderList(products);
    } catch (error) {
      console.error('Error initializing product list:', error);
      // Optionally show error message to user
      this.listElement.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
  }

  renderList(products) {
    // Filter by category if needed (uncomment if needed)
    // const filteredProducts = this.category 
    //   ? products.filter(product => product.Category === this.category)
    //   : products;
    
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      'beforeend',
      true
    );
  }
}