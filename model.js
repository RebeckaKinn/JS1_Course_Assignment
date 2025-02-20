import { homeView } from './pages/home/home.js'

export const model = {
    app:{
        display: document.getElementById('app'),
        pages:[
            {
                name: "home",
                path: homeView()
            },
        ]
    },

    input:{

    },

    data:{

    }
};