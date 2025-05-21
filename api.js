import { model } from "./model.js";
import { chosenProductIdGetItem } from './components/dataHandeling/handeling.js'

const NOROFF_API_URL = "https://v2.api.noroff.dev/gamehub"

export async function fetchMainData() {
  try {
      const response = await fetch(`${NOROFF_API_URL}`);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      const allData = Array.isArray(result.data) ? result.data : [];

      createFilters(result.data);
      return model.input.currentFilter 
          ? allData.filter(item => item.genre === model.input.currentFilter) 
          : allData;

  } catch (error) {
      console.error(error.message);
      return []; 
  }
}

function createFilters(newData) {
  const genreSet = new Set(model.data.filter.genre);

  newData.forEach(element => {
      genreSet.add(element.genre);  
  });

  model.data.filter.genre = Array.from(genreSet);
}


export async function fetchProduct(chosenID){
  try{
    const newID = chosenProductIdGetItem(chosenID);
    const response = await fetch(`${NOROFF_API_URL}/${newID}`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

    const result = await response.json();
    
    return result.data || {};
} catch (error){
    console.error(error.message);
    return null;
}
}


