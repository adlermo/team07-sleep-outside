const baseURL = '/json'

function convertToJson(res) {
  if (res.ok) {
    let data = res.json()
    return data;
  } else {
    return res.text().then(text => {
      console.error('Failed to fetch JSON. Got this instead: ', text)
      throw { name: 'servicesError', message: data }
    })

  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}/${category}.json`)
    const data = await convertToJson(response)
    console.log('fetched data for category', category, data)
    return Array.isArray(data) ? data : data?.Result || []
  }
  async findProductById(id) {
    const categories = ['tents', 'backpacks', 'sleeping-bags']

    for (const category of categories) {
      try {
        const response = await fetch(`${baseURL}/${category}.json`)
        const data = await convertToJson(response)
        const products = Array.isArray(data.Result) ? data.Result : data
        console.log(`Checking category: ${category}`)
        console.log('Products:', products)
        const foundProduct = products.find(product => product.Id === id)

        if (foundProduct) {
          console.log('found product', foundProduct)
          return foundProduct;
        }
      } catch (err) {
        console.error(`Error loading ${category}.json`, err)
      }
    }
    throw new Error(`Product with id ${id} not found.`)
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson)
  }
}
