import { model } from "../model.js";
import { updateView } from "../app.js";

export function cartIconToggle(){
    model.app.cartControls = !model.app.cartControls;
    updateView(); 
}