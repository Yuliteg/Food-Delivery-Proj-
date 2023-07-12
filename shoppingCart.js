// specific
import {
    getLoaclStorageData,
    getElement,
    increaseAmount,
    decreaseAmount,
    setLocalStorageItem,
    removeItem,
    deleteProductFromBasket,
    getCartTotal,
    initBasket
} from './utils.js'


const totalDOM = document.querySelector('.cart-total')

const cartItemsDOM = getElement('.prodbasket-container')


const init = () => {
    initBasket();
    let products = getLoaclStorageData();
    if (products) {
        displayProdInBasket(products, cartItemsDOM);
        setupCartFunctionality();
        displayTotal();

    }
}


function displayTotal () {
    let totalPrice = getCartTotal()
    totalDOM.textContent = `Total: $${totalPrice}`
}


window.addEventListener('DOMContentLoaded', init)


const displayProdInBasket = (product, element) => {
    element.innerHTML = product.map((prod) => {
        const {id,
            name,
            price,
            img,
            amount
        } = prod;
        return `
         <article class="cart-item show" data-id="${id}">
         <img src="${img}"
         class="cart-item-img"
         alt="pizza"
       />  
       <div>
         <h4 class="cart-item-name">${name}</h4>
         <p class="cart-item-price">$${price}</p>
         <button class="cart-item-remove-btn" data-id="${id}">remove</button>
       </div>
     
       <div class='amount-media'>
         <button class="cart-item-increase-btn" data-id="${id}">
           <i class="fas fa-chevron-up"></i>
         </button>
         
         <p class="cart-item-amount" data-id="${id}">${amount}</p>

         <button class="cart-item-decrease-btn" data-id="${id}">
           <i class="fas fa-chevron-down"></i>
         </button>
       </div>
  </article>
         `

    }).join("")
}


function setupCartFunctionality() {
    cartItemsDOM.addEventListener('click', function (e) {
        const element = e.target;
        const parent = e.target.parentElement;
        const parentID = e.target.parentElement.dataset.id;
        const removeButtonProductId = e.target.dataset.id;

        if(element.classList.contains('cart-item-remove-btn')) {
            removeItem(removeButtonProductId);
            element.parentElement.parentElement.remove();
          }

        if (parent.classList.contains('cart-item-increase-btn')) {
            // const newAmount = increaseAmountShop(parentID);
            let newAmount = increaseAmount(parentID)
            parent.nextElementSibling.textContent = newAmount;
        }

        if (parent.classList.contains('cart-item-decrease-btn')) {
            const newAmount = decreaseAmount(parentID);
            if (newAmount === 0) {
             removeItem(parentID);
              parent.parentElement.parentElement.remove();
            } else {
              parent.previousElementSibling.textContent = newAmount;
            }
        }
        setLocalStorageItem();
        displayTotal();
    })
}


const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal__close')
const closeModals = document.querySelector('.btn_green')
const form = document.getElementById('form')
const button = document.querySelector('.btn-button')

  button.addEventListener('click', openModal)
  closeModal.addEventListener('click', closeModalWind)
  closeModals.addEventListener('click', closeModalWind)


function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  
  document.body.style.overflow = 'hidden';
}

function closeModalWind() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
