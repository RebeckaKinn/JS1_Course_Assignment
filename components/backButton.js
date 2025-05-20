import { changePage } from '../controller.js'
window.changePage = changePage;

export function backButton(){
    return /*HTML*/ `
    <div class="back-button flex row align-items-center justify-content-center">
        <button class="back-button" onclick="changePage('home')"><span>&#11164;</span><span>Back</span></button>
    </div>
    `;
}