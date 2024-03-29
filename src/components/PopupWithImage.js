import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupTypeImage) {
    super(popupTypeImage);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitleImage = this._popup.querySelector('.popup__title-image');
  }

  //В методе open класса PopupWithImage нужно
  //вставлять в попап картинку с src изображения и подписью к картинке
  open = (item) => {
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupTitleImage.textContent = item.name;
    super.open();
  };
}
