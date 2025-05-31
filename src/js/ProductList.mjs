export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      this.showLoading();
      const products = await this.dataSource.getData(this.category);
      this.renderProductList(products);

      // Update category title
      const title = document.querySelector('.title');
      if (title) {
        title.textContent = this.category;
        title.style.textTransform = 'capitalize';
      }
    } catch (error) {
      console.error('Error initializing product list:', error);
      this.showError();
    }
  }

  showLoading() {
    this.listElement.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
  }

  showError() {
    this.listElement.innerHTML = `
            <div class="error-message">
                <p>Failed to load products. Please try again later.</p>
                <button id="retry-button">Retry</button>
            </div>
        `;
    document.getElementById('retry-button').addEventListener('click', () => this.init());
  }

  renderProductList(products) {
    // Clear previous products
    this.listElement.innerHTML = '';

    if (!products || products.length === 0) {
      this.listElement.innerHTML = '<p class="no-products">No products found in this category.</p>';
      return;
    }

    // Create product cards
    const fragment = document.createDocumentFragment();
    products.forEach(product => {
      const card = this.createProductCard(product);
      fragment.appendChild(card);
    });

    this.listElement.appendChild(fragment);
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Product link
    const link = document.createElement('a');
    link.href = `/product_pages/?product=${product.Id}`;

    // Product image
    const image = document.createElement('img');
    image.src = this.getImageUrl(product);
    image.alt = product.Name || product.NameWithoutBrand;
    image.loading = 'lazy';

    // Brand name
    const brand = document.createElement('h3');
    brand.className = 'card__brand';
    brand.textContent = product.Brand?.Name || '';

    // Product name
    const name = document.createElement('h2');
    name.className = 'card__name';
    name.textContent = product.Name || product.NameWithoutBrand;

    // Price
    const price = document.createElement('p');
    price.className = 'product-card__price';
    price.textContent = `$${product.FinalPrice.toFixed(2)}`;

    // Assemble the card
    link.appendChild(image);
    link.appendChild(brand);
    link.appendChild(name);
    link.appendChild(price);
    card.appendChild(link);

    return card;
  }

  getImageUrl(product) {
    // Handle image path - adjust based on your file structure
    if (product.Image) {
      return `/src/public${product.Image.replace('..', '')}`;
    }
    return '/src/public/images/placeholder.jpg';
  }
}