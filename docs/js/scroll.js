'use strict';

(function () {
  const bottomBtn = document.querySelector('#bottom-btn');
  const footer = document.querySelector('#footer');

  const scrollToBottom = () => {
    footer.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  };

  bottomBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    scrollToBottom();
  });

  bottomBtn.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();

      scrollToBottom();
    }
  });
})();
