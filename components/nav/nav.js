import { changePage } from '../../controller.js'
import { cartView } from './cart.js'

window.changePage = changePage;
window.cartView = cartView;

export function nav(){
    return /*HTML*/ `
    <section>
        <div>
            <img src="icons/logo.png" alt="">
        </div>
        <ul>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
        </ul>
    ${cartView()}
    </section>
    `;
}