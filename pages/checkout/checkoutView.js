import { model } from "../../model.js";
import { changeAmount ,removeFromCart, checkoutHandeling, calculateSubTotal, calculateTotal, getAmountOfItemsInCart } from "../../controller.js";
import { cartDisplay } from "../../components/cart.js";

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changeAmount = changeAmount;
window.cartDisplay = cartDisplay;

export async function checkoutView(){
    const content = await cartDisplay()

    return /*HTML*/`
    <div class="full-height-vh flex col align-items-center">
        <h1 class="main-color">Checkout</h1>
        <div>
            <h2>${getAmountOfItemsInCart()} items in cart</h2>
        </div>
        <section class="max-width-">${content}</section>
        <section>
            <p>
                <b>Total:</b>
                <b>$${calculateTotal(model.input.cart)}</b>
            </p>
            <div>
                <button class="square" onclick="checkoutHandeling()">Order and Pay</button>
            </div>
        </section>
    </div>
    `;
}


