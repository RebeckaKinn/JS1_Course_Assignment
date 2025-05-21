import { model } from "../../model.js";

export function shoppingCartGetItem(){
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    model.input.cart = storedCart;
    return model.input.cart;
}
export function shoppingCartEmpty(){
    model.input.cart = [];
    localStorage.setItem("shoppingCart", JSON.stringify(model.input.cart));
}
export function shoppingCartSetItem(){
    localStorage.setItem("shoppingCart", JSON.stringify(model.input.cart));
}



export function chosenProductIdGetItem(chosenID){
    const savedID = localStorage.getItem('chosenProductId');
    let newID = chosenID;
    if(newID === null) newID = savedID;
    return newID;
}
export function chosenProductIdSetItem(id){
    model.input.currentId = id;
    localStorage.setItem('chosenProductId', id);
}




export function currentPageSetItem(option){
    model.app.currentPage = option;
    localStorage.setItem('currentPage', model.app.currentPage);
}

export function currentPageGetItem(){
    const savedPage = localStorage.getItem('currentPage');
        if (savedPage && model.app.pages.some(p => p.name === savedPage)) {
            model.app.currentPage = savedPage;
        }
  
}





export function orderHistorySetItem(){
    localStorage.setItem("orderHistory", JSON.stringify(model.data.orderHistory));
}
export function orderHistoryGetItem(){
    model.data.orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
}

export function orderIDSetItem(generateOrderID){
    model.input.recentOrder = generateOrderID;
    localStorage.setItem("orderID", JSON.stringify(generateOrderID));
}
export function orderIDGetItem(){
    model.input.recentOrder = localStorage.getItem("orderID") || null;
}