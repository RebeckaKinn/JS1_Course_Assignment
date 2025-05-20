import { changePage } from '../../controller.js'
import { cartView } from './cart.js'

window.changePage = changePage;
window.cartView = cartView;

export function nav(){
    return /*HTML*/ `
   
        <div class="header-logo">
            <div class="logo" onclick="changePage('home')">
                <img src="icons/logo.png" alt="">
            </div>
            <b>PlayBox</b>
        </div>
        
    ${cartView()}
 
    `;
}