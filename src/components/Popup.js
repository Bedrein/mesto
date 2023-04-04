export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }
  // open popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  // close popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Esc -> close popup
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });

    //close button
    this._closeButtons = this._popup.querySelector('.popup__button-close');
    this._closeButtons.addEventListener('click', () => {
      this.close();
    });
  }
}
