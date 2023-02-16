const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const popupTypeEditProfile = page.querySelector('.popup_type_edit-profile');
const cardsContainer = page.querySelector('.elements');
const itemLiistWrapper = cardsContainer.querySelector('.element');
const cardItemTemplate = document.querySelector('#element__item-template');
const btnEditProfile = profile.querySelector('.profile__edit-btn');
const btnClosePopupEditProfile = popupTypeEditProfile.querySelector(
  '.popup__button-close'
);
const formPopupEditProfile =
  popupTypeEditProfile.querySelector('.popup__container');
const nameInput = popupTypeEditProfile.querySelector('.popup__input_text_name');
const jobInput = popupTypeEditProfile.querySelector('.popup__input_text_job');
const name = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__job');
const popupTypeImage = page.querySelector('.popup_type_image');
const btnClosePopupImage = popupTypeImage.querySelector(
  '.popup__button-close_type-image'
);
const popupTitleImage = popupTypeImage.querySelector('.popup__title-image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeAddCard = page.querySelector('.popup_type_add-element');
const btnAddCard = profile.querySelector('.profile__add-btn');
const formAddCard = popupTypeAddCard.querySelector(
  '.popup__container_type_add-element'
);
const titleInput = popupTypeAddCard.querySelector('.popup__input_text_title');
const linkInputImage = popupTypeAddCard.querySelector(
  '.popup__input_link-image'
);
const btnClosePopupCard = popupTypeAddCard.querySelector(
  '.popup__button-close_type_add-element'
);
const formPopupAddCard = formAddCard.querySelector(
  '.popup__form_type_add-element'
);

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupTypeEditProfile);
};

const deleteCard = (evt) => {
  evt.target.closest('.element__item').remove();
};

const likeCard = (evt) => {
  evt.target
    .closest('.element__button-heart')
    .classList.toggle('element__button-heart_active');
};

// Добавление карточки
const createCard = (name, link) => {
  const newCard = cardItemTemplate.content.cloneNode(true);
  const newCardName = newCard.querySelector('.element__text');
  const newCardImage = newCard.querySelector('.element__image_type_image');
  const btnTrash = newCard.querySelector('.element__button-delete');
  const btnHeartCard = newCard.querySelector('.element__button-heart');
  newCardName.textContent = name;
  newCardImage.src = link;
  newCardImage.alt = newCardName.textContent;
  // Удаление карточки
  btnTrash.addEventListener('click', deleteCard);
  //Лайк карточки
  btnHeartCard.addEventListener('click', likeCard);
  newCardImage.addEventListener('click', (evt) => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupTitleImage.textContent = evt.target
      .closest('.element__item')
      .querySelector('.element__text').textContent;
    openPopup(popupTypeImage);
  });
  return newCard;
};

const renderCard = (wrap, name, link) => {
  wrap.prepend(createCard(name, link));
};

initialCards.forEach((item) => {
  renderCard(itemLiistWrapper, item.name, item.link);
});

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
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = titleInput.value;
  const linkInput = linkInputImage.value;
  renderCard(itemLiistWrapper, nameInput, linkInput);
  formPopupAddCard.reset();
  closePopup(popupTypeAddCard);
});
