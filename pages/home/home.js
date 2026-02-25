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
  <div class="flex col gap-1rem">
  ${landingBanner()}
    <section class="flex col main-side-padding">
    <section class="filter-container">${filterButton()}</section>
    
    <div class="item-container">${items}</div>
    </section>
    </div>
    
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
      console.log(element);
      items += /*HTML*/ `
            <section class="product-item">
                <div onclick="chosenProduct('${element.id}')" class="list-image">
                    <img src="${element.image.url}" alt="${element.image.alt}">
                </div>
                <div style="background-image: url('${element.image.url}');" class="card-information">
                    <div class="flex col space-between information">
                    <div class="flex space-between row baseline">
                        <h3 class="remove-margin product-title uppercase">${element.title}</h3>
                        <span class="fav-button">
                            ${element.favorite ? `&#9733;` : `&#9734;`}
                        </span>
                    </div>
                    <div class="flex col gap-5">
                    <div class="flex row align-items-baseline gap-5">
                    <button class="remove-padding pink glow-text pointer" onclick="handleAddToCart(this, '${element.id}', '${element.title}', ${element.price}, ${element.discountedPrice}, ${element.onSale}, '${element.image.url}', '${element.image.alt}')">Add to Cart</button>
                        ${
                          element.onSale
                            ? `
                            <p class="discount remove-margin">$${element.price}</p> 
                            <p class="pink price remove-margin">$${element.discountedPrice}</p>
                            `
                            : `<p class="price remove-margin">$${element.price}</p>`
                        }
                    </div>
                     <div>
                        <ul class="flex tags">
                            ${element.tags
                              .map(
                                (item) => /*HTML*/ `
                                <li>${item}</li>
                                `,
                              )
                              .join("")}
                        </ul>
                    </div>
                        </div>
                        <button class="square " onclick="chosenProduct('${element.id}')">View</button>
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
        <legend class="filterButton code-txt lowercase">
            ${model.input.currentFilter == "" ? "Filter" : model.input.currentFilter}
        </legend>
        <ul class="filterOptions" id="filterOptions">
            ${model.data.filter.genre
              .map(
                (genre) => /*HTML*/ `
                <li class="hover-pink">
                    <input type="radio" name="filter_options" value="${genre}" id="${genre}" onclick="filterController(this.value)" ${model.input.currentFilter === genre ? "checked" : ""}>
                    <label for="${genre}">${genre}</label>
                </li>
            `,
              )
              .join("")}
            <li onclick="resetFilter()">Reset</li>
        </ul>
    </fieldset>
    `;
}

function landingBanner() {
  return /*HTML*/ `
  <section class="frontPageBanner">
    <div class="overlay flex col justify-content-end">
        <div class="flex col main-title">
            <h1 class="code-txt pink glow-text">PlayBox</h1>
            <span class="code-txt main-color glow-text-blue">Your Ultimate Gaming Destination</span>
        </div>
            <p>Discover the latest and greatest games right here at PlayBox! Whether you're into action-packed adventures, thrilling RPGs, or competitive multiplayer battles, we have something for every gamer. Explore top-rated titles, exclusive deals, and must-play classics—all in one place.</p>
            <ul>
                <li>
                    <span class="pink">&#10022;</span> New Releases & Bestsellers
                </li>
                <li>
                    <span class="pink">&#10022;</span> Exclusive Discounts & Special Offers
                </li>
                <li>
                    <span class="pink">&#10022;</span> Games for Every Platform & Genre
                </li>
            </ul>
            <p>Find your next favorite game below and start playing today!</p>
        </div>
    </section>
    `;
}
