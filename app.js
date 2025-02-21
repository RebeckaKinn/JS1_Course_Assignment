
import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";


window.changePage = changePage;
startUp()

function startUp(){
    //model.app.currentPage = "home";
    updateView();
}
export async function updateView(){
    const content = await renderPage(); 

    model.app.display.innerHTML = /*HTML*/ `
    <header>${navbar()}</header>
    <main>${content}</main>
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



