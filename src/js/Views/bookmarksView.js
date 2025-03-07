import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class bookmarksView extends View {
  _parentContainer = document.querySelector('.bookmarks');
  _generateMarkup = function () {
    return this._data.map(el => previewView.render(el, false)).join('');
  };

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new bookmarksView();
