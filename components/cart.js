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
            <div class="flex-space-between">
                <h2>Shopping Cart</h2>
                <h2>${getAmountOfItemsInCart()} items</h2>
            </div>
            <section class="full-width">${cartDisplay()}</section>
            <section class="full-height flex-space-between-col">
                <p class="width-30 flex-space-between">
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
        <div class="cart-grid cart-header">
            <b>PRODUCT DETAILS</b>
            <b>QTY</b>
            <b>PRICE</b>
            <b>TOTAL</b>
        </div>

        ${model.input.cart.map(element => /*HTML*/`
        <div class="cart-grid cart-item">
            <div class="cart-product">
                <img src="${element.image}" alt="${element.alt}">
                <div>
                    <h3 class="remove-margin">${element.title}</h3>
                    <button class="remove-button" onclick="removeFromCart('${element.id}')">Remove</button>
                </div>
            </div>

            <div class="cart-quantity">
                <button class="circle" onclick="changeAmount('${element.id}', false)">&minus;</button>
                <b>${element.amount}</b>
                ${element.amount <= 4 ? `<button class="circle" onclick="changeAmount('${element.id}', true)">&plus;</button>` : ""}
            </div>

            <p class="cart-price"><b>$${element.onSale ? element.discountedPrice : element.price}</b></p>

            <p class="cart-total"><b>$${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</b></p>
        </div>
        `).join('')}
    </div>`; 
}


