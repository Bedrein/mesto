export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  // open popup
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  // close popup
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Esc -> close popup
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });

    //close button
    this._closeButtons = this._popupSelector.querySelector(
      '.popup__button-close'
    );
    this._closeButtons.addEventListener('click', () => {
      this.close();
    });
  }
}
