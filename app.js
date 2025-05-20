
import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";
import { backButton } from './components/backButton.js'
import { loading } from './components/loading/loadingMessage.js'
import { errorMessage } from './components/error/errorMessage.js'
import { cartView } from './components/cart.js'

window.changePage = changePage;
window.loading = loading;
window.errorMessage = errorMessage;
window.backButton = backButton;
window.cartView = cartView;
startUp()

function startUp(){
    //model.app.currentPage = "home";
    updateView();
}
export async function updateView(){
    const loadingHTML = /*HTML*/ `
        <header>
            
            ${cartView()}
            </header>
        <main>${loading()}</main>
    `;

    model.app.display.innerHTML = loadingHTML;

    try {
        const content = await renderPage();
        const finalHTML = /*HTML*/ `
            
            <main>
            ${cartView()}
            ${model.app.currentPage !== "home" ? backButton() : ''}
                ${content}
            </main>
        `;
        model.app.display.innerHTML = finalHTML;
    } catch (error) {
        console.error('Error rendering page:', error);
        model.app.display.innerHTML = errorMessage();
    }
}






