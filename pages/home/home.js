import { model } from "../../model.js";
import { fetchMainData } from "../../api.js";


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
        // console.log("list: " + list)
        let items = '';
        list.forEach(element => {
            items += /*HTML*/`
            <section class="flex col">

                <h3>${element.title}</h3>

                <div class="list-image">
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