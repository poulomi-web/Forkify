import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class addRecipeView extends View {
  _parentContainer = document.querySelector('.upload');
  _closebtn = document.querySelector('.btn--close-modal');
  _addRecipebtn = document.querySelector('.nav__btn--add-recipe');
  _message = 'Recipe uploaded successfully :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  originalHTML = this._parentContainer.innerHTML;

  constructor() {
    super();
    this._addHandlerAddRecipe();
    this._addHandlerHideWindow();
  }

  displayForm() {
    this._toggleWindowOverlay();
    console.log(
      'this._parentContainer.lastElementChild is ',
      this._parentContainer.lastElementChild
    );
    console.log(
      'this._parentContainer.firstElementChild is ',
      this._parentContainer.firstElementChild
    );
    if (
      this._parentContainer.lastElementChild.className === 'error' ||
      'message'
    ) {
      this._parentContainer.removeChild(this._parentContainer.lastElementChild);
      this._parentContainer.innerHTML = this.originalHTML;
    }
  }

  _addHandlerAddRecipe() {
    this._addRecipebtn.addEventListener('click', this.displayForm.bind(this));
  }

  _addHandlerHideWindow() {
    this._closebtn.addEventListener(
      'click',
      this._toggleWindowOverlay.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this._toggleWindowOverlay.bind(this)
    );
  }

  _toggleWindowOverlay() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addHandlerExtractFormData(handler) {
    this._parentContainer.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentContainer)];
      console.log('Form data is ', dataArr);
      const data = Object.fromEntries(dataArr);
      this._toggleWindowOverlay();
      handler(data);
    });
  }
}

export default new addRecipeView();
