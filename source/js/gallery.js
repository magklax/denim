'use strict';

(function() {
  const gallery = document.querySelector('.product-gall');
  const galleryItem = document.querySelector('#gallery-item');

  if (screen.width >= 768) {
    gallery.addEventListener('click', function (evt) {
      if (evt.target.hasAttribute('data-idndex')) {

        const div = evt.target.closest('div');
        const pictureOne = evt.target.parentElement;
        const pictureTwo = galleryItem.querySelector('picture');

        while (galleryItem.firstChild) {
          galleryItem.removeChild(galleryItem.firstChild);
        }

        galleryItem.appendChild(pictureOne);
        div.appendChild(pictureTwo);
      }
    });
  }
})();

