'use strict';

(function () {
  const openMenuBtn = document.querySelector('#open-menu-btn');
  const closeMenuBtn = document.querySelector('#close-menu-btn');
  const menuOverlay = document.querySelector('#nav-overlay');

  const openMenu = function () {
    menuOverlay.style.display = 'block';
    document.addEventListener('keydown', onMenuEscPress);
  };

  const closeMenu = function () {
    menuOverlay.style.display = 'none';
    document.removeEventListener('keydown', onMenuEscPress);
  };

  const onMenuEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeMenu();
    }
  };

  const onOpenMenuBtnClick = function (evt) {
    evt.preventDefault();

    openMenu();
  };

  const onOpenMenuBtnEnterPress = function (evt) {
     if (evt.keyCode === 13) {
      evt.preventDefault();

      openMenu();
    }
  };

  const onCloseMenuBtnClick = function (evt) {
    evt.preventDefault();

    closeMenu();
  };

  const onCloseMenuBtnEnterPress = function (evt) {
     if (evt.keyCode === 13) {
      evt.preventDefault();

      closeMenu();
    }
  };

  openMenuBtn.addEventListener('click', onOpenMenuBtnClick);
  openMenuBtn.addEventListener('keydown', onOpenMenuBtnEnterPress);
  closeMenuBtn.addEventListener('click', onCloseMenuBtnClick);
  closeMenuBtn.addEventListener('keydown', onCloseMenuBtnEnterPress);
})();
