import { changePage } from "../../controller.js";
import { cartView } from "./cart.js";

window.changePage = changePage;
window.cartView = cartView;

export function nav() {
  return /*HTML*/ `
   
        <div class="header-logo">
            <div class="logo" onclick="changePage('home')">
                <img src="icons/logo.png" alt="">
            </div>
            <p class="code-txt">PlayBox</p>
        </div>
        <ul class="flex row align-items-center gap-10 ">
            <li onclick="changePage('orderHistory')" class="code-txt main-color pointer txt-break-none lowercase">Order History</li>
            <li>${cartView()}</li>
        </ul>
        
    
 
    `;
}
