
import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";
import { navbar } from './components/nav.js'
import { loading } from './components/loading/loadingMessage.js'
import { errorMessage } from './components/error/errorMessage.js'

window.changePage = changePage;
window.navbar = navbar;
window.loading = loading;
window.errorMessage = errorMessage;
startUp()

function startUp(){
    //model.app.currentPage = "home";
    updateView();
}
export async function updateView(){
    const loadingHTML = /*HTML*/ `
        <header>${navbar()}</header>
        <main>${loading()}</main>
    `;

    model.app.display.innerHTML = loadingHTML;

    try {
        const content = await renderPage();
        const finalHTML = /*HTML*/ `
            <header>${navbar()}</header>
            <main>${content}</main>
        `;
        model.app.display.innerHTML = finalHTML;
    } catch (error) {
        console.error('Error rendering page:', error);
        model.app.display.innerHTML = errorMessage();
    }
}






