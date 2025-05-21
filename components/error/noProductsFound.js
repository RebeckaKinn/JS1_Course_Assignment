import { changePage } from '../../controller.js'

window.changePage = changePage;

export function productNotFound(){
    return /*HTML*/ `
    <div class="error-container">
      <div class="error-box">
        <div class="error-icon">🔍</div>
        <h1 class="error-title">Product Not Found</h1>
        <p class="error-text">We couldn't find the product you're looking for. It might have been removed or never existed.</p>
        <button class="error-button"  onclick="changePage('home')">Go Back</button>
      </div>
    </div>
  `;
}
