import { homeView } from './pages/home/home.js'
import { productView } from './pages/product/productView.js'
import { checkoutView } from './pages/checkout/checkoutView.js'
import { confirmationView } from './pages/checkout/confirmation/confirmationView.js'

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
        ]
    },

    input:{
        currentId: '',
        recentOrder: 0,
        cart: [
            {
                alt: "",
                discountedPrice: 19.99,
                id: "14a20cf0-c230-45dd-a47f-7d0e76b73e3f",
                image: "https://static.noroff.dev/api/gamehub/7-boxer.jpg",
                onSale: false,
                price: 19.99,
                title: "Boxer",
                amount: 1
            },
            {
                alt: "",
                discountedPrice: 3.69,
                id: "ba43543f-b1b6-4655-aa99-1b81f8812558",
                image: "https://static.noroff.dev/api/gamehub/3-furious.jpg",
                onSale: true,
                price: 11.99,
                title: "Furious",
                amount: 1
            }
        ],
    },

    data:{
        orderHistory: []
    }
};