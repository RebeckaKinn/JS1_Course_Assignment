import { model } from "../../model.js";
import { changeAmount ,removeFromCart, checkoutHandeling, calculateSubTotal, calculateTotal, getAmountOfItemsInCart } from "../../controller.js";


window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changeAmount = changeAmount;

export function checkoutView(){
    return /*HTML*/`
    <h1>Checkout</h1>
    <div>
        <h2>${getAmountOfItemsInCart()} items in cart</h2>
    </div>
    <section>${checkoutDisplay()}</section>
    <section>
        <div>
            <b>Total</b>
            <p>${calculateTotal()}</p>
        </div>
        <div>
            <button onclick="checkoutHandeling()">Order and Pay</button>
        </div>
    </section>
    `;
}

//ADD THE INPUT AS IN CART
function checkoutDisplay(){
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
                <div>
                <b>PRICE</b>
                    ${element.onSale ? `<p class="discount">${element.price}</p> <p class="red">${element.discountedPrice}</p>`: `<p>${element.price}</p>`}
                </div>
                    <b>SUBTOTAL</b>
                    <p>${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</p>
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

