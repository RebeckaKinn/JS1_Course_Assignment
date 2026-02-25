import { model } from "../../model.js";
import {
  changeAmount,
  changePage,
  removeFromCart,
  checkoutHandeling,
  calculateSubTotal,
  calculateTotal,
  getAmountOfItemsInCart,
} from "../../controller.js";
import { cartIconToggle } from "./cartController.js";
import {
  shoppingCartGetItem,
  shoppingCartUpdate,
} from "../dataHandeling/handeling.js";

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changePage = changePage;
window.changeAmount = changeAmount;
window.cartIconToggle = cartIconToggle;
window.shoppingCartGetItem = shoppingCartGetItem;
window.shoppingCartUpdate = shoppingCartUpdate;

export function cartView() {
  shoppingCartUpdate();
  return /*HTML*/ `
    <div class="cart-container">
        ${displayCartIcon()}
        <div class="cart-info">  
        <span class="close-cart-container">
            <label class="close-cart" for="cart" onclick="cartIconToggle()">&#10005;</label>
        </span>
         ${
           model.input.cart.length <= 0
             ? /*HTML*/ `
            <div class="flex col justify-content-center align-items-center">
                <h2 class="code-txt light-txt lowercase">Looks like your cart is empty!</h2>
                <button onclick="changePage('home')" class="square square2">Get shoppin'</button>
            </div>
            `
             : /*HTML*/ `
            
            <div class="flex-space-between">
                <h2>Shopping Cart</h2>
                <h2>${getAmountOfItemsInCart()} items</h2>
            </div>
            <section class="full-width">${cartDisplay() === null ? `Empty` : cartDisplay()}</section>
            <section class="full-height flex-space-between-col">
                <p class="width-30 flex-space-between">
                    <b>Total:</b>
                    <b>$${calculateTotal(model.input.cart)}</b>
                </p>
                <div class="checkout-button">
                    <button class="square square2" onclick="changePage('${model.app.pages[2].name}')">Checkout</button>
                </div>
            </section>
            `
         }
        </div>
    </div>`;
}

function displayCartIcon() {
  return /*HTML*/ `
    <input type="checkbox" id="cart" class="hidden" ${model.app.cartControls && "checked"}>
    <label for="cart" onclick="cartIconToggle()" class="code-txt flex align-items-center main-color pointer lowercase hover-pink">Cart
        <span class="cart-icon">
            <img src="./icons/cart_icon.svg" alt="">
        </span>
    </label>
    `;
}

export function cartDisplay() {
  const content = shoppingCartGetItem();
  if (content <= 0) {
    return null;
  }

  return /*HTML*/ `
    <div class="cart-items"> 
        <div class="cart-grid cart-header">
            <b>PRODUCT DETAILS</b>
            <b>QTY</b>
            <b>PRICE</b>
            <b>TOTAL</b>
        </div>

        ${content
          .map(
            (element) => /*HTML*/ `
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

            <div class="cart-price">${
              element.onSale
                ? `<p class="discount">${element.price}</p> <p class="red">${element.discountedPrice}</p>`
                : `<p>${element.price}</p>`
            }</div>

            <p class="cart-total"><b>$${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</b></p>
        </div>
        `,
          )
          .join("")}
    </div>`;
}
