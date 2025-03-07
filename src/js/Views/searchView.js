import View from './View.js';
class searchView extends View {
  _parentContainer = document.querySelector('.search');

  getQuery() {
    const query = this._parentContainer.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  addHandlerRender(handler) {
    this._parentContainer.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentContainer.querySelector('.search__field').value = '';
  }
}

export default new searchView();
