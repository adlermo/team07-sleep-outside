export default class ShoppingCart {
    constructor(category, dataSource, listElement) {
        this.category = category
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init() {
        try {
            // Get the product data array
            const cartItems = this.dataSource

            // Render the product list
            this.renderCartContents(cartItems)
        } catch (error) {
            console.warn('Error loading cart items. Please try again later.', error)
        }
    }

    calculateTotal(items) {
        if (items > 0) {
            document.querySelector('cart-footer').classList.toggle('hide');
        }
        const totalPrice = items.reduce((acc, item) => acc + item.FinalPrice, 0)
        document.querySelector('.cart-total').innerHTML += `<span>$${totalPrice}</span>`;
    }

    renderCartContents(cartItems) {
        this.calculateTotal(cartItems);
        if (cartItems.length === 0) {
            return document.querySelector('.product-list').innerHTML = `
            <li class="cart-card divider">
                <p class="cart-card__empty">Your cart is empty</p>
            </li>`;
        }
        const htmlItems = cartItems.map(item => this.cartItemTemplate(item))

        document.querySelector('.product-list').innerHTML = htmlItems.join('')
    }

    cartItemTemplate(item) {
        const newItem = `
        <li class="cart-card divider">
            <a href="#" class="cart-card__image">
                <img
                src="${item.Images.PrimaryMedium}"
                alt="${item.Name}"
                />
            </a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0]?.ColorName}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
        </li>`

        return newItem
    }
}