import { model } from "./model.js";
import {AUTH, KEY} from './env.js'

const NOROFF_API_URL = "https://v2.api.noroff.dev/gamehub"

const options = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmViZWNrYWtpbm4iLCJlbWFpbCI6InJlYmtpbjAyNzU1QHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQwMDU2MzE2fQ.Sg18noEjr9xPTw-vQLbOa8wZVfcHvZ78dQWbRY8fLwQ',
      'X-Noroff-API-Key': 'aed41a7a-a1db-4575-8ca4-c6a72d1f4eb1',
      "Content-Type": "application/json"
    }
  };

// export async function fetchMainData(){
//     try{
//         const response = await fetch(`${NOROFF_API_URL}`, options);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//           }

//         const result = await response.json();
//         console.log("result.data:", result.data)
//         createFilters(result.data);
//         return Array.isArray(result.data) ? result.data : [];
//     } catch (error){
//         console.error(error.message);
//     }

// }

export async function fetchMainData() {
  try {
      const response = await fetch(`${NOROFF_API_URL}`, options);
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
  console.log("model.data.filter.genre:", model.data.filter.genre);
}


export async function fetchProduct(chosenID){
  try{
    const response = await fetch(`${NOROFF_API_URL}/${chosenID}`, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

    const result = await response.json();
    
    return result.data || {};
} catch (error){
    console.error(error.message);
}
}


