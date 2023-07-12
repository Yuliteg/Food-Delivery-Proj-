import {
   addProductToBasket
} from './utils.js'

const container = document.querySelector('.products-container')


const display = (product, element) => {
   element.innerHTML = product.map((prod) => {
      const {
         id,
         name,
         price,
         company,
         img
      } = prod;
      return `
        <article class="product">
        <div class="product-container">
        <img src="${img}"  class="product-img" alt="">
             <div class="product-icons">
             </div>
        </div>
         <footer>
           <p class="product-name">${name}</p>
           <h4 class="product-price">$${price}</h4>
            <button class="button-good" data-id="${id}" >Add to cart</button>
         </footer>
     </article>
        `

   }).join("")

   const elements = document.querySelectorAll('.button-good')

   elements.forEach(element => {
      element.addEventListener('click', function (e) {
         const parent = e.target
         addProductToBasket(parent.dataset.id)

      })
   })
}

export {
   display
};