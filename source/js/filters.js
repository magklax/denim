'use strict';

(function () {
  const openFiltersBtn = document.querySelector('#open-filters-btn');
  const closeFiltersBtn = document.querySelector('#close-filters-btn');
  const applyFiltersBtn = document.querySelector('#apply-filters-btn');
  const filtersForm = document.querySelector('#filters-form');

  const openFilters = function () {
    filtersForm.style.display = 'flex';
    openFiltersBtn.classList.add('active');
    document.addEventListener('keydown', onFiltersEscPress);
  };

  const closeFilters = function () {
    filtersForm.style.display = 'none';
    openFiltersBtn.classList.remove('active');
    document.removeEventListener('keydown', onFiltersEscPress);
  };

  const onFiltersEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeFilters();
    }
  };

  const onOpenFiltersBtnClick = function (evt) {
    evt.preventDefault();

    if (openFiltersBtn.classList.contains('active')) {
      closeFilters();
    } else {
      openFilters();
    }
  };

  const onOpenFiltersBtnEnterPress = function (evt) {
     if (evt.keyCode === 13) {
      evt.preventDefault();

      if (openFiltersBtn.classList.contains('active')) {
        closeFilters();
      } else {
        openFilters();
      }
    }
  };

  const onCloseFiltersBtnClick = function (evt) {
    evt.preventDefault();

    closeFilters();
  };

  const onCloseFiltersBtnEnterPress = function (evt) {
     if (evt.keyCode === 13) {
      evt.preventDefault();

      closeFilters();
    }
  };

  openFiltersBtn.addEventListener('click', onOpenFiltersBtnClick);
  openFiltersBtn.addEventListener('keydown', onOpenFiltersBtnEnterPress);
  closeFiltersBtn.addEventListener('click', onCloseFiltersBtnClick);
  closeFiltersBtn.addEventListener('click', onCloseFiltersBtnClick);
  applyFiltersBtn.addEventListener('click', onCloseFiltersBtnClick);
  applyFiltersBtn.addEventListener('keydown', onCloseFiltersBtnEnterPress);


  /*input[name="side-btn"]:checked + label > svg {
  transform: rotate(180deg);
}*/


})();
