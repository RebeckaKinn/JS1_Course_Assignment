import { model } from "./model.js";
import { updateView } from "./app.js";

export function changePage(option){
    if(model.app.pages.some(p => p.name === option)){
        model.app.currentPage = option;
    }
    updateView();
}


export function renderPage() {
    const page = model.app.pages.find(p => p.name === model.app.currentPage);
    if (page) {
        return page.path; 
    }
}