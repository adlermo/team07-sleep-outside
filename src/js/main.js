/**
 * Main application entry point for product listing
 */

// Import dependencies
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { qs } from './utils.mjs';

// Configuration constants
const PRODUCT_CATEGORY = 'tents';
const PRODUCT_LIST_SELECTOR = '.product-list';

/**
 * Initializes the product listing page
 */
async function initializeProductListing() {
  try {
    // Debugging: Log initialization start
    console.debug('Initializing product listing...');

    // Create data source and product list instances
    const dataSource = new ProductData(PRODUCT_CATEGORY);
    const listElement = qs(PRODUCT_LIST_SELECTOR);
    
    if (!listElement) {
      throw new Error('Product list container element not found');
    }

    // Initialize and render product list
    const productList = new ProductList(PRODUCT_CATEGORY, dataSource, listElement);
    await productList.init();

    // Debugging: Log successful initialization
    console.debug('Product listing initialized successfully');
  } catch (error) {
    console.error('Failed to initialize product listing:', error);
    
    // Display error message to user if container exists
    const errorContainer = qs(PRODUCT_LIST_SELECTOR) || document.body;
    errorContainer.innerHTML = `
      <div class="error-message">
        <h2>Unable to Load Products</h2>
        <p>We're having trouble loading our products. Please try again later.</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loading state
  const listElement = qs(PRODUCT_LIST_SELECTOR);
  if (listElement) {
    listElement.innerHTML = '<div class="loading-spinner">Loading products...</div>';
  }

  // Start initialization
  initializeProductListing();
});

// For debugging purposes
window.app = {
  ProductData,
  ProductList,
  initializeProductListing
};