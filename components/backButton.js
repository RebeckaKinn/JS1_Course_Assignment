import { changePage } from '../controller.js'
window.changePage = changePage;

export function backButton(){
    return /*HTML*/ `
    <div class="back-button flex row align-items-center justify-content-center">
        <button class="square" onclick="changePage('home')">Home</button>
    </div>
    `;
}