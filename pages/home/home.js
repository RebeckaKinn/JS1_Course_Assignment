import { model } from "../../model.js";
import { fetchMainData } from "../../api.js";
import { chosenProduct } from "../../controller.js";

window.chosenProduct = chosenProduct;
export async function homeView(){
    const items = await displayItems();

    return `
    <h1>Welcome to Home Page</h1>
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
            <section class="flex col">

                <h3>${element.title}</h3>

                <div onclick="chosenProduct('${element.id}')" class="list-image">
                    <img src="${element.image.url}" alt="${element.image.alt}">
                </div>

                <div class="flex row">
                    <p>Price</p>
                    <p>${element.price}</p>
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


