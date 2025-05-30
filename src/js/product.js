import { getParam } from './utils.mjs'
import ProductData from './ProductData.mjs'
import ProductDetails from './ProductDetails.mjs'

const dataSource = new ProductData()
const productId = getParam('product')

if (productId) {
    const product = new ProductDetails(productId, dataSource)
    product.init()
}
