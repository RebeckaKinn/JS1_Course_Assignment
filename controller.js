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
    updateView();
}

export function removeFromCart(chosenID){
    //maybe remove all instead?
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

export function calculateSubTotal(amount, onSale, price, discountedPrice){
    return (onSale ? discountedPrice * amount : price * amount).toFixed(2);
}

export function calculateTotal(){
    let amount = 0;
    model.input.cart.forEach((element) => {
        amount += element.onSale ? element.discountedPrice * element.amount : element.price * element.amount;
    })
    return amount.toFixed(2);
}

export function getAmountOfItemsInCart(){
    let amount = 0;
    model.input.cart.forEach((element) => {
        amount += element.amount;
    })
    return amount;
}


export function changeAmount(chosenID, add = null){
    model.input.cart.forEach((element) => {
        if(element.id === chosenID){
            if(add){
                element.amount++;
                console.log("adding", element.amount)
            }else if(!add){
                element.amount--;
                console.log("subtract", element.amount)
                if(element.amount <= 0) removeFromCart(element.id);
            }else{
                console.error("Wrong input in change amount.")
            }
            
        }
    })
    updateView();
}