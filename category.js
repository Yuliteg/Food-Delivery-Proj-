import fetchProd from "./fetchProducts.js";
import {display} from "./displayProd.js";


const categoryContainer = document.querySelector('.btn-container')
const container = document.querySelector('.products-container')


const displayCategory = (product) => {
   const category = product.reduce(function(values, item) {
      if(!values.includes(item.company)) {
        values.push(item.company)
      }
      return values
   }, ['all'])

   const categoryBtns = category
   .map(function (category) {
     return `<button type="button" class="filter-btn" data-id=${category}>
   ${category}
  </button>`;
   })
   .join("");
  
  categoryContainer.innerHTML = categoryBtns

  const filterBtn = categoryContainer.querySelectorAll('.filter-btn');


  filterBtn.forEach(function (btn) {
     btn.addEventListener('click', function(e) {
        const categories = e.currentTarget.dataset.id;
        const menuCategory = product.filter(function(prod) {
            if(prod.company === categories) {
                return prod
            }
        })
         if(categories === "all") {
            display(product, container)
         } else {
            display(menuCategory, container)
         }
     })
  })

 }





 






 
 export default displayCategory;