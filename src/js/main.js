import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

// Initialize cart count and header/footer
updateCartCount();
loadHeaderFooter();

// Initialize checkout process
const myCheckout = new CheckoutProcess('so-cart', '#checkoutSummary');
myCheckout.init();
myCheckout.calculateOrderTotal();

// Add form submission listener with validation
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#checkout');
  if (form.checkValidity()) {
    myCheckout.checkout();
  } else {
    form.reportValidity();
  }
});