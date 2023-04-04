import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, { handleSabmitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
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

  showInput(item) {
    this._inputName = this._submitForm.querySelector('.popup__input_text_name');
    this._inputJob = this._submitForm.querySelector('.popup__input_text_job');
    this._inputName = item.name;
    this._inputJob.job = item.job;
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
      super.close();
    });
  }
}
