import './index.css'; // добавьте импорт главного файла стилей

import Card from './../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
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
} from '../utils/conatans.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//------------popupTypeAddCard FORM----------------------------------
const popupAddCardForm = new PopupWithForm(popupTypeAddCard, formPopupAddCard, {
  handleSabmitForm: ({ title, link }) => {
    section.addItem(
      createCard({
        name: title,
        link: link,
        alt: title,
      })
    );
  },
});
popupAddCardForm.setEventListeners();
//-------------popupTypeEditProfile FORM-------------------------------

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });
const popupEditProfileForm = new PopupWithForm(
  popupTypeEditProfile,
  formPopupEditProfile,
  {
    handleSabmitForm: (data) => {
      userInfo.setUserInfo(data);
    },
  }
);
popupEditProfileForm.setEventListeners();
//----------------Create card--------------------------------------

const popupWithImage = new PopupWithImage(popupTypeImage);

const createCard = (item) => {
  const card = new Card(item.name, item.link, cardItemTemplate, () => {
    popupWithImage.open(item);
  });

  const cardElement = card.createCard();

  return cardElement;
};
//--------------Create cards and render----------------------------

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  itemLiistWrapper
);
section.renderItems();
//--------------------Events for popup---------------------------------
const popupImages = new Popup(popupTypeImage);
popupImages.setEventListeners();

const popupEditProfile = new Popup(popupTypeEditProfile);
popupEditProfile.setEventListeners();

const popupAddCard = new Popup(popupTypeAddCard);
popupAddCard.setEventListeners();

//-----------------Validator-------------------------
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

//-------------------Events-open-popup-------------------------------------
// Событие открытия popupAddCard
btnAddCard.addEventListener('click', () => {
  popupAddCardForm.close();
  popupAddCard.open();
});

// Событие открытия popupEditProfile
btnEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  userInfo.getUserInfo();
});
