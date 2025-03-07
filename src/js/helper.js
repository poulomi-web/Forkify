// import { classof } from 'core-js/library/fn/object';
import { TIMEOUT } from './config.js';

const timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long`));
    }, 1000 * s);
  });
};

export const getJSON = async function (url) {
  try {
    const getRecipe = await Promise.race([fetch(url), timeOut(TIMEOUT)]);
    if (!getRecipe.ok) {
      throw new Error(`${getRecipe.statusText}`);
    }
    const data = await getRecipe.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, recipeData) {
  let jsonifiedData = JSON.stringify(recipeData);
  console.log(`Jsonified data : ${jsonifiedData}`);
  try {
    const fetchPro = fetch(url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify JSON format
      },
      body: jsonifiedData, // Convert JS object to JSON string
    });
    const getRecipe = await Promise.race([fetchPro, timeOut(TIMEOUT)]);
    if (!getRecipe.ok) {
      throw new Error(`${getRecipe.statusText}`);
    }
    const data = await getRecipe.json();
    return data;
  } catch (err) {
    console.log(`Got error : `, err);
    throw err;
  }
};
