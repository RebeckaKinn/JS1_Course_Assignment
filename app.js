
import { model } from "./model.js";

updateView();

function updateView(){
    model.app.display.innerHTML = /*HTML*/ `
    <header>${navbar()}</header>
    <main>${renderPage()}</main>
    <footer></footer>
 
    `;
    
}


function renderPage() {
    const page = model.app.pages.find(p => p.name === model.app.currentPage);
    if (page) {
        return page.path; 
    }
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

function changePage(option){
    if(model.app.pages.includes(option)){
        model.app.currentPage = option;
    }
    updateView();
}


