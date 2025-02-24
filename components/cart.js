import { model } from "../model.js";
import {changeAmount, changePage, removeFromCart, checkoutHandeling, calculateSubTotal, calculateTotal, getAmountOfItemsInCart } from "../controller.js";
import { updateView } from "../app.js";
import { cartIconToggle } from "./cartController.js";

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changePage = changePage;
window.changeAmount = changeAmount;
window.cartIconToggle = cartIconToggle;

//use a cart logo with updateble number,

export function cartView() {
    return /*HTML*/`
    <div class="cart-container">
        ${displayCartIcon()}
        <div class="cart-info">  
            <div>
                <h2>${getAmountOfItemsInCart()} items in cart</h2>
            </div>
            <section>${cartDisplay()}</section>
            <section>
                <p>
                    <b>Total:</b>
                    <b>$${calculateTotal(model.input.cart)}</b>
                </p>
                <div>
                    ${model.input.cart.length <= 0 ? `` : /*HTML*/`<button class="square" onclick="changePage('${model.app.pages[2].name}')">Checkout</button>`}
                </div>
            </section>
        </div>
    </div>`;
}


function displayCartIcon(){
    return /*HTML*/`
    <input type="checkbox" id="cart" class="hidden" ${model.app.cartControls && "checked"}>
    <label for="cart" onclick="cartIconToggle()">
        <span class="cart-icon">&#128722;</span>
    </label>
    `;
}


function cartDisplay() {
    if (model.input.cart.length <= 0) {
        return `<h2>Empty</h2>`;
    }

    return /*HTML*/`
    <div class="cart-items"> 
        <div class="grid-name-title1">
            <b>PRODUCT DETAILS</b>
        </div>
         <div class="grid-name-title2 text-align-center">
            <b>QTY</b>
        </div>
         <div class="grid-name-title3 text-align-center">
            <b>PRICE</b>
        </div>
         <div class="grid-name-title4 text-align-center">
            <b>TOTAL</b>
        </div>

        ${model.input.cart.map(element => /*HTML*/`
        <div class="grid-name-content">
            <div class="grid-name-image">
                <img src="${element.image}" alt="${element.alt}">
            </div>
            
            <div class="grid-name-content1">
                <h3 class="remove-margin">${element.title}</h3>
                <button onclick="removeFromCart('${element.id}')">Remove</button>
            </div>

            <div class="grid-name-quantity text-align-center">
                <button class="circle" onclick="changeAmount('${element.id}', false)">&minus;</button>
                <b>${element.amount}</b>
                ${element.amount <= 4 ? `<button class="circle" onclick="changeAmount('${element.id}', true)">&plus;</button>` : ""}
            </div>

            <p class="grid-name-price remove-margin text-align-center">
                <b>$${element.onSale ? element.discountedPrice : element.price}</b>
            </p>

            <p class="grid-name-total remove-margin text-align-center">
                <b>$${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</b>
            </p>
                
        </div>



        </div>
        `).join('')}
    </div>`;
}
