import { model } from "../../model.js";
import { fetchProduct } from "../../api.js";
import { handleAddToCart } from "../../controller.js";
import { errorMessage } from "../../components/errorMessage/errorMessage.js";
import { productNotFound } from "../../components/errorMessage/noProductsFound.js";


window.handleAddToCart = handleAddToCart;
window.errorMessage = errorMessage;
window.productNotFound = productNotFound;

export async function productView(){
    const content = await displayContent();
    if(content == null) productNotFound();
    else return /*HTML*/`
        <section >${content}</section>
    `;
}

async function displayContent(){
    try {
        const data = await fetchProduct(model.input.currentId);

        if (!data || !data.id || !data.image || !data.title) {
            return productNotFound();
        }

        return /*HTML*/`
            <div class="single-product-layout">
                <div class="product-image">
                    <img src="${data.image.url}" alt="${data.image.alt}">
                </div>

                <div class="flex col">
                    <div class="flex row baseline space-between">
                        <h1 class="remove-margin product-title full-width white">${data.title}</h1>
                        <div class="flex row baseline">
                            <div class="fav-button">
                                ${data.favorite ? `&#9733;` : `&#9734;`}
                            </div>
                            <div class="flex row align-items-center gap-5">
                                ${data.onSale 
                                    ? `<p class="discount">${data.price}</p> <p class="red price">${data.discountedPrice}</p>` 
                                    : `<p class="price white">${data.price}</p>`}
                            </div>
                        </div>
                    </div>
                    <ul class="product-info">
                        <li><p>Genre:</p><p class="white"><i>${data.genre}</i></p></li>
                        <li><p>Age Rating:</p><p class="white">${data.ageRating}</p></li>
                        <li><p>Release Date:</p><p class="white">${data.released}</p></li>
                        <li><p>Description:</p><p class="white">${data.description}</p></li>
                        <li><p>Tags:</p><p class="white"><i>${data.tags.join(', ')}</i></p></li>
                    </ul>
                    <div class="flex row align-items-center justify-content-center">
                        <button class="square" onclick="handleAddToCart(this,'${data.id}', '${data.title}', ${data.price}, ${data.discountedPrice}, ${data.onSale}, '${data.image.url}', '${data.image.alt}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error.message);
        return productNotFound();
    }
}
