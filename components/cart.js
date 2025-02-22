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

//Make it to stay up while it is being edited inside the cart

function displayCartIcon(){
    return /*HTML*/`
    <input type="checkbox" id="cart" class="hidden">
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
        ${model.input.cart.map(element => /*HTML*/`
        <div class="cart-item flex row">
            <div class="list-image">
                <img src="${element.image}" alt="${element.alt}">
            </div>
            
            <h3>${element.title}</h3>

            <div class="flex col">
                <div>
                    <b>QTY</b>
                    <div>
                        <button class="circle" onclick="changeAmount('${element.id}', false)">&minus;</button>
                        <b>${element.amount}</b>
                        ${element.amount <= 4 ? `<button class="circle" onclick="changeAmount('${element.id}', true)">&plus;</button>` : ""}
                    </div>
                </div>

                <p>
                    <b>SUBTOTAL</b>
                    <b>$${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</b>
                </p>
            </div>

            <div>
                <button class="square" onclick="removeFromCart('${element.id}')">&#10005;</button>
            </div>
        </div>
        `).join('')}
    </div>`;
}
