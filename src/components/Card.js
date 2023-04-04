class Card {
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this.handleCardClick = handleCardClick;
  }

  _deleteCard = (evt) => {
    evt.target.closest('.element__item').remove();
  };

  _likeCard = () => {
    this._btnHeartCard.classList.toggle('element__button-heart_active');
  };

  // Добавление карточки
  createCard = () => {
    this._newCard = this._template.content.cloneNode(true);
    this._newCardName = this._newCard.querySelector('.element__text');
    this._newCardImage = this._newCard.querySelector(
      '.element__image_type_image'
    );
    this._btnTrash = this._newCard.querySelector('.element__button-delete');
    this._btnHeartCard = this._newCard.querySelector('.element__button-heart');
    this._newCardName.textContent = this._name;
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this._setEventListeners();
    return this._newCard;
  };

  _setEventListeners() {
    // Удаление карточки
    this._btnTrash.addEventListener('click', this._deleteCard);
    //Лайк карточки
    this._btnHeartCard.addEventListener('click', this._likeCard);
    //Open PopupImage
    this._newCardImage.addEventListener('click', this.handleCardClick);
  }
}

export default Card;