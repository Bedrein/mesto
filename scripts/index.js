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

//-------------------Event---------------------------------------

// Закрыть PopupImage
btnClosePopupImage.addEventListener('click', () => {
  closePopup(popupTypeImage);
});

btnEditProfile.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupTypeEditProfile);
});

btnClosePopupEditProfile.addEventListener('click', () => {
  closePopup(popupTypeEditProfile);
});

formPopupEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Добавление карточки
btnAddCard.addEventListener('click', () => {
  openPopup(popupTypeAddCard);
});

btnClosePopupCard.addEventListener('click', () => {
  closePopup(popupTypeAddCard);
});

//форма для addElement
formPopupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = titleInput.value;
  const linkInput = linkInputImage.value;

  //----------------Code---------------------------------------

  //Сreate card
  const card = new Card(
    nameInput,
    linkInput,
    cardItemTemplate,
    handleOpenPopupImage
  );
  card.renderCard(itemLiistWrapper);
  formPopupAddCard.reset();
  closePopup(popupTypeAddCard);
  formValidatorAddCard.toggleButton();
});

//Create Card from data
initialCards.forEach((item) => {
  const card = new Card(
    item.name,
    item.link,
    cardItemTemplate,
    handleOpenPopupImage
  );
  card.renderCard(itemLiistWrapper);
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
