import { changePage } from "../../controller.js";

window.changePage = changePage;

export function productNotFound() {
  return /*HTML*/ `
    <div class="error-container">
      <div class="error-box">
        <h1 class="error-title code-txt lowercase">Product Not Found</h1>
        <p class="error-text">We couldn't find the product you're looking for. It might have been removed or never existed.</p>
        <button class="error-button code-txt lowercase glow"  onclick="changePage('home')">Go Back</button>
      </div>
    </div>
  `;
}
