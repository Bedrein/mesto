const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const buttonFormDisable = (form, config) => {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (!isFormValid) {
    buttonSubmit.setAttribute("disabled", "true");
    buttonSubmit.classList.add(config.inactiveButtonClass);
  }
};

const buttonFormEnable = (form, config) => {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    buttonSubmit.removeAttribute("disabled", "true");
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
};

const handleFormInput = (input, config) => {
  const inputError = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    input.classList.remove(config.inputErrorClass);
    inputError.textContent = "";
  } else {
    input.classList.add(config.inputErrorClass);
    inputError.textContent = input.validationMessage;
  }
};

const addInputListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      handleFormInput(input, config);
      buttonFormDisable(form, config);
      buttonFormEnable(form, config);
    });
  });
};

const enableFormValidation = (form, config) => {
  addInputListeners(form, config);
  buttonFormDisable(form, config);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
};

enableValidation(formValidationConfig);
