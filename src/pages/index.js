import './index.css'; // добавьте импорт главного файла стилей

import Card from './../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';

import {
  formValidationConfig,
  popupTypeEditProfile,
  btnEditProfile,
  formPopupEditProfile,
  formPopupEditAvatar,
  popupTypeImage,
  popupTypeAddCard,
  popupTypeEditAvatar,
  popup_type_confirm,
  btnAddCard,
  btnEditAvatar,
  formPopupAddCard,
  itemLiistWrapper,
  cardItemTemplate,
} from '../utils/conatans.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';

//-----------Ini_API---------------------------------
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '74d0f924-7041-4c9b-b945-e0bc2747bd20',
    'Content-Type': 'application/json',
  },
});

//------------popupTypeAddCard FORM----------------------------------
const popupAddCardForm = new PopupWithForm(popupTypeAddCard, {
  handleSabmitForm: ({ title, link }, setInitialText) => {
    popupAddCardForm.setTextButton('Сохранение...');
    api
      .postNewCard({ title, link })
      .then((res) => {
        section.addItem(createCard(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setInitialText());
  },
});
popupAddCardForm.setEventListeners();

//-------------popupTypeEditProfile FORM-------------------------------

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about',
  avatar: '.profile__avatar',
});

let user;

//-------------get- profile---and//get-initial-card---------
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then((res) => {
    user = res[0];
    userInfo.setUserInfo(res[0]);
    section.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
  });

const popupEditProfileForm = new PopupWithForm(popupTypeEditProfile, {
  handleSabmitForm: (data, setInitialText) => {
    popupEditProfileForm.setTextButton('Сохранение...');
    api
      .patchProfileInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setInitialText());
  },
});

popupEditProfileForm.setEventListeners();

//----------------Create card--------------------------------------

const popupWithImage = new PopupWithImage(popupTypeImage);
popupWithImage.setEventListeners();

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    user,
    cardItemTemplate,
    popupWithConfirm.open,
    {
      handleCardClick: () => {
        popupWithImage.open(cardData);
      },
    },
    {
      //---------like-Card-------------------
      handleLikeClick: (idCard) => {
        api
          .putlikeCard(idCard)
          .then((res) => {
            card.showLikes(res);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      },
    },
    //------Delete--like-Card-------------------
    {
      handleDeleteLikeClick: (idCard) => {
        api
          .deleteLikeCard(idCard)
          .then((res) => {
            card.showLikes(res);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      },
    }
  );

  const cardElement = card.createCard(cardData);
  return cardElement;
};

//--------------Create cards and render----------------------------

const section = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  itemLiistWrapper
);

//----------------Popup Confirm---------------------------------
const popupWithConfirm = new PopupWithConfirm(popup_type_confirm, {
  handleDeleteCard: (id, card) => {
    api
      .deleteCard(id)
      .then(() => {
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => card.remove());
  },
});

popupWithConfirm.setEventListeners();

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

const formValidatorEditAvatar = new FormValidator(
  formValidationConfig,
  formPopupEditAvatar
);
formValidatorEditAvatar.enableValidation();

//-------------------Events-open-popup-------------------------------------
// Событие открытия popupAddCard
btnAddCard.addEventListener('click', () => {
  formValidatorAddCard.resetButton();
  popupAddCardForm.open();
});

// Событие открытия popupEditProfile
btnEditProfile.addEventListener('click', () => {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  popupEditProfileForm.open();
});

const popupEditAvatar = new PopupWithForm(popupTypeEditAvatar, {
  handleSabmitForm: (data, setInitialText) => {
    popupEditAvatar.setTextButton('Сохранение...');
    api
      .patchEditAvatar(data.link)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setInitialText());
    // popupEditAvatar.close();
  },
});

// Событие открытия popupEditAvatar
btnEditAvatar.addEventListener('click', () => {
  formValidatorEditAvatar.resetButton();
  popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();
