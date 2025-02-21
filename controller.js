import { model } from "./model.js";
import { updateView } from "./app.js";

export function changePage(option){
    if(model.app.pages.some(p => p.name === option)){
        model.app.currentPage = option;
    }
    updateView();
}


export async function renderPage() {
    const page = model.app.pages.find(p => p.name === model.app.currentPage);
    if (page && typeof page.path === "function") {
        return await page.path(); 
    }

    console.error("Page not found or path is not a function:", page);
    return "<p>Page not found</p>";
}

export function chosenProduct(id){
    model.input.currentId = id;
    console.log(model.input.currentId)
    changePage(model.app.pages[1].name);
}

export function addToCart(newID, newTitle, newPrice){
    const newProduct = {
        id: newID,
        title: newTitle,
        price: newPrice,
    };
    model.input.cart.push(newProduct);
    console.log("cart:", model.input.cart)
}
