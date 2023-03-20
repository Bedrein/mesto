class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  _disableSubmitButton = () => {
    this._buttonSubmit.setAttribute('disabled', 'true');
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
  };

  _enableSubmitButton = () => {
    this._buttonSubmit.removeAttribute('disabled');
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
  };

  toggleButton = () => {
    this._isFormValid = this._form.checkValidity();
    if (!this._isFormValid) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _handleFormInput = (input) => {
    this._inputError = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
      input.classList.remove(this._config.inputErrorClass);
      this._inputError.textContent = '';
    } else {
      input.classList.add(this._config.inputErrorClass);
      this._inputError.textContent = input.validationMessage;
    }
  };

  _addInputListeners = () => {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleFormInput(input);
        this.toggleButton();
        this.toggleButton();
      });
    });
  };

  enableValidation = () => {
    this._addInputListeners();
    this.toggleButton();
  };
}

export default FormValidator;
