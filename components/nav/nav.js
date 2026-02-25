import { changePage } from "../../controller.js";
import { cartView } from "./cart.js";

window.changePage = changePage;
window.cartView = cartView;

export function nav() {
  return /*HTML*/ `
   
        <div class="header-logo pointer" onclick="changePage('home')">
            <div class="logo">
                <img src="icons/logo.png" alt="">
            </div>
            <p class="code-txt glow-text">PlayBox</p>
        </div>
        <ul class="flex row align-items-center gap-10 ">
            <li onclick="changePage('home')" class="code-txt pink pointer txt-break-none lowercase hover-pink">Home</li>
            <li onclick="changePage('orderHistory')" class="code-txt main-color pointer txt-break-none lowercase hover-pink">Order History</li>
            <li>${cartView()}</li>
        </ul>
        
    
 
    `;
}
