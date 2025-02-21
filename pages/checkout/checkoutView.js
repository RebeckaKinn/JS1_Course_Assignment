import { model } from "../../model.js";
import { removeFromCart } from "../../controller.js";

window.removeFromCart = removeFromCart;
export function checkoutView(){
    return /*HTML*/`
    <h1>Checkout view here</h1>
    <section>${checkoutDisplay()}</section>
    `;
}

function checkoutDisplay(){
    let items = '';
    if(model.input.cart.length <= 0){
        items = /*HTML*/`
        <h2>No items in cart</h2>
        `;
    }
    model.input.cart.forEach((element) => {
        items += /*HTML*/`
        <div>
            <h3>${element.title}</h3>
            <div class="list-image">
                <img src="${element.image}" alt="${element.alt}">
            </div>

            <div class="flex row">
                <p>Price</p>
                ${element.onSale ? `<p class="discount">${element.price}</p> <p class="red">${element.discountedPrice}</p>`: `<p>${element.price}</p>`}
            </div>

            <div>
            ${element.amount}
                <button onclick="removeFromCart('${element.id}')">Remove</button>
            </div>
        </div>
        
        `;
    })
    return items;
}