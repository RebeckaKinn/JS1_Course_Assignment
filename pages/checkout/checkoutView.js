import { model } from "../../model.js";
import { changeAmount ,removeFromCart, checkoutHandeling, calculateSubTotal, calculateTotal, getAmountOfItemsInCart } from "../../controller.js";


window.removeFromCart = removeFromCart;
window.checkoutHandeling = checkoutHandeling;
window.calculateSubTotal = calculateSubTotal;
window.calculateTotal = calculateTotal;
window.getAmountOfItemsInCart = getAmountOfItemsInCart;
window.changeAmount = changeAmount;

export async function checkoutView(){
    const content = await checkoutDisplay()

    return /*HTML*/`
    <div class="full-height-vh">
        <h1 class="main-color">Checkout</h1>
        <div>
            <h2>${getAmountOfItemsInCart()} items in cart</h2>
        </div>
        <section>${content}</section>
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

//ADD THE INPUT AS IN CART
async function checkoutDisplay(){
    let items = '';
    if(model.input.cart.length <= 0){
        items = /*HTML*/`<h2>Empty</h2>`;
    } else {
        model.input.cart.forEach((element) => {
            items += /*HTML*/`
            <div class="flex row">
                <div class="list-image">
                    <img src="${element.image}" alt="${element.alt}">
                </div>
                
                <div class="flex col">
                    <h3>${element.title}</h3>

                    <div>
                        <b>QTY</b>
                        <div class="flex row">
                            <button class="circle" onclick="changeAmount('${element.id}', false)">&minus;</button>
                            <b>${element.amount}</b>
                            ${element.amount <= 4 ? `<button class="circle" onclick="changeAmount('${element.id}', true)">&plus;</button>` : ""}
                        </div>
                    </div>

                    <div>
                        <b>PRICE</b>
                        ${element.onSale 
                            ? `<p class="discount">${element.price}</p> <p class="red">${element.discountedPrice}</p>` 
                            : `<p>${element.price}</p>`
                        }
                    </div>

                    <div>
                        <b>SUBTOTAL</b>
                        <p>${calculateSubTotal(element.amount, element.onSale, element.price, element.discountedPrice)}</p>
                    </div>

                    <div>
                        <button class="square" onclick="removeFromCart('${element.id}')">&#10005;</button>
                    </div>
                </div>
            </div>
            `;
        });
    }
    return items;
}

