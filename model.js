import { homeView } from './pages/home/home.js'
import { productView } from './pages/product/productView.js'
import { checkoutView } from './pages/checkout/checkoutView.js'
import { confirmationView } from './pages/checkout/confirmation/confirmationView.js'
import { orderHistory } from './pages/history/orderHistory.js'

export const model = {
    app:{
        display: document.getElementById('app'),
        currentPage: "home",
        pages:[
            {
                name: "home",
                path: homeView
            },
            {
                name: "product",
                path: productView
            },
            {
                name: "checkout",
                path: checkoutView
            },
            {
                name: "confirmation",
                path: confirmationView
            },
            {
                name: "orderHistory",
                path: orderHistory
            },

        ],
        cartControls: false,
    },

    input:{
        currentId: null,
        recentOrder: null,
        currentFilter: "",
        cart: [],
    },

    data:{
        orderHistory: [],
        filter: {
            genre: [],
        }
    }
};