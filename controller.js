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
    changePage(model.app.pages[1].name);
}

export function addToCart(newID, newTitle, newPrice, newDiscountPrice, newOnSale, newImage, newImageAlt){
    const existingProduct = model.input.cart.find((item) => item.id === newID);
    if (existingProduct) {
        existingProduct.amount += 1;
    } else {
        const newProduct = {
            id: newID,
            title: newTitle,
            price: newPrice,
            discountedPrice: newDiscountPrice,
            onSale: newOnSale,
            image: newImage,
            alt: newImageAlt,
            amount: 1
        };

        model.input.cart.push(newProduct);
    }
    console.log("cart after add:", model.input.cart)
}

export function removeFromCart(chosenID){
    model.input.cart = model.input.cart.map((item) => {
        if (item.id === chosenID) {
            if (item.amount > 1) {
                return { ...item, amount: item.amount - 1 }; 
            } 
            return null; 
        }
        return item;
    }).filter(Boolean); 
    console.log("cart after remove:",model.input.cart)
    updateView();
}


export function checkoutHandeling(){
    model.input.cart = [];
    changePage(model.app.pages[3].name);
}