import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class resultsView extends View {
  _parentContainer = document.querySelector('.results');
  _generateMarkup = function () {
    return this._data.map(el => previewView.render(el, false)).join('');
  };
}

export default new resultsView();
