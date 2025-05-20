import { model } from "../../model.js";

export function cartIconToggle(){
    model.app.cartControls = !model.app.cartControls;
}