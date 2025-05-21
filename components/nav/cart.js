import { model } from "../../model.js";
import {changeAmount, changePage, removeFromCart, checkoutHandeling, calculateSubTotal, calculateTotal, getAmountOfItemsInCart } from "../../controller.js";
import { cartIconToggle } from "./cartController.js";
import { shoppingCartGetItem } from '../localStorage/handeling.js';

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changePage = changePage;
window.changeAmount = changeAmount;
window.cartIconToggle = cartIconToggle;
window.shoppingCartGetItem = shoppingCartGetItem;


export function cartView() {
    
    return /*HTML*/`
    <div class="cart-container">
        ${displayCartIcon()}
        <div class="cart-info">  
        <span class="close-cart-container">
            <label class="close-cart" for="cart" onclick="cartIconToggle()">&#10005;</label>
        </span>
            <div class="flex-space-between">
                <h2>Shopping Cart</h2>
                <h2>${getAmountOfItemsInCart()} items</h2>
            </div>
            <section class="full-width">${cartDisplay() === null ? `Empty` : cartDisplay()}</section>
            <section class="full-height flex-space-between-col">
                <p class="width-30 flex-space-between">
                    <b>Total:</b>
                    <b>$${calculateTotal()}</b>
                </p>
                <div class="checkout-button">
                    ${model.input.cart.length <= 0 ? `` : /*HTML*/`<button class="square square2" onclick="changePage('${model.app.pages[2].name}')">Checkout</button>`}
                </div>
            </section>
        </div>
    </div>`;
}


function displayCartIcon(){
    return /*HTML*/`
    <input type="checkbox" id="cart" class="hidden" ${model.app.cartControls && "checked"}>
    <label for="cart" onclick="cartIconToggle()">
        <span class="cart-icon">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_722_2290)">
        <path d="M48.045 8.62412C47.45 7.91007 46.7051 7.33579 45.8632 6.94206C45.0212 6.54832 44.1029 6.3448 43.1735 6.34593H8.97315L8.8843 5.60346C8.70249 4.06016 7.96072 2.63723 6.79964 1.60442C5.63856 0.571606 4.13887 0.000722999 2.58491 0L2.11531 0C1.55429 0 1.01626 0.222862 0.61956 0.61956C0.222862 1.01626 0 1.55429 0 2.11531C0 2.67633 0.222862 3.21436 0.61956 3.61106C1.01626 4.00776 1.55429 4.23062 2.11531 4.23062H2.58491C3.10302 4.23069 3.60309 4.42091 3.99026 4.76519C4.37744 5.10948 4.62479 5.58389 4.68541 6.09844L7.59608 30.8476C7.89825 33.4215 9.13492 35.7948 11.0713 37.5172C13.0078 39.2395 15.5091 40.1909 18.1007 40.1909H40.1909C40.7519 40.1909 41.2899 39.968 41.6866 39.5713C42.0833 39.1746 42.3062 38.6366 42.3062 38.0756C42.3062 37.5146 42.0833 36.9765 41.6866 36.5798C41.2899 36.1831 40.7519 35.9603 40.1909 35.9603H18.1007C16.7914 35.9566 15.5154 35.548 14.4474 34.7906C13.3795 34.0332 12.5719 32.964 12.1355 31.7296H37.35C39.8298 31.7298 42.2308 30.8586 44.1335 29.2684C46.0361 27.6781 47.3196 25.4698 47.7595 23.0294L49.42 13.8193C49.5857 12.9055 49.5485 11.9664 49.3109 11.0686C49.0733 10.1709 48.6411 9.33629 48.045 8.62412V8.62412Z" fill="#66C0F4"/>
        <path d="M14.807 50.7688C17.1435 50.7688 19.0376 48.8747 19.0376 46.5382C19.0376 44.2017 17.1435 42.3076 14.807 42.3076C12.4705 42.3076 10.5764 44.2017 10.5764 46.5382C10.5764 48.8747 12.4705 50.7688 14.807 50.7688Z" fill="#66C0F4"/>
        <path d="M35.9603 50.7688C38.2969 50.7688 40.191 48.8747 40.191 46.5382C40.191 44.2017 38.2969 42.3076 35.9603 42.3076C33.6238 42.3076 31.7297 44.2017 31.7297 46.5382C31.7297 48.8747 33.6238 50.7688 35.9603 50.7688Z" fill="#66C0F4"/>
        </g>
        <defs>
        <clipPath id="clip0_722_2290">
        <rect width="50.7674" height="50.7674" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        </span>
    </label>
    `;
}


export function cartDisplay() {
    const content = shoppingCartGetItem();
    if (content <= 0) {
        return null;
    }

    return /*HTML*/`
    <div class="cart-items"> 
        <div class="cart-grid cart-header">
            <b>PRODUCT DETAILS</b>
            <b>QTY</b>
            <b>PRICE</b>
            <b>TOTAL</b>
        </div>

        ${content.map(element => /*HTML*/`
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

            <div class="cart-price">${element.onSale 
                            ? `<p class="discount">${element.price}</p> <p class="red">${element.discountedPrice}</p>` 
                            : `<p>${element.price}</p>`
                        }</div>

            <p class="cart-total"><b>$${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</b></p>
        </div>
        `).join('')}
    </div>`; 
}


