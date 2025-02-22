
import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";
import { navbar } from './components/nav.js'

window.changePage = changePage;
window.navbar = navbar;
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

    `;
    
}






