import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popup, { handleDeleteCard }) {
    super(popup);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonConfirm = this._popup.querySelector('.popup__button');
    this._currentCallback = null;
    this._currentCardId = null;
  }

  open = (currentCallback, currentCardId) => {
    super.open();
    this._currentCallback = currentCallback;
    this._currentCardId = currentCardId;
  };

  setEventListeners = () => {
    super.setEventListeners();

    this._buttonConfirm.addEventListener('click', () => {
      this._handleDeleteCard(this._currentCardId, this._currentCallback);
    });
  };
}
