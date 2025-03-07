import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentContainer = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(this._data.data.length / this._data.recsPerPage);
    const currPage = +this._data.page;

    // Page 1 and other pages
    if (currPage === 1 && numPages > 1) {
      // console.log(`1st page`);
      return `<button data-go-to="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Page 1 and no other page
    if (this._data.page === 1 && this._data.page === numPages) {
      console.log(`Page 1 and No other page`);
      return ``;
    }

    // Last Page
    if (currPage === numPages) {
      console.log(`Last Page`);
      return `<button data-go-to="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>`;
    }

    // other pages
    if (currPage < numPages && currPage !== 1) {
      console.log(`Middle pages`);
      return ` <button data-go-to="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-go-to="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
  }

  addHandlerRender(handler) {
    this._parentContainer.addEventListener('click', function (e) {
      const btn_pagination = e.target.closest('.btn--inline');
      // console.log(btn_pagination);

      if (!btn_pagination) return;

      const goToPage = btn_pagination.dataset.goTo;
      handler(goToPage);
      return goToPage;
    });
  }
}

export default new paginationView();
