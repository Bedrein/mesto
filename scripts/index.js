import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  formValidationConfig,
  page,
  popupTypeEditProfile,
  btnEditProfile,
  btnClosePopupEditProfile,
  formPopupEditProfile,
  nameInput,
  jobInput,
  name,
  job,
  popupTypeImage,
  btnClosePopupImage,
  popupTitleImage,
  popupImage,
  popupTypeAddCard,
  btnAddCard,
  titleInput,
  linkInputImage,
  btnClosePopupCard,
  formPopupAddCard,
  itemLiistWrapper,
  cardItemTemplate,
} from './data.js';

//-------------Function-----------------------------

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  addListenerKeyClosePopup();
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  deleteListenerKeyClosePopup();
};

const handleOpenPopupImage = (evt) => {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupTitleImage.textContent = evt.target.alt;
  openPopup(popupTypeImage);
};

const addListenerKeyClosePopup = () => {
  page.addEventListener('keydown', closePopupByEscKey);
};

const deleteListenerKeyClosePopup = () => {
  page.removeEventListener('keydown', closePopupByEscKey);
};

const closePopupByEscKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

const initClosePopupByOverlayClick = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
};

const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupTypeEditProfile);
};

const createCard = (item) => {
  const card = new Card(
    item.name,
    item.link,
    cardItemTemplate,
    handleOpenPopupImage
  );
  const cardElement = card.createCard();
  return cardElement;
};

//-------------------Event---------------------------------------

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__button-close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

btnEditProfile.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupTypeEditProfile);
});

formPopupEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Добавление карточки
btnAddCard.addEventListener('click', () => {
  openPopup(popupTypeAddCard);
});

//форма для addElement
formPopupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectInput = {
    name: titleInput.value,
    link: linkInputImage.value,
  };
  //----------------Code---------------------------------------

  //Сreate card
  itemLiistWrapper.prepend(createCard(objectInput));
  closePopup(popupTypeAddCard);
  formValidatorAddCard.toggleButton();
});

//Create Card from data
initialCards.forEach((item) => {
  itemLiistWrapper.prepend(createCard(item));
});

//Create validator for form
const formValidatorEditProfile = new FormValidator(
  formValidationConfig,
  formPopupEditProfile
);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(
  formValidationConfig,
  formPopupAddCard
);
formValidatorAddCard.enableValidation();

initClosePopupByOverlayClick(popupTypeImage);
initClosePopupByOverlayClick(popupTypeEditProfile);
initClosePopupByOverlayClick(popupTypeAddCard);
