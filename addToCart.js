import { getStorageItem as getStorage, setStorageItem } from "./utils.js";
import {findProduct} from './storeLogic.js'

let products = getStorage()
 const addToCart = (id) => {

   let item = products.find((cartItem) => cartItem.id === id)
   if(!item) {
    let product = findProduct(id)

   } else {
    displayCartItemCount()
   }

}

export default addToCart