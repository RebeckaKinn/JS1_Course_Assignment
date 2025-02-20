import { model } from "../../model.js";
//error when calling on model
// import { fetchMainData } from "/api.js";

// fetchMainData()

export function homeView(){
    return `<h1>Welcome to Home Page</h1>
    <div>${displayItems()}</div>
    
    `;
}


async function displayItems(){
    try{
        const { model } = await import("../../model.js");//not working correctly
        let items = '';
        model.data.items.forEach(element => {
            items += `${element.title}`;
            console.log("title: " + element.title)
        });
        return items;
    } catch (error){
        console.error(error.message);
    }
}