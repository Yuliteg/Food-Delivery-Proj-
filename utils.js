import fetchProd from "./fetchProducts.js";
const storageKey = "basketStorage"
let basket = [];
let products = [];

const cartItemCountDOM = document.querySelector('.cart-item-count')

const getProducts = async () => {
  products = await fetchProd();
  initBasket();
  return products;
}

const initBasket = () => {
  basket = getLoaclStorageData();
}

const getLoaclStorageData = () => {
  let storageItem = localStorage.getItem(storageKey)
  if (storageItem) {
    storageItem = JSON.parse(storageItem);
  } else {
    storageItem = [];
  }
  return storageItem;
}

const addProductToBasket = (id) => {


  let product = findProduct(id);
  if (!product) {
    let basketProduct = {
      ...products.find(item => item.id == id),
      amount: 1
    }
    basket.push(basketProduct);
    displayCartItemCount();
  } else {
    increaseAmount(id);
    displayCartItemCount();
  }
  setLocalStorageItem();
}



function displayCartItemCount() {
  const amount = basket.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}


function getCartTotal() {
  let total = basket.reduce((total, basketItem) => {
    return (total += basketItem.price * basketItem.amount);
  }, 0);
  return total;
}


const findProduct = (id) => {
  let product = basket.find((product) => product.id === id);
  return product;
};


function removeItem(id) {
  basket = basket.filter((basketItem) => basketItem.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  basket = basket.map((basketItem) => {

    if (basketItem.id == id) {
      newAmount = basketItem.amount + 1;
      basketItem = {
        ...basketItem,
        amount: newAmount
      };
    }
    return basketItem;
  });
  return newAmount
}

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}

function decreaseAmount(id) {
  let newAmount;
  basket = basket.map((basketItem) => {
    if (basketItem.id == id) {
      newAmount = basketItem.amount - 1;
      basketItem = {
        ...basketItem,
        amount: newAmount
      };
    }
    return basketItem;
  });
  return newAmount;
}

const deleteProductFromBasket = (item) => {
  let productIndex = basket.indexOf(item);
  basket = basket.splice(productIndex, 1);
  setLocalStorageItem();
}

const setLocalStorageItem = () => {
  localStorage.setItem(storageKey, JSON.stringify(basket))
}

export {
  getProducts,
  addProductToBasket,
  deleteProductFromBasket,
  getLoaclStorageData,
  increaseAmount,
  setLocalStorageItem,
  removeItem,
  getElement,
  decreaseAmount,
  getCartTotal,
  initBasket,
  displayCartItemCount
}