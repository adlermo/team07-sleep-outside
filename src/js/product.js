import { getParam } from './utils.mjs'
import ExternalServices from './ExternalServices.mjs'
import ProductDetails from './ProductDetails.mjs'

const dataSource = new ExternalServices()
const productId = getParam('product')

if (productId) {
  const product = new ProductDetails(productId, dataSource)
  product.init()
}
