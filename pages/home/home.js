import { model } from "../../model.js";
import { fetchMainData } from "../../api.js";
import { chosenProduct, addToCart } from "../../controller.js";

window.addToCart = addToCart;
window.chosenProduct = chosenProduct;
export async function homeView(){
    const items = await displayItems();

    return /*HTML*/`
    <h1>Welcome to PlayBox – Your Ultimate Gaming Destination!</h1>
    <p>Discover the latest and greatest games right here at PlayBox! Whether you're into action-packed adventures, thrilling RPGs, or competitive multiplayer battles, we have something for every gamer. Explore top-rated titles, exclusive deals, and must-play classics—all in one place.</p>
    <ul>
        <li>
            <p>🔥 New Releases & Bestsellers</p>
        </li>
        <li>
            <p>🎮 Exclusive Discounts & Special Offers</p>
        </li>
        <li>
            <p>🌍 Games for Every Platform & Genre</p>
        </li>
    </ul>
    <p>Find your next favorite game below and start playing today! 🚀👇</p>
    <div>${items}</div>
    
    `;
}


async function displayItems(){
    try{
        const data = await fetchMainData();
        const list = data || [];

        let items = '';
        list.forEach(element => {
            items += /*HTML*/`
            <section class="product-item">

                <div onclick="chosenProduct('${element.id}')" class="list-image">
                    <img src="${element.image.url}" alt="${element.image.alt}">
                </div>

                <div>
                    <h3 class="remove-margin">${element.title}</h3>
                    <div class="fav-button">
                        ${element.favorite ? `&#9733;` : `&#9734;`}
                    </div>
                    <p class="flex row remove-margin">
                        <b>Price:</b>
                        ${element.onSale ? `
                            <div class="discount">$${element.price}</div> 
                            <div class="red">${element.discountedPrice}</div>
                            `: `$<div>${element.price}</div>`}
                    </p>

                    <button class="square" onclick="addToCart('${element.id}', '${element.title}', ${element.price}, ${element.discountedPrice}, ${element.onSale}, '${element.image.url}', '${element.image.alt}')">Add to Cart</button>
                </div>




            </section>
            `;



            console.log("title: " + element.title)
        });
        return items;
    } catch (error){
        console.error(error.message);
        return `<p>Error loading items</p>`;
    }
}


