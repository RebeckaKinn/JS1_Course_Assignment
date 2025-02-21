import { model } from "../model.js";
import {changeAmount, changePage, removeFromCart, checkoutHandeling, calculateSubTotal, calculateTotal, getAmountOfItemsInCart } from "../controller.js";

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changePage = changePage;
window.changeAmount = changeAmount;

export function cartView(){
    return /*HTML*/`
    <div>
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
                <button onclick="changePage('${model.app.pages[2].name}')">Checkout</button>
            </div>
        </section>
    </div>
    `;
}


function cartDisplay(){
    let items = '';
    if(model.input.cart.length <= 0){
        items = /*HTML*/`
        <h2>Empty</h2>
        `;
    }
    model.input.cart.forEach((element) => {
        items += /*HTML*/`
        <div class="flex row">
            <div class="list-image">
                <img src="${element.image}" alt="${element.alt}">
            </div>
            
            <h3>${element.title}</h3>

            <div class="flex col">
                <div>
                    <b>QTY</b>
                    <div>
                        <button onclick="changeAmount('${element.id}', false)">&minus;</button>
                        <b>${element.amount}</b>
                        ${element.amount <= 4 ? /*HTML*/`<button onclick="changeAmount('${element.id}', true)">&plus;</button>` : ""}
                    </div>
                </div>

                <p>
                    <b>SUBTOTAL</b>
                    <b>$${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</b>
                </p>
                </div>

                <div>
                    <button onclick="removeFromCart('${element.id}')">&#10005;</button>
                </div>
            </div>

        </div>
        
        `;
    })
    return items;
}