import { getLocalStorage, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // Convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map(item => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // Calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
      this.outputSelector + ' #cartTotal'
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + ' #num-items'
    );
    itemNumElement.innerText = this.list.length;
    // Calculate the total of all the items in the cart
    const amounts = this.list.map(item => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0); // Added default value 0
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Calculate the shipping and tax amounts, then use them along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal =
      parseFloat(this.itemTotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping);
    // Display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Once the totals are calculated, display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms['checkout'];
    const order = formDataToJSON(formElement);

    // Add order details
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      // On success, clear the cart and redirect to success page
      localStorage.removeItem(this.key);
      window.location.href = '/checkout/success.html';
    } catch (err) {
      // Handle errors
      if (err.name === 'servicesError') {
        alertMessage(err.message.message || 'Checkout failed. Please check your details.', true);
      } else {
        alertMessage('An unexpected error occurred during checkout.', true);
      }
    }
  }
}