import CheckoutProcess from './CheckoutProcess.mjs';

const order = new CheckoutProcess('so-cart', '.checkout-summary');
order.init();
order.calculateOrderTotal(); // Call initially to display totals

// Add event listener to recalculate order total when the user changes the zip code
document
  .querySelector('#zip')
  .addEventListener('blur', order.calculateOrderTotal.bind(order));

// Listening for click on the checkout button with form validation
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#checkout');
  if (form.checkValidity()) {
    order.checkout();
  } else {
    form.reportValidity();
  }
});