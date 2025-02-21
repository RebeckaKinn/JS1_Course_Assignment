import { model } from "../../model.js";
import { fetchProduct } from "../../api.js";

export async function productView(){
    const content = await displayContent();
    return /*HTML*/`
    <div>
        <h1>This is the product page</h1>
        <section>${content}</section>
    <div>
    `;
}

async function displayContent(){
    try{
        const data = await fetchProduct(model.input.currentId);
        if (data) {
            return /*HTML*/`
                <section class="product-details">
                    <h2>${data.title}</h2>
                    <img src="${data.image.url}" alt="${data.image.alt}" class="product-image">
                    <div class="product-info">
                        <p><strong>Price:</strong> $${data.discountedPrice || data.price}</p>
                        <p><strong>Genre:</strong> ${data.genre}</p>
                        <p><strong>Age Rating:</strong> ${data.ageRating}</p>
                        <p><strong>Release Date:</strong> ${data.released}</p>
                        <p><strong>Description:</strong> ${data.description}</p>
                        <p><strong>Tags:</strong> ${data.tags.join(', ')}</p>
                        <p><strong>On Sale:</strong> ${data.onSale ? 'Yes' : 'No'}</p>
                        <p><strong>Favorite:</strong> ${data.favorite ? 'Yes' : 'No'}</p>
                    </div>
                </section>
            `;
        } else {
            return `<p>No product data found.</p>`;
        }
    } catch (error){
        console.error(error.message);
        return `<p>Error loading product</p>`;
    }
}