class Card {
  constructor(
    cardData,
    user,
    template,
    openPopupConfirm,
    { handleCardClick },
    { handleLikeClick },
    { handleDeleteLikeClick }
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._owner = cardData.owner;
    this._id = cardData._id;
    this._user = user;
    this._likes = cardData.likes;
    this._template = template;
    this._data = cardData;
    this._openPopupConfirm = openPopupConfirm;
    this.handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
  }

  //--------------------------------------------
  _likeCard() {
    return this._likes.some((item) => item._id === this._user._id);
  }

  showLikes(data) {
    this._likes = data.likes;
    if (this._likes.length === 0) {
      this._likeNumber.textContent = '0';
    } else {
      this._likeNumber.textContent = this._likes.length;
    }
    if (this._likeCard()) {
      this._btnHeartCard.classList.add('element__button-heart_active');
    } else {
      this._btnHeartCard.classList.remove('element__button-heart_active');
    }
  }

  clickLike() {
    if (this._likeCard()) {
      this._handleDeleteLikeClick(this._id);
    } else {
      this._handleLikeClick(this._id);
    }
  }

  //--------------------------------

  // Добавление карточки
  createCard = () => {
    this._newCard = this._template.content
      .querySelector('.element__item')
      .cloneNode(true);
    this._newCardName = this._newCard.querySelector('.element__text');
    this._newCardImage = this._newCard.querySelector(
      '.element__image_type_image'
    );
    this._btnTrash = this._newCard.querySelector('.element__button-delete');
    this._btnHeartCard = this._newCard.querySelector('.element__button-heart');
    this._likeNumber = this._newCard.querySelector('.element__number-likes');
    this._newCardName.textContent = this._name;
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this.showLikes(this._data);
    if (this._owner._id !== this._user._id) this._btnTrash.remove();
    this._setEventListeners();

    return this._newCard;
  };
  //--------------------------------------------------------------

  deleteCard = () => {
    this._newCard.remove();
    this._newCard = null;
  };

  _setEventListeners() {
    // Удаление карточки
    this._btnTrash.addEventListener('click', () => {
      this._openPopupConfirm(this, this._id);
    });

    //Лайк карточки
    this._btnHeartCard.addEventListener('click', () => {
      this.clickLike();
    });
    //Open PopupImage
    this._newCardImage.addEventListener('click', this.handleCardClick);
  }
}

export default Card;
