
import { calculateTotal } from "../../controller.js";
import { orderHistoryGetItem } from "../../components/dataHandeling/handeling.js";
import { model } from "../../model.js"

window.calculateTotal = calculateTotal;
window.orderHistoryGetItem = orderHistoryGetItem;

export async function confirmationView(){
    const content = await getOrderInformation();
    return /*HTML*/`
        <div>
            <h1 class="main-color">Order History</h1>
            <ul>${content}</ul>
        </div>
    `;
    
}

async function getOrderInformation(){
    try{
        await orderHistoryGetItem();
        if(!model.data.orderHistory.length <= 0){
            let items = '';
            model.data.orderHistory.map(element => {
                items += /*HTML*/`
                    <li>
                        <p>Order ID: <strong>${element.orderID}</strong></p>
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
            return /*HTML*/`
                
        `;
        }else{
            return /*HTML*/`
            <div>
                <b>Order history is empty.</b>
            </div>
            `;
        }
    
    } catch (error) {
      console.error(error.message);
      return []; 
  }
}