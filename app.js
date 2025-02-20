
import { model } from "./model.js";

updateView();

function updateView(){
    model.app.display.innerHTML = /*HTML*/ `
    <header>${navbar()}</header>
    <main>${renderPage("home")}</main>
    <footer></footer>
 
    `;
    
}


function renderPage(pageName) {
    const page = model.app.pages.find(p => p.name === pageName);
    if (page) {
        return page.path; 
    }
}

function navbar(){
    return /*HTML*/ `
    <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>
    
    `;
}
