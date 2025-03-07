import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './Views/paginationView.js';
import { TIMEOUT_SEC } from './config.js';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');
const recipeInitialMsg = document.querySelector('.message');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const readRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.addSpinner();
    resultsView.update(model.searchResultsPerPage());

    // Loading recipe
    await model.loadRecipe(id);

    console.log(model.state.recipe);
    // Rendering recipe
    recipeView.render(model.state.recipe);

    // Rendering bookmark
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    console.log(`Error inside readRecipe function : ${err}`);
    // throw err;
  }
};

const readSearchResults = async function () {
  try {
    const searchQuery = searchView.getQuery();
    resultsView.addSpinner();

    await model.loadSearchResults(searchQuery);

    console.log(model.state.search.data);
    const dataDetails = model.state.search.data;
    const dataPerPage = model.searchResultsPerPage();
    resultsView.render(dataPerPage);
    // console.log(model.state.search);
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlAddBookmark = function () {
  console.log('model.state.bookmarks is ', model.state.bookmarks);
  const bookmarkRecipe = model.state.bookmarks.find(
    bookmarkrecipe => bookmarkrecipe.id === model.state.recipe.id
  );
  if (!bookmarkRecipe) {
    model.addBookmarks(model.state.recipe);
  } else model.delBookmarks(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const paginationNavi = function (pageNum) {
  // const pageNum = model.state.search.page;
  const data = model.searchResultsPerPage(pageNum);
  resultsView.render(data);
  paginationView.render(model.state.search);
};

const servingsControl = function (servings) {
  model.servingsUpdate(servings);
  recipeView.update(model.state.recipe);
};

const addBookmarksFromStorage = function () {
  bookmarksView.render(model.state.bookmarks);
};

const addNewRecipe = async function (recipeData) {
  try {
    await model.addRecipeFormData(recipeData);

    recipeView.render(model.state.recipe);
    addBookmarksFromStorage();
    addRecipeView.rendorMessage();

    setTimeout(function () {
      addRecipeView._toggleWindowOverlay();
    }, 1000);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log('Entering catch block in addNewRecipe', err);
    setTimeout(function () {
      addRecipeView.rendorError(err);
      addRecipeView._toggleWindowOverlay();
    }, 500);
  }
};

const clearLocalStorage = function () {
  console.log('clearing local storage');
  localStorage.clear();
};

const init = function () {
  bookmarksView.addHandlerRender(addBookmarksFromStorage);
  recipeView.addHandlerRender(readRecipe);
  searchView.addHandlerRender(readSearchResults);
  paginationView.addHandlerRender(paginationNavi);
  recipeView.addHandlerServingsRender(servingsControl);
  recipeView.addHandlerBookmarks(controlAddBookmark);
  addRecipeView.addHandlerExtractFormData(addNewRecipe);
  console.log('Welcome');
};
init();
clearLocalStorage();
