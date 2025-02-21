import { model } from "../../../model.js";
import { findRecentOrder, calculateTotal } from "../../../controller.js";

window.calculateTotal = calculateTotal;
window.findRecentOrder = findRecentOrder;

export async function confirmationView(){
    const content = await getOrderInformation();
    return /*HTML*/`
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
            <h1 style="color: #4CAF50; text-align: center;">Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
            <div>${content}</div>
            <p>We will send a confirmation email with further details.</p>
            <p>Happy gaming!</p>
        </div>
    `;
    
}

async function getOrderInformation(){
    const data = await findRecentOrder();
    console.log("data:", data)
    if(data){
        return /*HTML*/`
            <p>Your order ID is: <strong>${data.orderID}</strong></p>
            <h2>Order Summary</h2>
            <ul>
                ${data.orderDetails.map(item => `
                    <li>
                        <strong>${item.title}</strong> - ${item.amount} x $${item.discountedPrice.toFixed(2)}
                    </li>
                `).join('')}
            </ul>
            <p><strong>Total: $${calculateTotal(data.orderDetails)}</strong></p>
    `;
    }else{
        return `<p>No order history found.</p>`;
    }
}