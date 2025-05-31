import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// Initialize product listing
document.addEventListener('DOMContentLoaded', async () => {
    // Get the category from URL parameters or default to 'tents'
    const category = getParam('category') || 'tents';

    // Initialize the product list
    const dataSource = new ExternalServices();
    const listElement = document.querySelector('#product-grid');
    const productList = new ProductList(category, dataSource, listElement);
    await productList.init();

    // Set up category navigation
    setupCategoryNavigation();
});

function setupCategoryNavigation() {
    const navLinks = document.querySelectorAll('[data-category]');
    if (!navLinks.length) return;

    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;

            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');

            // Update URL without reload
            window.history.pushState({}, '', `?category=${category}`);

            // Update the category title
            const titleElement = document.querySelector('.title');
            if (titleElement) {
                titleElement.textContent = category;
                titleElement.style.textTransform = 'capitalize';
            }

            // Reload products for the new category
            const dataSource = new ExternalServices();
            const listElement = document.querySelector('#product-grid');
            const productList = new ProductList(category, dataSource, listElement);
            await productList.init();
        });
    });
}