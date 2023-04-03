const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popupTypeEditProfile = page.querySelector('.popup_type_edit-profile');

const btnEditProfile = profile.querySelector('.profile__edit-btn');

const formPopupEditProfile = popupTypeEditProfile.querySelector(
  '.popup__form_type_edit-profile'
);

const popupTypeImage = page.querySelector('.popup_type_image');
const popupTypeAddCard = page.querySelector('.popup_type_add-element');
const btnAddCard = profile.querySelector('.profile__add-btn');

const formPopupAddCard = popupTypeAddCard.querySelector(
  '.popup__form_type_add-element'
);
const cardsContainer = document.querySelector('.elements');
const itemLiistWrapper = cardsContainer.querySelector('.element');
const cardItemTemplate = document.querySelector('#element__item-template');

export {
  initialCards,
  formValidationConfig,
  popupTypeEditProfile,
  btnEditProfile,
  formPopupEditProfile,
  popupTypeImage,
  popupTypeAddCard,
  btnAddCard,
  formPopupAddCard,
  itemLiistWrapper,
  cardItemTemplate,
};
