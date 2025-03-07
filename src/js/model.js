import { API_URL, REC_PER_PAGE, KEY } from './config';
import { getJSON, sendJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    data: [],
    page: 1,
    recsPerPage: REC_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipe = function (recipe) {
  state.recipe = {
    bookmarked: false,
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    imageURL: recipe.image_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${KEY}`);

    let { recipe } = data.data;

    createRecipe(recipe);
    const bkmrk = state.bookmarks.some(
      bookmarkRecipe => bookmarkRecipe.id === state.recipe.id
    );
    if (bkmrk) state.recipe.bookmarked = true;
  } catch (err) {
    console.log(`The error inside loadRecipe function ${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const getSearchData = await getJSON(
      `${API_URL}?search=${query}&key=${KEY}`
    );

    const searchData = getSearchData.data.recipes;

    state.search.query = query;
    state.search.data = searchData.map(data => {
      return {
        id: data.id,
        imageURL: data.image_url,
        title: data.title,
        publisher: data.publisher,
        ...(data.key && { key: data.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

const storeBookmarks = function (bookmarks) {
  localStorage.setItem('bookmark', JSON.stringify(bookmarks));
};

export const addBookmarks = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeBookmarks(state.bookmarks);
};

export const delBookmarks = function (id) {
  const indexToRemove = state.bookmarks.findIndex(item => item.id === id);
  state.bookmarks.splice(indexToRemove, 1);
  state.recipe.bookmarked = false;
  storeBookmarks(state.bookmarks);
};

export const searchResultsPerPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * REC_PER_PAGE;
  const end = page * REC_PER_PAGE;

  return state.search.data.slice(start, end);
};

export const servingsUpdate = function (newServings) {
  const oldServings = state.recipe.servings;
  state.recipe.ingredients.forEach(element => {
    element.quantity = (element.quantity / oldServings) * newServings;
  });
  state.recipe.servings = newServings;
};

export const addRecipeFormData = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(el => el[0].includes('ingredient') && el[1] != '')
    .map(el => {
      const elArr = el[1].split(',');
      if (elArr.length !== 3) {
        throw new Error(
          'Wrong format! Please enter quantity, unit and description'
        );
      }
      const [quantity, unit, description] = el[1].split(',');
      return {
        quantity: quantity ? +quantity : null,
        unit: unit ? unit : '',
        description,
      };
    });
  const recipe = {
    publisher: newRecipe.publisher,
    ingredients,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    title: newRecipe.title,
    servings: +newRecipe.servings,
    cooking_time: +newRecipe.cookingTime,
  };
  const writeAPIdata = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
  createRecipe(writeAPIdata.data.recipe);
  addBookmarks(writeAPIdata.data.recipe);
};

const init = function () {
  const bookmarkStorage = JSON.parse(localStorage.getItem('bookmark'));
  if (bookmarkStorage) {
    state.bookmarks = bookmarkStorage;
  }
};
init();
