import View from './View.js';
import icons from 'url:../../img/icons.svg';

class previewView extends View {
  _parentContainer = '';
  _generateMarkup = function () {
    const id = window.location.hash.slice(1);
    return `<li class="preview ${
      id === this._data.id ? 'preview__link--active' : ''
    }">
            <a class="preview__link" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src=${this._data.imageURL} alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title} ...</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
              <div class="recipe__user-generated ${
                this._data.key ? '' : `hidden`
              }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
              </div>
            </a>
          </li>`;
  };
}

export default new previewView();
