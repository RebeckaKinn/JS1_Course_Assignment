import { model } from "./model.js";
import { updateView } from "./app.js";
import { errorMessage } from "../../components/error/errorMessage.js";

window.errorMessage = errorMessage;
export function changePage(option){
    if(model.app.pages.some(p => p.name === option)){
        model.app.currentPage = option;
        localStorage.setItem('currentPage', option);
    }
    model.app.cartControls = false;
    updateView();
}


export async function renderPage() {
    const savedPage = localStorage.getItem('currentPage');

    if (savedPage && model.app.pages.some(p => p.name === savedPage)) {
        model.app.currentPage = savedPage;
    }
    const page = model.app.pages.find(p => p.name === model.app.currentPage);
    if (page && typeof page.path === "function") {
        return await page.path(); 
    }

    console.error("Page not found or path is not a function:", page);
    return errorMessage();
}

export function chosenProduct(id){
    model.input.currentId = id;
    localStorage.setItem('chosenProductId', id);
    changePage(model.app.pages[1].name);
}
export function handleAddToCart(button, newID, newTitle, newPrice, newDiscountPrice, newOnSale, newImage, newImageAlt) {
    
    button.textContent = "Item Added!";
    button.classList.add("glow");
    
    setTimeout(() => {
        button.textContent = "Add to Cart";
        button.classList.remove("glow");
    }, 1500);
    setTimeout(() => {
        addToCart(newID, newTitle, newPrice, newDiscountPrice, newOnSale, newImage, newImageAlt);
    }, 2000);
}
export function addToCart(newID, newTitle, newPrice, newDiscountPrice, newOnSale, newImage, newImageAlt){
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    model.input.cart = storedCart;
    
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
    localStorage.setItem("shoppingCart", JSON.stringify(model.input.cart));
    updateView();
}

export function removeFromCart(chosenID) {
    model.input.cart = model.input.cart.map((item) => {
        if (item.id === chosenID) {
            if (item.amount > 1) {
                return { ...item, amount: item.amount - 1 };
            }
            return null; 
        }
        return item;
    }).filter(Boolean);
    
    localStorage.setItem("shoppingCart", JSON.stringify(model.input.cart));
    updateView();
}


//DOES NOT WORK WITH LOCALSTORAGE YET
export function checkoutHandeling(){
    const generateOrderID = (model.data.orderHistory.length + 10)*55;
    model.data.orderHistory.push({
        orderID: generateOrderID,
        date: new Date().toISOString(),
        orderDetails: [...model.input.cart]
    })
    localStorage.setItem("orderHistory", JSON.stringify(model.data.orderHistory));
    model.input.recentOrder = generateOrderID;
    localStorage.setItem("orderID", JSON.stringify(generateOrderID));
    model.input.cart = [];
    localStorage.setItem("shoppingCart", JSON.stringify(model.input.cart));
    changePage(model.app.pages[3].name);
}

export function calculateSubTotal(amount, onSale, price, discountedPrice){
    return (onSale ? discountedPrice * amount : price * amount).toFixed(2);
}

export function calculateTotal(list){
    let amount = 0;
    list.forEach((element) => {
        amount += element.onSale ? element.discountedPrice * element.amount : element.price * element.amount;
    })
    localStorage.setItem("shoppingCart", JSON.stringify(list));
    return amount.toFixed(2);
}

export function getAmountOfItemsInCart(){
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    let amount = 0;
    cart.forEach((element) => {
        amount += element.amount;
    })
    
    return amount;
}


export function changeAmount(chosenID, add = null) {
    model.input.cart.forEach((element) => {
        if (element.id === chosenID) {
            if (add === true) {
                element.amount++;
            } else if (add === false) {
                element.amount--;
                if (element.amount <= 0) removeFromCart(element.id);
            } else {
                console.error("Wrong input in changeAmount.");
            }
        }
    });
    localStorage.setItem("shoppingCart", JSON.stringify(model.input.cart));
    updateView();
}



export function findRecentOrder(){
    const recentOrder = model.data.orderHistory.find((item) => item.orderID === model.input.recentOrder);
    return recentOrder;
}


export function filterController(genreString){
    model.input.currentFilter = genreString;
    updateView();
}
export function resetFilter(){
    model.input.currentFilter = "";
    updateView();
}