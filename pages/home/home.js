import { model } from "../../model.js";
import { fetchMainData } from "../../api.js";
import {
  chosenProduct,
  handleAddToCart,
  filterController,
  resetFilter,
} from "../../controller.js";
import { errorMessage } from "../../components/errorMessage/errorMessage.js";

window.chosenProduct = chosenProduct;
window.handleAddToCart = handleAddToCart;
window.filterController = filterController;
window.resetFilter = resetFilter;
window.errorMessage = errorMessage;

export async function homeView() {
  const items = await displayItems();
  if (items === null) return errorMessage();
  return /*HTML*/ `
    <section class="flex col">
    <h1>Welcome to PlayBox </h1>
    <h2>Your Ultimate Gaming Destination!</h2>
    <p>Discover the latest and greatest games right here at PlayBox! Whether you're into action-packed adventures, thrilling RPGs, or competitive multiplayer battles, we have something for every gamer. Explore top-rated titles, exclusive deals, and must-play classics—all in one place.</p>
    <ul>
        <li>
            <p>&#10022; New Releases & Bestsellers</p>
        </li>
        <li>
            <p>&#10022; Exclusive Discounts & Special Offers</p>
        </li>
        <li>
            <p>&#10022; Games for Every Platform & Genre</p>
        </li>
    </ul>
    <p>Find your next favorite game below and start playing today! 🚀👇</p>
    <section class="filter-container">${filterButton()}</section>
    
    <div class="item-container">${items}</div>
    </section>
    
    
    `;
}

async function displayItems() {
  try {
    const data = await fetchMainData();
    const list = data || [];
    if (list.length === 0) {
      return null;
    }
    let items = "";
    list.forEach((element) => {
      items += /*HTML*/ `
            <section class="product-item">

                <div onclick="chosenProduct('${element.id}')" class="list-image">
                    <img src="${element.image.url}" alt="${element.image.alt}">
                </div>

                <div class="flex col space-between">
                    <div class="flex row baseline">
                        <h3 class="remove-margin product-title uppercase">${element.title}</h3>
                        <span class="fav-button">
                            ${element.favorite ? `&#9733;` : `&#9734;`}
                        </span>
                    </div>
                    
                    
                    <div class="flex row align-items-baseline gap-5">
                        <p class="remove-margin">Price:</p>
                        ${
                          element.onSale
                            ? `
                            <p class="discount remove-margin">$${element.price}</p> 
                            <p class="red price remove-margin">$${element.discountedPrice}</p>
                            `
                            : `<p class="price remove-margin">$${element.price}</p>`
                        }
                    </div>
                        

                    <div class=" flex gap-1rem  ">
                        <button class="square square2" onclick="chosenProduct('${element.id}')">View</button>
                        <button class="square scale-09" onclick="handleAddToCart(this, '${element.id}', '${element.title}', ${element.price}, ${element.discountedPrice}, ${element.onSale}, '${element.image.url}', '${element.image.alt}')">Add to Cart</button>
                    </div>
                </div>




            </section>
            `;
    });

    return items;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function filterButton() {
  return /*HTML*/ `
    <fieldset class="dropdownFilter">
        <legend class="filterButton code-txt" >Filter</legend>
        <ul class="filterOptions" id="filterOptions">
            ${model.data.filter.genre
              .map(
                (genre) => /*HTML*/ `
                <li>
                    <input type="radio" name="filter_options" value="${genre}" id="${genre}" onclick="filterController(this.value)" ${model.input.currentFilter === genre ? "checked" : ""}>
                    <label for="${genre}">${genre}</label>
                </li>
            `,
              )
              .join("")}
            <li>
                <p onclick="resetFilter()">Reset</p>
            </li>
        </ul>
        <p>${model.input.currentFilter == "" ? "" : `by: <span class="code-txt pink">${model.input.currentFilter}</span>`}</p>
    </fieldset>
    `;
}
