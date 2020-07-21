'use strict';

(function () {
  const range = document.querySelector('.range');
  const rangeScale = document.querySelector('.range__scale');
  const minPrice = document.querySelector('.range__toggle--min');
  const maxPrice = document.querySelector('.range__toggle--max');
  const minPriceValue = minPrice.querySelector('.range__value');
  const maxPriceValue = maxPrice.querySelector('.range__value');
  const rangeBar = document.querySelector('.range__bar');
  let startCoordX;
  let positionX;

  const setMinPrice = function (coord) {
    minPrice.style.left = coord + '%';
    rangeBar.style.left = coord + '%';
    minPriceValue.textContent = '$' + Math.floor(coord * 400 / 100);
  };

  const setMaxPrice = function (coord) {
    maxPrice.style.left = coord + '%';
    rangeBar.style.right = 100 - coord + '%';
    maxPriceValue.textContent = '$' + Math.floor(coord * 400 / 100);
  }

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = moveEvt.clientX - startCoordX;
    let left = (minPrice.offsetLeft + 30 + shift) / rangeScale.offsetWidth * 100;
    let right = (maxPrice.offsetLeft - 30 + shift) / rangeScale.offsetWidth * 100;

    startCoordX = moveEvt.clientX;

    if (minPrice.classList.contains('active')) {
      positionX = (minPrice.offsetLeft + shift) / rangeScale.offsetWidth * 100;

      if (positionX < 0) {
        positionX = 0;
      }

      if (positionX >= right) {
        positionX = right;
      }

      setMinPrice(positionX);
    }

    if (maxPrice.classList.contains('active')) {
      positionX = (maxPrice.offsetLeft + shift) / rangeScale.offsetWidth * 100;

      if (positionX > 100) {
        positionX = 100;
      }

      if (positionX <= left) {
        positionX = left;
      }

      setMaxPrice(positionX);
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    minPrice.classList.remove('active');
    maxPrice.classList.remove('active');

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    downEvt.target.classList.add('active');

    startCoordX = downEvt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  range.addEventListener('mousedown', onMouseDown);

   /* clear filters */

  const clearFiltersBtn = document.querySelector('#clear-filters-btn');

  const clearFilters = function () {
    setMinPrice(20);
    setMaxPrice(75);

    document.querySelectorAll('.checkbox__item input').forEach(function(el) {
      el.checked = false;
    });
  }

  clearFiltersBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    clearFilters();
  });

  clearFiltersBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();

      clearFilters();
    }
  });
})();
