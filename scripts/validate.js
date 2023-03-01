const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const disableSubmitButton = (buttonSubmit, config) => {
  buttonSubmit.setAttribute("disabled", "true");
  buttonSubmit.classList.add(config.inactiveButtonClass);
};
const enableSubmitButton = (buttonSubmit, config) => {
  buttonSubmit.removeAttribute("disabled");
  buttonSubmit.classList.remove(config.inactiveButtonClass);
};
const toggleButton = (form, config) => {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (!isFormValid) {
    disableSubmitButton(buttonSubmit, config);
  } else {
    enableSubmitButton(buttonSubmit, config);
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
      toggleButton(form, config);
      toggleButton(form, config);
    });
  });
};

const enableFormValidation = (form, config) => {
  addInputListeners(form, config);
  toggleButton(form, config);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
};

enableValidation(formValidationConfig);
