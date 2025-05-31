// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector)
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error parsing localStorage data:', error)
    return null
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', event => {
    event.preventDefault()
    callback()
  })
  qs(selector).addEventListener('click', callback)
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const product = urlParams.get(param)
  return product
}

// get the product id from the query string
export function updateCartCount() {
  setTimeout(() => {
    const productArray = getLocalStorage('so-cart') || []
    // adding visual feedback
    const cartCount = qs('.cart-count')
    const cartCountValue = productArray.length
    cartCount.innerText = cartCountValue
  }, 1250)
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  const htmlStrings = list.map(template)
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = ''
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''))
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  // Resolve the partials path relative to the current script location
  const base = new URL('.', import.meta.url);
  const headerPath = new URL('../partials/header.html', base).pathname;
  const footerPath = new URL('../partials/footer.html', base).pathname;

  const headerTemplate = await loadTemplate(headerPath);
  const headerElement = document.querySelector('#main-header');
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate(footerPath);
  const footerElement = document.querySelector('#main-footer');
  renderWithTemplate(footerTemplate, footerElement);
}

// utils.mjs
export function alertMessage(message, scroll = true) {
  // Remove existing alerts
  document.querySelectorAll('.alert').forEach(alert => alert.remove());

  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
    <p>${message}</p>
    <span class="close-btn">&times;</span>
  `;

  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-btn') ||
      e.target.tagName === 'SPAN') {
      this.remove();
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}