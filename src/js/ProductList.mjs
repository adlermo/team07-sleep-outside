<<<<<<< HEAD
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
=======
function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="product_page/?product=${product.Id}">
        <img loading="lazy" src="${product.ImageUrl}" alt="Image of ${product.Name}" />
        <h2 class="card__brand">${product.Brand}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.Price}</p>
>>>>>>> adc--individual2
      </a>
    </li>
  `;
}

<<<<<<< HEAD
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
=======
export default class productList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }


>>>>>>> adc--individual2
}