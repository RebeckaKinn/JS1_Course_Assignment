import { model } from "../../model.js";
import { fetchProduct } from "../../api.js";
import { handleAddToCart } from "../../controller.js";
import { errorMessage } from "../../components/errorMessage/errorMessage.js";
import { productNotFound } from "../../components/errorMessage/noProductsFound.js";

window.handleAddToCart = handleAddToCart;
window.errorMessage = errorMessage;
window.productNotFound = productNotFound;

export async function productView() {
  const content = await displayContent();
  if (content == null) productNotFound();
  else
    return /*HTML*/ `
        <section class="">${content}</section>
    `;
}

async function displayContent() {
  try {
    const data = await fetchProduct(model.input.currentId);

    if (!data || !data.id || !data.image || !data.title) {
      return productNotFound();
    }

    return /*HTML*/ `
        <section class="single-product-container">
            <div class="top-banner">
                <div></div>
            </div>


            <div class="single-product-layout main-side-padding">
                <div class="product-image">
                    <img src="${data.image.url}" alt="${data.image.alt}">
                </div>

                <div class="flex col gap-1rem">
                <div class="flex col">
                    <div class="flex row baseline">
                        <h1 class="product-title full-width main-color">${data.title}</h1>
                        
                    </div>
                        <div class="flex row gap-1rem">
                            <p class="pink code-txt remove-margin">${data.ageRating},</p>
                            <p class="pink code-txt remove-margin"><i>${data.genre}</i></p>

                        </div>
                        <p class="pink code-txt remove-margin"><i>${data.released}</i></p>
                        
                    </div>

                    <ul class="flex tags">
                          ${data.tags
                            .map(
                              (item) => /*HTML*/ `
                                <li>${item}</li>
                                `,
                            )
                            .join("")}
                    </ul>
                    <p class="white light-txt text-gap">${data.description}</p>
                    <div class="flex row baseline">
                            <i class="pink code-txt">Add to favorites: </i>
                            <div class="fav-button remove-margin">
                                ${data.favorite ? `&#9733;` : `&#9734;`}
                            </div>  
                        </div>
                    <div class="flex row align-items-center gap-1rem">
                        <button class="square square2 glow-blue" onclick="handleAddToCart(this,'${data.id}', '${data.title}', ${data.price}, ${data.discountedPrice}, ${data.onSale}, '${data.image.url}', '${data.image.alt}')">Add to Cart</button>
                        <div class="flex row align-items-center gap-5">
                                ${
                                  data.onSale
                                    ? `
                                    <p class="discount remove-margin">$${data.price}</p> 
                                    <p class="pink price remove-margin">$${data.discountedPrice}</p>
                                    `
                                    : `<p class="price remove-margin">$${data.price}</p>`
                                }
                            </div>
                        </div>
                </div>
            </div>
            </section>
        `;
  } catch (error) {
    console.error(error.message);
    return productNotFound();
  }
}
