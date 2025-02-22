// import { changePage } from "../controller.js";
import { cartView } from './cart.js'

window.cartView = cartView;

export function navbar(){
    return /*HTML*/ `
    <div class="header flex row space-evenly baseline">
        <ul class="flex row space-evenly baseline">
            <li onclick="changePage('home')">Home</li>
            <li onclick="changePage('product')">Product test</li>
            <li onclick="changePage('checkout')">Checkout test</li>
            <li onclick="changePage('confirmation')">Confirmation test</li>
        </ul>
        ${cartView()}
    </div>
    `;
}