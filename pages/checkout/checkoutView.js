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
import { backButton } from "../../components/backButton.js";

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
  ${backButton()}
    <div class="full-height-vh flex col align-items-center full-width main-side-padding">
        <h1 class="code-txt light-txt pink">Checkout</h1>
        <div>
            <h2 class="code-txt light-txt main-color">x ${getAmountOfItemsInCart()}</h2>
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
