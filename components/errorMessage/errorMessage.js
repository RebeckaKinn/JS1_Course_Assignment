import { changePage } from "../../controller.js";

window.changePage = changePage;

export function errorMessage() {
  return /*HTML*/ `
    <div class="error-container">
      <div class="error-box">
        <h1 class="error-title code-txt lowercase">Something went wrong</h1>
        <p class="error-text">We couldn't retrieve the information. Please try again later.</p>
        <button class="error-button code-txt lowercase glow"  onclick="changePage('home')">Try Again</button>
      </div>
    </div>
    `;
}
