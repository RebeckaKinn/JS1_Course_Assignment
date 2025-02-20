
import { model } from "./model.js";

updateView();

function updateView(){
    renderPage("home");
}


function renderPage(pageName) {
    const page = model.app.pages.find(p => p.name === pageName);
    if (page) {
        model.app.display.innerHTML = page.path; 
    }
}


