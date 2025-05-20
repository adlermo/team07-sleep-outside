import { ProductData } from './ProductData.mjs';
import { productList } from './ProductList.mjs';

let dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
let productList = new productList('Tents', dataSource, element);

productList.init();