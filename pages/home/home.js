import { model } from "../../model.js";
import { fetchMainData } from "../../api.js";
import { chosenProduct } from "../../controller.js";

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
                    <h3>${element.title}</h3>
                    <div>
                        ${element.favorite ? `&#9733;` : `&#9734;`}
                    </div>
                    <p class="flex row">
                        <b>Price:</b>
                        ${element.onSale ? `
                            <b class="discount">$${element.price}</b> 
                            <b class="red">${element.discountedPrice}</b>
                            `: `$<b>${element.price}</b>`}
                    </p>
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


