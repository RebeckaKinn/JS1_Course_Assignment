
import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";
import { fetchMainData } from "./api.js";

updateView();
window.changePage = changePage;
fetchMainData()
export function updateView(){
    model.app.display.innerHTML = /*HTML*/ `
    <header>${navbar()}</header>
    <main>${renderPage()}</main>
    <footer></footer>
    `;
    
}


function navbar(){
    return /*HTML*/ `
    <ul>
        <li onclick="changePage('home')">Home</li>
        <li onclick="changePage('product')">Product test</li>
        <li onclick="changePage('checkout')">Checkout test</li>
        <li onclick="changePage('confirmation')">Confirmation test</li>
    </ul>
    
    `;
}



