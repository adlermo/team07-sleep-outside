import { alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

class CheckoutProcess {
    constructor(key) {
        this.key = key;
        this.services = new ExternalServices();
        this.cart = [];
    }

    init() {
        this.loadCart();
        this.renderCartItems();
    }

    loadCart() {
        const cartItems = JSON.parse(localStorage.getItem(this.key)) || [];
        this.cart = cartItems;
        return this.cart;
    }

    renderCartItems() {
        const container = document.querySelector('.cart-items');
        const totalContainer = document.querySelector('.cart-total');

        if (!container || !this.cart.length) return;

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.Image}" alt="${item.Name}" width="50">
                <span>${item.Name} - $${item.FinalPrice}</span>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + item.FinalPrice, 0);
        totalContainer.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    }

    async prepareOrder() {
        const form = document.forms.checkout;

        return {
            items: this.cart,
            orderDate: new Date().toLocaleDateString(),
            fname: form.fname.value,
            lname: form.lname.value,
            email: form.email.value,
            phone: form.phone.value,
            street: form.street.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value,
            country: form.country.value,
            payment: 'Credit Card',
            shipping: 0,
            total: this.cart.reduce((sum, item) => sum + item.FinalPrice, 0)
        };
    }

    async checkout() {
        const submitBtn = document.querySelector('#checkoutSubmit');
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            const order = await this.prepareOrder();
            const response = await this.services.checkout(order);

            if (response.id) {
                localStorage.removeItem(this.key);
                window.location.href = '/checkout/success.html';
            }
        } catch (err) {
            console.error('Checkout error:', err);
            if (err.name === 'servicesError') {
                const errorMsg = err.message.errors?.map(e => e.message).join('<br>') ||
                    'There was a problem with your order. Please try again.';
                alertMessage(errorMsg);
            } else {
                alertMessage('An unexpected error occurred. Please try again later.');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Place Order';
        }
    }
}

// Initialize checkout process
document.addEventListener('DOMContentLoaded', () => {
    const myCheckout = new CheckoutProcess('so-cart');
    myCheckout.init();

    document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.forms.checkout;

        if (form.checkValidity()) {
            myCheckout.checkout();
        } else {
            form.reportValidity();
        }
    });
});