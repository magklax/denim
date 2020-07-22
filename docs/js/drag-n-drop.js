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
  let curCoordX;

  const setMinPrice = function (value) {
    minPrice.style.left = value + '%';
    rangeBar.style.left = value + '%';
    minPriceValue.textContent = '$' + Math.floor(value * 400 / 100);
  };

  const setMaxPrice = function (value) {
    maxPrice.style.left = value + '%';
    rangeBar.style.right = 100 - value + '%';
    maxPriceValue.textContent = '$' + Math.floor(value * 400 / 100);
  }

  const setPrice = function (shift) {
    if (minPrice.classList.contains('active')) {
      curCoordX = (minPrice.offsetLeft + shift) / rangeScale.offsetWidth * 100;
      let right = (maxPrice.offsetLeft - 30 + shift) / rangeScale.offsetWidth * 100;

      if (curCoordX < 0) {
        curCoordX = 0;
      }

      if (curCoordX >= right) {
        curCoordX = right;
      }

      setMinPrice(curCoordX);
    }

    if (maxPrice.classList.contains('active')) {
      curCoordX = (maxPrice.offsetLeft + shift) / rangeScale.offsetWidth * 100;
      let left = (minPrice.offsetLeft + 30 + shift) / rangeScale.offsetWidth * 100;

      if (curCoordX > 100) {
        curCoordX = 100;
      }

      if (curCoordX <= left) {
        curCoordX = left;
      }

      setMaxPrice(curCoordX);
    }
  };

  const onMouseMove = function (evt) {
    evt.preventDefault();

    setPrice(evt.clientX - startCoordX);
    startCoordX = evt.clientX;
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();

    minPrice.classList.remove('active');
    maxPrice.classList.remove('active');

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    evt.target.classList.add('active');

    startCoordX = evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  range.addEventListener('mousedown', onMouseDown);

  /* touch */

  const onTouchMove = function (evt) {
    evt.preventDefault();

    setPrice(evt.changedTouches[0].clientX - startCoordX);
    startCoordX = evt.changedTouches[0].clientX;
  }

  var onTouchEnd = function (evt) {
    evt.preventDefault();

    minPrice.classList.remove('active');
    maxPrice.classList.remove('active');

    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd);
  };

  var onTouchStart = function (evt) {
    evt.preventDefault();

    evt.target.classList.add('active');

    startCoordX = evt.changedTouches[0].clientX;

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  range.addEventListener('touchstart', onTouchStart);

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
