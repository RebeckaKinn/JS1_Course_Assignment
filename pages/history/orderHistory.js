
import { calculateTotal } from "../../controller.js";
import { orderHistoryGetItem } from "../../components/dataHandeling/handeling.js";
import { model } from "../../model.js"
import { productNotFound } from "../../components/errorMessage/noProductsFound.js";
import { errorMessage } from "../../components/errorMessage/errorMessage.js";

window.calculateTotal = calculateTotal;
window.orderHistoryGetItem = orderHistoryGetItem;
window.productNotFound = productNotFound;
window.errorMessage = errorMessage;

export async function orderHistory(){
    const content = await getOrderInformation();
    return /*HTML*/`
        <section>
            <h1 class="main-color">Order History</h1>
            <ul>${content}</ul>
        </section>
    `;
    
}

async function getOrderInformation(){
    try{
        await orderHistoryGetItem();
        if(!model.data.orderHistory.length <= 0){
            let items = '';
            model.data.orderHistory.toReversed().map(element => {
                items += /*HTML*/`
                    <li class="border-bottom">
                        <p>Order ID: <strong>${element.orderID}</strong></p>
                        <p>Date: <strong>${element.date}</strong></p>
                        <ul>
                        ${element.orderDetails.map(item => /*HTML*/`
                            <li>
                                <strong>${item.title}</strong> - ${item.amount} x $${item.discountedPrice.toFixed(2)}
                            </li>
                        `).join('')}
                        </ul>
                        <p><strong>Total: $${calculateTotal(element.orderDetails)}</strong></p>  
                    </li>
                
                `;
            })
           return items;
        }else{
            return productNotFound();
        }
    
    } catch (error) {
      console.error(error.message);
      return errorMessage(); 
  }
}