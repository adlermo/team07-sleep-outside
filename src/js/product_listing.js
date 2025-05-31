import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// get the category from the URL parameters
const category = getParam('category');

const dataSource = new ExternalServices();

// get the list element from the DOM
const listElement = document.querySelector('.product-list');

// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
myList.init();