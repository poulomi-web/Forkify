import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  _errorMessage = 'No results found. No recipe found for your query!';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.rendorError();
    this._data = data;
    let markUp = this._generateMarkup();
    if (!render) return markUp;
    this._clear();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.rendorError();
    this._data = data;
    let newMarkUp = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentContainer.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      let curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        curEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;

        // console.log(curEl);
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentContainer.innerHTML = '';
  }

  addSpinner = function () {
    const markUp = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;

    this._clear();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
  };

  rendorError(message = this._errorMessage) {
    const markUp = `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    console.log(`Rendering Error`);
    this._clear();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
  }

  rendorMessage(message = this._message) {
    console.log('Printing message', this._message);
    const markUp = `<div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
    // this._parentContainer.innerHTML = this.originalHTML;
    console.log('Entering rendormessage block');
  }
}
