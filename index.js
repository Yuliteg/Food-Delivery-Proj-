import {getProducts,displayCartItemCount} from "./utils.js";
import {display} from "./displayProd.js";
import displayCategory from "./category.js";


const container = document.querySelector('.products-container')
// const loading = document.querySelector('.page-loading')



const init = async() => {
    const products = await getProducts();
     if(products) {
        display(products, container)
        displayCategory(products)
        displayCartItemCount();
     }
}


window.addEventListener('DOMContentLoaded', init)


