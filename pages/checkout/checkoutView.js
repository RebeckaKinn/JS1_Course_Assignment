import { model } from "../../model.js";
import {
  changeAmount,
  removeFromCart,
  checkoutHandeling,
  calculateSubTotal,
  calculateTotal,
  getAmountOfItemsInCart,
} from "../../controller.js";
import { cartDisplay } from "../../components/nav/cart.js";
import { errorMessage } from "../../components/errorMessage/errorMessage.js";

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changeAmount = changeAmount;
window.cartDisplay = cartDisplay;
window.errorMessage = errorMessage;

export async function checkoutView() {
  const content = await cartDisplay();
  if (content === null) return errorMessage();

  return /*HTML*/ `
    <div class="full-height-vh flex col align-items-center full-width main-side-padding">
        <h1 class="main-color">Checkout</h1>
        <div>
            <h2>${getAmountOfItemsInCart()} item(s) in cart</h2>
        </div>
        <section class="full-width padding-sides">${content}</section>
        <section>
            <p>
                <b>Total:</b>
                <b>$${calculateTotal(model.input.cart)}</b>
            </p>
            <div class="checkout-button">
                <button class="square" onclick="checkoutHandeling()">Order and Pay</button>
            </div>
        </section>
    </div>
    `;
}
