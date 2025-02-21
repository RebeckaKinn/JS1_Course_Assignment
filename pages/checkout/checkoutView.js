import { model } from "../../model.js";
import { removeFromCart } from "../../controller.js";
import { checkoutHandeling } from "../../controller.js";

window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
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
            <button onclick="checkoutHandeling()">Checkout</button>
        </div>
    </section>
    `;
}

//add this to cart instead????
function getAmountOfItemsInCart(){
    let amount = 0;
    model.input.cart.forEach((element) => {
        amount += element.amount;
    })
    return amount;
}

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
                    <p>${element.amount}</p>
                </div>
                <div>
                <b>PRICE</b>
                    ${element.onSale ? `<p class="discount">${element.price}</p> <p class="red">${element.discountedPrice}</p>`: `<p>${element.price}</p>`}
                </div>
                    <b>SUBTOTAL</b>
                    <p>${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</p>
                </div>
                <div>
                    <button onclick="removeFromCart('${element.id}')">Remove</button>
                </div>
            </div>

        </div>
        
        `;
    })
    return items;
}

function calculateSubTotal(amount, onSale, price, discountedPrice){
    return onSale ? discountedPrice * amount : price * amount;
}

function calculateTotal(){
    let amount = 0;
    model.input.cart.forEach((element) => {
        amount += element.onSale ? element.discountedPrice * element.amount : element.price * element.amount;
    })
    return amount;
}