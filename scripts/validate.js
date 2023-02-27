const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const disableSubmit = (evt) => {
  evt.preventDefault();
};

const toggleButton = (form, config) => {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  if (!isFormValid) {
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.classList.add(config.inactiveButtonClass);
  } else {
    buttonSubmit.removeAttribute("disabled", "disabled");
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
};

const handleFormInput = (evt, config) => {
  const input = evt.target;
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
    input.addEventListener("input", (evt) => {
      handleFormInput(evt, config);
    });
  });
};

const enableFormValidation = (form, config) => {
  form.addEventListener("submit", disableSubmit);
  form.addEventListener("input", () => {
    toggleButton(form, config);
  });
  toggleButton(form, config);
  addInputListeners(form, config);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
};
