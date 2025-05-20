/**
 * Utility functions for common DOM and storage operations
 */

// DOM Utilities

/**
 * Wrapper for querySelector with optional parent element
 * @param {string} selector - CSS selector
 * @param {HTMLElement|Document} [parent=document] - Parent element to search within
 * @returns {HTMLElement|null} Matching element or null
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Wrapper for querySelectorAll that returns an array
 * @param {string} selector - CSS selector
 * @param {HTMLElement|Document} [parent=document] - Parent element
 * @returns {HTMLElement[]} Array of matching elements
 */
export function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Sets event listeners for both click and touchend (for mobile support)
 * @param {string|HTMLElement} selector - Element or selector
 * @param {Function} callback - Event handler function
 * @param {Object} [options] - Event listener options
 */
export function setClick(selector, callback, options) {
  const element = typeof selector === 'string' ? qs(selector) : selector;
  if (!element) return;

  const handler = (event) => {
    if (event.type === 'touchend') event.preventDefault();
    callback(event);
  };

  element.addEventListener('touchend', handler, options);
  element.addEventListener('click', handler, options);
}

/**
 * Creates a new element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} [attributes] - Element attributes
 * @param {string|HTMLElement|HTMLElement[]} [children] - Child elements or text
 * @returns {HTMLElement} The created element
 */
export function createElement(tag, attributes = {}, children = null) {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });

  if (children) {
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (Array.isArray(children)) {
      children.forEach(child => element.appendChild(child));
    } else {
      element.appendChild(children);
    }
  }

  return element;
}

// Storage Utilities

/**
 * Safely retrieves and parses data from localStorage
 * @param {string} key - Storage key
 * @param {*} [defaultValue] - Default value if key doesn't exist
 * @returns {*} Parsed data or defaultValue
 */
export function getLocalStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return defaultValue;
  }
}

/**
 * Safely saves data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 */
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Removes item from localStorage
 * @param {string} key - Storage key to remove
 */
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// URL Utilities

/**
 * Gets a URL parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Updates URL parameters without page reload
 * @param {Object} params - Key/value pairs of parameters
 * @param {string} [url=window.location.href] - Base URL
 * @returns {string} Updated URL
 */
export function updateUrlParams(params, url = window.location.href) {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      urlObj.searchParams.delete(key);
    } else {
      urlObj.searchParams.set(key, value);
    }
  });
  return urlObj.toString();
}

// Rendering Utilities

/**
 * Renders a list of items using a template function
 * @param {Function} templateFn - Template function that returns HTML string
 * @param {HTMLElement} parentElement - Container element
 * @param {Array} list - Array of items to render
 * @param {string} [position='afterbegin'] - Insert position
 * @param {boolean} [clear=false] - Whether to clear container first
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear) parentElement.innerHTML = '';
  if (!list?.length) return;

  const htmlStrings = list.map(item => templateFn(item));
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

/**
 * Loads a template from HTML and returns a clone
 * @param {string} templateId - ID of template element
 * @returns {DocumentFragment} Cloned template content
 */
export function loadTemplate(templateId) {
  const template = document.getElementById(templateId);
  if (!template) {
    console.error(`Template with ID ${templateId} not found`);
    return document.createDocumentFragment();
  }
  return template.content.cloneNode(true);
}

// Form Utilities

/**
 * Serializes form data into an object
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} Form data as key/value pairs
 */
export function serializeForm(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

// Animation Utilities

/**
 * Smoothly scrolls to an element
 * @param {string|HTMLElement} element - Element or selector
 * @param {Object} [options] - Scroll options
 */
export function scrollTo(element, options = { behavior: 'smooth', block: 'start' }) {
  const target = typeof element === 'string' ? qs(element) : element;
  if (target) target.scrollIntoView(options);
}