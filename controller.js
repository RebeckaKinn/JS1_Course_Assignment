import { model } from "./model.js";
import { updateView } from "./app.js";

export function changePage(option){
    if(model.app.pages.some(p => p.name === option)){
        model.app.currentPage = option;
    }
    updateView();
}


export async function renderPage() {
    const page = model.app.pages.find(p => p.name === model.app.currentPage);
    if (page && typeof page.path === "function") {
        return await page.path(); 
    }

    console.error("Page not found or path is not a function:", page);
    return "<p>Page not found</p>";
}