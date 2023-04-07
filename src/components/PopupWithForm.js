import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, { handleSabmitForm }) {
    super(popup);
    this._submitForm = this._popup.querySelector('.popup__form');
    this._handleSabmitForm = handleSabmitForm;
    this._inputList = Array.from(
      this._submitForm.querySelectorAll('.popup__input')
    );
  }

  //собирает данные всех полей формы в объект
  _getInputValues() {
    this.inputForm = {};
    this._inputList.forEach((input) => {
      this.inputForm[input.name] = input.value;
    });

    return this.inputForm;
  }

  setInputValues(item) {
    this._inputList.forEach((input) => {
      input.value = item[input.name];
    });
  }

  close() {
    super.close();
    this._submitForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSabmitForm(this._getInputValues());
      this.close();
    });
  }
}
