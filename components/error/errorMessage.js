

export function errorMessage(){
    return /*HTML*/ `
        <div class="error-container">
      <div class="error-box">
        <div class="error-icon">⚠️</div>
        <h1 class="error-title">Oops... Something went wrong!</h1>
        <p class="error-text">We couldn't retrieve the information. Please try again later.</p>
        <button class="error-button" onclick="location.reload()">Try Again</button>
      </div>
    </div>
    `;
}