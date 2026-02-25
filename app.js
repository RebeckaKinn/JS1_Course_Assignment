import { model } from "./model.js";
import { changePage, renderPage } from "./controller.js";
import { backButton } from "./components/backButton.js";
import { loading } from "./components/loading/loadingMessage.js";
import { errorMessage } from "./components/errorMessage/errorMessage.js";
import { nav } from "./components/nav/nav.js";

window.changePage = changePage;
window.loading = loading;
window.errorMessage = errorMessage;
window.backButton = backButton;
window.nav = nav;
startUp();

function startUp() {
  updateView();
}
export async function updateView() {
  const loadingHTML = /*HTML*/ `
        <header>${nav()}</header>
        <main>${loading()}</main>
    `;

  model.app.display.innerHTML = loadingHTML;

  try {
    const content = await renderPage();
    const finalHTML = /*HTML*/ `
            <header>
            ${nav()}
            </header>
            <main>
                ${content}
            </main>
        `;
    model.app.display.innerHTML = finalHTML;
  } catch (error) {
    console.error("Error rendering page:", error);
    model.app.display.innerHTML = errorMessage();
  }
}
//
