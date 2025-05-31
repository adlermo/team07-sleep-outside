import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Display featured products
async function displayFeaturedProducts() {
  const services = new ExternalServices();
  const container = document.querySelector('.product-list');
  
  try {
    // Get all products or specific featured ones
    const products = await services.getData('featured'); // Or use specific endpoint
    
    // Display first 4 products as featured
    const featured = products.slice(0, 4);
    
    container.innerHTML = featured.map(product => `
      <div class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}">
          <h3>${product.Name}</h3>
          <p>$${product.FinalPrice.toFixed(2)}</p>
        </a>
        <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
      </div>
    `).join('');
    
    // Add event listeners for cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const productId = e.target.dataset.id;
        await addToCart(productId);
      });
    });
    
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="error">Failed to load featured products. Please try again later.</p>';
  }
}

// Add product to cart
async function addToCart(productId) {
  const services = new ExternalServices();
  try {
    const product = await services.findProductById(productId);
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.Id === productId);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    
    localStorage.setItem('so-cart', JSON.stringify(cart));
    alert('Product added to cart!');
    
    // Update cart count in header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
    alert('Failed to add product to cart');
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayFeaturedProducts();
});