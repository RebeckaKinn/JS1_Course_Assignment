import { model } from "../../model.js";
import { fetchMainData } from "../../api.js";
import { chosenProduct, handleAddToCart, filterController, resetFilter } from "../../controller.js";


window.chosenProduct = chosenProduct;
window.handleAddToCart = handleAddToCart;
window.filterController = filterController;
window.resetFilter = resetFilter;
export async function homeView(){
    const items = await displayItems();

    return /*HTML*/`
    <h1>Welcome to PlayBox </h1>
    <h2>– Your Ultimate Gaming Destination!</h2>
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
    <div>${filterButton()}</div>
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
                    <h3 class="remove-margin product-title">${element.title}</h3>
                    
                    <div class="flex row align-items-baseline gap-5 remove-margin">
                        <p>Price:</p>
                        ${element.onSale ? `
                            <p class="discount">$${element.price}</p> 
                            <p class="red price">$${element.discountedPrice}</p>
                            `: `<p class="price">$${element.price}</p>`}
                    </div>
                        
                    <div class="flex row">
                        <button class="square" onclick="handleAddToCart(this, '${element.id}', '${element.title}', ${element.price}, ${element.discountedPrice}, ${element.onSale}, '${element.image.url}', '${element.image.alt}')">Add to Cart</button>
                        <div class="fav-button">
                            ${element.favorite ? `&#9733;` : `&#9734;`}
                        </div>
                    </div>
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

    
function filterButton() {
    return /*HTML*/`
    <fieldset>
        <legend>Filter</legend>
        <ul>
            ${model.data.filter.genre.map(genre => /*HTML*/`
                <li>
                    <input type="radio" name="filter_options" value="${genre}" id="${genre}" onclick="filterController(this.value)" ${model.input.currentFilter === genre ? "checked" : ""}>
                    <label for="${genre}">${genre}</label>
                </li>
            `).join("")}
        </ul>
        <button onclick="resetFilter()">Reset</button>
    </fieldset>
    `;
}





