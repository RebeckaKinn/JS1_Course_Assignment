
import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";
import { fetchMainData } from "./api.js";


window.changePage = changePage;
startUp()

async function startUp(){
    await fetchMainData();
    updateView();
}
export async function updateView(){
    console.log("Updating view...");
    const content = await renderPage(); 
    console.log("Rendered content:", content);
    
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



