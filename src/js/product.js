import { getParam, alertMessage, getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices();
const productId = getParam('product');

if (productId) {
  const product = new ProductDetails(productId, dataSource);
  product.init();

  // Add event listener for add-to-cart button
  document.querySelector('#addToCart').addEventListener('click', () => {
    // Assuming ProductDetails has a method to get product data
    const productData = product.getProductData(); // Add this method in ProductDetails.mjs if needed
    if (productData) {
      const cart = getLocalStorage('so-cart') || [];
      setLocalStorage('so-cart', [...cart, productData]);
      updateCartCount();
      alertMessage(`${productData.Name} added to cart!`, false);
    }
  });
}